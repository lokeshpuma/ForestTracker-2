"use client"

import { useState, useEffect } from "react"
import { TreePine, Users, Package, Fish, Droplets, AlertTriangle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ForestMap } from "@/components/forest-map"
import { ResourceChart } from "@/components/resource-chart"
import { AnimalTrackingChart } from "@/components/animal-tracking-chart"
import { WaterQualityChart } from "@/components/water-quality-chart"
import { RecentActivities } from "@/components/recent-activities"
import { fetchDashboardData } from "@/lib/data"
import type { DashboardData } from "@/lib/types"

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Failed to load dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  if (isLoading) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container py-10">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Failed to load dashboard</h3>
            <p className="text-muted-foreground">Please try refreshing the page</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Forests</CardTitle>
            <TreePine className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.forestCount}</div>
            <p className="text-xs text-muted-foreground">
              {data.forestCountChange > 0 ? "+" : ""}
              {data.forestCountChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Officers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.officerCount}</div>
            <p className="text-xs text-muted-foreground">
              {data.officerCountChange > 0 ? "+" : ""}
              {data.officerCountChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources</CardTitle>
            <Package className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.resourceCount}</div>
            <p className="text-xs text-muted-foreground">
              {data.resourceCountChange > 0 ? "+" : ""}
              {data.resourceCountChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wildlife Species</CardTitle>
            <Fish className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.animalSpeciesCount}</div>
            <p className="text-xs text-muted-foreground">
              {data.animalSpeciesCountChange > 0 ? "+" : ""}
              {data.animalSpeciesCountChange}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Bodies</CardTitle>
            <Droplets className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.waterBodyCount}</div>
            <p className="text-xs text-muted-foreground">
              {data.waterBodyCountChange > 0 ? "+" : ""}
              {data.waterBodyCountChange}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
          <TabsTrigger value="water">Water Bodies</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Forest Locations</CardTitle>
                <CardDescription>Interactive map of all managed forests</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ForestMap forests={data.forests} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest updates and activities</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivities activities={data.recentActivities} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Distribution</CardTitle>
              <CardDescription>Distribution of resources across forests</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResourceChart data={data.resourceData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wildlife" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wildlife Tracking</CardTitle>
              <CardDescription>Population trends and movement patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <AnimalTrackingChart data={data.animalTrackingData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="water" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Quality Monitoring</CardTitle>
              <CardDescription>Water quality metrics across water bodies</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <WaterQualityChart data={data.waterQualityData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

