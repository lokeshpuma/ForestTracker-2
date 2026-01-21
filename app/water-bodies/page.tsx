import type { Metadata } from "next"
import { WaterBodyList } from "@/components/water-body-list"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Water Bodies | Forest Database Management System",
  description: "Monitor water bodies in the forests",
}

export default function WaterBodiesPage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Water Bodies"
        description="Monitor water bodies and their conservation status"
        action="Add Water Body"
        actionHref="/water-bodies/new"
      />
      <WaterBodyList />
    </div>
  )
}

