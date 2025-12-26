"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    ArrowLeft,
    ArrowRightLeft,
    Search,
    CheckCircle2
} from "lucide-react"
import { UserProfile } from "@/components/user-profile"
import { Input } from "@/components/ui/input"
import { StockChart } from "@/components/stock-chart"
import { BackgroundCandles } from "@/components/background-candles"

export default function ComparePage() {
    const router = useRouter()
    const [symbol1, setSymbol1] = useState("NVDA")
    const [symbol2, setSymbol2] = useState("AMD")
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")

    const handleUpdate = () => {
        if (input1) setSymbol1(input1.toUpperCase())
        if (input2) setSymbol2(input2.toUpperCase())
        setInput1("")
        setInput2("")
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
                            onClick={() => router.push("/chat")}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-0.5 rounded-full shadow-lg shadow-purple-500/20">
                                <ArrowRightLeft className="h-5 w-5 text-white bg-slate-900 rounded-full p-0.5" />
                            </div>
                            <span className="font-bold text-lg text-gradient">Stock Compare</span>
                        </div>
                    </div>
                    <UserProfile />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 container mx-auto max-w-7xl scroll-smooth custom-scrollbar relative z-10">

                {/* Comparison Controls */}
                <div className="mb-8 p-6 bg-slate-900/60 border border-slate-700/50 rounded-2xl backdrop-blur-md">
                    <div className="flex flex-col md:flex-row items-end gap-4">
                        <div className="flex-1 w-full space-y-2">
                            <label className="text-xs font-medium text-slate-400">Stock A</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder={symbol1}
                                    value={input1}
                                    onChange={(e) => setInput1(e.target.value)}
                                    className="pl-9 bg-slate-800/50 border-slate-700 text-white"
                                />
                            </div>
                        </div>

                        <div className="hidden md:flex mb-3 text-slate-500 font-bold">VS</div>

                        <div className="flex-1 w-full space-y-2">
                            <label className="text-xs font-medium text-slate-400">Stock B</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                <Input
                                    placeholder={symbol2}
                                    value={input2}
                                    onChange={(e) => setInput2(e.target.value)}
                                    className="pl-9 bg-slate-800/50 border-slate-700 text-white"
                                />
                            </div>
                        </div>

                        <Button onClick={handleUpdate} className="flex-none bg-purple-600 hover:bg-purple-700 text-white">
                            <ArrowRightLeft className="h-4 w-4 mr-2" />
                            Compare
                        </Button>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-8 bg-emerald-500 rounded-full" />
                                <h2 className="text-xl font-bold">{symbol1}</h2>
                            </div>
                        </div>
                        <StockChart symbol={symbol1} name={`${symbol1} Ticker`} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-8 bg-blue-500 rounded-full" />
                                <h2 className="text-xl font-bold">{symbol2}</h2>
                            </div>
                        </div>
                        <StockChart symbol={symbol2} name={`${symbol2} Ticker`} />
                    </div>
                </div>

                {/* Analysis Section (Mock) */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="glass-card border-purple-500/20 bg-purple-900/10">
                        <CardContent className="p-6">
                            <h3 className="text-purple-300 font-bold mb-2">Correlation</h3>
                            <div className="text-3xl font-bold text-white">0.87</div>
                            <p className="text-xs text-slate-400 mt-1">High positive correlation. These assets tend to move together.</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-slate-700/50 bg-slate-900/20">
                        <CardContent className="p-6">
                            <h3 className="text-slate-300 font-bold mb-2">Relative Strength</h3>
                            <div className="text-3xl font-bold text-emerald-400">{symbol1}</div>
                            <p className="text-xs text-slate-400 mt-1">Outperforming {symbol2} by 4.2% this week.</p>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-slate-700/50 bg-slate-900/20">
                        <CardContent className="p-6">
                            <h3 className="text-slate-300 font-bold mb-2">Volatility</h3>
                            <div className="text-3xl font-bold text-rose-400">{symbol2}</div>
                            <p className="text-xs text-slate-400 mt-1">Showing higher beta (1.8) vs {symbol1} (1.5).</p>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    )
}
