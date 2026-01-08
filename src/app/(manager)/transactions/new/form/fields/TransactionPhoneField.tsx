import { useTranslations } from "next-intl"
import { useFormContext, useWatch } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"
import { TransactionType } from "@/types/transactions"

export function TransactionPhoneField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()
  const transactionType = useWatch<INewTransactionForm>({ name: "type" })

  return (
    <TextFormField
      name="phone"
      control={control}
      label={t("TransactionsPage.new.form.phone")}
      optional={transactionType === TransactionType.Transfer}
    />
  )
}
