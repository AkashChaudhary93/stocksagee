"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { StockChart } from "@/components/stock-chart"
import { ArrowRight, BarChart3, Brain, TrendingUp, Sparkles, Globe, Shield, Zap, Activity } from "lucide-react"
import { FeaturedStocks } from "@/components/featured-stocks"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <header className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full">
              <TrendingUp className="h-6 w-6 text-white bg-slate-950 rounded-full p-0.5" />
            </div>
            <span className="text-xl font-bold">StockSage</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/chat" className="hidden sm:block">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Features
              </Button>
            </Link>
            <Link href="/chat" className="hidden sm:block">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Pricing
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 py-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-1 text-sm text-emerald-400 border border-emerald-900/50">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Financial Insights</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                Intelligent
              </span>{" "}
              Stock Market Insights
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Get real-time market analysis, stock recommendations, and financial insights powered by advanced AI.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Launch Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xs font-medium"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                <span className="text-emerald-500 font-medium">2,500+</span> active investors
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Sparkles key={star} className="h-4 w-4 text-amber-400" />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="rounded-lg border border-slate-800 bg-slate-900/50 p-1 shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StockChart />
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <FeaturedStocks />
        </motion.div>

        <motion.div
          id="features"
          className="mt-24 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-3xl font-bold">How StockSage Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-500 to-emerald-600"></div>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full bg-emerald-500/10 p-3 w-fit">
                  <Brain className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                <p className="text-slate-400">
                  Leveraging Google's Gemini AI to analyze market trends, news, and financial data to provide
                  intelligent insights.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full bg-blue-500/10 p-3 w-fit">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold">Real-time Data</h3>
                <p className="text-slate-400">
                  Access up-to-date market information, stock prices, and financial metrics to make informed investment
                  decisions.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-purple-500 to-purple-600"></div>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full bg-purple-500/10 p-3 w-fit">
                  <Globe className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-bold">Global Coverage</h3>
                <p className="text-slate-400">
                  Comprehensive analysis of markets worldwide, including stocks, ETFs, cryptocurrencies, and
                  commodities.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/60 border-slate-800 overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-600"></div>
              <CardContent className="p-6 space-y-4">
                <div className="rounded-full bg-amber-500/10 p-3 w-fit">
                  <Shield className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold">Risk Assessment</h3>
                <p className="text-slate-400">
                  Evaluate potential risks and opportunities with AI-powered analysis of market volatility and trends.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* New Pro Features Section */}
        <motion.div
          className="mt-24 space-y-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Powerful Tools for Pro Traders</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Upgrade your trading game with our advanced toolkit designed to give you the edge.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Technical Indicators</h3>
              <p className="text-sm text-slate-400">
                Visualise trends with advanced overlays like Simple Moving Averages (SMA) directly on your charts.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Activity className="h-6 w-6 text-rose-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Market Sentiment</h3>
              <p className="text-sm text-slate-400">
                Gauge the market's fear and greed levels in real-time with our intuitive Sentiment Meter.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-colors group">
              <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold mb-2">Social Feed</h3>
              <p className="text-sm text-slate-400">
                Join the conversation. See what other traders are saying and share your own insights on every stock page.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-24 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-1 text-sm text-emerald-400 border border-emerald-900/50">
                <Zap className="h-4 w-4" />
                <span>Premium Features</span>
              </div>
              <h2 className="text-3xl font-bold">Ready to make smarter investments?</h2>
              <p className="text-slate-400 max-w-md">
                Join thousands of investors using StockSage to navigate the markets with confidence.
              </p>
            </div>
            <Link href="/chat">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              >
                Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-slate-800 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full">
                  <TrendingUp className="h-5 w-5 text-white bg-slate-950 rounded-full p-0.5" />
                </div>
                <span className="font-bold">StockSage</span>
              </div>
              <p className="text-sm text-slate-500 max-w-xs">
                AI-powered stock market insights and analysis for smarter investment decisions.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Features</li>
                <li>Pricing</li>
                <li>API</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>Documentation</li>
                <li>Blog</li>
                <li>Community</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>About</li>
                <li>Careers</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            <p>© 2024 StockSage. All rights reserved. Not financial advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
