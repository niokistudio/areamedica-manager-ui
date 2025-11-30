import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import type { CreateTransactionRequest } from "@/types/transactions"

export function mapNewTransactionFormToServer(
  form: INewTransactionForm,
): CreateTransactionRequest {
  return {
    bank: form.bank,
    reference: form.reference,
    customer_full_name: form.name,
    customer_national_id: `${form.documentPrefix}${form.documentNumber}`,
    customer_phone: form.phone,
  }
}
