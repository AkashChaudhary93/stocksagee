"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  TrendingUp,
  BarChart2,
  ArrowUp,
  ArrowDown,
  PieChart,
  Activity,
  DollarSign,
  ArrowRightLeft
} from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { StockTickerWidget } from "@/components/stock-ticker-widget"
import { UserProfile } from "@/components/user-profile"
import { FeaturedStocks } from "@/components/featured-stocks"
import { BackgroundCandles } from "@/components/background-candles"
import { StockChart } from "@/components/stock-chart"
import { NewsFeed } from "@/components/news-feed"
import { MarketSentiment } from "@/components/market-sentiment"
import { SectorPerformance } from "@/components/sector-performance"
import { StockSpotlight } from "@/components/stock-spotlight"

export default function DashboardPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white relative font-sans overflow-hidden">
      {/* Background Candles */}
      <BackgroundCandles />

      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/")}
              className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full shadow-lg shadow-emerald-500/20">
                <TrendingUp className="h-5 w-5 text-white bg-slate-900 rounded-full p-0.5" />
              </div>
              <span className="font-bold text-lg text-gradient">StockSage Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <StockTickerWidget />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex border-slate-700 text-slate-300 hover:text-white"
              onClick={() => router.push('/compare')}
            >
              <ArrowRightLeft className="w-4 h-4 mr-2" /> Compare
            </Button>
            <ModeToggle />
            <UserProfile />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6 container mx-auto max-w-7xl scroll-smooth custom-scrollbar relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 space-y-6">
            <StockChart />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="glass-card border-slate-800/60 p-0 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400 flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-blue-500" />
                    Market Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">High Volatility</div>
                  <p className="text-xs text-slate-400">Market is experiencing higher than avarage trading volume today.</p>
                </CardContent>
              </Card>

              <Card
                className="glass-card border-slate-800/60 p-0 overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-colors group"
                onClick={() => router.push('/portfolio')}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-slate-400 flex items-center group-hover:text-emerald-400 transition-colors">
                    <DollarSign className="h-4 w-4 mr-2 text-emerald-500" />
                    Portfolio Value
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white mb-1">$12,450.00</div>
                  <div className="flex items-center text-emerald-400 text-xs font-bold">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <span>+2.4% (Today)</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar / Market Overview */}
          <div className="space-y-6">
            <Card className="glass-card border-slate-800/60 p-0 overflow-hidden">
              <CardHeader className="border-b border-slate-800/50 pb-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-blue-500" />
                  <h3 className="font-bold text-slate-200">Market Overview</h3>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {[
                  { name: "S&P 500", symbol: "SPX", value: "5,234.12", change: "0.75%", isUp: true, navSymbol: "SPY" },
                  { name: "NASDAQ", symbol: "IXIC", value: "16,428.82", change: "1.12%", isUp: true, navSymbol: "QQQ" },
                  { name: "DOW JONES", symbol: "DJI", value: "39,120.50", change: "0.43%", isUp: true, navSymbol: "DIA" },
                  { name: "10Y Treasury", symbol: "US10Y", value: "4.21%", change: "0.05%", isUp: false, navSymbol: "IEF" },
                ].map((item, index) => (
                  <div
                    key={item.symbol}
                    onClick={() => router.push(`/stock/${item.navSymbol}`)}
                    className={`flex justify-between items-center p-4 border-b border-slate-800/50 cursor-pointer hover:bg-slate-800/50 transition-colors group ${index === 3 ? "border-b-0" : ""}`}
                  >
                    <div>
                      <span className="text-sm font-medium text-slate-300 block group-hover:text-white transition-colors">{item.name}</span>
                      <span className="text-xs text-slate-500">{item.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">{item.value}</div>
                      <div className={`flex items-center text-xs font-bold px-2 py-0.5 rounded justify-end mt-1 ${item.isUp ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                        {item.isUp ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                        <span>{item.change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <MarketSentiment />

            <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/20 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <PieChart className="h-5 w-5 text-indigo-400" />
                <h4 className="text-sm font-bold text-indigo-200">Investment Tip</h4>
              </div>
              <p className="text-xs text-indigo-300/90 leading-relaxed">
                Diversification is key. Consider balancing your high-growth tech stocks with stable dividend-paying ETFs to mitigate market volatility.
              </p>
            </div>

            <NewsFeed />
          </div>
        </div>

        {/* Featured Stocks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Market Movers</h2>
          </div>
          <FeaturedStocks />
        </div>
      </main>
    </div>
  )
}
