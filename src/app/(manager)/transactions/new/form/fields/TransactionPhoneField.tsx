import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { SelectFormField } from "@/components/ui/form/SelectFormField"
import { TextFormField } from "@/components/ui/form/TextFormField"
import { PhonePrefix } from "@/types/phone"
import { TransactionType } from "@/types/transactions"

export function TransactionPhoneField() {
  const t = useTranslations()
  const { control } = useFormContext<INewTransactionForm>()
  const transactionType = useWatch<INewTransactionForm>({ name: "type" })

  const options = useMemo(
    () =>
      Object.keys(PhonePrefix).map((key) => ({
        label: key,
        value: PhonePrefix[key as keyof typeof PhonePrefix],
      })),
    [],
  )

  return (
    <div className="flex items-start gap-2">
      <SelectFormField
        aria-label={t("TransactionsPage.new.form.phonePrefixLabel")}
        name="phonePrefix"
        control={control}
        options={options}
        className="max-w-20"
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
        name="phone"
        control={control}
        label={t("TransactionsPage.new.form.phone")}
        placeholder={t("TransactionsPage.new.form.phonePlaceholder")}
        optional={transactionType === TransactionType.Transfer}
      />
    </div>
  )
}
