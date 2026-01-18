"use client"

import { getLocalTimeZone, today } from "@internationalized/date"
import { useTranslations } from "next-intl"
import { useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import type { INewTransactionForm } from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { DatePickerFormField } from "@/components/ui/form/DatePickerFormField"
import { TransactionType } from "@/types/transactions"

export function TransactionOperationDateField() {
  const t = useTranslations()
  const { control, setValue } = useFormContext<INewTransactionForm>()
  const transactionType = useWatch<INewTransactionForm>({ name: "type" })

  useEffect(() => {
    if (transactionType !== TransactionType.MobilePayment) {
      setValue("operationDate", null)
    }
  }, [transactionType, setValue])

  // Only show the operation date field for MobilePayment
  if (transactionType !== TransactionType.MobilePayment) {
    return null
  }

  return (
    <DatePickerFormField
      name="operationDate"
      control={control}
      label={t("TransactionsPage.new.form.operationDate")}
      maxValue={today(getLocalTimeZone())}
      showMonthAndYearPickers
    />
  )
}