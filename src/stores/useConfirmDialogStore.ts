import { create } from "zustand"
import type {
  ConfirmDialogOptions,
  ConfirmDialogState,
} from "@/types/confirm-dialog"

interface ConfirmDialogActions {
  /**
   * Open the confirmation dialog with the given options
   * Returns a promise that resolves with true (confirm) or false (cancel)
   */
  openDialog: (options: ConfirmDialogOptions) => Promise<boolean>

  /**
   * Close the dialog
   */
  closeDialog: () => void

  /**
   * Confirm the action
   */
  confirm: () => void

  /**
   * Cancel the action
   */
  cancel: () => void
}

type ConfirmDialogStore = ConfirmDialogState & ConfirmDialogActions

const initialState: ConfirmDialogState = {
  isOpen: false,
  options: null,
  resolver: null,
}

export const useConfirmDialogStore = create<ConfirmDialogStore>((set, get) => ({
  ...initialState,

  openDialog: (options: ConfirmDialogOptions) => {
    return new Promise<boolean>((resolve) => {
      set({
        isOpen: true,
        options,
        resolver: resolve,
      })
    })
  },

  closeDialog: () => {
    const { resolver } = get()
    // If dialog is closed without confirmation, resolve with false
    if (resolver) {
      resolver(false)
    }
    set(initialState)
  },

  confirm: () => {
    const { resolver } = get()
    if (resolver) {
      resolver(true)
    }
    set(initialState)
  },

  cancel: () => {
    const { resolver } = get()
    if (resolver) {
      resolver(false)
    }
    set(initialState)
  },
}))
