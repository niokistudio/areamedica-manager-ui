import { TransactionDetailsPageContent } from "@/app/(manager)/transactions/[id]/TransactionDetailsPageContent"

interface TransactionDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TransactionDetailPage({
  params,
}: TransactionDetailPageProps) {
  const { id } = await params

  return <TransactionDetailsPageContent transactionId={id} />
}
