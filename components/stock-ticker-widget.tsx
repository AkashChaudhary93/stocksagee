"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

type StockTicker = {
  symbol: string
  price: number
  change: number
  sector: string
}

const initialTickers: StockTicker[] = [
  { symbol: "AAPL", price: 189.45, change: 1.23, sector: "Technology" },
  { symbol: "MSFT", price: 415.32, change: 2.45, sector: "Technology" },
  { symbol: "GOOGL", price: 142.89, change: -0.78, sector: "Technology" },
  { symbol: "AMZN", price: 178.12, change: 0.92, sector: "Consumer" },
  { symbol: "TSLA", price: 245.67, change: -1.34, sector: "Automotive" },
  { symbol: "META", price: 472.21, change: 3.56, sector: "Technology" },
  { symbol: "NVDA", price: 824.15, change: 5.67, sector: "Technology" },
  { symbol: "JPM", price: 198.34, change: 0.45, sector: "Finance" },
  { symbol: "V", price: 278.56, change: 1.12, sector: "Finance" },
  { symbol: "WMT", price: 67.89, change: -0.34, sector: "Retail" },
  { symbol: "DIS", price: 112.45, change: 2.34, sector: "Entertainment" },
  { symbol: "NFLX", price: 632.78, change: 4.56, sector: "Entertainment" },
  { symbol: "PFE", price: 28.45, change: -1.23, sector: "Healthcare" },
  { symbol: "JNJ", price: 156.78, change: 0.67, sector: "Healthcare" },
  { symbol: "KO", price: 62.34, change: 0.23, sector: "Consumer" },
]

export function StockTickerWidget() {
  const [tickers, setTickers] = useState<StockTicker[]>(initialTickers)
  const [hoveredStock, setHoveredStock] = useState<string | null>(null)

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prevTickers) =>
        prevTickers.map((ticker) => {
          const changeAmount = (Math.random() * 2 - 1) * 0.5
          const newPrice = Number.parseFloat((ticker.price + changeAmount).toFixed(2))
          return {
            ...ticker,
            price: newPrice,
            change: Number.parseFloat((ticker.change + changeAmount / 10).toFixed(2)),
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="hidden md:block overflow-hidden max-w-md">
      <div className="flex animate-marquee whitespace-nowrap">
        {tickers.concat(tickers).map((ticker, index) => (
          <motion.div
            key={`${ticker.symbol}-${index}`}
            className="flex items-center mx-3 py-1 px-2 rounded-md transition-all duration-300 cursor-pointer"
            onHoverStart={() => setHoveredStock(ticker.symbol)}
            onHoverEnd={() => setHoveredStock(null)}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 24, 39, 0.5)" }}
            onClick={() => window.location.href = `/stock/${ticker.symbol}`}
          >
            <div className="flex flex-col items-center mr-2">
              {ticker.change >= 0 ? (
                <TrendingUp className="h-3 w-3 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
            </div>
            <div>
              <div className="flex items-center">
                <span className="font-bold text-sm">{ticker.symbol}</span>
                {hoveredStock === ticker.symbol && (
                  <Badge variant="outline" className="ml-1 text-[10px] py-0 h-4 bg-slate-800/50">
                    {ticker.sector}
                  </Badge>
                )}
              </div>
              <div className="flex items-center">
                <span className="text-xs font-medium">${ticker.price.toFixed(2)}</span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`ml-1 text-[10px] flex items-center ${ticker.change >= 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                >
                  {ticker.change >= 0 ? (
                    <ArrowUp className="h-2 w-2 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-2 w-2 mr-0.5" />
                  )}
                  {Math.abs(ticker.change).toFixed(2)}%
                </motion.span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
