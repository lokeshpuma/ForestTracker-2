"use client"

import { useEffect, useRef } from "react"
import type { ResourceData } from "@/lib/types"

interface ResourceChartProps {
  data: ResourceData[]
}

export function ResourceChart({ data }: ResourceChartProps) {
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
    const barWidth = width / (data.length * 2)
    const maxValue = Math.max(...data.map((item) => item.quantity))
    const scale = (height - 60) / maxValue

    // Draw axes
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 1

    // X-axis
    ctx.beginPath()
    ctx.moveTo(40, height - 30)
    ctx.lineTo(width - 20, height - 30)
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(40, 20)
    ctx.lineTo(40, height - 30)
    ctx.stroke()

    // Draw bars
    data.forEach((item, index) => {
      const x = 60 + index * (barWidth * 2)
      const barHeight = item.quantity * scale
      const y = height - 30 - barHeight

      // Draw bar
      ctx.fillStyle = "#4ade80"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.name, x + barWidth / 2, height - 15)

      // Draw value
      ctx.fillText(item.quantity.toString(), x + barWidth / 2, y - 5)
    })

    // Draw title
    ctx.fillStyle = "#000"
    ctx.font = "14px Arial"
    ctx.textAlign = "center"
    ctx.fillText("Resource Distribution by Type", width / 2, 15)
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={chartRef} width={800} height={400} className="max-w-full max-h-full" />
    </div>
  )
}

