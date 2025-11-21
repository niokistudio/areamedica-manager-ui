export type TransactionColumnKey =
  | "status"
  | "reference"
  | "nationalId"
  | "name"
  | "phone"
  | "date"
  | "amount"
  | "type"
  | "actions"

export interface TransactionColumn {
  key: TransactionColumnKey
  label: string
  sortable: boolean
}
