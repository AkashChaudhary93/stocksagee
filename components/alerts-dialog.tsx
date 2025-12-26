"use client"

import { useState } from "react"
import { useStockContext } from "@/context/stock-context"
import { Bell, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface AlertsDialogProps {
    symbol: string
    currentPrice: number
}

export function AlertsDialog({ symbol, currentPrice }: AlertsDialogProps) {
    const { alerts, addAlert, removeAlert } = useStockContext()
    const [targetPrice, setTargetPrice] = useState<string>(currentPrice.toString())
    const [condition, setCondition] = useState<"above" | "below">("above")
    const [open, setOpen] = useState(false)

    const symbolAlerts = (alerts || []).filter(a => a.symbol === symbol)

    const handleAdd = () => {
        if (!targetPrice) return
        addAlert(symbol, Number(targetPrice), condition)
        setTargetPrice(currentPrice.toString())
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700">
                    <Bell className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-slate-700 bg-slate-900/95 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-emerald-400" />
                        Price Alerts for {symbol}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-end gap-2">
                        <div className="grid w-full gap-1.5">
                            <Label htmlFor="price">Target Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={targetPrice}
                                onChange={(e) => setTargetPrice(e.target.value)}
                                className="bg-slate-800 border-slate-700 text-white"
                            />
                        </div>
                        <div className="grid w-full gap-1.5">
                            <Label>Condition</Label>
                            <Select value={condition} onValueChange={(val: "above" | "below") => setCondition(val)}>
                                <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                                    <SelectItem value="above">Goes Above</SelectItem>
                                    <SelectItem value="below">Goes Below</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-2 mt-2">
                        <h4 className="text-sm font-medium text-slate-400">Active Alerts</h4>
                        {symbolAlerts.length === 0 && (
                            <p className="text-xs text-slate-500 italic">No alerts set for {symbol}</p>
                        )}
                        {symbolAlerts.map(alert => (
                            <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                                <span className="text-sm font-medium">
                                    {alert.condition === 'above' ? '▲' : '▼'} {alert.condition.toUpperCase()} ${alert.targetPrice}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeAlert(alert.id)}
                                    className="h-6 w-6 text-slate-400 hover:text-rose-400"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
