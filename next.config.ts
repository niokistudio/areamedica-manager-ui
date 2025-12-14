import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  // This creates a minimal production server with only necessary dependencies
  output: "standalone",

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.ts",
      },
    },
  },
}

export default withNextIntl(nextConfig)
