export interface AuthUser {
  username: string | null,
  roles: string[] | null,
  accessToken: string | null,
  refreshToken: string | null,
}
