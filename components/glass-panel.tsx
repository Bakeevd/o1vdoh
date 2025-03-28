import type React from "react"
import { cn } from "@/lib/utils"

export default function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("bg-white/40 backdrop-blur-md border border-white/30 rounded-2xl shadow-sm p-5", className)}>
      {children}
    </div>
  )
}

