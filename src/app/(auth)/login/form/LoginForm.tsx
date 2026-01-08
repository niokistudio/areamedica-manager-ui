"use client"

import { addToast } from "@heroui/toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"
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

export function LoginForm() {
  const t = useTranslations("Auth.LoginPage")
  const schema = useLoginFormSchema()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)

  const { handleSubmit, ...methods } = useForm({
    defaultValues: loginFormDefaultValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = useCallback(
    async (form: ILoginForm) => {
      setIsLoading(true)
      try {
        const result = await signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: false,
        })

        if (result?.error) {
          addToast({
            title: t("error"),
            severity: "danger",
            color: "danger",
          })
          return
        }

        // Redirect to the page user was trying to access, or transactions
        const redirectTo = searchParams.get("redirect") || routes.transactions
        router.push(redirectTo)
        router.refresh() // Refresh server components
      } catch (error) {
        console.error("Login error:", error)
        addToast({
          title: t("error"),
          severity: "danger",
          color: "danger",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [t, router, searchParams],
  )

  return (
    <FormProvider handleSubmit={handleSubmit} {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on">
        <LoginFormContent isLoading={isLoading} />
      </form>
    </FormProvider>
  )
}
