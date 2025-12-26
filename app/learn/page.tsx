"use client"

import { StockQuiz } from "@/components/stock-quiz"
import { BackgroundCandles } from "@/components/background-candles"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, GraduationCap } from "lucide-react"
import { UserProfile } from "@/components/user-profile"

export default function LearnPage() {
    const router = useRouter()

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white relative font-sans overflow-hidden">
            <BackgroundCandles />

            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md p-4 sticky top-0 z-50">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/chat")}
                            className="text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 rounded-full">
                                <GraduationCap className="h-5 w-5 text-white bg-slate-900 rounded-full p-0.5" />
                            </div>
                            <span className="font-bold text-lg text-gradient">StockSage Academy</span>
                        </div>
                    </div>
                    <UserProfile />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-6 container mx-auto max-w-4xl relative z-10 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold">StockIQ Learning Center</h1>
                    <p className="text-slate-400">Master the markets one quiz at a time.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <StockQuiz />
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-900/40 to-slate-900 border border-emerald-500/20">
                            <h3 className="font-bold flex items-center gap-2 mb-3">
                                <BookOpen className="h-4 w-4 text-emerald-400" />
                                Lesson of the Day
                            </h3>
                            <h4 className="text-lg font-semibold text-white mb-2">Understanding P/E Ratio</h4>
                            <p className="text-sm text-slate-400 leading-relaxed mb-4">
                                The Price-to-Earnings ratio helps you determine if a stock is overvalued or undervalued relative to its earnings.
                            </p>
                            <Button variant="link" className="text-emerald-400 p-0 h-auto">
                                Read full article &rarr;
                            </Button>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <h3 className="font-bold text-slate-300 mb-4">Your Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-slate-400">Beginner Investor</span>
                                        <span className="text-slate-200">3/10 Quizzes</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[30%]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
