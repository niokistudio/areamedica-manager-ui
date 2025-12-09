"use client"

import { addToast } from "@heroui/toast"
import { AlertCircle, ArrowLeft, FileX, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { mutate } from "swr"
import { TransactionCustomerInfo } from "@/app/(manager)/transactions/[id]/components/TransactionCustomerInfo"
import { TransactionDetailsInfo } from "@/app/(manager)/transactions/[id]/components/TransactionDetailsInfo"
import { TransactionPrimaryInfo } from "@/app/(manager)/transactions/[id]/components/TransactionPrimaryInfo"
import { Button } from "@/components/ui/Button"
import { Loader } from "@/components/ui/Loader"
import { apiRoutes } from "@/constants/api-routes"
import { routes } from "@/constants/routes"
import { useTransaction } from "@/hooks/use-transaction"
import { refreshTransaction } from "@/services/transactions.client"
import { TransactionStatus } from "@/types/transactions"

interface TransactionDetailsPageContentProps {
  transactionId: string
}

export function TransactionDetailsPageContent({
  transactionId,
}: TransactionDetailsPageContentProps) {
  const t = useTranslations("TransactionsPage.detail")
  const { transaction, isLoading, error } = useTransaction(transactionId)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = useCallback(async () => {
    try {
      setIsRefreshing(true)

      await refreshTransaction(transactionId)

      // Invalidate both the transaction list and the specific transaction cache
      await Promise.all([
        mutate(apiRoutes.transactions),
        mutate(apiRoutes.transactionById(transactionId)),
      ])

      addToast({
        title: t("refreshSuccess"),
        color: "success",
      })
    } catch (_error) {
      addToast({
        title: t("refreshError"),
        color: "danger",
      })
    } finally {
      setIsRefreshing(false)
    }
  }, [transactionId, t])

  return (
    <div className="h-full flex flex-col pt-2 md:pt-10">
      {/* Back button + Title */}
      <div className="flex items-center justify-between gap-4 mb-6 md:mb-14">
        <div className="flex items-center gap-4">
          <Button
            as={Link}
            href={routes.transactions}
            isIconOnly
            variant="light"
            aria-label={t("backButton")}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
        </div>
        {transaction?.status === TransactionStatus.InProgress && (
          <Button
            type="button"
            variant="light"
            color="primary"
            onPress={handleRefresh}
            isLoading={isRefreshing}
            isDisabled={isRefreshing}
          >
            <RefreshCw className="size-4" />
            {t("actions.update")}
          </Button>
        )}
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

      {/* Transaction Details */}
      {!isLoading && !error && transaction && (
        <div className="max-w-6xl w-full mx-auto space-y-6">
          {/* Primary Information (Amount & Status) */}
          <TransactionPrimaryInfo transaction={transaction} />

          <div className="flex flex-col gap-10">
            {/* Customer Information */}
            <TransactionCustomerInfo transaction={transaction} />

            {/* Transaction Information */}
            <TransactionDetailsInfo transaction={transaction} />
          </div>
        </div>
      )}
    </div>
  )
}
