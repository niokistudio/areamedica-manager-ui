"use client"

import { useTranslations } from "next-intl"
import type { ReactNode } from "react"

interface OptionalLabelProps {
  children?: ReactNode
}

export function OptionalLabel({ children }: OptionalLabelProps) {
  const t = useTranslations("Common")

  return (
    <span>
      {children}
      <span className="ps-1 text-xs">({t("optional")})</span>
    </span>
  )
}
