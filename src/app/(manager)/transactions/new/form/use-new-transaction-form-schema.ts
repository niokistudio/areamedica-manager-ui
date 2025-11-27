import { useTranslations } from "next-intl"
import { useMemo } from "react"
import z from "zod"
import { DocumentPrefix } from "@/app/(manager)/transactions/new/form/NewTransactionForm.types"
import { BankType } from "@/types/transactions"

export function useNewTransactionFormSchema() {
  const t = useTranslations("SchemaValidations")

  return useMemo(
    () =>
      z.object({
        bank: z.enum(BankType, t("invalidSelection")),
        reference: z.string().trim().min(1, t("required")),
        name: z.string().trim().min(1, t("required")),
        phone: z.string().trim().min(1, t("required")),
        documentPrefix: z.enum(DocumentPrefix, t("invalidSelection")),
        documentNumber: z
          .string()
          .trim()
          .min(5, t("documentMinLength"))
          .max(10, t("documentMaxLength"))
          .regex(/^[0-9]+$/, t("numericOnly")),
      }),
    [t],
  )
}

export type INewTransactionForm = z.infer<
  ReturnType<typeof useNewTransactionFormSchema>
>

export const newTransactionFormDefaultValues: INewTransactionForm = {
  bank: BankType.BANESCO,
  reference: "",
  name: "",
  phone: "",
  documentPrefix: DocumentPrefix.Venezuelan,
  documentNumber: "",
}
