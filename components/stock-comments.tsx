"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, ThumbsUp, Send } from "lucide-react"

interface Comment {
    id: string
    user: string
    avatar?: string
    text: string
    time: string
    likes: number
    sentiment: "bullish" | "bearish" | "neutral"
}

export function StockComments({ symbol }: { symbol: string }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [input, setInput] = useState("")

    useEffect(() => {
        // Initial mocked comments
        setComments([
            { id: "1", user: "MoonWalker99", text: `${symbol} looking strong today! 🚀`, time: "2m ago", likes: 12, sentiment: "bullish" },
            { id: "2", user: "BearTrap", text: "Resistance at $150 is heavy.", time: "15m ago", likes: 4, sentiment: "bearish" },
            { id: "3", user: "ValueInvestor", text: "Adding to my long term position.", time: "1h ago", likes: 8, sentiment: "bullish" },
        ])
    }, [symbol])

    const handleSend = () => {
        if (!input.trim()) return
        const newComment: Comment = {
            id: Math.random().toString(),
            user: "Me",
            text: input,
            time: "Just now",
            likes: 0,
            sentiment: "neutral"
        }
        setComments(prev => [newComment, ...prev])
        setInput("")
    }

    return (
        <Card className="glass-card border-slate-700 bg-slate-900/50">
            <CardHeader className="pb-3 border-b border-slate-800/50">
                <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {symbol} Discussion
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Share your thoughts..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="bg-slate-800/50 border-slate-700 focus-visible:ring-emerald-500/50"
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    />
                    <Button size="icon" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSend}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>

                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {comments.map(comment => (
                        <div key={comment.id} className="flex gap-3">
                            <Avatar className="h-8 w-8 border border-slate-700">
                                <AvatarFallback className="bg-slate-800 text-xs">{comment.user[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <span className={`text-xs font-bold ${comment.user === "Me" ? "text-emerald-400" : "text-white"}`}>{comment.user}</span>
                                    <span className="text-[10px] text-slate-500">{comment.time}</span>
                                </div>
                                <p className="text-sm text-slate-300 mt-0.5">{comment.text}</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-emerald-400 transition-colors">
                                        <ThumbsUp className="h-3 w-3" /> {comment.likes}
                                    </button>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${comment.sentiment === "bullish" ? "bg-emerald-500/10 text-emerald-500" :
                                            comment.sentiment === "bearish" ? "bg-rose-500/10 text-rose-500" :
                                                "bg-slate-700/50 text-slate-400"
                                        }`}>
                                        {comment.sentiment.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
