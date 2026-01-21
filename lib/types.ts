export interface Forest {
  id: string
  name: string
  location: string
  type: string
  area: number
  officerCount: number
  lat?: number
  lng?: number
}

export interface Officer {
  id: string
  name: string
  email: string
  officerId: string
  forestId: string
  forestName: string
  position: string
}

export interface Resource {
  id: string
  name: string
  type: string
  quantity: number
  forestId: string
  forestName: string
  lastUpdated: string
}

export interface Animal {
  id: string
  species: string
  population: number
  habitat: string
  forestId: string
  forestName: string
  conservationStatus: string
}

export interface WaterBody {
  id: string
  name: string
  type: string
  capacity: number
  forestId: string
  forestName: string
  conservationStatus: string
}

export interface Activity {
  id: string
  title: string
  description: string
  timestamp: string
  type: "create" | "update" | "alert"
}

export interface ResourceData {
  name: string
  quantity: number
  forestId: string
}

export interface AnimalTrackingData {
  name: string
  population: number[]
}

export interface WaterQualityData {
  name: string
  metrics: {
    ph: number
    oxygen: number
    clarity: number
    temperature: number
    pollution: number
  }
}

export interface DashboardData {
  forestCount: number
  forestCountChange: number
  officerCount: number
  officerCountChange: number
  resourceCount: number
  resourceCountChange: number
  animalSpeciesCount: number
  animalSpeciesCountChange: number
  waterBodyCount: number
  waterBodyCountChange: number
  forests: Forest[]
  recentActivities: Activity[]
  resourceData: ResourceData[]
  animalTrackingData: AnimalTrackingData[]
  waterQualityData: WaterQualityData[]
}

