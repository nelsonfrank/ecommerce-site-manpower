'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { loginApi, registerApi, getProfileApi } from '../endpoints';
import { QUERY_KEYS } from '../config';
import type { LoginPayload, RegisterPayload } from '../types';

// ─── Profile Query ────────────────────────────────────────────────────────────

/** Fetches /auth/profile for the currently authenticated user.
 *  Only runs when a token is present in the store. */
export function useProfileQuery() {
  const token = useStore((s) => s.accessToken);

  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: getProfileApi,
    enabled: !!token,
    staleTime: 5 * 60 * 1_000, // 5 minutes
  });
}

// ─── Login Mutation ───────────────────────────────────────────────────────────

export function useLoginMutation() {
  const setAuth = useStore((s) => s.setAuth);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginApi(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      // Pre-populate the profile cache immediately so the dashboard
      // doesn't need to refetch right away
      queryClient.setQueryData(QUERY_KEYS.profile, data.user);
    },
  });
}

// ─── Register Mutation ────────────────────────────────────────────────────────

export function useRegisterMutation() {
  const setAuth = useStore((s) => s.setAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerApi(payload),
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      queryClient.setQueryData(QUERY_KEYS.profile, data.user);
    },
  });
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export function useLogout() {
  const logout = useStore((s) => s.logout);
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    logout();
    // Clear all cached server data on logout so the next user starts fresh
    queryClient.clear();
    router.push('/login');
  };
}
