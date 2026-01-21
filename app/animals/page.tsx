import type { Metadata } from "next"
import { AnimalList } from "@/components/animal-list"
import { PageHeader } from "@/components/page-header"

export const metadata: Metadata = {
  title: "Animals | Forest Database Management System",
  description: "Track and monitor wildlife in the forests",
}

export default function AnimalsPage() {
  return (
    <div className="container py-6">
      <PageHeader
        title="Wildlife"
        description="Track and monitor wildlife populations and movements"
        action="Add Animal"
        actionHref="/animals/new"
      />
      <AnimalList />
    </div>
  )
}

