"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, ExternalLink, Calendar, Clock } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function NewsFeed() {
    const [selectedNews, setSelectedNews] = useState<typeof news[0] | null>(null)

    const news = [
        {
            title: "NVIDIA surges 5% on new AI chip announcement",
            source: "TechDaily",
            time: "2h ago",
            sentiment: "positive",
            url: "https://nvidianews.nvidia.com/",
            description: "NVIDIA has unveiled its latest generation of AI accelerators, promising a 40% performance boost over previous models. Analysts predict this could solidify the company's dominance in the data center market for years to come. The stock reacted positively in pre-market trading, reaching new all-time highs as demand for AI compute continues to outstrip supply."
        },
        {
            title: "Fed signals potential rate cuts later this year",
            source: "MarketWatch",
            time: "4h ago",
            sentiment: "positive",
            url: "https://www.marketwatch.com/economy-politics/federal-reserve",
            description: "In a recent statement, the Federal Reserve Chair hinted that inflation data is moving in the right direction, opening the door for interest rate cuts as early as Q3. Markets rallied on the news, with small-cap stocks leading the charge. This dovish pivot suggests the central bank is confident in a 'soft landing' scenario."
        },
        {
            title: "Tesla recalls 2 million vehicles over autopilot concerns",
            source: "AutoNews",
            time: "5h ago",
            sentiment: "negative",
            url: "https://www.autonews.com/",
            description: "Tesla is issuing a voluntary recall for over 2 million vehicles to update Autopilot software safeguards. The move comes after regulatory scrutiny regarding driver attentiveness while the system is engaged. While the fix is a simple over-the-air update, the headline has caused some short-term volatility in the stock price."
        },
        {
            title: "Apple Vision Pro sales exceed expectations",
            source: "Bloomberg",
            time: "6h ago",
            sentiment: "positive",
            url: "https://www.bloomberg.com/technology",
            description: "Early sales figures for the Apple Vision Pro headset have surpassed analyst estimates, with initial inventory selling out within hours. Despite the high price tag, consumer interest in Apple's spatial computing vision appears robust. Tech reviewers have praised the display technology while noting areas for software improvement."
        }
    ]

    return (
        <>
            <Card className="glass-card border-slate-800/60 bg-slate-900/40">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <Newspaper className="w-5 h-5 text-blue-400" /> Market News
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {news.map((item, i) => (
                            <div
                                key={i}
                                className="border-b border-slate-800/50 pb-3 last:border-0 last:pb-0 group cursor-pointer"
                                onClick={() => setSelectedNews(item)}
                            >
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                <div className="flex items-center justify-between mt-1">
                                    <span className="text-xs text-slate-500">{item.source} • {item.time}</span>
                                    <div className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${item.sentiment === 'positive' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                                        }`}>
                                        {item.sentiment}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
                <DialogContent className="bg-slate-900 border-slate-800 sm:max-w-[500px]">
                    <DialogHeader>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={`
                                ${selectedNews?.sentiment === 'positive' ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-rose-500/30 text-rose-400 bg-rose-500/10'}
                            `}>
                                {selectedNews?.sentiment.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {selectedNews?.time}
                            </span>
                        </div>
                        <DialogTitle className="text-xl font-bold leading-tight">{selectedNews?.title}</DialogTitle>
                        <DialogDescription className="text-slate-400 font-medium">
                            Source: {selectedNews?.source}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-2">
                        <p className="text-slate-300 leading-relaxed text-sm">
                            {selectedNews?.description}
                        </p>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            onClick={() => selectedNews?.url && window.open(selectedNews.url, '_blank')}
                        >
                            Read Full Article <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
