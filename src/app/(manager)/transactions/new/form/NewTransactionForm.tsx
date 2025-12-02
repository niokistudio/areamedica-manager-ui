import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  mapNewTransactionFormToServer,
  mapServerToNewTransactionForm,
} from "@/app/(manager)/transactions/new/form/NewTransactionForm.utils"
import { NewTransactionFormContent } from "@/app/(manager)/transactions/new/form/NewTransactionFormContent"
import {
  type INewTransactionForm,
  newTransactionFormDefaultValues,
  useNewTransactionFormSchema,
} from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { apiRoutes } from "@/constants/api-routes"
import { axiosClient } from "@/lib/axios/client"
import type { APIError } from "@/types/api"
import type { Transaction } from "@/types/transactions"

interface NewTransactionFormProps {
  transaction?: Transaction
}

export function NewTransactionForm({ transaction }: NewTransactionFormProps) {
  const t = useTranslations("TransactionsPage.new.form")
  const schema = useNewTransactionFormSchema()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, ...methods } = useForm({
    defaultValues: transaction
      ? mapServerToNewTransactionForm(transaction)
      : newTransactionFormDefaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (form: INewTransactionForm) => {
      setIsLoading(true)
      try {
        const response = await axiosClient.post(
          apiRoutes.transactions,
          mapNewTransactionFormToServer(form, transaction),
        )
        addToast({
          title: t("success"),
          severity: "success",
        })
        console.log("Transaction response:", response.data)
      } catch (error) {
        const apiError = error as APIError
        addToast({
          title: apiError.message || t("error"),
          severity: "danger",
          color: "danger",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [t, transaction],
  )

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewTransactionFormContent isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
