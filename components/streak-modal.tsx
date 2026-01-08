"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Flame, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { DialogTitle } from "@radix-ui/react-dialog"

interface StreakModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StreakModal({ open, onOpenChange }: StreakModalProps) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const activeDays = [0, 1, 2] // Segunda, Terça, Quarta ativas

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm p-0 gap-0 bg-card border-2 border-border overflow-hidden">
        <DialogTitle />
        {/* Close Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-2 z-10 w-8 h-8 rounded-full"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="p-6 space-y-6">
          {/* Flame Icon and Streak */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-destructive/20 to-destructive/5 flex items-center justify-center">
                <div className="relative">
                  <Flame className="w-16 h-16 text-destructive fill-destructive" />
                  <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full" />
                </div>
              </div>
            </div>
            <div>
              <p className="text-5xl font-bold mb-1">147</p>
              <p className="text-lg text-foreground">dias</p>
              <p className="text-sm text-muted-foreground mt-1">Sequência ativa</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-destructive to-primary rounded-full"
                style={{ width: "43%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">3 de 7 dias concluídos esta semana</p>
          </div>

          {/* Week Days */}
          <div className="flex justify-between gap-2">
            {days.map((day, index) => (
              <div key={day} className={cn("flex flex-col items-center gap-2 flex-1")}>
                <div
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center transition-all",
                    activeDays.includes(index)
                      ? "bg-destructive text-white shadow-lg shadow-destructive/30"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {activeDays.includes(index) ? (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            className="w-full h-14 bg-destructive hover:bg-destructive/90 text-white font-semibold text-lg rounded-2xl"
            onClick={() => onOpenChange(false)}
          >
            Continuar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
