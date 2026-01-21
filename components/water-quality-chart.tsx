"use client"

import { useEffect, useRef } from "react"
import type { WaterQualityData } from "@/lib/types"

interface WaterQualityChartProps {
  data: WaterQualityData[]
}

export function WaterQualityChart({ data }: WaterQualityChartProps) {
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
    const padding = 50
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Draw radar chart
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(chartWidth, chartHeight) / 2

    // Draw circles
    ctx.strokeStyle = "#d1d5db"
    ctx.fillStyle = "#f9fafb"

    for (let i = 5; i > 0; i--) {
      const circleRadius = (radius / 5) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI)
      ctx.fill()
      ctx.stroke()
    }

    // Draw axes
    const metrics = ["pH", "Oxygen", "Clarity", "Temperature", "Pollution"]
    const angleStep = (2 * Math.PI) / metrics.length

    metrics.forEach((metric, i) => {
      const angle = i * angleStep - Math.PI / 2
      const axisX = centerX + radius * Math.cos(angle)
      const axisY = centerY + radius * Math.sin(angle)

      // Draw axis line
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(axisX, axisY)
      ctx.stroke()

      // Draw label
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const labelX = centerX + (radius + 20) * Math.cos(angle)
      const labelY = centerY + (radius + 20) * Math.sin(angle)
      ctx.fillText(metric, labelX, labelY)
    })

    // Draw data for each water body
    data.forEach((waterBody, index) => {
      const color = [
        "rgba(74, 222, 128, 0.5)",
        "rgba(59, 130, 246, 0.5)",
        "rgba(249, 115, 22, 0.5)",
        "rgba(236, 72, 153, 0.5)",
      ][index % 4]

      const borderColor = color.replace("0.5", "1")

      ctx.fillStyle = color
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 2

      // Draw polygon
      ctx.beginPath()

      metrics.forEach((metric, i) => {
        const angle = i * angleStep - Math.PI / 2
        const value = waterBody.metrics[metric.toLowerCase() as keyof typeof waterBody.metrics]
        const pointRadius = (radius / 10) * value
        const pointX = centerX + pointRadius * Math.cos(angle)
        const pointY = centerY + pointRadius * Math.sin(angle)

        if (i === 0) {
          ctx.moveTo(pointX, pointY)
        } else {
          ctx.lineTo(pointX, pointY)
        }
      })

      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // Add water body name to legend
      ctx.fillStyle = borderColor
      ctx.font = "12px Arial"
      ctx.textAlign = "left"
      ctx.fillRect(padding, height - padding + 20 + index * 20, 10, 10)
      ctx.fillStyle = "#000"
      ctx.fillText(waterBody.name, padding + 15, height - padding + 25 + index * 20)
    })

    // Draw title
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Water Quality Metrics by Water Body", width / 2, 20)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} width={800} height={400} className="max-w-full max-h-full" />
    </div>
  )
}

