"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, MoreVertical, Play, Pause, Volume2, Maximize, Clock, Repeat } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface WorkoutDetailsProps {
  exerciseId: string
  onBack: () => void
}

export function WorkoutDetails({ exerciseId, onBack }: WorkoutDetailsProps) {
  const progressData = [
    { day: "Seg", weight: 40 },
    { day: "Ter", weight: 42 },
    { day: "Qua", weight: 44 },
    { day: "Qui", weight: 45 },
    { day: "Sex", weight: 47.5 },
    { day: "Sáb", weight: 47.5 },
    { day: "Dom", weight: 48 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <Button size="icon" variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Button size="icon" variant="ghost">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </header>

      {/* Video Player */}
      <div className="relative mx-4 mb-6">
        <div className="aspect-video rounded-2xl overflow-hidden bg-muted relative">
          <img
            src="/person-doing-concentration-curl-with-dumbbell.jpg"
            alt="Exercício"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <Button size="icon" className="w-16 h-16 rounded-full bg-primary/90 hover:bg-primary">
              <Pause className="w-8 h-8" />
            </Button>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-center gap-3 mb-2">
              <Play className="w-4 h-4 text-white" />
              <span className="text-xs text-white font-medium">0:00 - 5:40</span>
              <div className="flex-1">
                <Progress value={30} className="h-1" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button size="icon" variant="ghost" className="w-8 h-8 text-white hover:bg-white/20">
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="ghost" className="w-8 h-8 text-white hover:bg-white/20">
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Info */}
      <div className="px-4 space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Rosca Concentrada</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>15 min</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Repeat className="w-4 h-4" />
                <span>3 séries</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sente-se em um banco, incline-se para frente e apoie o cotovelo na parte interna da coxa. Faça a rosca do
              haltere de forma controlada, focando no bíceps.
            </p>
          </div>
        </div>

        {/* Workout Log */}
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Registro de Treino</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm font-medium">Série 1</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">12 reps × </span>
                    <span className="font-semibold text-primary">15kg</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    ✓
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm font-medium">Série 2</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-muted-foreground">10 reps × </span>
                    <span className="font-semibold text-primary">15kg</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    ✓
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border-2 border-dashed border-border">
                <span className="text-sm font-medium text-muted-foreground">Série 3</span>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    <span>-- reps × --kg</span>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-primary bg-transparent">
                    +
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Meu Progresso</h3>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>

          <Card className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-end gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">47,5</span>
                <span className="text-lg text-muted-foreground mb-1">kg</span>
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[35, 55]} />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--primary))", r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
