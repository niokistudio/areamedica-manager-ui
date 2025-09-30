import { getRequestConfig } from "next-intl/server"
import { defaultLocale } from "@/lib/next-intl/config"

export default getRequestConfig(async () => {
  const locale = defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
