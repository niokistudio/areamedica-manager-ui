import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { SelectFormField } from "@/components/ui/form/SelectFormField"
import { TransactionType } from "@/types/transactions"

export function TransactionTypeField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()
  const options = useMemo(
    () =>
      Object.values(TransactionType).map((type) => ({
        label: t(`ITransactions.TransactionType.${type}`),
        value: type,
      })),
    [t],
  )

  return (
    <SelectFormField
      name="type"
      control={control}
      options={options}
      label={t("TransactionsPage.new.form.bank")}
    />
  )
}
