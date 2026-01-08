import type { Session } from "@auth/core/types"
import { SessionProvider } from "next-auth/react"
import { NextIntlClientProvider } from "next-intl"
import type { ReactNode } from "react"
import { ConfirmDialog } from "@/components/ConfirmDialog"
import { SessionTokenSync } from "@/lib/auth/SessionTokenSync"
import HeroUIClientProvider from "@/lib/hero-ui/HeroUIClientProvider"
import { SWRClientProvider } from "@/lib/swr/SWRClientProvider"

export interface GlobalProviderProps {
  session: Session | null
  children: ReactNode
}

export default function GlobalProvider({
  session,
  children,
}: GlobalProviderProps) {
  return (
    <SessionProvider session={session}>
      <SessionTokenSync />
      <NextIntlClientProvider>
        <HeroUIClientProvider>
          <SWRClientProvider>
            {children}
            <ConfirmDialog />
          </SWRClientProvider>
        </HeroUIClientProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  )
}
