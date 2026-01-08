import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { DocumentPrefix } from "@/types/document"
import { PhonePrefix } from "@/types/phone"
import type { NewTransactionRequest, Transaction } from "@/types/transactions"
import { decodeDocument, encodeDocument } from "@/utils/document"
import { decodePhone, encodePhone } from "@/utils/phone"

export function mapNewTransactionFormToServer(
  form: INewTransactionForm,
): NewTransactionRequest {
  const request: NewTransactionRequest = {
    type: form.type,
    reference: form.reference,
    customer_full_name: form.name,
    customer_document: encodeDocument(
      form.documentPrefix,
      form.documentNumber || "",
    ),
    customer_phone: encodePhone(form.phonePrefix, form.phone || ""),
  }

  // Only include a bank for MobilePayment transactions
  if (form.bank) {
    request.bank = form.bank
  }

  return request
}

export function mapServerToNewTransactionForm(
  transaction: Transaction,
): INewTransactionForm {
  const [documentPrefix, documentNumber] = decodeDocument(
    transaction.customer_document,
  )
  const [phonePrefix, phone] = decodePhone(transaction.customer_phone)

  return {
    name: transaction.customer_full_name,
    phonePrefix: phonePrefix || PhonePrefix["0412"],
    phone: phone || "",
    documentPrefix: documentPrefix || DocumentPrefix.Venezuelan,
    documentNumber: documentNumber || "",
    type: transaction.type,
    bank: transaction.bank || "",
    reference: transaction.reference,
  }
}
