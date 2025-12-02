export const routes = {
  login: "/login",
  transactions: "/transactions",
  transactionDetail: (id: string) => `/transactions/${id}`,
  transactionEdit: (id: string) => `/edit/transactions/${id}`,
} as const
