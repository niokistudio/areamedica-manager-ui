import { useTranslations } from "next-intl"
import { TransactionBankField } from "@/app/(manager)/transactions/new/form/fields/TransactionBankField"
import { TransactionDocumentField } from "@/app/(manager)/transactions/new/form/fields/TransactionDocumentField"
import { TransactionNameField } from "@/app/(manager)/transactions/new/form/fields/TransactionNameField"
import { TransactionOperationDateField } from "@/app/(manager)/transactions/new/form/fields/TransactionOperationDateField"
import { TransactionPhoneField } from "@/app/(manager)/transactions/new/form/fields/TransactionPhoneField"
import { TransactionReferenceField } from "@/app/(manager)/transactions/new/form/fields/TransactionReferenceField"
import { TransactionTypeField } from "@/app/(manager)/transactions/new/form/fields/TransactionTypeField"
import { Button } from "@/components/ui/Button"

interface NewTransactionFormContentProps {
  isLoading: boolean
}

export function NewTransactionFormContent({
  isLoading,
}: NewTransactionFormContentProps) {
  const t = useTranslations("TransactionsPage.new.form")

  return (
    <div className="flex flex-col gap-8">
      {/* Transaction Information Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t("transactionSection")}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TransactionTypeField />
          <TransactionReferenceField />
          <TransactionBankField />
          <TransactionOperationDateField />
        </div>
      </div>
      {/* Customer Information Section */}
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t("customerSection")}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TransactionNameField />
          <TransactionDocumentField />
          <TransactionPhoneField />
        </div>
      </div>

      <Button
        color="primary"
        type="submit"
        className="self-center"
        isLoading={isLoading}
      >
        {isLoading ? t("submitting") : t("submit")}
      </Button>
    </div>
  )
}
