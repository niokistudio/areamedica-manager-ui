"use client"

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"
import { Printer } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { TransactionReceiptPrint } from "@/components/transactions/TransactionReceiptPrint"
import { Button } from "@/components/ui/Button"
import { useReceiptPrintStore } from "@/stores/useReceiptPrintStore"

export function TransactionReceiptModal() {
  const t = useTranslations("TransactionReceipt.modal")
  const isOpen = useReceiptPrintStore((state) => state.isOpen)
  const transaction = useReceiptPrintStore((state) => state.transaction)
  const closeModal = useReceiptPrintStore((state) => state.closeModal)

  const componentRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `Comprobante-${transaction?.reference || "transaction"}`,
  })

  const onPrint = useCallback(() => {
    handlePrint()
  }, [handlePrint])

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{t("title")}</ModalHeader>
        <ModalBody>
          <div ref={componentRef}>
            {transaction && (
              <TransactionReceiptPrint transaction={transaction} />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={closeModal}>
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            onPress={onPrint}
            startContent={<Printer className="size-4" />}
          >
            {t("print")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
