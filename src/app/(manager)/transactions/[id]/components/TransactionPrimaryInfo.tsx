import { Card, CardBody } from "@heroui/card"
import { Chip } from "@heroui/chip"
import { useTranslations } from "next-intl"
import { useMemo } from "react"
import { statusColorMap, statusIconMap } from "@/constants/transactions"
import type { Transaction } from "@/types/transactions"
import { formatCurrency } from "@/utils/numbers"

interface TransactionPrimaryInfoProps {
  transaction: Transaction
}

export function TransactionPrimaryInfo({
  transaction,
}: TransactionPrimaryInfoProps) {
  const t = useTranslations("TransactionsPage.detail")
  const tStatus = useTranslations("ITransactions.TransactionStatus")

  // Map status to Chip color
  const Icon = useMemo(
    () => statusIconMap[transaction.status],
    [transaction.status],
  )

  // Get amount from transaction level or fallback to details
  const amount = useMemo(
    () =>
      transaction.amount
        ? Number.parseFloat(transaction.amount)
        : transaction.details?.amount,
    [transaction.amount, transaction.details?.amount],
  )

  return (
    <div className="flex flex-col justify-center items-center gap-6">
      {/* Amount - Large and prominent */}
      {amount && <p className="text-4xl font-bold">{formatCurrency(amount)}</p>}

      {/* Status - Chip badge */}
      <Card shadow="sm">
        <CardBody className="py-6 px-8">
          <p className="text-sm text-muted-foreground mb-2">
            {t("statusLabel")}
          </p>
          <Chip
            color={statusColorMap[transaction.status]}
            variant="light"
            className="text-3xl"
            classNames={{ content: "font-medium" }}
            startContent={Icon ? <Icon className="size-8" /> : null}
          >
            {tStatus(transaction.status)}
          </Chip>
        </CardBody>
      </Card>
    </div>
  )
}
