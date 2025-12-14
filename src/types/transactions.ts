export enum TransactionStatus {
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED",
  Canceled = "CANCELED",
  Unknown = "UNKNOWN",
  ToReview = "TO_REVIEW",
}

export enum TransactionType {
  Transfer = "TRANSFER",
  MobilePayment = "MOBILE_PAYMENT",
}

enum TransactionsDetailsType {
  Credit = "CR",
  Debit = "DB",
}

export interface TransactionDetails {
  referenceNumber: string // Internal reference number
  amount: number // Transaction amount
  currencyCode?: string // Currency code (e.g., "USD", "BS")
  exchangeRate?: number // Exchange rate applied
  accountId?: string // Account identifier (masked)
  trnDate?: string // Transaction date (YYYY-MM-DD)
  trnTime?: string // Transaction time (HH:mm:ss)
  sourceBankId?: string // Source bank identifier
  destBankId?: string // Destination bank identifier
  concept?: string // Transaction concept/description
  customerIdBen?: string // Beneficiary customer ID
  trnType?: TransactionsDetailsType // Transaction type code (e.g., "CR", "DB")
}

export interface Transaction {
  id: string // Unique identifier (UUID)
  reference: string // Transaction reference number
  status: TransactionStatus // Transaction status (enum)
  customer_full_name: string // Customer's full name
  customer_phone: string // Customer's phone number
  customer_document: string // Customer's document/ID number
  type: TransactionType
  amount?: string // Transaction amount (string from API)
  concept?: string // Transaction concept/description
  details?: TransactionDetails // Nested transaction details
  created_at: string // ISO 8601 timestamp
  updated_at: string // ISO 8601 timestamp
}

export interface NewTransactionRequest {
  type: TransactionType
  reference: string // Transaction reference number
  customer_full_name: string // Customer's full name
  customer_phone: string // Customer's phone number
  customer_document: string // Customer's document/ID number
}

// Legacy code
//
// export enum TransactionType {
//   TRANSACTION = "TRANSACTION",
//   COMMISSION = "COMMISSION",
//   OTHER = "OTHER",
// }

// Puede ser banesco o pagomovil, usar esto para discriminar el tipo de de formulario que se debe usar
// export enum BankType {
//   BANESCO = "BANESCO",
//   MOBILE_TRANSFER = "MOBILE_TRANSFER",
// }

// export interface Transaction {
//   id: string
//   transaction_id: string
//   reference: string
//   bank: BankType
//   transaction_type: TransactionType
//   status: TransactionStatus
//   amount: number
//   customer_full_name: string
//   customer_phone: string
//   customer_national_id: string
//   concept: string
//   extra_data: Record<string, unknown>
//   created_by: string
//   created_at: string
//   updated_at: string
// }

export interface CreateTransactionRequest {
  bank: string
  reference: string
  customer_full_name?: string
  customer_national_id?: string
  customer_phone?: string
}

export interface UpdateTransactionRequest {
  id: string
  status?: TransactionStatus
  customer_full_name?: string
  customer_phone?: string
  customer_national_id?: string
  concept?: string
  extra_data?: Record<string, unknown>
}
