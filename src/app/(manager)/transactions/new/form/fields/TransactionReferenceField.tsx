import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"
import { TransactionType } from "@/types/transactions"

export function TransactionReferenceField() {
  const t = useTranslations("TransactionsPage.new.form")
  const { control } = useFormContext<INewTransactionForm>()
  const transactionType = useWatch<INewTransactionForm>({ name: "type" })

  const transactionReferencePlaceholderMap = useMemo(
    () => ({
      [TransactionType.Transfer]: t("referencePlaceholder.transfer"),
      [TransactionType.MobilePayment]: t("referencePlaceholder.mobilePayment"),
    }),
    [t],
  )

  return (
    <TextFormField
      name="reference"
      control={control}
      label={t("reference")}
      placeholder={
        transactionReferencePlaceholderMap[transactionType as TransactionType]
      }
    />
  )
}
