import { useCallback } from "react"
import { useConfirmDialogStore } from "@/stores/useConfirmDialogStore"
import type { ConfirmDialogOptions } from "@/types/confirm-dialog"

/**
 * Hook for showing confirmation dialogs
 *
 * @returns Object with confirm function
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { confirm } = useConfirmDialog()
 *
 *   const handleDelete = async () => {
 *     try {
 *       await confirm({
 *         title: 'Eliminar elemento',
 *         description: '¿Estás seguro?',
 *         confirmColor: 'danger'
 *       })
 *       // User confirmed - proceed with deletion
 *       await deleteItem()
 *     } catch {
 *       // User cancelled - do nothing
 *     }
 *   }
 * }
 * ```
 */
export function useConfirmDialog() {
  const openDialog = useConfirmDialogStore((state) => state.openDialog)

  const confirm = useCallback(
    async (options: ConfirmDialogOptions): Promise<boolean> => {
      const result = await openDialog(options)
      if (!result) {
        // Reject the promise if user cancelled
        throw new Error("User cancelled")
      }
      return result
    },
    [openDialog],
  )

  return { confirm }
}
