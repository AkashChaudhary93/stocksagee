"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, ChevronRight, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

type StockData = {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
}

const stockCategories = {
  trending: [
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 824.15, change: 5.67, volume: "45.2M", marketCap: "2.03T" },
    { symbol: "AMD", name: "Advanced Micro Devices", price: 178.23, change: 3.45, volume: "65.1M", marketCap: "288B" },
    { symbol: "AAPL", name: "Apple Inc.", price: 189.45, change: 1.23, volume: "62.8M", marketCap: "2.95T" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 415.32, change: 2.45, volume: "28.3M", marketCap: "3.08T" },
    { symbol: "META", name: "Meta Platforms", price: 485.50, change: 2.15, volume: "19.5M", marketCap: "1.25T" },
  ],
  gainers: [
    { symbol: "TSM", name: "Taiwan Semi", price: 142.50, change: 4.56, volume: "18.2M", marketCap: "740B" },
    { symbol: "AVGO", name: "Broadcom Inc.", price: 1320.45, change: 3.89, volume: "4.5M", marketCap: "615B" },
    { symbol: "ORCL", name: "Oracle Corp.", price: 125.60, change: 3.12, volume: "12.4M", marketCap: "345B" },
    { symbol: "AMZN", name: "Amazon.com", price: 178.45, change: 2.34, volume: "40.1M", marketCap: "1.85T" },
    { symbol: "NFLX", name: "Netflix Inc.", price: 630.20, change: 1.98, volume: "5.6M", marketCap: "275B" },
  ],
  losers: [
    { symbol: "TSLA", name: "Tesla Inc.", price: 165.40, change: -4.34, volume: "98.5M", marketCap: "525B" },
    { symbol: "BA", name: "Boeing Co.", price: 185.30, change: -2.78, volume: "10.2M", marketCap: "112B" },
    { symbol: "NKE", name: "Nike Inc.", price: 92.45, change: -2.10, volume: "15.3M", marketCap: "140B" },
    { symbol: "SBUX", name: "Starbucks Corp.", price: 88.20, change: -1.45, volume: "11.5M", marketCap: "98B" },
    { symbol: "PFE", name: "Pfizer Inc.", price: 26.50, change: -1.15, volume: "25.6M", marketCap: "150B" },
  ],
  watchlist: [
    { symbol: "COIN", name: "Coinbase Global", price: 245.80, change: 8.45, volume: "35.2M", marketCap: "60B" },
    { symbol: "PLTR", name: "Palantir Tech", price: 24.50, change: 3.20, volume: "55.8M", marketCap: "52B" },
    { symbol: "HOOD", name: "Robinhood", price: 18.90, change: 2.15, volume: "14.2M", marketCap: "16B" },
    { symbol: "DKNG", name: "DraftKings", price: 42.30, change: 1.85, volume: "12.5M", marketCap: "20B" },
    { symbol: "RBLX", name: "Roblox Corp.", price: 38.60, change: -0.45, volume: "8.9M", marketCap: "24B" },
  ],
  crypto: [
    { symbol: "BTC", name: "Bitcoin", price: 67450.00, change: 2.50, volume: "45B", marketCap: "1.3T" },
    { symbol: "ETH", name: "Ethereum", price: 3500.20, change: 1.80, volume: "20B", marketCap: "420B" },
    { symbol: "SOL", name: "Solana", price: 145.60, change: 5.40, volume: "4B", marketCap: "65B" },
    { symbol: "DOGE", name: "Dogecoin", price: 0.18, change: -1.20, volume: "2B", marketCap: "25B" },
    { symbol: "MATIC", name: "Polygon", price: 0.95, change: 0.50, volume: "800M", marketCap: "9B" },
  ],
  forex: [
    { symbol: "EUR/USD", name: "Euro / US Dollar", price: 1.0850, change: 0.12, volume: "N/A", marketCap: "N/A" },
    { symbol: "USD/JPY", name: "US Dollar / Yen", price: 151.20, change: 0.05, volume: "N/A", marketCap: "N/A" },
    { symbol: "GBP/USD", name: "Pound / US Dollar", price: 1.2640, change: -0.08, volume: "N/A", marketCap: "N/A" },
    { symbol: "USD/INR", name: "US Dollar / Rupee", price: 83.45, change: 0.02, volume: "N/A", marketCap: "N/A" },
    { symbol: "AUD/USD", name: "Aus Dollar / USD", price: 0.6540, change: 0.30, volume: "N/A", marketCap: "N/A" },
  ],
  india: [
    { symbol: "RELIANCE", name: "Reliance Ind.", price: 2950.00, change: 1.50, volume: "5M", marketCap: "19.5T" },
    { symbol: "TCS", name: "Tata Consultancy", price: 3980.00, change: -0.50, volume: "2M", marketCap: "14.2T" },
    { symbol: "HDFCBANK", name: "HDFC Bank", price: 1450.00, change: 0.80, volume: "8M", marketCap: "11.0T" },
    { symbol: "INFY", name: "Infosys Ltd.", price: 1520.00, change: 1.20, volume: "4M", marketCap: "6.3T" },
    { symbol: "TATAMOTORS", name: "Tata Motors", price: 980.50, change: 2.10, volume: "6M", marketCap: "3.2T" },
  ],
}


