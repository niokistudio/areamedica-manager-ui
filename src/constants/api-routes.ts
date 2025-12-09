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
  transactions: "/transactions",
  transactionById: (id: string) => `/transactions/${id}` as const,
  refreshTransaction: (id: string) => `/transactions/${id}/refresh` as const,
  transactionsBulkDelete: "/transactions/bulk-delete",
} as const
