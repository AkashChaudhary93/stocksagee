"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GaugeCircle } from "lucide-react"

export function MarketSentiment() {
    // Mock Sentiment Score (0 = Extreme Fear, 100 = Extreme Greed)
    const score = 75

    let label = "Neutral"
    let color = "text-yellow-500"
    if (score > 60) {
        label = "Greed"
        color = "text-emerald-500"
    } else if (score > 80) {
        label = "Extreme Greed"
        color = "text-emerald-400"
    } else if (score < 40) {
        label = "Fear"
        color = "text-orange-500"
    } else if (score < 20) {
        label = "Extreme Fear"
        color = "text-red-500"
    }

    return (
        <Card className="glass-card border-slate-700 bg-slate-900/50">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <GaugeCircle className="h-4 w-4" />
                    Market Sentiment
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-32 h-16 overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-slate-800 border-b-0 border-l-0 border-r-0 transform rotate-[45deg]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent' }} />
                        {/* Semi-circle Gauge */}
                        <div
                            className="absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] border-slate-700"
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)"
                            }}
                        />
                        <div
                            className={`absolute top-0 left-0 w-32 h-32 rounded-full border-[12px] transition-all duration-1000 ${color.replace('text', 'border')}`}
                            style={{
                                clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                                transform: `rotate(${(score / 100) * 180 - 180}deg)`
                            }}
                        />
                    </div>
                    <div className="mt-[-10px] text-center">
                        <div className={`text-2xl font-bold ${color}`}>{score}</div>
                        <div className={`text-xs uppercase tracking-wider font-bold ${color}`}>{label}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
