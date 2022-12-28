export interface DecodedJwt {
  preferred_username: string,
  realm_access: {
    roles: string[]
  },
  resource_access: {
    "auth-service": {
      roles: string[]
    }
  }
}
