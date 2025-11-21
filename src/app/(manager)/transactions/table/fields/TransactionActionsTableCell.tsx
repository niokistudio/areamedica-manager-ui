import { Eye } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function TransactionActionsTableCell() {
  return (
    <div className="invisible group-data-[hover=true]/tr:visible">
      <Button
        color="primary"
        variant="light"
        type="button"
        isIconOnly
        aria-label="View transaction"
      >
        <Eye className="size-4" />
      </Button>
    </div>
  )
}
