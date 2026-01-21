"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Edit, Trash2, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { fetchForests, deleteForest } from "@/lib/data"
import type { Forest } from "@/lib/types"

export function ForestList() {
  const [forests, setForests] = useState<Forest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [forestToDelete, setForestToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const loadForests = async () => {
      try {
        const data = await fetchForests()
        setForests(data)
      } catch (error) {
        console.error("Failed to load forests:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load forest data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadForests()
  }, [toast])

  const handleDelete = async () => {
    if (!forestToDelete) return

    setIsDeleting(true)
    try {
      await deleteForest(forestToDelete)
      setForests(forests.filter((forest) => forest.id !== forestToDelete))
      toast({
        title: "Forest deleted",
        description: "The forest has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete forest:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the forest. Please try again.",
      })
    } finally {
      setIsDeleting(false)
      setForestToDelete(null)
    }
  }

  const filteredForests = forests.filter(
    (forest) =>
      forest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forest.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forest.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading forests...</p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Forest List</CardTitle>
            <CardDescription>Manage and monitor all registered forests</CardDescription>
          </div>
          <Button asChild>
            <Link href="/forests/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Forest
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search forests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {filteredForests.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No forests found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Area (ha)</TableHead>
                <TableHead>Officers</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredForests.map((forest) => (
                <TableRow key={forest.id}>
                  <TableCell className="font-medium">{forest.name}</TableCell>
                  <TableCell>{forest.location}</TableCell>
                  <TableCell>{forest.type}</TableCell>
                  <TableCell>{forest.area}</TableCell>
                  <TableCell>{forest.officerCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/forests/${forest.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setForestToDelete(forest.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {forest.name}? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setForestToDelete(null)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                              {isDeleting ? "Deleting..." : "Delete"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

