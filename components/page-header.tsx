import Link from "next/link"
import { Button } from "@/components/ui/button"

interface PageHeaderProps {
  title: string
  description: string
  action?: string
  actionHref?: string
}

export function PageHeader({ title, description, action, actionHref }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {action && actionHref && (
        <Button asChild>
          <Link href={actionHref}>{action}</Link>
        </Button>
      )}
    </div>
  )
}

