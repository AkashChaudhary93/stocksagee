"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line } from "recharts"
import { ArrowUp, ArrowDown, Activity } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button" // Added Button
import { useStockContext } from "@/context/stock-context"

import { stockData } from "@/lib/stock-data"

// Define a type for the data points
type DataPoint = {
  time: string;
  value: number;
}

// ... imports
interface StockChartProps {
  symbol?: string
  name?: string
  onPriceUpdate?: (price: number) => void
}

const calculateSMA = (data: any[], period: number) => {
  return data.map((item, index, arr) => {
    if (index < period - 1) return { ...item, sma: null }
    const slice = arr.slice(index - period + 1, index + 1)
    const sum = slice.reduce((acc, curr) => acc + curr.value, 0)
    return { ...item, sma: sum / period }
  })
}

export function StockChart({ symbol = "AAPL", name = "Apple Inc.", onPriceUpdate }: StockChartProps) {
  const [timeframe, setTimeframe] = useState("Live")
  const [data, setData] = useState<DataPoint[]>([])
  const [isMounted, setIsMounted] = useState(false)
  const [showSMA, setShowSMA] = useState(false) // New State

  // Initialize data on mount
  useEffect(() => {
    setIsMounted(true)
    // Start with 1D data as base for Live
    // Ensure we are casting or verifying the structure matches DataPoint
    setData((stockData["1D"] as unknown as DataPoint[]) || [])
  }, [])

  // Live simulation effect
  useEffect(() => {
    if (timeframe !== "Live" || !isMounted) return

    const interval = setInterval(() => {
      setData(prevData => {
        if (prevData.length === 0) return prevData

        const lastPoint = prevData[prevData.length - 1]
        const lastValue = lastPoint.value
        // Random walk: -0.5 to +0.5 change
        const change = (Math.random() - 0.5) * 0.8
        const newValue = Number((lastValue + change).toFixed(2))

        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })

        const newPoint: DataPoint = {
          time: timeString,
          value: newValue
        }

        // Removed side effect from here

        // Keep last 30 points for smooth live view
        return [...prevData.slice(1), newPoint]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timeframe, isMounted])

  const { alerts, removeAlert } = useStockContext()

  // Synchronize price updates to parent and check alerts
  useEffect(() => {
    if (data.length > 0) {
      const latestValue = data[data.length - 1].value
      if (onPriceUpdate) onPriceUpdate(latestValue)

      // Alert Checking
      const myAlerts = (alerts || []).filter(a => a.symbol === symbol && a.active)
      myAlerts.forEach(alert => {
        if (
          (alert.condition === "above" && latestValue >= alert.targetPrice) ||
          (alert.condition === "below" && latestValue <= alert.targetPrice)
        ) {
          toast.success(`Price Alert: ${symbol}`, {
            description: `Price reached ${latestValue} (Target: ${alert.targetPrice})`,
            duration: 5000,
            action: {
              label: "View",
              onClick: () => console.log("Alert Clicked"),
            },
          })
          removeAlert(alert.id)
        }
      })
    }
  }, [data, onPriceUpdate, alerts, symbol, removeAlert])

  // ... effects use symbol/name where appropriate if we had real data fetching logic based on symbol
  // For now we just display the props

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
    if (value !== "Live") {
      // Load static data
      const staticData = stockData[value as keyof typeof stockData]
      setData((staticData as unknown as DataPoint[]) || [])
    } else {
      // Reset to 1D data to start live simulation again
      const liveBase = stockData["1D"]
      setData((liveBase as unknown as DataPoint[]) || [])
    }
  }

  const chartData = useMemo(() => {
    let d = data
    if (showSMA) d = calculateSMA(d, 10) // 10-period SMA
    return d
  }, [data, showSMA])

  if (!isMounted) return <div className="h-[450px] animate-pulse bg-slate-900/50 rounded-xl" />

  const startValue = data.length > 0 ? data[0].value : 0
  const endValue = data.length > 0 ? data[data.length - 1].value : 0
  const change = endValue - startValue
  const percentChange = startValue !== 0 ? ((change / startValue) * 100).toFixed(2) : "0.00"
  const isPositive = change >= 0

  return (
    <Card className="glass-card overflow-hidden relative group border-0 ring-1 ring-slate-700/50">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-white tracking-tight">{symbol}</h3>
              <Button
                variant={showSMA ? "default" : "outline"}
                size="sm"
                onClick={() => setShowSMA(!showSMA)}
                className={`h-6 text-[10px] px-2 ${showSMA ? "bg-purple-600 hover:bg-purple-700 text-white" : "border-slate-700 text-slate-400"}`}
              >
                SMA
              </Button>
              {timeframe === "Live" && (
                <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full animate-pulse border border-emerald-500/20">
                  <Activity className="w-3 h-3 mr-1" /> LIVE
                </span>
              )}
            </div>
            <p className="text-sm text-slate-400 font-medium">{name}</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold tracking-tight transition-colors duration-300 ${isPositive ? "text-white" : "text-white"}`}>${endValue.toFixed(2)}</div>
            <div className={`text-sm font-semibold flex items-center justify-end ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
              {isPositive ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
              {Math.abs(change).toFixed(2)} ({Math.abs(Number(percentChange))}%)
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ChartContainer
            config={{
              value: {
                label: "Price",
                color: isPositive ? "#10b981" : "#f43f5e",
              },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={isPositive ? "#10b981" : "#f43f5e"} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  minTickGap={30}
                  dy={10}
                />
                <YAxis
                  domain={['auto', 'auto']}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  tickFormatter={(value) => `$${value.toFixed(2)}`}
                  width={60}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border border-slate-700 bg-slate-900/90 p-2 shadow-xl backdrop-blur-md">
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span className="text-[0.70rem] uppercase text-slate-400">
                                Price
                              </span>
                              <span className="font-bold text-slate-50">
                                ${Number(payload[0].value).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? "#10b981" : "#f43f5e"}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                {showSMA && (
                  <Line
                    type="monotone"
                    dataKey="sma"
                    stroke="#a855f7"
                    strokeWidth={2}
                    dot={false}
                    strokeDasharray="5 5"
                    isAnimationActive={false}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-8">
          <Tabs value={timeframe} onValueChange={handleTimeframeChange} className="w-full relative z-20">
            <TabsList className="flex flex-wrap justify-between w-full h-auto bg-transparent gap-2 p-0">
              {[
                { label: "1 day", value: "1D", change: "-0.11%", isPositive: false },
                { label: "5 days", value: "1W", change: "+1.97%", isPositive: true },
                { label: "1 month", value: "1M", change: "+2.25%", isPositive: true },
                { label: "6 months", value: "3M", change: "+26.32%", isPositive: true },
                { label: "YTD", value: "YTD", change: "+26.07%", isPositive: true },
                { label: "1 year", value: "1Y", change: "+28.43%", isPositive: true },
                { label: "5 years", value: "5Y", change: "+88.56%", isPositive: true },
                { label: "All time", value: "ALL", change: "+28.48 K%", isPositive: true },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="flex flex-col items-center justify-center h-auto py-2 px-4 rounded-xl data-[state=active]:bg-slate-800 data-[state=active]:shadow-none border border-transparent data-[state=active]:border-slate-700/50 transition-all hover:bg-slate-800/50 flex-1 min-w-[80px]"
                >
                  <span className="text-xs font-semibold text-slate-400 mb-1">{tab.label}</span>
                  <span className={`text-[10px] font-bold ${tab.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {tab.change}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
