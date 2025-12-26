"use client"

import { useStockContext } from "@/context/stock-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trophy, Lock } from "lucide-react"

interface AchievementsListProps {
    children?: React.ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
}

export function AchievementsList({ children, open, onOpenChange }: AchievementsListProps) {
    const { badges } = useStockContext()

    const unlockedCount = badges.filter(b => b.unlockedAt).length

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {children && (
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
            )}
            <DialogContent className="glass-card border-slate-700 bg-slate-900/95 text-white max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Trophy className="h-6 w-6 text-yellow-500" />
                        Achievements
                        <span className="text-sm font-normal text-slate-400 ml-auto">
                            {unlockedCount} / {badges.length} Unlocked
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[400px] pr-4 mt-4">
                    <div className="space-y-4">
                        {badges.map(badge => {
                            const isUnlocked = !!badge.unlockedAt
                            return (
                                <div
                                    key={badge.id}
                                    className={`relative p-4 rounded-xl border ${isUnlocked ? "bg-slate-800/50 border-emerald-500/30" : "bg-slate-900/30 border-slate-800"}`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`text-3xl ${isUnlocked ? "" : "opacity-20 grayscale"}`}>
                                            {badge.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className={`font-bold ${isUnlocked ? "text-white" : "text-slate-500"}`}>
                                                {badge.name}
                                            </h4>
                                            <p className="text-sm text-slate-400 mt-1">
                                                {badge.description}
                                            </p>
                                            {isUnlocked && (
                                                <p className="text-[10px] text-emerald-400 mt-2 font-mono">
                                                    UNLOCKED: {new Date(badge.unlockedAt!).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                        {!isUnlocked && (
                                            <Lock className="absolute top-4 right-4 h-4 w-4 text-slate-600" />
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}