export function FeaturedStocks() {
  const router = useRouter()
  const [category, setCategory] = useState<"trending" | "gainers" | "losers" | "watchlist" | "crypto" | "forex" | "india">("trending")
  const [hoveredStock, setHoveredStock] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // State for dynamic data
  const [data, setData] = useState(stockCategories)

  // Live price simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = { ...prevData }
        // Update all categories
        Object.keys(newData).forEach(key => {
          const k = key as keyof typeof stockCategories
          newData[k] = newData[k].map(stock => {
            const change = (Math.random() - 0.5) * 0.2 // Small random fluctuation
            return {
              ...stock,
              price: Math.max(0.01, stock.price + change),
              change: stock.change + (change / 10)
            }
          })
        })
        return newData
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleStockClick = (symbol: string) => {
    router.push(`/stock/${symbol}`)
  }

  // Helper to generate a random sparkline path
  const getSparklinePath = (isPositive: boolean) => {
    let path = "M 0 20 "
    let currentY = 20
    for (let i = 1; i <= 10; i++) {
      const change = (Math.random() - 0.5) * 15
      currentY = Math.max(5, Math.min(35, currentY + (isPositive ? -Math.abs(change) + 2 : Math.abs(change) - 2))) // Trend up or down
      path += `L ${i * 10} ${currentY} `
    }
    return path
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Market Pulse</h3>
          </div>
          <Tabs value={category} onValueChange={(value) => setCategory(value as any)} className="w-full sm:w-auto">
            <TabsList className="bg-slate-800/50 h-9 p-1 w-full sm:w-auto overflow-x-auto justify-start sm:justify-center custom-scrollbar">
              {["trending", "gainers", "losers", "watchlist", "crypto", "forex", "india"].map(tab => (
                <TabsTrigger key={tab} value={tab} className="h-7 text-xs px-3 data-[state=active]:bg-slate-700 data-[state=active]:text-white capitalize">
                  {tab === "india" ? "India (NSE)" : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {data[category].map((stock, i) => {
            const isPositive = stock.change >= 0
            return (
              <motion.div
                key={stock.symbol}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-xl border border-transparent transition-all cursor-pointer group relative overflow-hidden ${isPositive ? 'hover:border-emerald-500/30 hover:bg-emerald-500/5' : 'hover:border-rose-500/30 hover:bg-rose-500/5'}`}
                onHoverStart={() => setHoveredStock(stock.symbol)}
                onHoverEnd={() => setHoveredStock(null)}
                onClick={() => handleStockClick(stock.symbol)}
              >
                <div className="flex items-center gap-4 min-w-0 z-10">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg font-bold text-sm transition-colors ${isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                    {stock.symbol.substring(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold truncate text-slate-100 group-hover:text-white flex items-center gap-2">
                      {stock.symbol}
                      <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 font-normal">{stock.marketCap !== "N/A" ? stock.marketCap : "FX"}</span>
                    </div>
                    <div className="text-xs text-slate-400 truncate">{stock.name}</div>
                  </div>
                </div>

                {/* Sparkline (Hidden on mobile, visible on desktop) */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 opacity-30 group-hover:opacity-60 transition-opacity">
                  {isMounted && (
                    <svg width="100" height="40" className="overflow-visible">
                      <path d={getSparklinePath(isPositive)} fill="none" stroke={isPositive ? "#10b981" : "#f43f5e"} strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </div>

                <div className="flex items-center gap-4 flex-shrink-0 z-10">
                  <div className="text-right">
                    <div className="font-bold text-slate-100">${stock.price.toFixed(stock.price < 5 ? 4 : 2)}</div>
                    <div
                      className={`text-xs flex items-center justify-end font-medium ${isPositive ? "text-emerald-400" : "text-rose-400"}`}
                    >
                      {isPositive ? (
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-0.5" />
                      )}
                      {Math.abs(stock.change).toFixed(2)}%
                    </div>
                  </div>
                  <div className={`p-1.5 rounded-full transition-colors ${isPositive ? 'group-hover:bg-emerald-500/20' : 'group-hover:bg-rose-500/20'}`}>
                    <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
