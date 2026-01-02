"use client"

import { Home, Dumbbell, Apple, User, Trophy, ChartArea } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "workout", label: "Treino", icon: Dumbbell },
    { id: "nutrition", label: "Nutrição", icon: Apple },
    { id: "profile", label: "Perfil", icon: User },
    { id: "social-midia", label: "Social", icon: ChartArea },
    { id: "ranking", label: "Ranking", icon: Trophy },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-around px-4 py-3">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id

            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 min-w-16 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className={cn("p-2 rounded-xl transition-colors", isActive && "bg-primary/20")}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
