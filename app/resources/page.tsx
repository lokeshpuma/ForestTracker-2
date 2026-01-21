import type { Metadata } from "next"
import { ResourceList } from "@/components/resource-list"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Resources | Forest Database Management System",
  description: "Manage forest resources in the system",
}

export default function ResourcesPage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Resources"
        description="Track and manage forest resources"
        action="Add Resource"
        actionHref="/resources/new"
      />
      <ResourceList />
    </div>
  )
}

