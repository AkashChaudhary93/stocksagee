"use client"

import { useStockContext } from "@/context/stock-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react"

export function TransactionHistory() {
    const { transactions } = useStockContext()

    return (
        <Card className="glass-card border-slate-800/60 bg-slate-900/40 mt-8">
            <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                    <History className="w-5 h-5 text-indigo-400" /> Transaction History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transactions.length === 0 ? (
                        <div className="text-center text-slate-500 py-4">No transactions yet.</div>
                    ) : (
                        transactions.map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 border border-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${tx.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400' :
                                            tx.type === 'SELL' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
                                        }`}>
                                        {tx.type === 'BUY' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{tx.symbol}</div>
                                        <div className="text-xs text-slate-400">{new Date(tx.date).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`font-bold ${tx.type === 'BUY' ? 'text-white' : 'text-emerald-400'
                                        }`}>
                                        {tx.type === 'BUY' ? '-' : '+'}${tx.amount.toFixed(2)}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        {tx.quantity} @ ${tx.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
