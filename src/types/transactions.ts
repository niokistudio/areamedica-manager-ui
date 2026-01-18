import type { VenezuelanBankCode } from "@/types/banks"

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
  bank?: string // Bank code
  amount?: string // Transaction amount (string from API)
  concept?: string // Transaction concept/description
  details?: TransactionDetails // Nested transaction details
  created_at: string // ISO 8601 timestamp
  updated_at: string // ISO 8601 timestamp
}

export interface FullReferenceTransactionRequest {
  reference: string // Transaction reference number
  customer_full_name: string // Customer's full name
  customer_phone?: string // Customer's phone number
  customer_document?: string // Customer's document/ID number
}

export interface PartialReferenceTransactionRequest {
  reference_number: string // Transaction reference number
  phone_number: string
  operation_date: string
  bank_code: VenezuelanBankCode
  customer_full_name: string // Customer's full name
  customer_phone: string // Customer's phone number
  customer_document: string // Customer's document/ID number
}
