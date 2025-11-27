import { useTranslations } from "next-intl"
import { TransactionBankField } from "@/app/(manager)/transactions/new/form/fields/TransactionBankField"
import { TransactionDocumentField } from "@/app/(manager)/transactions/new/form/fields/TransactionDocumentField"
import { TransactionNameField } from "@/app/(manager)/transactions/new/form/fields/TransactionNameField"
import { TransactionPhoneField } from "@/app/(manager)/transactions/new/form/fields/TransactionPhoneField"
import { TransactionReferenceField } from "@/app/(manager)/transactions/new/form/fields/TransactionReferenceField"
import { Button } from "@/components/ui/Button"

export function NewTransactionFormContent() {
  const t = useTranslations("TransactionsPage.new.form")

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <TransactionBankField />
        <TransactionReferenceField />
        <TransactionNameField />
        <TransactionDocumentField />
        <TransactionPhoneField />
      </div>
      <Button color="primary" type="submit" className="self-center">
        {t("submit")}
      </Button>
    </div>
  )
}
