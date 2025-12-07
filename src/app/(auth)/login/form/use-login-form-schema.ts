import { useTranslations } from "next-intl"
import { useMemo } from "react"
import z from "zod"

export function useLoginFormSchema() {
  const t = useTranslations("SchemaValidations")

  return useMemo(
    () =>
      z.object({
        email: z.email(t("invalidEmail")).trim().min(1, t("required")),
        password: z.string().trim().min(1, t("required")),
      }),
    [t],
  )
}

export type ILoginForm = z.infer<ReturnType<typeof useLoginFormSchema>>

export const loginFormDefaultValues: ILoginForm = {
  email: "",
  password: "",
}
