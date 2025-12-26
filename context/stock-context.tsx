"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

export type TransactionType = "BUY" | "SELL" | "CASHOUT" | "DEPOSIT" | "WITHDRAWAL"

export interface Transaction {
    id: string
    symbol: string
    type: TransactionType
    amount: number // Total dollar value
    price: number // Price per share at transaction
    quantity: number
    date: string
}

export interface Position {
    symbol: string
    quantity: number
    avgPrice: number
    stopLoss?: number
    takeProfit?: number
}

export interface Alert {


    id: string
    symbol: string
    targetPrice: number
    condition: "above" | "below"
    active: boolean
}

export interface Badge {
    id: string
    name: string
    description: string
    icon: string
    unlockedAt?: string
}

interface StockContextType {
    balance: number
    positions: Record<string, Position>
    transactions: Transaction[]
    watchlist: string[]
    alerts: Alert[]
    xp: number
    level: number
    badges: Badge[]
    buyStock: (symbol: string, quantity: number, price: number, stopLoss?: number, takeProfit?: number) => void
    sellStock: (symbol: string, quantity: number, price: number) => void
    deposit: (amount: number) => void
    withdraw: (amount: number) => void
    cashoutStock: (symbol: string, currentPrice: number) => void
    addToWatchlist: (symbol: string) => void
    removeFromWatchlist: (symbol: string) => void
    addAlert: (symbol: string, targetPrice: number, condition: "above" | "below") => void
    removeAlert: (id: string) => void
    addXp: (amount: number) => void
    unlockBadge: (badgeId: string) => void
}

const StockContext = createContext<StockContextType | undefined>(undefined)

