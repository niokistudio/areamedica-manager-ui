import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"

export function TransactionNameField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()

  return (
    <TextFormField
      name="name"
      control={control}
      label={t("TransactionsPage.new.form.name")}
      placeholder={t("TransactionsPage.new.form.namePlaceholder")}
    />
  )
}
