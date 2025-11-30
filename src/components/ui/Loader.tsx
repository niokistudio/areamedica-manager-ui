import { Spinner } from "@heroui/spinner"
import { cn } from "@heroui/theme"

interface LoaderProps {
  label: string
  size?: "sm" | "md" | "lg"
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
  className?: string
}

export function Loader({
  label,
  size = "md",
  color = "primary",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <Spinner size={size} color={color} />
      <p className="text-muted-foreground">
        {label}
        <span className="inline-flex">
          <span className="animate-loading-dots">.</span>
          <span className="animate-loading-dots animation-delay-200">.</span>
          <span className="animate-loading-dots animation-delay-400">.</span>
        </span>
      </p>
    </div>
  )
}
