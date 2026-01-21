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

// Mock data for forest resources
const resources = [
  {
    id: "r1",
    name: "Pine Timber",
    type: "Timber",
    status: "Sustainable",
    location: "Northern Forest",
    lastHarvested: "2023-04-01",
    quantity: "1,200 ft³",
  },
  {
    id: "r2",
    name: "Wild Mushrooms",
    type: "Food",
    status: "Seasonal",
    location: "Eastern Ridge",
    lastHarvested: "2023-05-10",
    quantity: "120 kg",
  },
  {
    id: "r3",
    name: "Maple Syrup",
    type: "Food",
    status: "Sustainable",
    location: "Western Valley",
    lastHarvested: "2023-03-15",
    quantity: "80 gallons",
  },
  {
    id: "r4",
    name: "Medicinal Herbs",
    type: "Medicine",
    status: "Protected",
    location: "Southern Meadow",
    lastHarvested: "2023-05-20",
    quantity: "45 kg",
  },
  {
    id: "r5",
    name: "Oak Timber",
    type: "Timber",
    status: "Sustainable",
    location: "Central Forest",
    lastHarvested: "2023-04-25",
    quantity: "950 ft³",
  },
];

export function ResourceList() {
  const router = useRouter();

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Resource</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Last Harvested</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id}>
              <TableCell className="font-medium">{resource.name}</TableCell>
              <TableCell>{resource.type}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    resource.status === "Protected"
                      ? "destructive"
                      : resource.status === "Seasonal"
                      ? "outline"
                      : "default"
                  }
                >
                  {resource.status}
                </Badge>
              </TableCell>
              <TableCell>{resource.location}</TableCell>
              <TableCell>{resource.lastHarvested}</TableCell>
              <TableCell>{resource.quantity}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link href={`/resources/${resource.id}`}>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </Link>
                  <Link href={`/resources/${resource.id}/edit`}>
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
