import { useTranslations } from "next-intl"
import { useMemo } from "react"
import z from "zod"
import { DocumentPrefix } from "@/types/document"
import { PhonePrefix } from "@/types/phone"
import { TransactionType } from "@/types/transactions"

// Validation constants
const DOCUMENT_MIN_LENGTH = 5
const DOCUMENT_MAX_LENGTH = 10
const PHONE_EXACT_LENGTH = 7
const NUMERIC_ONLY_REGEX = /^[0-9]+$/
const REFERENCE_MIN_LENGTH_MOBILE_PAYMENT = 6
const REFERENCE_EXACT_LENGTH_TRANSFER = 12

export function useNewTransactionFormSchema() {
  const t = useTranslations("SchemaValidations")

  return useMemo(
    () =>
      z
        .object({
          name: z.string().trim().min(1, t("required")),
          phonePrefix: z.enum(PhonePrefix, t("invalidSelection")),
          phone: z.string().trim().optional(),
          documentPrefix: z.enum(DocumentPrefix, t("invalidSelection")),
          documentNumber: z.string().trim().optional(),
          type: z.enum(TransactionType, t("invalidSelection")),
          reference: z.string().trim().min(1, t("required")),
        })
        .superRefine((data, ctx) => {
          const isMobilePayment = data.type === TransactionType.MobilePayment
          const isTransfer = data.type === TransactionType.Transfer

          // Helper function to add validation issue
          const addIssue = (path: string, message: string) => {
            ctx.addIssue({
              code: "custom",
              message,
              path: [path],
            })
          }

          // Helper function to validate document number format
          const validateDocumentFormat = (documentNumber: string) => {
            if (documentNumber.length < DOCUMENT_MIN_LENGTH) {
              addIssue("documentNumber", t("documentMinLength"))
            } else if (documentNumber.length > DOCUMENT_MAX_LENGTH) {
              addIssue("documentNumber", t("documentMaxLength"))
            } else if (!NUMERIC_ONLY_REGEX.test(documentNumber)) {
              addIssue("documentNumber", t("numericOnly"))
            }
          }

          // Helper function to validate phone number format
          const validatePhoneFormat = (phone: string) => {
            if (!NUMERIC_ONLY_REGEX.test(phone)) {
              addIssue("phone", t("numericOnly"))
            } else if (phone.length !== PHONE_EXACT_LENGTH) {
              addIssue("phone", t("phoneExactLength"))
            }
          }

          // Validate document number
          if (isMobilePayment) {
            if (!data.documentNumber || data.documentNumber.length === 0) {
              addIssue("documentNumber", t("required"))
            } else {
              validateDocumentFormat(data.documentNumber)
            }
          } else if (
            isTransfer &&
            data.documentNumber &&
            data.documentNumber.length > 0
          ) {
            validateDocumentFormat(data.documentNumber)
          }

          // Validate phone
          if (isMobilePayment) {
            if (!data.phone || data.phone.length === 0) {
              addIssue("phone", t("required"))
            } else {
              validatePhoneFormat(data.phone)
            }
          } else if (isTransfer && data.phone && data.phone.length > 0) {
            validatePhoneFormat(data.phone)
          }

          // Validate reference
          if (!NUMERIC_ONLY_REGEX.test(data.reference)) {
            addIssue("reference", t("numericOnly"))
          } else if (
            isMobilePayment &&
            data.reference.length < REFERENCE_MIN_LENGTH_MOBILE_PAYMENT
          ) {
            addIssue("reference", t("referenceMinLengthMobilePayment"))
          } else if (
            isTransfer &&
            data.reference.length !== REFERENCE_EXACT_LENGTH_TRANSFER
          ) {
            addIssue("reference", t("referenceExactLengthTransfer"))
          }
        }),
    [t],
  )
}

export type INewTransactionForm = z.infer<
  ReturnType<typeof useNewTransactionFormSchema>
>

export const newTransactionFormDefaultValues: INewTransactionForm = {
  name: "",
  phonePrefix: PhonePrefix["0412"],
  phone: "",
  documentPrefix: DocumentPrefix.Venezuelan,
  documentNumber: "",
  type: TransactionType.MobilePayment,
  reference: "",
}
