import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { TransactionReceiptModal } from "@/components/transactions/TransactionReceiptModal"
import HeroUIClientProvider from "@/lib/hero-ui/HeroUIClientProvider"
import { SWRClientProvider } from "@/lib/swr/SWRClientProvider"
import { AuthProvider } from "@/providers/AuthProvider"

export interface GlobalProviderProps {
  children: ReactNode
}

export default function GlobalProvider({ children }: GlobalProviderProps) {
  return (
    <NextIntlClientProvider>
      <HeroUIClientProvider>
        <SWRClientProvider>
          <AuthProvider>
            {children}
            <ConfirmDialog />
            <TransactionReceiptModal />
          </AuthProvider>
        </SWRClientProvider>
      </HeroUIClientProvider>
    </NextIntlClientProvider>
  )
}
