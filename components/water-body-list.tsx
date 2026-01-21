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

// Mock data for water bodies
const waterBodies = [
  {
    id: "w1",
    name: "Crystal Lake",
    type: "Lake",
    status: "Healthy",
    location: "Northern Forest",
    area: "12.5 acres",
    lastTested: "2023-04-10",
  },
  {
    id: "w2",
    name: "Silver River",
    type: "River",
    status: "Monitored",
    location: "Eastern Ridge",
    area: "8.2 miles",
    lastTested: "2023-05-15",
  },
  {
    id: "w3",
    name: "Blue Pond",
    type: "Pond",
    status: "Threatened",
    location: "Western Valley",
    area: "3.1 acres",
    lastTested: "2023-05-01",
  },
  {
    id: "w4",
    name: "Emerald Stream",
    type: "Stream",
    status: "Healthy",
    location: "Central Forest",
    area: "4.5 miles",
    lastTested: "2023-04-25",
  },
  {
    id: "w5",
    name: "Green Marsh",
    type: "Marsh",
    status: "Protected",
    location: "Southern Meadow",
    area: "20.3 acres",
    lastTested: "2023-05-18",
  },
];

export function WaterBodyList() {
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Last Tested</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waterBodies.map((waterBody) => (
            <TableRow key={waterBody.id}>
              <TableCell className="font-medium">{waterBody.name}</TableCell>
              <TableCell>{waterBody.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    waterBody.status === "Threatened"
                      ? "destructive"
                      : waterBody.status === "Monitored"
                      ? "outline"
                      : waterBody.status === "Protected"
                      ? "secondary"
                      : "default"
                  }
                >
                  {waterBody.status}
                </Badge>
              </TableCell>
              <TableCell>{waterBody.location}</TableCell>
              <TableCell>{waterBody.area}</TableCell>
              <TableCell>{waterBody.lastTested}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/water-bodies/${waterBody.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link href={`/water-bodies/${waterBody.id}/edit`}>
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
