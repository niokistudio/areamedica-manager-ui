"use client"

import { Badge } from "@heroui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover"
import { SlidersHorizontal } from "lucide-react"
import { useTranslations } from "next-intl"
import { useCallback, useState } from "react"
import { Button } from "@/components/ui/Button"
import { usePaginationParams } from "@/hooks/use-pagination-params"
import { FiltersForm } from "./FiltersForm"

/**
 * Filters popover component for transactions toolbar
 *
 * Features:
 * - Popover trigger button with filter icon and active count badge
 * - Manages popover open/close state
 * - Integrates with URL params via usePaginationParams
 * - Shows active filter count when filters are applied
 * - Closes on Apply or Reset
 *
 * @example
 * ```tsx
 * <FiltersPopover />
 * ```
 */
export function FiltersPopover() {
  const t = useTranslations("TransactionsPage.toolbar.filters")
  const [isOpen, setIsOpen] = useState(false)
  const { fromDate, toDate, setDateRange, resetFilters } = usePaginationParams()

  // Calculate active filter count
  const activeFilterCount = fromDate && toDate ? 1 : 0

  // Handle Apply - update URL params and close popover
  const handleApply = useCallback(
    (filters: { fromDate: string | null; toDate: string | null }) => {
      setDateRange(filters.fromDate, filters.toDate)
      setIsOpen(false)
    },
    [setDateRange],
  )

  // Handle Reset - clear all filters and close popover
  const handleReset = useCallback(() => {
    resetFilters()
    setIsOpen(false)
  }, [resetFilters])

  // Handle Cancel - just close the popover without applying changes
  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <Badge
        isInvisible={!activeFilterCount}
        content={activeFilterCount}
        color="primary"
      >
        <PopoverTrigger>
          <Button variant="flat" isIconOnly aria-label={t("popoverTrigger")}>
            <SlidersHorizontal className="size-4" />
          </Button>
        </PopoverTrigger>
      </Badge>
      <PopoverContent>
        <FiltersForm
          initialValues={{ fromDate, toDate }}
          onApply={handleApply}
          onReset={handleReset}
          onCancel={handleCancel}
        />
      </PopoverContent>
    </Popover>
  )
}
