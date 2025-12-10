"use client"

import { DateRangePicker } from "@heroui/date-picker"
import { parseDate } from "@internationalized/date"
import type { DateValue } from "@react-types/datepicker"
import { useTranslations } from "next-intl"
import { useCallback, useMemo } from "react"

interface RangeValue<T> {
  /** The start value of the range. */
  start: T
  /** The end value of the range. */
  end: T
}

interface DateRangeFilterFieldProps {
  value: {
    fromDate: string | null
    toDate: string | null
  }
  onChange: (from: string | null, to: string | null) => void
  label?: string
}

/**
 * Controlled date range filter field for use in forms
 * Unlike DateRangeFilter, this doesn't manage URL state directly
 *
 * Features:
 * - Controlled component (accepts value/onChange props)
 * - Decoupled from URL params
 * - Converts between string dates (YYYY-MM-DD) and DateValue objects
 * - Reusable in any form context
 *
 * @example
 * ```tsx
 * <DateRangeFilterField
 *   value={{ fromDate: "2024-01-01", toDate: "2024-01-31" }}
 *   onChange={(from, to) => setDates({ fromDate: from, toDate: to })}
 * />
 * ```
 */
export function DateRangeFilterField({
  value,
  onChange,
  label,
}: DateRangeFilterFieldProps) {
  const t = useTranslations("TransactionsPage.toolbar.filters")

  // Convert string dates to DateValue objects for the picker
  const dateRangeValue: RangeValue<DateValue> | null = useMemo(() => {
    if (!value.fromDate || !value.toDate) return null

    try {
      return {
        start: parseDate(value.fromDate),
        end: parseDate(value.toDate),
      }
    } catch {
      // Invalid date format
      return null
    }
  }, [value.fromDate, value.toDate])

  // Handle date range change
  const handleChange = useCallback(
    (newValue: RangeValue<DateValue> | null) => {
      if (!newValue) {
        // Clear date range
        onChange(null, null)
        return
      }

      // Convert DateValue to ISO string format (YYYY-MM-DD)
      const from = newValue.start?.toString() || null
      const to = newValue.end?.toString() || null

      onChange(from, to)
    },
    [onChange],
  )

  return (
    <DateRangePicker
      label={label || t("dateRange")}
      value={dateRangeValue}
      onChange={handleChange}
      className="w-full"
      showMonthAndYearPickers
      visibleMonths={2}
      pageBehavior="single"
      labelPlacement="outside"
      selectorButtonPlacement="start"
    />
  )
}
