import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavigation from "@/components/bottom-navigation"
import { AuthProvider } from "@/context/auth-context"
import { BookingProvider } from "@/context/booking-context"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "Вдохновение",
  description: "Центр духовного развития и практик",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} gradient-bg min-h-screen pb-24`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            <BookingProvider>
              <div className="flex flex-col min-h-screen max-w-4xl mx-auto relative pb-16">
                <main className="flex-1">{children}</main>
                <BottomNavigation />
              </div>
            </BookingProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'