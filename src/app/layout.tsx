import type { Metadata } from "next"
import type { ReactNode } from "react"
import { IBMPlexSans } from "@/lib/fonts"
import GlobalProvider from "@/lib/GlobalProvider"
import { defaultLocale } from "@/lib/next-intl/config"
import "./globals.css"

export const metadata: Metadata = {
  title: "Areamedica - Manager",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={`${IBMPlexSans.variable} antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  )
}
