"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, X, Minimize2, Maximize2, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
    id: string
    role: "user" | "assistant"
    content: string
}

export function AnalystChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm StockSage AI. Ask me about market trends, specific stocks, or investment strategies."
        }
    ])
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages])

    const handleSend = async () => {
        if (!input.trim()) return

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input
        }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: userMsg.content })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch response")
            }

            const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response. Please try again."

            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: aiResponse
            }
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error("Chat Error:", error)
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Sorry, I'm having trouble connecting to the market data server right now. Please check your connection."
            }
            setMessages(prev => [...prev, errorMsg])
        } finally {
            setIsTyping(false)
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 z-50 shadow-2xl"
                    >
                        <Card className="border-slate-700 bg-slate-900/95 backdrop-blur-xl text-white shadow-xl ring-1 ring-slate-800">
                            <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-slate-800">
                                <CardTitle className="text-sm font-bold flex items-center gap-2">
                                    <div className="bg-emerald-500/20 p-1.5 rounded-lg">
                                        <Bot className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    StockSage AI Analyst
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white" onClick={() => setIsOpen(false)}>
                                        <Minimize2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-80 p-4" ref={scrollRef}>
                                    <div className="space-y-4">
                                        {messages.map((m) => (
                                            <div
                                                key={m.id}
                                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user"
                                                        ? "bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-br-none"
                                                        : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                                                        }`}
                                                >
                                                    {m.content}
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-3 border border-slate-700">
                                                    <div className="flex gap-1">
                                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                        <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                                <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault()
                                            handleSend()
                                        }}
                                        className="flex gap-2"
                                    >
                                        <Input
                                            placeholder="Ask about a stock..."
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            className="bg-slate-800 border-slate-700 text-white focus-visible:ring-emerald-500"
                                        />
                                        <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700">
                                            <Send className="h-4 w-4" />
                                        </Button>
                                    </form>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-lg shadow-emerald-500/25 flex items-center justify-center text-white z-50 transition-all hover:shadow-emerald-500/40"
                >
                    <Sparkles className="h-6 w-6" />
                </motion.button>
            )}
        </>
    )
}
