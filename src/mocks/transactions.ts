import {
  type Transaction,
  TransactionStatus,
  TransactionType,
} from "@/types/transactions"

/**
 * Mock transaction data for development and testing
 * Based on real transaction references
 */
export const mockTransactions: Transaction[] = [
  {
    id: "a8db57d2-4932-48a2-a9f1-e9a6e68e77e1",
    reference: "099930126394",
    status: TransactionStatus.Completed,
    customer_full_name: "María González Pérez",
    customer_phone: "0412-1234567",
    customer_document: "V-12345678",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "099930126394",
      amount: 423.0,
      trnDate: "2025-01-21",
      trnTime: "10:30:00",
      concept: "Pago de consulta médica",
    },
    created_at: "2025-01-21T10:30:00Z",
    updated_at: "2025-01-21T10:32:00Z",
  },
  {
    id: "b9ec68e3-5a43-59b3-ba02-fab7f79f88f2",
    reference: "099933398532",
    status: TransactionStatus.Completed,
    customer_full_name: "Carlos Rodríguez López",
    customer_phone: "0414-9876543",
    customer_document: "V-98765432",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "099933398532",
      amount: 560.0,
      trnDate: "2025-03-10",
      trnTime: "14:20:00",
      concept: "Exámenes de laboratorio",
    },
    created_at: "2025-03-10T14:20:00Z",
    updated_at: "2025-03-10T14:20:00Z",
  },
  {
    id: "c0fd79f4-6b54-6ac4-cb13-0bc8080099a3",
    reference: "09914151316",
    status: TransactionStatus.Completed,
    customer_full_name: "Ana Martínez Silva",
    customer_phone: "0416-9619039",
    customer_document: "V-55512345",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "09914151316",
      amount: 110.03,
      trnDate: "2025-06-19",
      trnTime: "09:15:00",
      concept: "Procedimiento quirúrgico",
    },
    created_at: "2025-06-19T09:15:00Z",
    updated_at: "2025-06-19T09:45:00Z",
  },
  {
    id: "d1ae80a5-7c65-7bd5-dc24-1cd9191100b4",
    reference: "099914151320",
    status: TransactionStatus.InProgress,
    customer_full_name: "Luis Hernández Castro",
    customer_phone: "0416-7778888",
    customer_document: "V-77788889",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "099914151320",
      amount: 99.0,
      trnDate: "2025-06-19",
      trnTime: "11:00:00",
      concept: "Consulta especializada",
    },
    created_at: "2025-06-19T11:00:00Z",
    updated_at: "2025-06-19T11:05:00Z",
  },
  {
    id: "e2bf91b6-8d76-8ce6-ed35-2de0202211c5",
    reference: "99914157320",
    status: TransactionStatus.Completed,
    customer_full_name: "Carmen Díaz Morales",
    customer_phone: "0412-3334444",
    customer_document: "V-33344445",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "99914157320",
      amount: 123.15,
      trnDate: "2025-06-19",
      trnTime: "16:30:00",
      concept: "Reembolso por cancelación",
    },
    created_at: "2025-06-19T16:30:00Z",
    updated_at: "2025-06-19T16:35:00Z",
  },
  {
    id: "f3c002c7-9e87-9df7-fe46-3ef1313322d6",
    reference: "99931518752",
    status: TransactionStatus.Canceled,
    customer_full_name: "José Ramírez Gutiérrez",
    customer_phone: "0424-9990000",
    customer_document: "V-99900001",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "99931518752",
      amount: 120.0,
      trnDate: "2025-05-12",
      trnTime: "08:45:00",
      concept: "Terapia física",
    },
    created_at: "2025-05-12T08:45:00Z",
    updated_at: "2025-05-12T09:00:00Z",
  },
  {
    id: "a4d113d8-0f98-0ea8-af57-4fa2424433e7",
    reference: "99931518733",
    status: TransactionStatus.Completed,
    customer_full_name: "Patricia Fernández Ruiz",
    customer_phone: "0414-1112222",
    customer_document: "V-11122223",
    type: TransactionType.MobilePayment,
    details: {
      referenceNumber: "99931518733",
      amount: 180.0,
      trnDate: "2025-05-12",
      trnTime: "13:20:00",
      concept: "Estudios radiológicos",
    },
    created_at: "2025-05-12T13:20:00Z",
    updated_at: "2025-05-12T13:25:00Z",
  },
  {
    id: "b5e224e9-1a09-1fb9-ba68-5ab3535544f8",
    reference: "00000148950",
    status: TransactionStatus.InProgress,
    customer_full_name: "Calidad Activo",
    customer_phone: "0134-0804108",
    customer_document: "J-003075523",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000148950",
      amount: 63.77,
      trnDate: "2025-06-19",
      trnTime: "10:10:00",
      concept: "Transferencia - Débito",
      trnType: "01340804108041005394",
    },
    created_at: "2025-06-19T10:10:00Z",
    updated_at: "2025-06-19T10:10:00Z",
  },
  {
    id: "c6f335f0-2b10-2ac0-cb79-6bc4646655a9",
    reference: "00000148952",
    status: TransactionStatus.Completed,
    customer_full_name: "Roberto Sánchez Torres",
    customer_phone: "0416-4445555",
    customer_document: "V-44455556",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000148952",
      amount: 250.0,
      trnDate: "2025-06-19",
      trnTime: "15:40:00",
      concept: "Cirugía menor",
    },
    created_at: "2025-06-19T15:40:00Z",
    updated_at: "2025-06-19T15:50:00Z",
  },
  {
    id: "d7a446a1-3c21-3bd1-dc80-7cd5757766b0",
    reference: "00000118390",
    status: TransactionStatus.InProgress,
    customer_full_name: "Miguel Ángel Vargas Cruz",
    customer_phone: "0412-8889999",
    customer_document: "V-88899990",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000118390",
      amount: 550.0,
      trnDate: "2025-01-21",
      trnTime: "09:25:00",
      concept: "Consulta cardiológica",
    },
    created_at: "2025-01-21T09:25:00Z",
    updated_at: "2025-01-21T09:30:00Z",
  },
  {
    id: "e8b557b2-4d32-4ce2-ed91-8de6868877c1",
    reference: "00000118444",
    status: TransactionStatus.Completed,
    customer_full_name: "Sofía Moreno Jiménez",
    customer_phone: "0414-2223333",
    customer_document: "V-22233334",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000118444",
      amount: 560.0,
      trnDate: "2025-01-28",
      trnTime: "11:15:00",
      concept: "Resonancia magnética",
    },
    created_at: "2025-01-28T11:15:00Z",
    updated_at: "2025-01-28T11:20:00Z",
  },
  {
    id: "f9c668c3-5e43-5df3-fe02-9ef7979988d2",
    reference: "00000148946",
    status: TransactionStatus.Canceled,
    customer_full_name: "Diego Castro Reyes",
    customer_phone: "0416-5556666",
    customer_document: "V-55566667",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000148946",
      amount: 250.0,
      trnDate: "2025-06-19",
      trnTime: "14:50:00",
      concept: "Tratamiento odontológico - Crédito",
    },
    created_at: "2025-06-19T14:50:00Z",
    updated_at: "2025-06-19T14:55:00Z",
  },
  {
    id: "a0d779d4-6f54-6ea4-af13-0fa8080099e3",
    reference: "00000148948",
    status: TransactionStatus.ToReview,
    customer_full_name: "Valentina Ortiz Suárez",
    customer_phone: "0424-7778888",
    customer_document: "V-77788889",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000148948",
      amount: 90.0,
      trnDate: "2025-06-19",
      trnTime: "12:30:00",
      concept: "Reembolso por error en facturación",
    },
    created_at: "2025-06-19T12:30:00Z",
    updated_at: "2025-06-19T12:30:00Z",
  },
  {
    id: "b1e880e5-7a65-7fb5-ba24-1ab9191100f4",
    reference: "00000128752",
    status: TransactionStatus.Completed,
    customer_full_name: "Andrés Romero Paz",
    customer_phone: "0412-9990000",
    customer_document: "V-99900001",
    type: TransactionType.Transfer,
    details: {
      referenceNumber: "00000128752",
      amount: 159.1,
      trnDate: "2025-03-21",
      trnTime: "08:00:00",
      concept: "Hospitalización",
    },
    created_at: "2025-03-21T08:00:00Z",
    updated_at: "2025-03-21T08:10:00Z",
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
  return mockTransactions.filter((t) => t.type === type)
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
  const id = crypto.randomUUID()
  const timestamp = new Date().toISOString()

  return {
    id,
    reference: `${Math.floor(Math.random() * 900000000) + 100000000}`,
    status: TransactionStatus.InProgress,
    customer_full_name: "Cliente de Prueba",
    customer_phone: "0412-0000000",
    customer_document: `V-${Math.floor(Math.random() * 90000000) + 10000000}`,
    type: TransactionType.Transfer,
    details: {
      referenceNumber: `${Math.floor(Math.random() * 900000000) + 100000000}`,
      amount: Math.floor(Math.random() * 500) + 50,
      concept: "Transacción de prueba",
    },
    created_at: timestamp,
    updated_at: timestamp,
    ...overrides,
  }
}
