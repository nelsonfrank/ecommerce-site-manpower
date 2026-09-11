/**
 * Axios instance with automatic JWT Bearer injection and refresh token
 * interceptors. Concurrent 401 responses are queued so only one
 * /auth/refresh call fires at a time (mutex pattern).
 */
import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { API_BASE_URL, API_TIMEOUT } from './config';
import type { AuthTokens } from './types';

// ─── Token accessors (deferred imports to avoid circular deps) ────────────────

/**
 * Read the current access token from the Zustand store without triggering
 * a React render (uses getState() directly so this is safe outside components).
 */
function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    // Zustand persist key defined in store.ts
    const raw = localStorage.getItem('north-and-co-store');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { accessToken?: string } };
    return parsed?.state?.accessToken ?? null;
  } catch {
    return null;
  }
}

function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem('north-and-co-store');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: { refreshToken?: string } };
    return parsed?.state?.refreshToken ?? null;
  } catch {
    return null;
  }
}

/**
 * Persist new tokens into localStorage directly so the interceptor doesn't
 * need to import the store (avoids circular dependency). Zustand will pick
 * up the persisted value on next store access.
 */
function persistTokens(tokens: AuthTokens) {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('north-and-co-store');
    const current = raw
      ? (JSON.parse(raw) as { state?: Record<string, unknown> })
      : { state: {} };
    current.state = {
      ...(current.state ?? {}),
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
    localStorage.setItem('north-and-co-store', JSON.stringify(current));
  } catch {
    // ignore storage errors
  }
}

function clearTokens() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem('north-and-co-store');
    const current = raw
      ? (JSON.parse(raw) as { state?: Record<string, unknown> })
      : { state: {} };
    current.state = {
      ...(current.state ?? {}),
      accessToken: null,
      refreshToken: null,
      user: null,
      token: null,
    };
    localStorage.setItem('north-and-co-store', JSON.stringify(current));
  } catch {
    // ignore storage errors
  }
}

// ─── Refresh Token Queue / Mutex ──────────────────────────────────────────────

interface QueueEntry {
  resolve: (token: string) => void;
  reject: (reason: unknown) => void;
}

let isRefreshing = false;
const failedQueue: QueueEntry[] = [];

function processQueue(error: unknown, token: string | null = null) {
  for (const entry of failedQueue) {
    if (error) {
      entry.reject(error);
    } else if (token) {
      entry.resolve(token);
    }
  }
  failedQueue.length = 0;
}

// ─── Axios Instance ───────────────────────────────────────────────────────────

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * A plain axios instance used exclusively for the refresh call so it is
 * NOT caught by our response interceptor (prevents infinite retry loops).
 */
const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
// Attaches Authorization: Bearer <accessToken> to every outgoing request.

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Traps 401 Unauthorized, attempts one token refresh, then replays queued
// requests. On refresh failure, clears tokens and triggers logout redirect.

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only intercept 401s that haven't already been retried
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh completes
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (originalRequest.headers) {
              (originalRequest.headers as Record<string, string>)[
                'Authorization'
              ] = `Bearer ${token}`;
            } else {
              originalRequest.headers = { Authorization: `Bearer ${token}` };
            }
            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      isRefreshing = false;
      processQueue(error, null);
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }

    try {
      const { data } = await refreshClient.post<AuthTokens>('/auth/refresh', {
        refreshToken,
      });

      persistTokens(data);

      // Retry the original request with the fresh access token
      if (originalRequest.headers) {
        (originalRequest.headers as Record<string, string>)[
          'Authorization'
        ] = `Bearer ${data.accessToken}`;
      } else {
        originalRequest.headers = {
          Authorization: `Bearer ${data.accessToken}`,
        };
      }

      processQueue(null, data.accessToken);
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
