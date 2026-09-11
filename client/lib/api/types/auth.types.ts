// ─── Auth Types ──────────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface RefreshPayload {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface BackendUser {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse extends AuthTokens {
  user: Pick<BackendUser, 'id' | 'fullName' | 'email'>;
}

export interface RegisterResponse extends AuthTokens {
  message: string;
  user: BackendUser;
}
