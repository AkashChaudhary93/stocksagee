"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, TrendingUp, Zap, Layers, BarChart3 } from "lucide-react"
import { useRouter } from "next/navigation"

export function StockSpotlight() {
    const router = useRouter()

    return (
        <Card className="glass-card border-slate-800/60 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap className="w-32 h-32 text-emerald-500" />
            </div>

            <CardHeader className="pb-2 relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                                Stock of the Day
                            </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                            NVIDIA Corp <span className="text-slate-500 text-sm font-normal">(NVDA)</span>
                        </CardTitle>
                    </div>
                    <div className="text-right">
                        <div className="text-xl font-bold text-white">$925.46</div>
                        <div className="text-sm font-bold text-emerald-400 flex items-center justify-end">
                            <TrendingUp className="w-3 h-3 mr-1" /> +3.12%
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                    NVIDIA is the global leader in AI computing. Its advanced GPUs are the engine behind the generative AI revolution, powering everything from ChatGPT to autonomous vehicles.
                </p>

                <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 uppercase">Market Cap</div>
                        <div className="font-semibold text-white text-sm">$2.2T</div>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 uppercase">P/E Ratio</div>
                        <div className="font-semibold text-white text-sm">75.4</div>
                    </div>
                    <div className="bg-slate-900/50 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-500 uppercase">Vol (24h)</div>
                        <div className="font-semibold text-white text-sm">45M</div>
                    </div>
                </div>

                <Button
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transition-all duration-300"
                    onClick={() => router.push('/stock/NVDA')}
                >
                    Analysis & Trade <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
            </CardContent>
        </Card>
    )
}
