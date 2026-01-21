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
import { fetchOfficers, deleteOfficer } from "@/lib/data"
import type { Officer } from "@/lib/types"

export function OfficerList() {
  const [officers, setOfficers] = useState<Officer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [officerToDelete, setOfficerToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const loadOfficers = async () => {
      try {
        const data = await fetchOfficers()
        setOfficers(data)
      } catch (error) {
        console.error("Failed to load officers:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load officer data. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadOfficers()
  }, [toast])

  const handleDelete = async () => {
    if (!officerToDelete) return

    setIsDeleting(true)
    try {
      await deleteOfficer(officerToDelete)
      setOfficers(officers.filter((officer) => officer.id !== officerToDelete))
      toast({
        title: "Officer deleted",
        description: "The officer has been successfully deleted.",
      })
    } catch (error) {
      console.error("Failed to delete officer:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the officer. Please try again.",
      })
    } finally {
      setIsDeleting(false)
      setOfficerToDelete(null)
    }
  }

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.forestName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading officers...</p>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Officer List</CardTitle>
            <CardDescription>Manage forest officers and their assignments</CardDescription>
          </div>
          <Button asChild>
            <Link href="/officers/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Officer
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Search officers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {filteredOfficers.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No officers found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Assigned Forest</TableHead>
                <TableHead>Position</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOfficers.map((officer) => (
                <TableRow key={officer.id}>
                  <TableCell className="font-medium">{officer.name}</TableCell>
                  <TableCell>{officer.email}</TableCell>
                  <TableCell>{officer.officerId}</TableCell>
                  <TableCell>{officer.forestName}</TableCell>
                  <TableCell>{officer.position}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <Link href={`/officers/${officer.id}/edit`}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setOfficerToDelete(officer.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete {officer.name}? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setOfficerToDelete(null)}>
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

