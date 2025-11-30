export enum TransactionStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  UNKNOWN = "UNKNOWN",
  TO_REVIEW = "TO_REVIEW",
}

export enum TransactionType {
  TRANSACTION = "TRANSACTION",
  COMMISSION = "COMMISSION",
  OTHER = "OTHER",
}

// Puede ser banesco o pagomovil, usar esto para discriminar el tipo de de formulario que se debe usar
export enum BankType {
  BANESCO = "BANESCO",
  MOBILE_TRANSFER = "MOBILE_TRANSFER",
}

export interface Transaction {
  id: string
  transaction_id: string
  reference: string
  bank: BankType
  transaction_type: TransactionType
  status: TransactionStatus
  amount: number
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
  bank: string
  reference: string
  customer_full_name?: string
  customer_national_id?: string
  customer_phone?: string
}

export interface UpdateTransactionRequest {
  transaction_id: string
  status?: TransactionStatus
  customer_full_name?: string
  customer_phone?: string
  customer_national_id?: string
  concept?: string
  extra_data?: Record<string, unknown>
}
