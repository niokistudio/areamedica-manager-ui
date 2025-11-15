import type { ReactNode } from "react"
import { ManagerHeader } from "@/app/(manager)/components/ManagerHeader"
import { Footer } from "@/components/layout/Footer"

export default function AuthLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <div className="h-full grid grid-rows-[auto_1fr_auto] grid-cols-1">
      <ManagerHeader />
      <div className="flex flex-col bg-background">
        <main className="p-4 flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
