"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { useStockContext } from "@/context/stock-context"
import { CheckCircle2, XCircle, Brain, Trophy, ArrowRight } from "lucide-react"

type Question = {
    id: number
    text: string
    options: string[]
    correctIndex: number
    explanation: string
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What does 'Bull Market' mean?",
        options: ["Prices are falling", "Prices are rising", "Market is closed", "High volatility"],
        correctIndex: 1,
        explanation: "A Bull Market is a condition of a financial market in which prices are rising or are expected to rise.",
    },
    {
        id: 2,
        text: "What is a 'Dividend'?",
        options: ["A tax on stocks", "A fee paid to brokers", "A portion of profits paid to shareholders", "A type of crypto"],
        correctIndex: 2,
        explanation: "A dividend is a distribution of corporate profits to eligible shareholders.",
    },
    {
        id: 3,
        text: "Which index tracks 500 large US companies?",
        options: ["Nasdaq", "Dow Jones", "S&P 500", "Russell 2000"],
        correctIndex: 2,
        explanation: "The S&P 500 (Standard & Poor's 500) tracks the stock performance of 500 distinct large companies listed on exchanges in the US.",
    }
]

export function StockQuiz() {
    const { addXp } = useStockContext()
    const [currentIndex, setCurrentIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isAnswered, setIsAnswered] = useState(false)
    const [score, setScore] = useState(0)
    const [completed, setCompleted] = useState(false)

    const currentQuestion = QUESTIONS[currentIndex]

    const handleSelect = (index: number) => {
        if (isAnswered) return
        setSelectedOption(index)
        setIsAnswered(true)

        if (index === currentQuestion.correctIndex) {
            setScore(prev => prev + 100) // 100 XP per question
        }
    }

    const handleNext = () => {
        if (currentIndex < QUESTIONS.length - 1) {
            setCurrentIndex(prev => prev + 1)
            setSelectedOption(null)
            setIsAnswered(false)
        } else {
            setCompleted(true)
            addXp(score) // Award total XP at the end
        }
    }

    if (completed) {
        return (
            <Card className="glass-card border-slate-700 bg-gradient-to-br from-slate-900 to-indigo-950/50">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center space-y-6">
                    <div className="bg-emerald-500/20 p-6 rounded-full animate-bounce">
                        <Trophy className="h-12 w-12 text-emerald-400" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white">Quiz Completed!</h2>
                        <p className="text-slate-400">You earned <span className="text-emerald-400 font-bold">{score} XP</span> today.</p>
                    </div>
                    <Button
                        onClick={() => {
                            setCompleted(false)
                            setCurrentIndex(0)
                            setScore(0)
                            setSelectedOption(null)
                            setIsAnswered(false)
                        }}
                        variant="outline"
                        className="border-slate-700"
                    >
                        Retake Quiz
                    </Button>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="glass-card border-slate-700 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-slate-800 w-full">
                <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${((currentIndex) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <CardHeader>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Daily Challenge</span>
                    <span className="text-xs text-slate-500">{currentIndex + 1} / {QUESTIONS.length}</span>
                </div>
                <CardTitle className="text-xl md:text-2xl text-white">{currentQuestion.text}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
                {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === idx
                    const isCorrect = idx === currentQuestion.correctIndex

                    let variantClass = "border-slate-700 hover:bg-slate-800"

                    if (isAnswered) {
                        if (isCorrect) variantClass = "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                        else if (isSelected) variantClass = "border-rose-500 bg-rose-500/10 text-rose-400"
                        else variantClass = "border-slate-800 opacity-50"
                    } else if (isSelected) {
                        variantClass = "border-blue-500 bg-blue-500/10"
                    }

                    return (
                        <div
                            key={idx}
                            onClick={() => handleSelect(idx)}
                            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${variantClass}`}
                        >
                            <span className="font-medium">{option}</span>
                            {isAnswered && isCorrect && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                            {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-rose-500" />}
                        </div>
                    )
                })}

                {isAnswered && (
                    <div className="mt-4 p-4 rounded-lg bg-slate-900/50 border border-slate-800">
                        <p className="text-sm text-slate-300">
                            <span className="font-bold text-blue-400">Explanation:</span> {currentQuestion.explanation}
                        </p>
                    </div>
                )}
            </CardContent>

            <CardFooter className="justify-end">
                <Button
                    disabled={!isAnswered}
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {currentIndex === QUESTIONS.length - 1 ? 'Finish' : 'Next Question'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}
