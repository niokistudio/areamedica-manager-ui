import type { Metadata } from "next"
import type { ReactNode } from "react"
import { IBMPlexSans } from "@/lib/fonts"
import GlobalProvider from "@/lib/GlobalProvider"
import { defaultLocale } from "@/lib/next-intl/config"
import { auth } from "../../auth"
import "./globals.css"

export const metadata: Metadata = {
  title: "Areamedica - Manager",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await auth()

  return (
    <html lang={defaultLocale}>
      <body className={`${IBMPlexSans.variable} antialiased font-plex-sans`}>
        <GlobalProvider session={session}>{children}</GlobalProvider>
      </body>
    </html>
  )
}
