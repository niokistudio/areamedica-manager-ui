declare module "*.svg" {
  import type { FC, SVGProps } from "react"
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module "*.svg?url" {
  // biome-ignore lint/suspicious/noExplicitAny: This is a global config
  const content: any
  export default content
}
