"use client"

import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { LoginFormContent } from "@/app/(auth)/login/form/LoginFormContent"
import {
  type ILoginForm,
  loginFormDefaultValues,
  useLoginFormSchema,
} from "@/app/(auth)/login/form/use-login-form-schema"
import { routes } from "@/constants/routes"
import { loginUser } from "@/services/auth.client"
import type { APIError } from "@/types/api"

export function LoginForm() {
  const t = useTranslations("Auth.LoginPage")
  const schema = useLoginFormSchema()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, ...methods } = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (form: ILoginForm) => {
      setIsLoading(true)
      try {
        await loginUser({ email: form.email, password: form.password })
        // AuthProvider handles redirect to /transactions
        addToast({
          title: t("success"),
          severity: "success",
        })
        // Redirect to manager page
        router.push(routes.transactions)
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
    [t, router],
  )

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginFormContent isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
