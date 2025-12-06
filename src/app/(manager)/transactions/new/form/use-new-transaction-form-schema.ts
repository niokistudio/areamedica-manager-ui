import { useTranslations } from "next-intl"
import { useMemo } from "react"
import z from "zod"
import { DocumentPrefix } from "@/types/document"
import { TransactionType } from "@/types/transactions"

export function useNewTransactionFormSchema() {
  const t = useTranslations("SchemaValidations")

  return useMemo(
    () =>
      z.object({
        name: z.string().trim().min(1, t("required")),
        phone: z.string().trim().min(1, t("required")),
        documentPrefix: z.enum(DocumentPrefix, t("invalidSelection")),
        documentNumber: z
          .string()
          .trim()
          .min(5, t("documentMinLength"))
          .max(10, t("documentMaxLength"))
          .regex(/^[0-9]+$/, t("numericOnly")),
        type: z.enum(TransactionType, t("invalidSelection")),
        reference: z.string().trim().min(1, t("required")),
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
