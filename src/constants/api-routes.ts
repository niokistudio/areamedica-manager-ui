export const internalAuthRoutes = {
  login: "/api/auth/login",
  logout: "/api/auth/logout",
  refresh: "/api/auth/refresh",
} as const

export const apiRoutes = {
  userInfo: "/auth/me",
  login: "/auth/login",
  logout: "/auth/logout",
  refresh: "/auth/refresh",
} as const
