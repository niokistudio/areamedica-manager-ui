import { useTranslations } from "next-intl"
import { EmailField } from "@/app/(auth)/login/form/fields/EmailField"
import { PasswordField } from "@/app/(auth)/login/form/fields/PasswordField"
import { Button } from "@/components/ui/Button"

interface LoginFormContentProps {
  isLoading: boolean
}

export function LoginFormContent({ isLoading }: LoginFormContentProps) {
  const t = useTranslations("Auth.LoginPage")

  return (
    <div className="flex flex-col gap-6">
      <EmailField />
      <PasswordField />

      <Button
        type="submit"
        color="primary"
        isLoading={isLoading}
        className="self-center"
      >
        {isLoading ? t("submitting") : t("submit")}
      </Button>
    </div>
  )
}
