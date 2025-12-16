import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import HeroUIClientProvider from "@/lib/hero-ui/HeroUIClientProvider"
import { SWRClientProvider } from "@/lib/swr/SWRClientProvider"

export interface GlobalProviderProps {
  children: ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <NextIntlClientProvider>
      <HeroUIClientProvider>
        <SWRClientProvider>
          {children}
          <ConfirmDialog />
        </SWRClientProvider>
      </HeroUIClientProvider>
    </NextIntlClientProvider>
  )
}
