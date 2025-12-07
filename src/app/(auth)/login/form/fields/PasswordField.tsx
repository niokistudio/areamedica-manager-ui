import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import type { ILoginForm } from "@/app/(auth)/login/form/use-login-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"

export function PasswordField() {
  const t = useTranslations("Auth.LoginPage")
  const { control } = useFormContext<ILoginForm>()

  return (
    <TextFormField
      name="password"
      control={control}
      label={t("password.label")}
      placeholder={t("password.placeholder")}
      type="password"
      autoComplete="current-password"
      variant="underlined"
    />
  )
}
