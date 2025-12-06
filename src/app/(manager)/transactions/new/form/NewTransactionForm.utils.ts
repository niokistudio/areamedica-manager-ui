import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { DocumentPrefix } from "@/types/document"
import type { NewTransactionRequest, Transaction } from "@/types/transactions"
import { decodeDocument, encodeDocument } from "@/utils/document"

export function mapNewTransactionFormToServer(
  form: INewTransactionForm,
): NewTransactionRequest {
  return {
    type: form.type,
    reference: form.reference,
    customer_full_name: form.name,
    customer_document: encodeDocument(form.documentPrefix, form.documentNumber),
    customer_phone: form.phone,
  }
}

export function mapServerToNewTransactionForm(
  transaction: Transaction,
): INewTransactionForm {
  const [documentPrefix, documentNumber] = decodeDocument(
    transaction.customer_document,
  )
  return {
    name: transaction.customer_full_name,
    phone: transaction.customer_phone,
    documentPrefix: documentPrefix || DocumentPrefix.Venezuelan,
    documentNumber: documentNumber || "",
    type: transaction.type,
    reference: transaction.reference,
  }
}
