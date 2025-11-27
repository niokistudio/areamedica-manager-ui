import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { SelectFormField } from "@/components/ui/form/SelectFormField"
import { BankType } from "@/types/transactions"

export function TransactionBankField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()
  const options = useMemo(
    () =>
      Object.values(BankType).map((bank) => ({
        label: t(`ITransactions.BankType.${bank}`),
        value: bank,
      })),
    [t],
  )

  return (
    <SelectFormField
      name="bank"
      control={control}
      options={options}
      label={t("TransactionsPage.new.form.bank")}
    />
  )
}
