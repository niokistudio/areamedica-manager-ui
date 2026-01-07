"use client"

import { useTranslations } from "next-intl"
import { useCallback, useEffect, useState } from "react"
import { Button } from "@/components/ui/Button"
import type { TransactionStatus } from "@/types/transactions"
import { DateRangeFilterField } from "./DateRangeFilterField"
import { StatusFilterField } from "./StatusFilterField"

interface FiltersFormProps {
  initialValues: {
    fromDate: string | null
    toDate: string | null
    status: TransactionStatus | null
  }
  onApply: (filters: FiltersFormProps["initialValues"]) => void
  onReset: () => void
  onCancel: () => void
}

/**
 * Filters form component with pending state management
 *
 * Features:
 * - Manages pending filter state before Apply is clicked
 * - Syncs with initialValues when URL params change
 * - Three action buttons: Cancel, Reset, Apply
 * - Clean, organized layout
 *
 * @example
 * ```tsx
 * <FiltersForm
 *   initialValues={{ fromDate: "2024-01-01", toDate: "2024-01-31" }}
 *   onApply={(filters) => setDateRange(filters.fromDate, filters.toDate)}
 *   onReset={() => resetFilters()}
 *   onCancel={() => setIsOpen(false)}
 * />
 * ```
 */
export function FiltersForm({
  initialValues,
  onApply,
  onReset,
  onCancel,
}: FiltersFormProps) {
  const t = useTranslations("TransactionsPage.toolbar.filters")
  const [pendingFilters, setPendingFilters] = useState(initialValues)

  // Sync with initialValues when they change (e.g., browser back/forward, external filter changes)
  useEffect(() => {
    setPendingFilters(initialValues)
  }, [initialValues])

  // Handle Apply button click
  const handleApply = useCallback(() => {
    onApply(pendingFilters)
  }, [pendingFilters, onApply])

  // Handle date range change
  const handleDateRangeChange = useCallback(
    (from: string | null, to: string | null) => {
      setPendingFilters((prev) => ({ ...prev, fromDate: from, toDate: to }))
    },
    [],
  )

  // Handle status change
  const handleStatusChange = useCallback(
    (newStatus: TransactionStatus | null) => {
      setPendingFilters((prev) => ({ ...prev, status: newStatus }))
    },
    [],
  )

  return (
    <div className="flex min-w-sm flex-col gap-4 p-4">
      <h3 className="text-lg font-semibold">{t("popoverTitle")}</h3>

      {/* Date Range Filter Field */}
      <DateRangeFilterField
        value={pendingFilters}
        onChange={handleDateRangeChange}
      />

      {/* Status Filter Field */}
      <StatusFilterField
        value={pendingFilters.status}
        onChange={handleStatusChange}
      />

      {/* Action Buttons */}
      <div className="flex justify-between gap-2">
        <Button size="sm" variant="light" onPress={onCancel}>
          {t("cancel")}
        </Button>
        <div className="flex gap-2">
          <Button size="sm" variant="light" color="primary" onPress={onReset}>
            {t("reset")}
          </Button>
          <Button size="sm" color="primary" onPress={handleApply}>
            {t("apply")}
          </Button>
        </div>
      </div>
    </div>
  )
}
