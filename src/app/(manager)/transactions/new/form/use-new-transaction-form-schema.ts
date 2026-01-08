import { useTranslations } from "next-intl"
import { useMemo } from "react"
import z from "zod"
import { DocumentPrefix } from "@/types/document"
import { TransactionType } from "@/types/transactions"

// Validation constants
const DOCUMENT_MIN_LENGTH = 5
const DOCUMENT_MAX_LENGTH = 10
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
          phone: z.string().trim().optional(),
          documentPrefix: z.enum(DocumentPrefix, t("invalidSelection")),
          documentNumber: z.string().trim().optional(),
          type: z.enum(TransactionType, t("invalidSelection")),
          reference: z.string().trim().min(1, t("required")),
        })
        .superRefine((data, ctx) => {
          if (data.type === TransactionType.MobilePayment) {
            // Document number is REQUIRED for MobilePayment
            if (!data.documentNumber || data.documentNumber.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("required"),
                path: ["documentNumber"],
              })
            } else if (data.documentNumber.length < DOCUMENT_MIN_LENGTH) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("documentMinLength"),
                path: ["documentNumber"],
              })
            } else if (data.documentNumber.length > DOCUMENT_MAX_LENGTH) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("documentMaxLength"),
                path: ["documentNumber"],
              })
            } else if (!NUMERIC_ONLY_REGEX.test(data.documentNumber)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("numericOnly"),
                path: ["documentNumber"],
              })
            }

            // Phone is REQUIRED for MobilePayment
            if (!data.phone || data.phone.length === 0) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("required"),
                path: ["phone"],
              })
            }

            // Reference must be AT LEAST 6 characters (numeric only)
            if (!NUMERIC_ONLY_REGEX.test(data.reference)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("numericOnly"),
                path: ["reference"],
              })
            } else if (
              data.reference.length < REFERENCE_MIN_LENGTH_MOBILE_PAYMENT
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("referenceMinLengthMobilePayment"),
                path: ["reference"],
              })
            }
          }

          if (data.type === TransactionType.Transfer) {
            // Document number is OPTIONAL for Transfer
            // If provided, validate format
            if (data.documentNumber && data.documentNumber.length > 0) {
              if (data.documentNumber.length < DOCUMENT_MIN_LENGTH) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: t("documentMinLength"),
                  path: ["documentNumber"],
                })
              } else if (data.documentNumber.length > DOCUMENT_MAX_LENGTH) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: t("documentMaxLength"),
                  path: ["documentNumber"],
                })
              } else if (!NUMERIC_ONLY_REGEX.test(data.documentNumber)) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: t("numericOnly"),
                  path: ["documentNumber"],
                })
              }
            }

            // Phone is OPTIONAL for Transfer (no validation needed)

            // Reference must be EXACTLY 12 characters (numeric only)
            if (!NUMERIC_ONLY_REGEX.test(data.reference)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("numericOnly"),
                path: ["reference"],
              })
            } else if (
              data.reference.length !== REFERENCE_EXACT_LENGTH_TRANSFER
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: t("referenceExactLengthTransfer"),
                path: ["reference"],
              })
            }
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
  phone: "",
  documentPrefix: DocumentPrefix.Venezuelan,
  documentNumber: "",
  type: TransactionType.MobilePayment,
  reference: "",
}
