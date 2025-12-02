"use client"

import { Card, CardBody } from "@heroui/card"
import { AlertCircle, ArrowLeft, FileX } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { NewTransactionForm } from "@/app/(manager)/transactions/new/form/NewTransactionForm"
import { Button } from "@/components/ui/Button"
import { Loader } from "@/components/ui/Loader"
import { useTransaction } from "@/hooks/use-transaction"

interface EditTransactionPageContentProps {
  transactionId: string
}

export function EditTransactionPageContent({
  transactionId,
}: EditTransactionPageContentProps) {
  const t = useTranslations("TransactionsPage.edit")
  const { transaction, isLoading, error } = useTransaction(transactionId)

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

      {/* Loading State */}
      {isLoading && (
        <Loader label={t("loading")} size="lg" className="text-lg" />
      )}

      {/* Error State */}
      {error && error.status !== 404 && !isLoading && (
        <div className="flex flex-col items-center text-center gap-2">
          <AlertCircle className="size-10 text-danger" />
          <h2 className="text-xl font-semibold text-danger">{t("error")}</h2>
          <p className="text-muted-foreground">{t("errorDescription")}</p>
        </div>
      )}

      {/* Not Found State */}
      {!isLoading && ((!error && !transaction) || error?.status === 404) && (
        <div className="flex flex-col items-center text-center gap-2">
          <FileX className="size-10 text-primary" />
          <h2 className="text-xl font-semibold">{t("notFound")}</h2>
          <p className="text-muted-foreground">{t("notFoundDescription")}</p>
        </div>
      )}

      {!isLoading && !error && transaction && (
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
            <NewTransactionForm transaction={transaction} />
          </CardBody>
        </Card>
      )}
    </div>
  )
}
