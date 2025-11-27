"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/Button"

export function NewTransactionPageContent() {
  const t = useTranslations("TransactionsPage.new")

  return (
    <div className="h-full flex flex-col pt-10">
      <div className="flex items-center gap-4 mb-14">
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

      <div className="flex flex-col gap-6">
        {/* Placeholder for form */}
        <div className="bg-default-100 rounded-lg p-8 text-center">
          <p className="text-default-500">{t("placeholder")}</p>
        </div>
      </div>
    </div>
  )
}
