import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
import { routes } from "@/constants/routes"
import { createTransaction } from "@/services/transactions.client"
import type { APIError } from "@/types/api"
import type { Transaction } from "@/types/transactions"

interface NewTransactionFormProps {
  transaction?: Transaction
}

export function NewTransactionForm({ transaction }: NewTransactionFormProps) {
  const t = useTranslations("TransactionsPage.new.form")
  const schema = useNewTransactionFormSchema()
  const router = useRouter()
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
        const response = await createTransaction(
          mapNewTransactionFormToServer(form),
        )
        addToast({
          title: t("success"),
          severity: "success",
        })
        router.push(routes.transactionDetail(response.data.id))
      } catch (error) {
        const apiError = error as APIError
        const isAlreadyInUse = apiError.status === 422
        const errorMessage = isAlreadyInUse
          ? t("duplicateReference")
          : apiError.message || t("error")
        addToast({
          title: errorMessage,
          severity: "danger",
          color: "danger",
          timeout: isAlreadyInUse ? Infinity : undefined,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [t, router],
  )

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewTransactionFormContent isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
