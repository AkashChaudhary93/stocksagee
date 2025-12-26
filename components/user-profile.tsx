"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, ChevronDown, LogOut, Settings, UserIcon, Wallet, Star, BookOpen, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AchievementsList } from "@/components/achievements-list"

import { useStockContext } from "@/context/stock-context"
import { useRouter } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"

const MOCK_NOTIFICATIONS = [
  { id: 1, title: "AAPL Up 5%", message: "Apple Inc. started the day strong with a +5% gain.", time: "10m ago", read: false },
  { id: 2, title: "Badge Unlocked", message: "You earned the 'First Trade' badge!", time: "1h ago", read: false },
  { id: 3, title: "Market Alert", message: "CPI Data release caused high volatility.", time: "2h ago", read: false },
  { id: 4, title: "Dividend Received", message: "You received $4.50 from your MSFT holdings.", time: "4h ago", read: true },
  { id: 5, title: "New Feature", message: "Check out the new Market Sentiment Meter.", time: "1d ago", read: true },
  { id: 6, title: "TSLA Target Hit", message: "Tesla hit your buy target of $250.", time: "1d ago", read: true },
  { id: 7, title: "Weekly Report", message: "Your weekly portfolio performance report is ready.", time: "2d ago", read: true },
  { id: 8, title: "Analyst Upgrade", message: "Nvidia (NVDA) upgraded to 'Strong Buy'.", time: "2d ago", read: true },
  { id: 9, title: "Portfolio Update", message: "Your portfolio is up 12% this week. Great job!", time: "3d ago", read: true },
  { id: 10, title: "Security Alert", message: "New login detected from San Francisco, CA.", time: "5d ago", read: true },
]

export function UserProfile() {
  const { xp, level } = useStockContext()
  const router = useRouter()
  const [notifications, setNotifications] = useState(3)
  const [showAchievements, setShowAchievements] = useState(false)

  return (
    <div className="flex items-center gap-2">
      <AchievementsList open={showAchievements} onOpenChange={setShowAchievements} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-white hover:bg-slate-800">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-[10px] text-white">
                {notifications}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 bg-slate-900 border-slate-800">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            <span className="text-xs text-blue-400 cursor-pointer hover:underline" onClick={() => setNotifications(0)}>Mark all as read</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />
          <ScrollArea className="h-[300px]">
            {MOCK_NOTIFICATIONS.map((note) => (
              <DropdownMenuItem key={note.id} className="cursor-pointer hover:bg-slate-800 items-start gap-3 p-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${note.read ? 'bg-slate-600' : 'bg-blue-500'}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none text-white">{note.title}</p>
                  <p className="text-xs text-slate-400">{note.message}</p>
                  <p className="text-[10px] text-slate-500">{note.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-2 hover:bg-slate-800">
            <Avatar className="h-8 w-8 border-2 border-emerald-600">
              <AvatarFallback className="bg-slate-800 text-emerald-500">JD</AvatarFallback>
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-medium">John Doe</span>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="px-1 py-0 h-4 text-[10px] bg-emerald-950/30 text-emerald-400 border-emerald-800"
                >
                  Lvl {level}
                </Badge>
                <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${(xp % 1000) / 10}%` }}
                  />
                </div>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-slate-800">
          <DropdownMenuLabel className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-emerald-600 to-blue-600 p-0.5 rounded-full">
              <Avatar className="h-10 w-10 border-2 border-slate-900">
                <AvatarFallback className="bg-slate-800 text-emerald-500">JD</AvatarFallback>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
              </Avatar>
            </div>
            <div>
              <div className="font-bold">John Doe</div>
              <div className="text-xs text-slate-400">john.doe@example.com</div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-slate-800">
            <UserIcon className="h-4 w-4 text-slate-400" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-slate-800">
            <Wallet className="h-4 w-4 text-slate-400" />
            <span>Portfolio</span>
            <Badge className="ml-auto bg-emerald-600 text-[10px]">New</Badge>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-slate-800">
            <Star className="h-4 w-4 text-slate-400" />
            <span>Watchlist</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-800"
            onClick={() => router.push('/learn')}
          >
            <BookOpen className="h-4 w-4 text-slate-400" />
            <span>Learning Center</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 cursor-pointer hover:bg-slate-800"
            onSelect={() => setShowAchievements(true)}
          >
            <Trophy className="h-4 w-4 text-emerald-400" />
            <span>Achievements</span>
            <Badge className="ml-auto bg-yellow-500/20 text-yellow-500 border-yellow-500/50 text-[10px]">Profile</Badge>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-800" />
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer hover:bg-slate-800">
            <Settings className="h-4 w-4 text-slate-400" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-2 text-red-500 cursor-pointer hover:bg-slate-800"
            onClick={() => router.push('/')}
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
