import { type ButtonProps, Button as HeroButton } from "@heroui/button"
import { cn } from "@heroui/theme"

export function Button({ className, ...props }: ButtonProps) {
  return <HeroButton className={cn("font-medium", className)} {...props} />
}
