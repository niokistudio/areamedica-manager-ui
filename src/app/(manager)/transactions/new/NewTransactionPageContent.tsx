"use client"

import { Card, CardBody } from "@heroui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { NewTransactionForm } from "@/app/(manager)/transactions/new/form/NewTransactionForm"
import { Button } from "@/components/ui/Button"

export function NewTransactionPageContent() {
  const t = useTranslations("TransactionsPage.new")

  return (
    <div className="h-full flex flex-col pt-2 md:pt-10">
      <div className="flex items-center gap-4 mb-6 md:mb-14">
        <Button
          as={Link}
          href="/transactions"
          isIconOnly
          variant="light"
          aria-label={t("backButton")}
        >
          <ArrowLeft className="size-5" />
        </Button>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
      </div>

      <Card
        className="max-w-4xl w-full mx-auto"
        aria-label={t("card.label")}
        aria-describedby="transaction-form-description"
      >
        <CardBody className="p-6">
          <p
            id="transaction-form-description"
            className="mb-6 text-muted-foreground"
          >
            {t("card.description")}
          </p>
          <NewTransactionForm />
        </CardBody>
      </Card>
    </div>
  )
}
