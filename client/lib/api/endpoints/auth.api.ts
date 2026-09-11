import api from '../axios';
import type {
  LoginPayload,
  RegisterPayload,
  RefreshPayload,
  LoginResponse,
  RegisterResponse,
  AuthTokens,
  BackendUser,
} from '../types';

/** POST /auth/login — returns access + refresh tokens and user profile */
export async function loginApi(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  return data;
}

/** POST /auth/register — registers user, creates cart, returns tokens */
export async function registerApi(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/auth/register', payload);
  return data;
}

/** POST /auth/refresh — exchanges a valid refreshToken for a fresh token pair */
export async function refreshTokenApi(
  payload: RefreshPayload,
): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>('/auth/refresh', payload);
  return data;
}

/** GET /auth/profile — returns current authenticated user's profile */
export async function getProfileApi(): Promise<BackendUser> {
  const { data } = await api.get<BackendUser>('/auth/profile');
  return data;
}
