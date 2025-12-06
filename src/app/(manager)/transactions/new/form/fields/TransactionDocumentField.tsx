import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { SelectFormField } from "@/components/ui/form/SelectFormField"
import { TextFormField } from "@/components/ui/form/TextFormField"
import { DocumentPrefix } from "@/types/document"

export function TransactionDocumentField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()
  const options = useMemo(
    () =>
      Object.values(DocumentPrefix).map((prefix) => ({
        label: t(`ITransactions.DocumentPrefix.${prefix}`),
        value: prefix,
      })),
    [t],
  )

  return (
    <div className="flex items-start gap-2">
      <SelectFormField
        aria-label={t("TransactionsPage.new.form.documentPrefixLabel")}
        name="documentPrefix"
        control={control}
        options={options}
        className="max-w-16"
        classNames={{
          innerWrapper: "w-fit",
          trigger: "h-12",
        }}
        popoverProps={{
          className: "w-52",
        }}
        renderValue={(items) =>
          Array.from(items.values()).map((item) => item.key)
        }
      />
      <TextFormField
        name="documentNumber"
        control={control}
        label={t("TransactionsPage.new.form.documentNumber")}
      />
    </div>
  )
}
