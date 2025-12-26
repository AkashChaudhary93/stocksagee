"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PieChart, Zap, Droplet, Heart, ShoppingCart } from "lucide-react"

const SECTORS = [
    { name: "Technology", value: 75, change: "+2.4%", color: "bg-blue-500", icon: Zap },
    { name: "Finance", value: 45, change: "+0.8%", color: "bg-emerald-500", icon: PieChart },
    { name: "Healthcare", value: 30, change: "-1.2%", color: "bg-rose-500", icon: Heart },
    { name: "Energy", value: 60, change: "+1.5%", color: "bg-yellow-500", icon: Droplet },
    { name: "Consumer", value: 55, change: "+0.5%", color: "bg-purple-500", icon: ShoppingCart },
]

export function SectorPerformance() {
    return (
        <Card className="glass-card border-slate-800/60 p-0 overflow-hidden">
            <CardHeader className="border-b border-slate-800/50 pb-4">
                <div className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-indigo-400" />
                    <h3 className="font-bold text-slate-200">Sector Performance</h3>
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-6">
                {SECTORS.map((sector) => (
                    <div key={sector.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-slate-300">
                                <sector.icon className="h-3 w-3 text-slate-500" />
                                <span className="font-medium">{sector.name}</span>
                            </div>
                            <span className={`font-bold ${sector.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                {sector.change}
                            </span>
                        </div>
                        <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full ${sector.color}`}
                                style={{ width: `${sector.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}
