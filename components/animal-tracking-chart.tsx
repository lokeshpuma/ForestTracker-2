"use client"

import { useEffect, useRef } from "react"
import type { AnimalTrackingData } from "@/lib/types"

interface AnimalTrackingChartProps {
  data: AnimalTrackingData[]
}

export function AnimalTrackingChart({ data }: AnimalTrackingChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!chartRef.current) return
    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height)

    // Set dimensions
    const width = chartRef.current.width
    const height = chartRef.current.height
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find max population for scaling
    const maxPopulation = Math.max(...data.map((d) => Math.max(...d.population)))

    // Define colors for different species
    const colors = [
      "#4ade80",
      "#f97316",
      "#3b82f6",
      "#ec4899",
      "#a855f7",
      "#14b8a6",
      "#f43f5e",
      "#eab308",
      "#06b6d4",
      "#8b5cf6",
    ]

    // Draw axes
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.stroke()

    // Draw X-axis labels (months)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const monthsToShow = months.slice(0, data[0]?.population.length || 0)

    ctx.fillStyle = "#000"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    monthsToShow.forEach((month, i) => {
      const x = padding + i * (chartWidth / (monthsToShow.length - 1))
      ctx.fillText(month, x, height - padding + 15)
    })

    // Draw Y-axis labels
    ctx.textAlign = "right"
    for (let i = 0; i <= 5; i++) {
      const value = Math.round((i / 5) * maxPopulation)
      const y = height - padding - i * (chartHeight / 5)
      ctx.fillText(value.toString(), padding - 5, y + 3)
    }

    // Draw lines for each species
    data.forEach((species, speciesIndex) => {
      ctx.strokeStyle = colors[speciesIndex % colors.length]
      ctx.lineWidth = 2
      ctx.beginPath()

      species.population.forEach((pop, i) => {
        const x = padding + i * (chartWidth / (species.population.length - 1))
        const y = height - padding - (pop / maxPopulation) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.stroke()

      // Add a dot at the end of each line
      const lastX = padding + (species.population.length - 1) * (chartWidth / (species.population.length - 1))
      const lastY = height - padding - (species.population[species.population.length - 1] / maxPopulation) * chartHeight

      ctx.fillStyle = colors[speciesIndex % colors.length]
      ctx.beginPath()
      ctx.arc(lastX, lastY, 4, 0, 2 * Math.PI)
      ctx.fill()

      // Add species name next to the last dot
      ctx.fillStyle = "#000"
      ctx.textAlign = "left"
      ctx.fillText(species.name, lastX + 8, lastY + 3)
    })

    // Draw title
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Wildlife Population Trends", width / 2, 20)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} width={800} height={400} className="max-w-full max-h-full" />
    </div>
  )
}

