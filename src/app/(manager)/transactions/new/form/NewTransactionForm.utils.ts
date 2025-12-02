import { DocumentPrefix } from "@/app/(manager)/transactions/new/form/NewTransactionForm.types"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import type {
  CreateTransactionRequest,
  Transaction,
} from "@/types/transactions"

export function mapNewTransactionFormToServer(
  form: INewTransactionForm,
  transaction?: Transaction,
): CreateTransactionRequest {
  return {
    id: transaction?.id,
    transaction_id: transaction?.transaction_id,
    bank: form.bank,
    reference: form.reference,
    customer_full_name: form.name,
    customer_national_id: `${form.documentPrefix}${form.documentNumber}`,
    customer_phone: form.phone,
  }
}

export function mapServerToNewTransactionForm(
  transaction: Transaction,
): INewTransactionForm {
  return {
    bank: transaction.bank,
    reference: transaction.reference,
    name: transaction.customer_full_name,
    documentPrefix:
      (transaction.customer_national_id[0] as DocumentPrefix) ||
      DocumentPrefix.Venezuelan,
    documentNumber: transaction.customer_national_id.substring(1),
    phone: transaction.customer_phone,
  }
}
