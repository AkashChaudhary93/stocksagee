"use client"

import { useStockContext, Position } from "@/context/stock-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, PieChart, Wallet, TrendingUp, TrendingDown } from "lucide-react"
import { UserProfile } from "@/components/user-profile"
import { BackgroundCandles } from "@/components/background-candles"
import { TransactionHistory } from "@/components/transaction-history"
import { ModeToggle } from "@/components/mode-toggle"
import { PortfolioAnalytics } from "@/components/portfolio-analytics"
import { WalletDialog } from "@/components/wallet-dialog"

export default function PortfolioPage() {
    const router = useRouter()
    const { balance, positions } = useStockContext()

    const positionsList = Object.values(positions)

    const totalStockValue = positionsList.reduce((acc, pos) => acc + (pos.quantity * pos.avgPrice), 0)
    const netWorth = balance + totalStockValue

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
                                <PieChart className="h-5 w-5 text-white bg-slate-900 rounded-full p-0.5" />
                            </div>
                            <span className="font-bold text-lg text-gradient">Portfolio</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <UserProfile />
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 container mx-auto max-w-6xl scroll-smooth custom-scrollbar relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="glass-card border-slate-800/60 bg-slate-900/40">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-emerald-500" /> Net Worth
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-white">${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <div className="text-xs text-slate-500 mt-1">Cash + Assets</div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-slate-800/60 bg-slate-900/40">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Cash Balance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-emerald-400 mb-4">${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <WalletDialog>
                                <Button size="sm" variant="outline" className="w-full border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
                                    Manage Funds
                                </Button>
                            </WalletDialog>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-slate-800/60 bg-slate-900/40">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-slate-400">Active Positions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-400">{positionsList.length}</div>
                            <div className="text-xs text-slate-500 mt-1">Stocks Held</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 space-y-6">
                        <h2 className="text-xl font-bold text-white">Your Assets</h2>
                        <div className="space-y-4">
                            {positionsList.length === 0 ? (
                                <div className="text-center py-12 bg-slate-900/50 rounded-2xl border border-slate-800">
                                    <p className="text-slate-400">No active positions found.</p>
                                    <Button onClick={() => router.push('/chat')} className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white">
                                        Start Trading
                                    </Button>
                                </div>
                            ) : (
                                positionsList.map((pos) => (
                                    <div key={pos.symbol} onClick={() => router.push(`/stock/${pos.symbol}`)} className="bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 p-4 rounded-xl flex items-center justify-between cursor-pointer transition-all group">
                                        <div>
                                            <div className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{pos.symbol}</div>
                                            <div className="text-sm text-slate-400">{pos.quantity} shares @ ${pos.avgPrice.toFixed(2)}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-white text-lg">${(pos.quantity * pos.avgPrice).toFixed(2)}</div>
                                            <div className="text-xs text-slate-500">Book Value</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <TransactionHistory />
                    </div>

                    <div className="space-y-6">
                        <PortfolioAnalytics />
                    </div>
                </div>
            </main >
        </div >
    )
}
