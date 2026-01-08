import { useTranslations } from "next-intl"
import type { Transaction } from "@/types/transactions"

import { formatDocument } from "@/utils/document"
import { formatPhone } from "@/utils/phone"

interface TransactionCustomerInfoProps {
  transaction: Transaction
}

export function TransactionCustomerInfo({
  transaction,
}: TransactionCustomerInfoProps) {
  const t = useTranslations("TransactionsPage.detail.customer")

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold">{t("title")}</h2>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
        {/* Customer Name */}
        <div>
          <p className="text-sm text-muted-foreground">{t("name")}</p>
          <p className="text-base font-medium">
            {transaction.customer_full_name}
          </p>
        </div>

        {/* Customer Phone */}
        <div>
          <p className="text-sm text-muted-foreground">{t("phone")}</p>
          <p className="text-base font-medium">
            {formatPhone(transaction.customer_phone) || "-"}
          </p>
        </div>

        {/* Customer National ID */}
        <div>
          <p className="text-sm text-muted-foreground">{t("nationalId")}</p>
          <p className="text-base font-medium">
            {formatDocument(transaction.customer_document) || "-"}
          </p>
        </div>
      </div>
    </div>
  )
}
