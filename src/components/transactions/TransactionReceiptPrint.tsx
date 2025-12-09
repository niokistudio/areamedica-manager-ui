import { Chip } from "@heroui/chip";
import { useTranslations } from "next-intl";
import Logo from "@/assets/logo/logo-areamedica.svg";
import { statusColorMap, statusIconMap } from "@/constants/transactions";
import type { Transaction } from "@/types/transactions";
import { formatDate } from "@/utils/dates";
import { formatDocument } from "@/utils/document";
import { formatCurrency } from "@/utils/numbers";

interface TransactionReceiptPrintProps {
  transaction: Transaction;
}

export function TransactionReceiptPrint({
  transaction,
}: TransactionReceiptPrintProps) {
  const tReceipt = useTranslations("TransactionReceipt.receipt");
  const tCustomer = useTranslations("TransactionsPage.detail.customer");
  const tInfo = useTranslations("TransactionsPage.detail.info");
  const tStatus = useTranslations("ITransactions.TransactionStatus");
  const tType = useTranslations("ITransactions.TransactionType");

  const StatusIcon = statusIconMap[transaction.status];

  return (
    <div className="receipt-print-root bg-white p-8 max-w-[794px] mx-auto">
      {/* Header Section */}
      <div className="receipt-print-section text-center mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-center mb-4">
          <Logo className="text-primary h-12 flex-shrink-0" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {tReceipt("title")}
        </h2>
      </div>

      {/* Amount and Status Section */}
      <div className="receipt-print-section text-center mb-8 pb-6 border-b-2 border-gray-200">
        <p className="text-sm text-muted-foreground mb-2">
          {tReceipt("amount")}
        </p>
        {transaction.details?.amount && (
          <p className="text-5xl font-bold text-foreground mb-4">
            {formatCurrency(transaction.details?.amount)}
          </p>
        )}
        <div className="flex justify-center">
          <Chip
            color={statusColorMap[transaction.status]}
            startContent={<StatusIcon className="size-5" />}
            classNames={{ content: "font-semibold" }}
            className="receipt-print-color px-4"
            variant="flat"
            size="lg"
          >
            {tStatus(transaction.status)}
          </Chip>
        </div>
      </div>

      {/* Customer Information Section */}
      <div className="receipt-print-section mb-8 pb-6 border-b-2 border-gray-200">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {tReceipt("customer")}
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {tCustomer("name")}
            </p>
            <p className="text-base font-medium text-foreground">
              {transaction.customer_full_name}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {tCustomer("nationalId")}
            </p>
            <p className="text-base font-medium text-foreground">
              {formatDocument(transaction.customer_document)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {tCustomer("phone")}
            </p>
            <p className="text-base font-medium text-foreground">
              {transaction.customer_phone}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details Section */}
      <div className="receipt-print-section mb-8 pb-6 border-b-2 border-gray-200">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {tReceipt("details")}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {tInfo("reference")}
            </p>
            <p className="text-base font-medium text-foreground">
              {transaction.reference}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              {tInfo("type")}
            </p>
            <p className="text-base font-medium text-foreground">
              {tType(transaction.type)}
            </p>
          </div>
          {transaction.details?.trnDate && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {tInfo("createdAt")}
              </p>
              <p className="text-base font-medium text-foreground">
                {formatDate(transaction.details.trnDate)}
              </p>
            </div>
          )}
          {transaction.details?.concept && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {tInfo("concept")}
              </p>
              <p className="text-base font-medium text-foreground">
                {transaction.details.concept}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="receipt-print-section text-center">
        <p className="text-xs text-muted-foreground mb-2">
          {tReceipt("footer.generated")} {formatDate(new Date().toISOString())}
        </p>
        <p className="text-xs text-muted-foreground italic">
          {tReceipt("footer.disclaimer")}
        </p>
      </div>
    </div>
  );
}
