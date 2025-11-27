import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"

export function TransactionPhoneField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()

  return (
    <TextFormField
      name="phone"
      control={control}
      label={t("TransactionsPage.new.form.phone")}
    />
  )
}
