"use client"

import { useState } from "react"
import { TypingEffect } from "@/components/typing-effect"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Info, TrendingUp, BarChart2, DollarSign, AlertTriangle } from "lucide-react"

interface MessageFormatterProps {
  content: string
  isTyping: boolean
  onTypingComplete?: () => void
}

export function MessageFormatter({ content, isTyping, onTypingComplete }: MessageFormatterProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({})

  // Parse the message to identify sections and format them
  const formatMessage = (message: string) => {
    // Check if the message has sections
    if (!message.includes("**")) return { hasSections: false, content: message }

    // Split by sections (marked with **)
    const sections = message.split(/\*\*(.*?)\*\*/).filter(Boolean)

    return {
      hasSections: sections.length > 1,
      sections: sections.map((section, index) => {
        if (index % 2 === 0) return { type: "text", content: section }
        return { type: "heading", content: section }
      }),
    }
  }

  const getIconForSection = (heading: string) => {
    const lowerHeading = heading.toLowerCase()
    if (lowerHeading.includes("market") || lowerHeading.includes("trend")) return <TrendingUp className="h-4 w-4" />
    if (lowerHeading.includes("analysis") || lowerHeading.includes("performance"))
      return <BarChart2 className="h-4 w-4" />
    if (lowerHeading.includes("recommendation") || lowerHeading.includes("advice"))
      return <DollarSign className="h-4 w-4" />
    if (lowerHeading.includes("risk") || lowerHeading.includes("warning")) return <AlertTriangle className="h-4 w-4" />
    return <Info className="h-4 w-4" />
  }

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  const parsedMessage = formatMessage(content)

  if (!parsedMessage.hasSections) {
    return isTyping ? (
      <TypingEffect text={content} className="whitespace-pre-wrap" onComplete={onTypingComplete} />
    ) : (
      <div className="whitespace-pre-wrap">{content}</div>
    )
  }

  return (
    <div className="space-y-3">
      {isTyping ? (
        <TypingEffect text={content} className="whitespace-pre-wrap" onComplete={onTypingComplete} />
      ) : (
        parsedMessage.sections.map((section, index) => {
          if (section.type === "heading") {
            const sectionIndex = Math.floor(index / 2)
            const isExpanded = expandedSections[sectionIndex] !== false // Default to expanded

            return (
              <div key={index} className="mb-2">
                <div
                  className="flex items-center justify-between bg-slate-800/50 p-2 rounded-md cursor-pointer hover:bg-slate-800/80 transition-colors"
                  onClick={() => toggleSection(sectionIndex)}
                >
                  <div className="flex items-center gap-2">
                    {getIconForSection(section.content)}
                    <Badge variant="outline" className="font-semibold text-emerald-400 bg-emerald-950/30">
                      {section.content}
                    </Badge>
                  </div>
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>

                {isExpanded && parsedMessage.sections[index + 1] && (
                  <div className="mt-2 pl-4 border-l-2 border-slate-700 ml-2 text-slate-300">
                    {parsedMessage.sections[index + 1].content}
                  </div>
                )}
              </div>
            )
          }
          return null
        })
      )}
    </div>
  )
}
