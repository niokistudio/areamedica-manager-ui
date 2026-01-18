import type { DateValue } from "@internationalized/date"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { DocumentPrefix } from "@/types/document"
import { PhonePrefix } from "@/types/phone"
import type {
  FullReferenceTransactionRequest,
  PartialReferenceTransactionRequest,
  Transaction,
} from "@/types/transactions"
import { decodeDocument, encodeDocument } from "@/utils/document"
import { decodePhone, encodePhone } from "@/utils/phone"

function formatDateValue(date: DateValue | null): string {
  if (!date) return ""
  const year = date.year
  const month = String(date.month).padStart(2, "0")
  const day = String(date.day).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function mapNewTransactionFormToFullReference(
  form: INewTransactionForm,
): FullReferenceTransactionRequest {
  return {
    reference: form.reference,
    customer_full_name: form.name,
    customer_document: form.documentNumber
      ? encodeDocument(form.documentPrefix, form.documentNumber)
      : undefined,
    customer_phone: form.phone
      ? encodePhone(form.phonePrefix, form.phone)
      : undefined,
  }
}

export function mapNewTransactionFormToPartialReference(
  form: INewTransactionForm,
): PartialReferenceTransactionRequest {
  return {
    reference_number: form.reference,
    phone_number: encodePhone(form.phonePrefix, form.phone || ""),
    operation_date: formatDateValue(form.operationDate),
    bank_code: form.bank || "",
    customer_full_name: form.name,
    customer_document: encodeDocument(
      form.documentPrefix,
      form.documentNumber || "",
    ),
    customer_phone: encodePhone(form.phonePrefix, form.phone || ""),
  }
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
    operationDate: null,
    reference: transaction.reference,
  }
}
