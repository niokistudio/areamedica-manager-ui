export const routes = {
  login: "/login",
  transactions: "/transactions",
  transactionDetail: (id: string) => `/transactions/${id}`,
  transactionEdit: (id: string) => `/transactions/${id}/edit`,
} as const