export function StockProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState(565423.00)
    const [positions, setPositions] = useState<Record<string, Position>>({})
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [watchlist, setWatchlist] = useState<string[]>(["NVDA", "AMD", "AAPL", "MSFT"])
    const [alerts, setAlerts] = useState<Alert[]>([])
    const [xp, setXp] = useState(0)
    const [badges, setBadges] = useState<Badge[]>([
        { id: "first_trade", name: "First Steps", description: "Complete your first trade", icon: "👣" },
        { id: "big_spender", name: "Big Spender", description: "Trade over $10,000 in one go", icon: "💰" },
        { id: "diamond_hands", name: "Diamond Hands", description: "Hold a stock for a long time", icon: "💎" },
        { id: "wolf", name: "Wolf of Wall St", description: "Reach Level 10", icon: "🐺" }
    ])

    const level = Math.floor(xp / 1000) + 1

    // Persist to local storage
    useEffect(() => {
        const saved = localStorage.getItem("stockSageData")
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (parsed.balance) setBalance(parsed.balance)
                if (parsed.positions) setPositions(parsed.positions)
                if (parsed.transactions) setTransactions(parsed.transactions)
                if (parsed.watchlist) setWatchlist(parsed.watchlist)
                if (parsed.alerts) setAlerts(parsed.alerts)
                if (parsed.xp) setXp(parsed.xp)
                if (parsed.badges) setBadges(parsed.badges)
            } catch (e) {
                console.error("Failed to load saved data")
            }
        }
    }, [])

    useEffect(() => {
        const data = { balance, positions, transactions, watchlist, alerts, xp, badges }
        localStorage.setItem("stockSageData", JSON.stringify(data))
    }, [balance, positions, transactions, watchlist, alerts, xp, badges])

    const unlockBadge = (badgeId: string) => {
        setBadges(prev => prev.map(b => {
            if (b.id === badgeId && !b.unlockedAt) {
                // Trigger Toast Here (Managed by UI mostly, but state update is here)
                return { ...b, unlockedAt: new Date().toISOString() }
            }
            return b
        }))
    }

    const addXp = (amount: number) => {
        setXp(prev => prev + amount)
    }

    const addTransaction = (symbol: string, type: TransactionType, amount: number, price: number, quantity: number) => {
        const newTx: Transaction = {
            id: Math.random().toString(36).substr(2, 9),
            symbol,
            type,
            amount,
            price,
            quantity,
            date: new Date().toISOString()
        }
        setTransactions(prev => [newTx, ...prev])
    }

    const buyStock = (symbol: string, quantity: number, price: number, stopLoss?: number, takeProfit?: number) => {
        const cost = quantity * price
        if (cost > balance) {
            throw new Error("Insufficient funds")
        }

        setBalance(prev => prev - cost)

        setPositions(prev => {
            const current = prev[symbol]
            if (current) {
                const totalQuantity = current.quantity + quantity
                // Weighted average price
                const totalCost = (current.quantity * current.avgPrice) + cost
                const newAvgPrice = totalCost / totalQuantity

                return {
                    ...prev,
                    [symbol]: {
                        ...current,
                        quantity: totalQuantity,
                        avgPrice: newAvgPrice,
                        stopLoss: stopLoss || current.stopLoss,
                        takeProfit: takeProfit || current.takeProfit
                    }
                }
            } else {
                return {
                    ...prev,
                    [symbol]: {
                        symbol,
                        quantity,
                        avgPrice: price,
                        stopLoss,
                        takeProfit
                    }
                }
            }
        })

        addTransaction(symbol, "BUY", cost, price, quantity)
        addXp(100) // 100 XP per trade
        unlockBadge("first_trade")
        if (cost > 10000) unlockBadge("big_spender")
    }

    const sellStock = (symbol: string, quantity: number, price: number) => {
        const current = positions[symbol]
        if (!current || current.quantity < quantity) {
            console.error("Invalid sell operation")
            return
        }

        const revenue = quantity * price
        setBalance(prev => prev + revenue)

        setPositions(prev => {
            const currentPos = prev[symbol]
            const newQuantity = currentPos.quantity - quantity

            if (newQuantity <= 0) {
                const { [symbol]: _, ...rest } = prev
                return rest
            }

            return {
                ...prev,
                [symbol]: { ...currentPos, quantity: newQuantity }
            }
        })

        addTransaction(symbol, "SELL", revenue, price, quantity)
    }

    const deposit = (amount: number) => {
        setBalance(prev => prev + amount)
        addTransaction("USD", "DEPOSIT", amount, 1, amount)
        toast.success(`Deposited $${amount.toLocaleString()}`)
    }

    const withdraw = (amount: number) => {
        if (amount > balance) {
            throw new Error("Insufficient funds")
        }
        setBalance(prev => prev - amount)
        addTransaction("USD", "WITHDRAWAL", amount, 1, amount)
        toast.success(`Withdrew $${amount.toLocaleString()}`)
    }

    const cashoutStock = (symbol: string, currentPrice: number) => {
        const current = positions[symbol]
        if (!current) return
        sellStock(symbol, current.quantity, currentPrice)
    }

    const addToWatchlist = (symbol: string) => {
        if (!watchlist.includes(symbol)) {
            setWatchlist(prev => [...prev, symbol])
        }
    }

    const removeFromWatchlist = (symbol: string) => {
        setWatchlist(prev => prev.filter(s => s !== symbol))
    }

    const addAlert = (symbol: string, targetPrice: number, condition: "above" | "below") => {
        const newAlert: Alert = {
            id: Math.random().toString(36).substr(2, 9),
            symbol,
            targetPrice,
            condition,
            active: true
        }
        setAlerts(prev => [...prev, newAlert])
    }

    const removeAlert = (id: string) => {
        setAlerts(prev => prev.filter(a => a.id !== id))
    }

    return (
        <StockContext.Provider value={{
            balance,
            positions,
            transactions,
            watchlist,
            alerts,
            buyStock,
            sellStock,
            deposit,
            withdraw,
            cashoutStock,
            addToWatchlist,
            removeFromWatchlist,
            addAlert,
            removeAlert,
            xp,
            level,
            badges,
            addXp,
            unlockBadge
        }}>
            {children}
        </StockContext.Provider>
    )
}

export function useStockContext() {
    const context = useContext(StockContext)
    if (context === undefined) {
        throw new Error("useStockContext must be used within a StockProvider")
    }
    return context
}
