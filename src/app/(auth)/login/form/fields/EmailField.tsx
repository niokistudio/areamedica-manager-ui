import { useTranslations } from "next-intl"
import { useFormContext } from "react-hook-form"
import type { ILoginForm } from "@/app/(auth)/login/form/use-login-form-schema"
import { TextFormField } from "@/components/ui/form/TextFormField"

export function EmailField() {
  const t = useTranslations("Auth.LoginPage")
  const { control } = useFormContext<ILoginForm>()

  return (
    <TextFormField
      name="email"
      control={control}
      label={t("email.label")}
      placeholder={t("email.placeholder")}
      type="email"
      autoComplete="username email"
      variant="underlined"
    />
  )
}
