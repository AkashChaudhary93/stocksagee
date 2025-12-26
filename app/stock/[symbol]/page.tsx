"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, TrendingUp } from "lucide-react"
import { StockChart } from "@/components/stock-chart"
import { BackgroundCandles } from "@/components/background-candles"
import { UserProfile } from "@/components/user-profile"
import { useState } from "react"
import { motion } from "framer-motion"
import { AlertsDialog } from "@/components/alerts-dialog"
import { useStockContext } from "@/context/stock-context"
import { StockComments } from "@/components/stock-comments"

export default function StockDetailPage() {
    const router = useRouter()
    // @ts-ignore
    const params = useParams()
    const symbol = (params?.symbol as string) || "UNKNOWN"

    const { balance, buyStock, sellStock, cashoutStock, positions } = useStockContext()

    const [currentPrice, setCurrentPrice] = useState<number>(0)
    const [quantity, setQuantity] = useState<number>(1)
    const [stopLoss, setStopLoss] = useState<string>("")
    const [takeProfit, setTakeProfit] = useState<string>("")

    const position = positions[symbol] || null

    // Extended stock map
    const stockNames: Record<string, string> = {
        "NVDA": "NVIDIA Corp.",
        "AMD": "Advanced Micro Devices",
        "AAPL": "Apple Inc.",
        "MSFT": "Microsoft Corp.",
        "META": "Meta Platforms",
        "TSM": "Taiwan Semi",
        "AVGO": "Broadcom Inc.",
        "ORCL": "Oracle Corp.",
        "AMZN": "Amazon.com",
        "NFLX": "Netflix Inc.",
        "TSLA": "Tesla Inc.",
        "BA": "Boeing Co.",
        "NKE": "Nike Inc.",
        "SBUX": "Starbucks Corp.",
        "PFE": "Pfizer Inc.",
        "COIN": "Coinbase Global",
        "PLTR": "Palantir Tech",
        "HOOD": "Robinhood",
        "DKNG": "DraftKings",
        "RBLX": "Roblox Corp."
    }

    const name = stockNames[symbol] || symbol

    const handleBuy = () => {
        if (currentPrice > 0) {
            try {
                buyStock(symbol, quantity, currentPrice, Number(stopLoss) || undefined, Number(takeProfit) || undefined)
                setQuantity(1)
                setStopLoss("")
                setTakeProfit("")
            } catch (e) {
                alert("Insufficient funds!")
            }
        }
    }

    const handleSell = () => {
        if (!position) return
        const sellQty = Math.min(quantity, position.quantity)
        sellStock(symbol, sellQty, currentPrice)
        setQuantity(1)
    }

    const handleCashout = () => {
        if (!position) return
        cashoutStock(symbol, currentPrice)
    }

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white relative font-sans overflow-hidden">
            <BackgroundCandles />

            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.back()}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => router.push('/chat')}
                        >
                            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full shadow-lg shadow-emerald-500/20">
                                <TrendingUp className="h-5 w-5 text-white bg-slate-900 rounded-full p-0.5" />
                            </div>
                            <span className="font-bold text-lg text-gradient">StockSage</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Wallet</span>
                            <span className="text-emerald-400 font-bold font-mono">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <UserProfile />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 container mx-auto max-w-6xl scroll-smooth custom-scrollbar relative z-10">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">Real-time Chart Tracking</h1>
                            <AlertsDialog symbol={symbol} currentPrice={currentPrice} />
                        </div>
                        <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold rounded-lg animate-pulse">
                            On Air
                        </div>
                    </div>

                    <StockChart
                        symbol={symbol}
                        name={name}
                        onPriceUpdate={(price) => setCurrentPrice(price)}
                    />

                    {/* Position Card */}
                    {position && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-slate-900/80 border border-slate-700 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse" />
                            <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center justify-between">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1">
                                    <div>
                                        <div className="text-xs text-slate-400 mb-1">Total Equity</div>
                                        <div className="text-2xl font-bold text-white">
                                            ${(currentPrice * position.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 mb-1">Avg Price</div>
                                        <div className="text-2xl font-bold text-slate-200">
                                            ${position.avgPrice.toFixed(2)}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 mb-1">Quantity</div>
                                        <div className="text-2xl font-bold text-slate-200">
                                            {position.quantity}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400 mb-1">Total Return</div>
                                        <div className={`text-2xl font-bold ${(currentPrice - position.avgPrice) * position.quantity >= 0 ? "text-emerald-400" : "text-rose-400"
                                            }`}>
                                            {((currentPrice - position.avgPrice) * position.quantity).toFixed(2)}
                                            <span className="text-sm ml-1 font-medium bg-slate-800/50 px-1.5 py-0.5 rounded">
                                                {(((currentPrice - position.avgPrice) / position.avgPrice) * 100).toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    onClick={handleCashout}
                                    className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold h-12 px-8 rounded-xl shadow-lg shadow-orange-900/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                                >
                                    Cashout Now
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Trading Actions */}
                    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur-md">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            Trade {symbol}
                            <span className="text-xs font-normal text-slate-400 ml-auto flex items-center gap-1">
                                Available:
                                <span className="text-emerald-400 font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="flex-1 space-y-2 w-full">
                                <label className="text-xs font-medium text-slate-400">Quantity</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                    className="flex h-12 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold"
                                />
                            </div>

                            <div className="flex gap-4 w-full">
                                <div className="flex-1 space-y-2">
                                    <label className="text-xs font-medium text-slate-400">Stop Loss ($)</label>
                                    <input
                                        type="number"
                                        placeholder="Optional"
                                        value={stopLoss}
                                        onChange={(e) => setStopLoss(e.target.value)}
                                        className="flex h-12 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all font-bold placeholder:text-slate-600 placeholder:font-normal"
                                    />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <label className="text-xs font-medium text-slate-400">Take Profit ($)</label>
                                    <input
                                        type="number"
                                        placeholder="Optional"
                                        value={takeProfit}
                                        onChange={(e) => setTakeProfit(e.target.value)}
                                        className="flex h-12 w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-bold placeholder:text-slate-600 placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 w-full sm:w-auto">
                                <Button
                                    onClick={handleBuy}
                                    className="flex-1 sm:w-32 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Buy
                                </Button>
                                <Button
                                    onClick={handleSell}
                                    disabled={!position}
                                    className="flex-1 sm:w-32 bg-rose-600 hover:bg-rose-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-rose-900/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Sell
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Additional simulated details */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="glass-card p-6 rounded-xl border border-slate-800/50">
                            <h3 className="text-slate-400 text-sm font-medium mb-1">Open</h3>
                            <div className="text-2xl font-bold text-white">$182.50</div>
                        </div>
                        <div className="glass-card p-6 rounded-xl border border-slate-800/50">
                            <h3 className="text-slate-400 text-sm font-medium mb-1">High</h3>
                            <div className="text-2xl font-bold text-white">$190.12</div>
                        </div>
                        <div className="glass-card p-6 rounded-xl border border-slate-800/50">
                            <h3 className="text-slate-400 text-sm font-medium mb-1">Volume</h3>
                            <div className="text-2xl font-bold text-white">45.2M</div>
                        </div>
                    </div>
                    <StockComments symbol={symbol} />
                </div>
            </main >
        </div >
    )
}
