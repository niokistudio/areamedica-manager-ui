import {
  BankType,
  type Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transactions"

/**
 * Mock transaction data for development and testing
 */
export const mockTransactions: Transaction[] = [
  {
    id: "1",
    transaction_id: "TRX-2024-001",
    reference: "REF-001-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 150000.5,
    customer_full_name: "María González Pérez",
    customer_phone: "+58 412-1234567",
    customer_national_id: "V-12345678",
    concept: "Pago de consulta médica",
    extra_data: {
      payment_method: "transfer",
      reference_number: "001234567890",
    },
    created_by: "user_001",
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-15T10:32:00Z",
  },
  {
    id: "2",
    transaction_id: "TRX-2024-002",
    reference: "REF-002-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: 250000.0,
    customer_full_name: "Carlos Rodríguez López",
    customer_phone: "+58 414-9876543",
    customer_national_id: "V-98765432",
    concept: "Exámenes de laboratorio",
    extra_data: {
      payment_method: "mobile_payment",
      phone: "04149876543",
    },
    created_by: "user_002",
    created_at: "2024-01-16T14:20:00Z",
    updated_at: "2024-01-16T14:20:00Z",
  },
  {
    id: "3",
    transaction_id: "TRX-2024-003",
    reference: "REF-003-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: 500000.75,
    customer_full_name: "Ana Martínez Silva",
    customer_phone: "+58 424-5551234",
    customer_national_id: "V-55512345",
    concept: "Procedimiento quirúrgico",
    extra_data: {
      payment_method: "transfer",
      authorization_code: "AUTH-001",
    },
    created_by: "user_001",
    created_at: "2024-01-17T09:15:00Z",
    updated_at: "2024-01-17T09:45:00Z",
  },
  {
    id: "4",
    transaction_id: "TRX-2024-004",
    reference: "REF-004-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.CANCELED,
    amount: 75000.0,
    customer_full_name: "Luis Hernández Castro",
    customer_phone: "+58 416-7778888",
    customer_national_id: "V-77788889",
    concept: "Consulta especializada",
    extra_data: {
      payment_method: "card",
      error_code: "INSUFFICIENT_FUNDS",
    },
    created_by: "user_003",
    created_at: "2024-01-18T11:00:00Z",
    updated_at: "2024-01-18T11:05:00Z",
  },
  {
    id: "5",
    transaction_id: "TRX-2024-005",
    reference: "REF-005-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 120000.0,
    customer_full_name: "Carmen Díaz Morales",
    customer_phone: "+58 412-3334444",
    customer_national_id: "V-33344445",
    concept: "Reembolso por cancelación",
    extra_data: {
      original_transaction: "TRX-2024-001",
      reason: "appointment_cancelled",
    },
    created_by: "user_002",
    created_at: "2024-01-19T16:30:00Z",
    updated_at: "2024-01-19T16:35:00Z",
  },
  {
    id: "6",
    transaction_id: "TRX-2024-006",
    reference: "REF-006-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.CANCELED,
    amount: 180000.25,
    customer_full_name: "José Ramírez Gutiérrez",
    customer_phone: "+58 424-9990000",
    customer_national_id: "V-99900001",
    concept: "Terapia física",
    extra_data: {
      payment_method: "transfer",
      cancelled_by: "customer",
    },
    created_by: "user_001",
    created_at: "2024-01-20T08:45:00Z",
    updated_at: "2024-01-20T09:00:00Z",
  },
  {
    id: "7",
    transaction_id: "TRX-2024-007",
    reference: "REF-007-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 320000.0,
    customer_full_name: "Patricia Fernández Ruiz",
    customer_phone: "+58 414-1112222",
    customer_national_id: "V-11122223",
    concept: "Estudios radiológicos",
    extra_data: {
      payment_method: "mobile_payment",
      study_type: "radiography",
    },
    created_by: "user_003",
    created_at: "2024-01-21T13:20:00Z",
    updated_at: "2024-01-21T13:25:00Z",
  },
  {
    id: "8",
    transaction_id: "TRX-2024-008",
    reference: "REF-008-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: 450000.5,
    customer_full_name: "Roberto Sánchez Torres",
    customer_phone: "+58 416-4445555",
    customer_national_id: "V-44455556",
    concept: "Tratamiento médico especializado",
    extra_data: {
      payment_method: "transfer",
      installments: 3,
    },
    created_by: "user_002",
    created_at: "2024-01-22T10:10:00Z",
    updated_at: "2024-01-22T10:10:00Z",
  },
  {
    id: "9",
    transaction_id: "TRX-2024-009",
    reference: "REF-009-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 275000.75,
    customer_full_name: "Isabel López Medina",
    customer_phone: "+58 424-6667777",
    customer_national_id: "V-66677778",
    concept: "Cirugía menor",
    extra_data: {
      payment_method: "transfer",
      surgery_type: "minor",
    },
    created_by: "user_001",
    created_at: "2024-01-23T15:40:00Z",
    updated_at: "2024-01-23T15:50:00Z",
  },
  {
    id: "10",
    transaction_id: "TRX-2024-010",
    reference: "REF-010-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: 195000.0,
    customer_full_name: "Miguel Ángel Vargas Cruz",
    customer_phone: "+58 412-8889999",
    customer_national_id: "V-88899990",
    concept: "Consulta cardiológica",
    extra_data: {
      payment_method: "card",
      specialty: "cardiology",
    },
    created_by: "user_003",
    created_at: "2024-01-24T09:25:00Z",
    updated_at: "2024-01-24T09:30:00Z",
  },
  {
    id: "11",
    transaction_id: "TRX-2024-011",
    reference: "REF-011-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 380000.25,
    customer_full_name: "Sofía Moreno Jiménez",
    customer_phone: "+58 414-2223333",
    customer_national_id: "V-22233334",
    concept: "Resonancia magnética",
    extra_data: {
      payment_method: "mobile_payment",
      study_type: "mri",
    },
    created_by: "user_002",
    created_at: "2024-01-25T11:15:00Z",
    updated_at: "2024-01-25T11:20:00Z",
  },
  {
    id: "12",
    transaction_id: "TRX-2024-012",
    reference: "REF-012-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.CANCELED,
    amount: 225000.0,
    customer_full_name: "Diego Castro Reyes",
    customer_phone: "+58 416-5556666",
    customer_national_id: "V-55566667",
    concept: "Tratamiento odontológico",
    extra_data: {
      payment_method: "card",
      error_code: "CARD_DECLINED",
    },
    created_by: "user_001",
    created_at: "2024-01-26T14:50:00Z",
    updated_at: "2024-01-26T14:55:00Z",
  },
  {
    id: "13",
    transaction_id: "TRX-2024-013",
    reference: "REF-013-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: 165000.5,
    customer_full_name: "Valentina Ortiz Suárez",
    customer_phone: "+58 424-7778888",
    customer_national_id: "V-77788889",
    concept: "Reembolso por error en facturación",
    extra_data: {
      original_transaction: "TRX-2024-007",
      reason: "billing_error",
    },
    created_by: "user_003",
    created_at: "2024-01-27T12:30:00Z",
    updated_at: "2024-01-27T12:30:00Z",
  },
  {
    id: "14",
    transaction_id: "TRX-2024-014",
    reference: "REF-014-2024",
    bank: BankType.MOBILE_TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 420000.75,
    customer_full_name: "Andrés Romero Paz",
    customer_phone: "+58 412-9990000",
    customer_national_id: "V-99900001",
    concept: "Hospitalización",
    extra_data: {
      payment_method: "transfer",
      days_hospitalized: 3,
    },
    created_by: "user_002",
    created_at: "2024-01-28T08:00:00Z",
    updated_at: "2024-01-28T08:10:00Z",
  },
  {
    id: "15",
    transaction_id: "TRX-2024-015",
    reference: "REF-015-2024",
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.COMPLETED,
    amount: 310000.0,
    customer_full_name: "Gabriela Silva Mendoza",
    customer_phone: "+58 414-3334444",
    customer_national_id: "V-33344445",
    concept: "Análisis clínicos completos",
    extra_data: {
      payment_method: "mobile_payment",
      test_count: 12,
    },
    created_by: "user_001",
    created_at: "2024-01-29T16:45:00Z",
    updated_at: "2024-01-29T16:50:00Z",
  },
]

/**
 * Get a random subset of mock transactions
 *
 * @param count - Number of transactions to return
 * @returns Array of random transactions
 */
export function getRandomTransactions(count: number): Transaction[] {
  const shuffled = [...mockTransactions].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, mockTransactions.length))
}

