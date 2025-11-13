"use client"

import { Card, CardBody } from "@heroui/card"
import { useTranslations } from "next-intl"
import { LoginForm } from "./LoginForm"

export function LoginPageContent() {
  const t = useTranslations("Auth.LoginPage")

  return (
    <div className="h-full flex flex-col items-center justify-center gap-10">
      <h1 className="text-3xl md:text-4xl text-center font-bold">
        {t("title")}
      </h1>
      <Card className="w-full max-w-sm">
        <CardBody className="p-4 md:p-8">
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  )
}
