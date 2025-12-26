import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { StockProvider } from "@/context/stock-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { AnalystChat } from "@/components/analyst-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StockSage - AI-Powered Stock Market Insights",
  description: "Get intelligent stock market analysis and investment insights powered by AI",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <StockProvider>
            {children}
            <AnalystChat />
            <Toaster />
          </StockProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
