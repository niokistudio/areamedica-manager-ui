"use client"

import { Chip } from "@heroui/chip"
import { Select, SelectItem } from "@heroui/select"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { statusColorMap, statusIconMap } from "@/constants/transactions"
import { TransactionStatus } from "@/types/transactions"

interface StatusFilterFieldProps {
  value: TransactionStatus | null
  onChange: (status: TransactionStatus | null) => void
  label?: string
}

/**
 * Controlled status filter field for use in forms
 * Unlike direct URL management, this doesn't manage URL state directly
 *
 * Features:
 * - Controlled component (accepts value/onChange props)
 * - Decoupled from URL params
 * - Displays status as a select dropdown with icons and color indicators
 * - Single selection (only one status can be selected at a time)
 * - Reusable in any form context
 *
 * @example
 * ```tsx
 * <StatusFilterField
 *   value={TransactionStatus.InProgress}
 *   onChange={(status) => setStatus(status)}
 * />
 * ```
 */
export function StatusFilterField({
  value,
  onChange,
  label,
}: StatusFilterFieldProps) {
  const t = useTranslations()

  // Handle selection change
  const handleSelectionChange = useCallback(
    (keys: "all" | Set<React.Key>) => {
      if (keys === "all") return

      const selectedKey = Array.from(keys)[0] as TransactionStatus | undefined
      onChange(selectedKey || null)
    },
    [onChange],
  )

  return (
    <Select
      label={label || t("TransactionsPage.toolbar.filters.status")}
      placeholder={t("TransactionsPage.toolbar.filters.status")}
      selectedKeys={value ? new Set([value]) : new Set()}
      onSelectionChange={handleSelectionChange}
      classNames={{
        label: "text-sm font-medium",
      }}
    >
      {Object.values(TransactionStatus).map((status) => {
        const Icon = statusIconMap[status]
        const color = statusColorMap[status]

        return (
          <SelectItem
            key={status}
            startContent={
              <div className="flex items-center gap-2">
                <Chip
                  size="sm"
                  color={color}
                  variant="flat"
                  className="h-5 w-5 min-w-5 p-0 items-center justify-center"
                >
                  <Icon className="size-4" />
                </Chip>
              </div>
            }
          >
            {t(`ITransactions.TransactionStatus.${status}`)}
          </SelectItem>
        )
      })}
    </Select>
  )
}
