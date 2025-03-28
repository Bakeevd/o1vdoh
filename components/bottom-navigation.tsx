"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BookOpen, Calendar, FileText, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Главная",
      href: "/",
      icon: Home,
    },
    {
      name: "Услуги",
      href: "/services",
      icon: BookOpen,
    },
    {
      name: "Записаться",
      href: "/booking",
      icon: Calendar,
      isHighlighted: true,
    },
    {
      name: "Статьи",
      href: "/articles",
      icon: FileText,
    },
    {
      name: "Кабинет",
      href: "/profile",
      icon: User,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto glass-panel border-t border-white/20 z-50 rounded-t-xl">
      <nav className="flex justify-between px-4 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-2 px-3 text-xs relative",
                isActive ? "text-primary" : "text-slate-500",
              )}
            >
              {item.isHighlighted && (
                <span className="absolute inset-0 rounded-full animate-pulse-slow bg-primary/10 -z-10"></span>
              )}
              <div className="relative">
                <item.icon
                  className={cn(
                    "w-5 h-5 mb-1",
                    isActive ? "text-primary" : "text-slate-400",
                    item.isHighlighted && !isActive && "text-primary/80",
                  )}
                />
              </div>
              <span className={isActive ? "font-medium" : ""}>{item.name}</span>
              {isActive && (
                <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-primary/80 rounded-full" />
              )}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

