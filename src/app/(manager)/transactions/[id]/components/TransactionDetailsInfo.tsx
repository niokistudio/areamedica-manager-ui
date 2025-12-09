import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { Button } from "@/components/ui/Button";
import { useReceiptPrint } from "@/hooks/useReceiptPrint";
import { type Transaction, TransactionStatus } from "@/types/transactions";
import { formatDate } from "@/utils/dates";

interface TransactionDetailsInfoProps {
  transaction: Transaction;
}

export function TransactionDetailsInfo({
  transaction,
}: TransactionDetailsInfoProps) {
  const t = useTranslations("TransactionsPage.detail");
  const tType = useTranslations("ITransactions.TransactionType");
  const { openReceiptModal } = useReceiptPrint();

  const handleDownload = useCallback(() => {
    openReceiptModal(transaction);
  }, [transaction, openReceiptModal]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">{t("info.title")}</h2>
        {transaction.status === TransactionStatus.Completed && (
          <Button
            type="button"
            variant="light"
            color="primary"
            onPress={handleDownload}
          >
            <Download className="size-4" />
            {t("actions.download")}
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Reference */}
        <div>
          <p className="text-sm text-muted-foreground">{t("info.reference")}</p>
          <p className="text-base font-medium">{transaction.reference}</p>
        </div>

        {/* Type */}
        <div>
          <p className="text-sm text-muted-foreground">{t("info.type")}</p>
          <p className="text-base font-medium">{tType(transaction.type)}</p>
        </div>

        {/* Transaction Date */}
        {transaction.details?.trnDate && (
          <div>
            <p className="text-sm text-muted-foreground">
              {t("info.createdAt")}
            </p>
            <p className="text-base font-medium">
              {formatDate(transaction.details.trnDate, "es-VE", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
        )}

        {/* Updated At */}
        <div>
          <p className="text-sm text-muted-foreground">{t("info.updatedAt")}</p>
          <p className="text-base font-medium">
            {formatDate(transaction.updated_at, "es-VE", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        {/* Concept */}
        {(transaction.concept || transaction.details?.concept) && (
          <div className="col-span-2">
            <p className="text-sm text-muted-foreground">{t("info.concept")}</p>
            <p className="text-base font-medium">
              {(transaction.concept || transaction.details?.concept)?.trim()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