/**
 * Get transactions by status
 *
 * @param status - Transaction status to filter by
 * @returns Array of transactions with the specified status
 */
export function getTransactionsByStatus(
  status: TransactionStatus,
): Transaction[] {
  return mockTransactions.filter((t) => t.status === status)
}

/**
 * Get transactions by type
 *
 * @param type - Transaction type to filter by
 * @returns Array of transactions with the specified type
 */
export function getTransactionsByType(type: TransactionType): Transaction[] {
  return mockTransactions.filter((t) => t.transaction_type === type)
}

/**
 * Generate a new mock transaction
 *
 * @param overrides - Partial transaction data to override defaults
 * @returns New mock transaction
 */
export function generateMockTransaction(
  overrides: Partial<Transaction> = {},
): Transaction {
  const id = `${mockTransactions.length + 1}`
  const timestamp = new Date().toISOString()

  return {
    id,
    transaction_id: `TRX-2024-${id.padStart(3, "0")}`,
    reference: `REF-${id.padStart(3, "0")}-2024`,
    bank: BankType.TRANSFER,
    transaction_type: TransactionType.TRANSACTION,
    status: TransactionStatus.IN_PROGRESS,
    amount: Math.floor(Math.random() * 500000) + 50000,
    customer_full_name: "Cliente de Prueba",
    customer_phone: "+58 412-0000000",
    customer_national_id: `V-${Math.floor(Math.random() * 90000000) + 10000000}`,
    concept: "Transacción de prueba",
    extra_data: {},
    created_by: "user_001",
    created_at: timestamp,
    updated_at: timestamp,
    ...overrides,
  }
}
