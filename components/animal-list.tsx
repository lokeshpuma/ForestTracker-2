"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for the animals
const animals = [
  {
    id: "a1",
    name: "Gray Wolf",
    species: "Canis lupus",
    status: "Monitored",
    location: "Northern Forest",
    lastSeen: "2023-05-01",
  },
  {
    id: "a2",
    name: "Black Bear",
    species: "Ursus americanus",
    status: "Healthy",
    location: "Eastern Ridge",
    lastSeen: "2023-05-15",
  },
  {
    id: "a3",
    name: "Red Fox",
    species: "Vulpes vulpes",
    status: "Monitored",
    location: "Western Valley",
    lastSeen: "2023-05-10",
  },
  {
    id: "a4",
    name: "Bald Eagle",
    species: "Haliaeetus leucocephalus",
    status: "Protected",
    location: "Lake Area",
    lastSeen: "2023-05-18",
  },
  {
    id: "a5",
    name: "White-tailed Deer",
    species: "Odocoileus virginianus",
    status: "Healthy",
    location: "Southern Meadow",
    lastSeen: "2023-05-20",
  },
];

export function AnimalList() {
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Species</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Seen</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animals.map((animal) => (
            <TableRow key={animal.id}>
              <TableCell className="font-medium">{animal.name}</TableCell>
              <TableCell>
                <em>{animal.species}</em>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    animal.status === "Protected"
                      ? "destructive"
                      : animal.status === "Monitored"
                      ? "outline"
                      : "default"
                  }
                >
                  {animal.status}
                </Badge>
              </TableCell>
              <TableCell>{animal.location}</TableCell>
              <TableCell>{animal.lastSeen}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/animals/${animal.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link href={`/animals/${animal.id}/edit`}>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
