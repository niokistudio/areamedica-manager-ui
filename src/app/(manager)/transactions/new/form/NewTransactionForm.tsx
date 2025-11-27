import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { NewTransactionFormContent } from "@/app/(manager)/transactions/new/form/NewTransactionFormContent"
import {
  type INewTransactionForm,
  newTransactionFormDefaultValues,
  useNewTransactionFormSchema,
} from "@/app/(manager)/transactions/new/form/use-new-transaction-form-schema"

export function NewTransactionForm() {
  const schema = useNewTransactionFormSchema()
  const { handleSubmit, ...methods } = useForm({
    defaultValues: newTransactionFormDefaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback((form: INewTransactionForm) => {
    console.log(form)
  }, [])

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <NewTransactionFormContent />
      </form>
    </FormProvider>
  )
}
