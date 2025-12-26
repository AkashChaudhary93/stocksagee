"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundCandles } from "@/components/background-candles"
import { TrendingUp, ArrowRight, Loader2, Github, Mail } from "lucide-react"

export default function LoginPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            router.push("/chat")
        }, 1500)
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 text-white relative font-sans overflow-hidden p-4">
            <BackgroundCandles />

            <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full">
                        <TrendingUp className="h-6 w-6 text-white bg-slate-950 rounded-full p-0.5" />
                    </div>
                    <span className="text-xl font-bold">StockSage</span>
                </Link>
            </div>

            <Card className="w-full max-w-md glass-card border-slate-800/60 bg-slate-900/60 relative z-10 backdrop-blur-xl shadow-2xl">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold text-white">Welcome back</CardTitle>
                    <CardDescription className="text-slate-400">
                        Enter your credentials to access your dashboard
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300">
                            <Github className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline" className="border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300">
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-700" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                className="bg-slate-950/50 border-slate-800 text-white placeholder:text-slate-500"
                                defaultValue="demo@stocksage.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                className="bg-slate-950/50 border-slate-800 text-white"
                                defaultValue="password123"
                                required
                            />
                        </div>
                        <Button disabled={isLoading} className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2 text-center text-sm text-slate-500">
                    <div>
                        Don&apos;t have an account?{" "}
                        <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </div>
                    <Link href="/login" className="text-xs hover:text-slate-300">
                        Forgot your password?
                    </Link>
                </CardFooter>
            </Card>

            <div className="mt-8 text-center text-xs text-slate-500 max-w-sm relative z-10">
                By clicking continue, you agree to our Terms of Service and Privacy Policy.
            </div>
        </div>
    )
}
