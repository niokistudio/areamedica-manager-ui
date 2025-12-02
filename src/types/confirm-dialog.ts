export interface ConfirmDialogOptions {
  /**
   * Dialog title
   */
  title: string

  /**
   * Dialog description/message
   */
  description: string

  /**
   * Confirm button text
   * @default "Confirmar"
   */
  confirmText?: string

  /**
   * Cancel button text
   * @default "Cancelar"
   */
  cancelText?: string

  /**
   * Confirm button color
   * @default "primary"
   */
  confirmColor?: "primary" | "secondary" | "success" | "warning" | "danger"

  /**
   * Cancel button variant
   * @default "light"
   */
  cancelVariant?: "solid" | "light" | "flat" | "bordered" | "ghost"
}

export interface ConfirmDialogState {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean

  /**
   * Dialog configuration options
   */
  options: ConfirmDialogOptions | null

  /**
   * Promise resolver for confirm action
   */
  resolver: ((value: boolean) => void) | null
}
