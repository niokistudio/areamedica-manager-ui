"use client"

import { Button } from "@heroui/button"
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal"
import { useTranslations } from "next-intl"
import { useConfirmDialogStore } from "@/stores/useConfirmDialogStore"

export function ConfirmDialog() {
  const t = useTranslations("ConfirmDialog")
  const { isOpen, options, confirm, cancel, closeDialog } =
    useConfirmDialogStore()

  if (!options) return null

  const {
    title,
    description,
    confirmText = t("confirm"),
    cancelText = t("cancel"),
    confirmColor = "primary",
    cancelVariant = "light",
  } = options

  const handleConfirm = () => {
    confirm()
  }

  const handleCancel = () => {
    cancel()
  }

  return (
    <Modal isOpen={isOpen} onClose={closeDialog} backdrop="opaque">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>
          <p className="text-foreground">{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant={cancelVariant} onPress={handleCancel}>
            {cancelText}
          </Button>
          <Button color={confirmColor} onPress={handleConfirm} autoFocus>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
