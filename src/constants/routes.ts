export const routes = {
  login: "/login",
  transactions: "/transactions",
  transactionDetail: (id: string) => `/transactions/${id}`,
} as const
