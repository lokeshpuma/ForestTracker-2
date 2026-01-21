"use client"

import { useEffect, useRef } from "react"
import type { Forest } from "@/lib/types"

interface ForestMapProps {
  forests: Forest[]
}

export function ForestMap({ forests }: ForestMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // This is a placeholder for an actual map implementation
    // In a real application, you would use a library like Leaflet or Google Maps
    const canvas = document.createElement("canvas")
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight
    mapRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw a simple placeholder map
    ctx.fillStyle = "#e5f5e0"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw some grid lines
    ctx.strokeStyle = "#a1d99b"
    ctx.lineWidth = 1

    // Horizontal lines
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Vertical lines
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }

    // Draw forest locations
    forests.forEach((forest, index) => {
      // Generate pseudo-random positions based on forest id
      const x = ((Number.parseInt(forest.id, 36) % 100) / 100) * canvas.width
      const y = ((Number.parseInt(forest.id.split("").reverse().join(""), 36) % 100) / 100) * canvas.height

      // Draw forest marker
      ctx.fillStyle = "#31a354"
      ctx.beginPath()
      ctx.arc(x, y, 8, 0, 2 * Math.PI)
      ctx.fill()

      // Draw forest name
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(forest.name, x + 12, y + 4)
    })

    return () => {
      if (mapRef.current && canvas.parentNode === mapRef.current) {
        mapRef.current.removeChild(canvas)
      }
    }
  }, [forests])

  return (
    <div ref={mapRef} className="w-full h-full bg-green-50 rounded-md relative">
      {forests.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-muted-foreground">No forest data available</p>
        </div>
      )}
    </div>
  )
}

