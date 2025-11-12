import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import HeroUIClientProvider from "@/lib/hero-ui/HeroUIClientProvider"

export interface GlobalProviderProps {
  children: ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <NextIntlClientProvider>
      <HeroUIClientProvider>{children}</HeroUIClientProvider>
    </NextIntlClientProvider>
  )
}
