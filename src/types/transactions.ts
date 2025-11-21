export enum TransactionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum TransactionType {
  TRANSACTION = "TRANSACTION",
  PAYMENT = "PAYMENT",
  TRANSFER = "TRANSFER",
  REFUND = "REFUND",
}

export interface Transaction {
  id: string
  transaction_id: string
  reference: string
  bank: string
  transaction_type: TransactionType
  status: TransactionStatus
  customer_full_name: string
  customer_phone: string
  customer_national_id: string
  concept: string
  extra_data: Record<string, unknown>
  created_by: string
  created_at: string
  updated_at: string
}

export interface CreateTransactionRequest {
  transaction_id: string
  reference: string
  bank: string
  transaction_type?: TransactionType
  status?: TransactionStatus
  customer_full_name?: string
  customer_phone?: string
  customer_national_id?: string
  concept?: string
  extra_data?: Record<string, unknown>
}

export interface UpdateTransactionRequest {
  status?: TransactionStatus
  customer_full_name?: string
  customer_phone?: string
  customer_national_id?: string
  concept?: string
  extra_data?: Record<string, unknown>
}
