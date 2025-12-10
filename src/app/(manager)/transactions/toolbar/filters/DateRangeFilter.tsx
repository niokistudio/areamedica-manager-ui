"use client"

import { DateRangePicker } from "@heroui/date-picker"
import { parseDate } from "@internationalized/date"
import type { DateValue } from "@react-types/datepicker"
import { useTranslations } from "next-intl"
import { useCallback } from "react"
import { usePaginationParams } from "@/hooks/use-pagination-params"

interface RangeValue<T> {
  /** The start value of the range. */
  start: T
  /** The end value of the range. */
  end: T
}

/**
 * Date range filter component for transactions toolbar
 * Modular component that manages date range filtering via URL params
 *
 * Features:
 * - HeroUI DateRangePicker integration
 * - Automatic URL sync via usePaginationParams
 * - Internationalized labels
 * - Clear functionality
 *
 * @example
 * ```tsx
 * <DateRangeFilter />
 * ```
 */
export function DateRangeFilter() {
  const t = useTranslations("TransactionsPage.toolbar.filters")
  const { fromDate, toDate, setDateRange } = usePaginationParams()

  // Convert URL date strings to DateValue objects for the picker
  const dateRangeValue: RangeValue<DateValue> | null = (() => {
    if (!fromDate || !toDate) return null

    try {
      return {
        start: parseDate(fromDate),
        end: parseDate(toDate),
      }
    } catch {
      // Invalid date format
      return null
    }
  })()

  // Handle date range change
  const handleChange = useCallback(
    (value: RangeValue<DateValue> | null) => {
      if (!value) {
        // Clear date range
        setDateRange(null, null)
        return
      }

      // Convert DateValue to ISO string format (YYYY-MM-DD)
      const from = value.start?.toString() || null
      const to = value.end?.toString() || null

      setDateRange(from, to)
    },
    [setDateRange],
  )

  return (
    <DateRangePicker
      label={t("dateRange")}
      value={dateRangeValue}
      onChange={handleChange}
      className="max-w-xs"
      classNames={{
        base: "w-full",
      }}
      showMonthAndYearPickers
      visibleMonths={2}
      pageBehavior="single"
      labelPlacement="outside"
      selectorButtonPlacement="start"
    />
  )
}
