"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowDownCircle, ArrowUpCircle, CreditCard, Building } from "lucide-react"
import { useStockContext } from "@/context/stock-context"

export function WalletDialog({ children }: { children: React.ReactNode }) {
    const { balance, deposit, withdraw } = useStockContext()
    const [amount, setAmount] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const handleDeposit = () => {
        const val = parseFloat(amount)
        if (val > 0) {
            deposit(val)
            setAmount("")
            setIsOpen(false)
        }
    }

    const handleWithdraw = () => {
        const val = parseFloat(amount)
        if (val > 0 && val <= balance) {
            withdraw(val)
            setAmount("")
            setIsOpen(false)
        } else {
            alert("Invalid amount or insufficient funds")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Wallet className="h-6 w-6 text-emerald-500" />
                        My Wallet
                    </DialogTitle>
                    <DialogDescription className="text-slate-400">
                        Manage your funds. Current Balance: <span className="text-emerald-400 font-bold">${balance.toLocaleString()}</span>
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="deposit" className="w-full mt-4">
                    <TabsList className="grid w-full grid-cols-2 bg-slate-800">
                        <TabsTrigger value="deposit">Deposit</TabsTrigger>
                        <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
                    </TabsList>

                    <TabsContent value="deposit" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="deposit-amount">Amount to Deposit</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                                <Input
                                    id="deposit-amount"
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-7 bg-slate-800 border-slate-700 focus:ring-emerald-500"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3 text-sm text-slate-400">
                            <CreditCard className="h-4 w-4" />
                            <span>Linked Bank Account (**** 4242)</span>
                        </div>
                        <Button onClick={handleDeposit} className="w-full bg-emerald-600 hover:bg-emerald-700">
                            <ArrowDownCircle className="mr-2 h-4 w-4" /> Confirm Deposit
                        </Button>
                    </TabsContent>

                    <TabsContent value="withdraw" className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="withdraw-amount">Amount to Withdraw</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-slate-400">$</span>
                                <Input
                                    id="withdraw-amount"
                                    type="number"
                                    placeholder="0.00"
                                    className="pl-7 bg-slate-800 border-slate-700 focus:ring-rose-500"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                            <p className="text-xs text-slate-500">Available: ${balance.toLocaleString()}</p>
                        </div>
                        <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3 text-sm text-slate-400">
                            <Building className="h-4 w-4" />
                            <span>Transfer to Bank (**** 4242)</span>
                        </div>
                        <Button onClick={handleWithdraw} className="w-full bg-slate-700 hover:bg-slate-600">
                            <ArrowUpCircle className="mr-2 h-4 w-4" /> Confirm Withdrawal
                        </Button>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
