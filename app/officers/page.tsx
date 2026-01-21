import type { Metadata } from "next"
import { OfficerList } from "@/components/officer-list"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Officers | Forest Database Management System",
  description: "Manage forest officers in the system",
}

export default function OfficersPage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Officers"
        description="Manage forest officers and their assignments"
        action="Add Officer"
        actionHref="/officers/new"
      />
      <OfficerList />
    </div>
  )
}

