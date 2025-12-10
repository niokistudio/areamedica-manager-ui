"use client"

import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations("Layout.Footer")

  return (
    <footer className="bg-muted text-muted-foreground text-xs flex justify-center py-3 px-6">
      {t("copyright", { year: new Date().getFullYear() })}
    </footer>
  )
}
