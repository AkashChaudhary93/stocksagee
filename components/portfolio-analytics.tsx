"use client"

import { useStockContext } from "@/context/stock-context"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1']

export function PortfolioAnalytics() {
    const { positions } = useStockContext()

    const data = Object.values(positions).map(pos => ({
        name: pos.symbol,
        value: pos.quantity * pos.avgPrice
    })).sort((a, b) => b.value - a.value)

    if (data.length === 0) return null

    // Calculate top performer (mock logic as we don't have current price in context for all stocks efficiently without API calls)
    // For V1 we just show allocation.

    return (
        <Card className="glass-card border-slate-800/60 bg-slate-900/40">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-white">Asset Allocation</CardTitle>
                <CardDescription className="text-slate-400">Distribution of your portfolio by market value</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                itemStyle={{ color: '#f8fafc' }}
                                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Value']}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
