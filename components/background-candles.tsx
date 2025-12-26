"use client"

import { useEffect, useRef } from "react"

interface CandleData {
  open: number
  close: number
  high: number
  low: number
}

export function BackgroundCandles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCandles()
    }

    // Generate random candle data
    const generateCandleData = (count: number): CandleData[] => {
      const candles: CandleData[] = []
      let lastClose = 100 + Math.random() * 50

      for (let i = 0; i < count; i++) {
        const volatility = 5
        const open = lastClose
        const close = open + (Math.random() * volatility * 2 - volatility)
        const high = Math.max(open, close) + Math.random() * 3
        const low = Math.min(open, close) - Math.random() * 3

        candles.push({ open, close, high, low })
        lastClose = close
      }

      return candles
    }

    // Draw candles on canvas
    const drawCandles = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const candleCount = Math.floor(canvas.width / 20) // Adjust spacing
      const candles = generateCandleData(candleCount)

      const maxPrice = Math.max(...candles.map((c) => c.high)) * 1.1
      const minPrice = Math.min(...candles.map((c) => c.low)) * 0.9
      const priceRange = maxPrice - minPrice

      const candleWidth = 4
      const spacing = canvas.width / candleCount

      // Draw with very low opacity
      ctx.globalAlpha = 0.03

      candles.forEach((candle, i) => {
        const x = i * spacing
        const y = canvas.height - ((candle.open - minPrice) / priceRange) * canvas.height
        const height = ((candle.open - candle.close) / priceRange) * canvas.height

        // Draw candle body
        ctx.fillStyle = candle.open > candle.close ? "#ef4444" : "#10b981"
        ctx.fillRect(x, y, candleWidth, height)

        // Draw wicks
        ctx.beginPath()
        ctx.moveTo(x + candleWidth / 2, canvas.height - ((candle.high - minPrice) / priceRange) * canvas.height)
        ctx.lineTo(x + candleWidth / 2, canvas.height - ((candle.low - minPrice) / priceRange) * canvas.height)
        ctx.strokeStyle = candle.open > candle.close ? "#ef4444" : "#10b981"
        ctx.stroke()
      })
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  )
}
