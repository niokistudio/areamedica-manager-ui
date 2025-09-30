import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"

export interface GlobalProviderProps {
  children: ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return <NextIntlClientProvider>{children}</NextIntlClientProvider>
}
