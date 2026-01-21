import type { Metadata } from "next"
import { ForestList } from "@/components/forest-list"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Forests | Forest Database Management System",
  description: "Manage forest data in the system",
}

export default function ForestsPage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Forests"
        description="Manage and monitor forest data"
        action="Add Forest"
        actionHref="/forests/new"
      />
      <ForestList />
    </div>
  )
}

