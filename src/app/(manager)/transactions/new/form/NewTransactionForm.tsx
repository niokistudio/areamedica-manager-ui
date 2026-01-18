import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import {
  mapNewTransactionFormToFullReference,
  mapNewTransactionFormToPartialReference,
  mapServerToNewTransactionForm,
} from "@/app/(manager)/transactions/new/form/NewTransactionForm.utils"
import { NewTransactionFormContent } from "@/app/(manager)/transactions/new/form/NewTransactionFormContent"
import {
  type INewTransactionForm,
  newTransactionFormDefaultValues,
  useNewTransactionFormSchema,
} from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"
import { routes } from "@/constants/routes"
import {
  createFullReferenceTransaction,
  createPartialReferenceTransaction,
} from "@/services/transactions.client"
import { type Transaction, TransactionType } from "@/types/transactions"

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

  const createTransactions = useCallback((form: INewTransactionForm) => {
    if (form.type === TransactionType.Transfer) {
      return createFullReferenceTransaction(
        mapNewTransactionFormToFullReference(form),
      )
    }
    return createPartialReferenceTransaction(
      mapNewTransactionFormToPartialReference(form),
    )
  }, [])

  const onSubmit = useCallback(
    async (form: INewTransactionForm) => {
      setIsLoading(true)
      try {
        const response = await createTransactions(form)
        addToast({
          title: t("success"),
          severity: "success",
        })
        router.push(routes.transactionDetail(response.data.id))
      } catch (error) {
        const responseError = error as AxiosError<{
          error: {
            code: string
            details?: {
              existing_transaction_id: string
              reference: string
            }
            message: string
          }
        }>
        const isAlreadyInUse =
          responseError.status === 422 &&
          responseError.response?.data?.error?.code === "DUPLICATE_REFERENCE"

        const errorMessage = isAlreadyInUse
          ? t("duplicateReference")
          : t("error")

        const details = responseError.response?.data?.error?.details
        const duplicateDescription =
          isAlreadyInUse && details ? (
            <Link
              href={routes.transactionDetail(details.existing_transaction_id)}
              className="underline"
            >
              {t("duplicateReferenceLink", { reference: details.reference })}
            </Link>
          ) : undefined

        addToast({
          title: errorMessage,
          description:
            duplicateDescription ||
            responseError.response?.data?.error?.message,
          severity: isAlreadyInUse ? "warning" : "danger",
          color: isAlreadyInUse ? "warning" : "danger",
          timeout: isAlreadyInUse ? Infinity : undefined,
        })
      } finally {
        setIsLoading(false)
      }
    },
    [t, router, createTransactions],
  )

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewTransactionFormContent isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
