import { Download } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function TransactionsDownloadAction() {
  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log("Download clicked")
  }

  return (
    <Button
      variant="light"
      color="primary"
      isIconOnly
      onPress={handleDownload}
      aria-label="Descargar"
    >
      <Download className="size-4" />
    </Button>
  )
}
