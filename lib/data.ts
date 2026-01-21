"use server"

import type { Forest, Officer, DashboardData } from "@/lib/types"

// This file contains mock data and functions for demonstration purposes
// In a real application, you would connect to a database

// Mock data for forests
const mockForests: Forest[] = [
  {
    id: "forest_1",
    name: "Evergreen National Forest",
    location: "Northern Region",
    type: "Coniferous",
    area: 12500,
    officerCount: 8,
  },
  {
    id: "forest_2",
    name: "Oak Valley Reserve",
    location: "Eastern Region",
    type: "Deciduous",
    area: 8700,
    officerCount: 5,
  },
  {
    id: "forest_3",
    name: "Redwood Conservation Area",
    location: "Western Region",
    type: "Mixed",
    area: 15200,
    officerCount: 10,
  },
  {
    id: "forest_4",
    name: "Pine Ridge Forest",
    location: "Southern Region",
    type: "Coniferous",
    area: 9300,
    officerCount: 6,
  },
  {
    id: "forest_5",
    name: "Maple Woods Sanctuary",
    location: "Central Region",
    type: "Deciduous",
    area: 7800,
    officerCount: 4,
  },
]

// Mock data for officers
const mockOfficers: Officer[] = [
  {
    id: "officer_1",
    name: "John Smith",
    email: "john.smith@forestdb.com",
    officerId: "OFF-001",
    forestId: "forest_1",
    forestName: "Evergreen National Forest",
    position: "Chief Ranger",
  },
  {
    id: "officer_2",
    name: "Emily Johnson",
    email: "emily.johnson@forestdb.com",
    officerId: "OFF-002",
    forestId: "forest_1",
    forestName: "Evergreen National Forest",
    position: "Senior Ranger",
  },
  {
    id: "officer_3",
    name: "Michael Brown",
    email: "michael.brown@forestdb.com",
    officerId: "OFF-003",
    forestId: "forest_2",
    forestName: "Oak Valley Reserve",
    position: "Chief Ranger",
  },
  {
    id: "officer_4",
    name: "Sarah Davis",
    email: "sarah.davis@forestdb.com",
    officerId: "OFF-004",
    forestId: "forest_3",
    forestName: "Redwood Conservation Area",
    position: "Chief Ranger",
  },
  {
    id: "officer_5",
    name: "Robert Wilson",
    email: "robert.wilson@forestdb.com",
    officerId: "OFF-005",
    forestId: "forest_3",
    forestName: "Redwood Conservation Area",
    position: "Wildlife Specialist",
  },
]

// Mock dashboard data
const mockDashboardData: DashboardData = {
  forestCount: 5,
  forestCountChange: 20,
  officerCount: 12,
  officerCountChange: 8,
  resourceCount: 24,
  resourceCountChange: 15,
  animalSpeciesCount: 42,
  animalSpeciesCountChange: 5,
  waterBodyCount: 18,
  waterBodyCountChange: 10,
  forests: mockForests,
  recentActivities: [
    {
      id: "activity_1",
      title: "New officer assigned",
      description: "Emily Johnson was assigned to Evergreen National Forest",
      timestamp: "2 hours ago",
      type: "create",
    },
    {
      id: "activity_2",
      title: "Resource update",
      description: "Timber resources updated in Oak Valley Reserve",
      timestamp: "5 hours ago",
      type: "update",
    },
    {
      id: "activity_3",
      title: "Wildlife alert",
      description: "Decrease in deer population detected in Redwood Conservation Area",
      timestamp: "1 day ago",
      type: "alert",
    },
    {
      id: "activity_4",
      title: "Water quality check",
      description: "Water quality assessment completed for Pine Ridge Forest",
      timestamp: "2 days ago",
      type: "update",
    },
    {
      id: "activity_5",
      title: "New forest added",
      description: "Maple Woods Sanctuary added to the system",
      timestamp: "3 days ago",
      type: "create",
    },
  ],
  resourceData: [
    { name: "Timber", quantity: 1250, forestId: "forest_1" },
    { name: "Medicinal Plants", quantity: 850, forestId: "forest_2" },
    { name: "Fruits", quantity: 620, forestId: "forest_3" },
    { name: "Nuts", quantity: 480, forestId: "forest_4" },
    { name: "Honey", quantity: 320, forestId: "forest_5" },
  ],
  animalTrackingData: [
    {
      name: "Deer",
      population: [120, 125, 130, 128, 135, 142, 145, 150, 148, 152, 155, 160],
    },
    {
      name: "Wolf",
      population: [45, 43, 44, 46, 48, 50, 49, 52, 54, 55, 57, 58],
    },
    {
      name: "Bear",
      population: [28, 28, 29, 30, 32, 33, 35, 36, 38, 37, 39, 40],
    },
    {
      name: "Fox",
      population: [65, 68, 72, 75, 78, 80, 82, 85, 88, 90, 92, 95],
    },
  ],
  waterQualityData: [
    {
      name: "Crystal Lake",
      metrics: {
        ph: 7.2,
        oxygen: 8.5,
        clarity: 9.0,
        temperature: 6.5,
        pollution: 2.0,
      },
    },
    {
      name: "Eagle River",
      metrics: {
        ph: 6.8,
        oxygen: 7.5,
        clarity: 6.0,
        temperature: 8.0,
        pollution: 3.5,
      },
    },
    {
      name: "Blue Pond",
      metrics: {
        ph: 7.0,
        oxygen: 6.5,
        clarity: 7.0,
        temperature: 7.0,
        pollution: 4.0,
      },
    },
  ],
}

// Data fetching functions
export async function fetchDashboardData(): Promise<DashboardData> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockDashboardData
}

export async function fetchForests(): Promise<Forest[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockForests
}

export async function fetchOfficers(): Promise<Officer[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockOfficers
}

export async function deleteForest(id: string): Promise<{ success: boolean }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true }
}

export async function deleteOfficer(id: string): Promise<{ success: boolean }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true }
}

