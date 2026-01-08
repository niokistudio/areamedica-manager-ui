import { useTranslations } from "next-intl"
import { useEffect, useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { AutocompleteFormField } from "@/components/ui/form/AutocompleteFormField"
import { VenezuelanBankMap } from "@/types/banks"
import { TransactionType } from "@/types/transactions"

export function TransactionBankField() {
  const t = useTranslations()
  const { control, setValue } = useFormContext<INewTransactionForm>()
  const transactionType = useWatch<INewTransactionForm>({ name: "type" })

  const options = useMemo(() => {
    // Create an array of entries from VenezuelanBankMap
    // Sort alphabetically by label
    return Object.entries(VenezuelanBankMap)
      .map(([key, value]) => ({
        value: key,
        label: `${key} - ${value}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [])

  useEffect(() => {
    if (transactionType !== TransactionType.MobilePayment) {
      setValue("bank", "")
    }
  }, [transactionType, setValue])

  // Only show the bank field for MobilePayment
  if (transactionType !== TransactionType.MobilePayment) {
    return null
  }

  return (
    <AutocompleteFormField
      name="bank"
      control={control}
      label={t("TransactionsPage.new.form.bank")}
      placeholder={t("TransactionsPage.new.form.bankPlaceholder")}
      options={options}
    />
  )
}
