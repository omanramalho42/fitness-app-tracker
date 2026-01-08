"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

import {
  ArrowLeft,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Check
} from "lucide-react"

import { cn } from "@/lib/utils"

interface ExerciseDetailsProps {
  exerciseId: string
  onBack: () => void
}

interface ExerciseStep {
  round: number
  exercises: {
    name: string
    duration: string
    image: string
  }[]
}

const exerciseData: Record<
  string,
  {
    name: string
    image: string
    duration: string
    calories: number
    totalTime: number
    steps: ExerciseStep[]
  }
> = {
  "supino-reto": {
    name: "Supino Reto",
    image: "/bench-press-exercise.png",
    duration: "45 min",
    calories: 345,
    totalTime: 45,
    steps: [
      {
        round: 1,
        exercises: [
          { name: "Aquecimento - 5 min", duration: "5 min", image: "/warmup.png" },
          { name: "Supino Reto - 4x12", duration: "8 min", image: "/bench-press-exercise.png" },
          { name: "Supino Inclinado - 3x12", duration: "7 min", image: "/incline-press.png" },
        ],
      },
      {
        round: 2,
        exercises: [
          { name: "Crucifixo - 3x15", duration: "6 min", image: "/fly-exercise.png" },
          { name: "Flexão - 3xFalha", duration: "5 min", image: "/pushup.png" },
          { name: "Alongamento Final", duration: "5 min", image: "/stretching.png" },
        ],
      },
    ],
  },
  agachamento: {
    name: "Agachamento",
    image: "/person-doing-squat.jpg",
    duration: "40 min",
    calories: 280,
    totalTime: 40,
    steps: [
      {
        round: 1,
        exercises: [
          { name: "Mobilidade de quadril", duration: "5 min", image: "/mobility.png" },
          { name: "Agachamento livre - 4x12", duration: "10 min", image: "/person-doing-squat.jpg" },
          { name: "Agachamento búlgaro - 3x10", duration: "8 min", image: "/bulgarian-squat.png" },
        ],
      },
      {
        round: 2,
        exercises: [
          { name: "Leg press - 4x15", duration: "8 min", image: "/leg-press.png" },
          { name: "Stiff - 3x12", duration: "6 min", image: "/stiff.png" },
          { name: "Alongamento", duration: "3 min", image: "/stretching.png" },
        ],
      },
    ],
  },
}

export function ExerciseDetails({ exerciseId, onBack }: ExerciseDetailsProps) {
  const exercise = exerciseData[exerciseId] || exerciseData["agachamento"]
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const totalSeconds = exercise.totalTime * 60
  const progress = (currentTime / totalSeconds) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && currentTime < totalSeconds) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false)
            return totalSeconds
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentTime, totalSeconds])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleComplete = () => {
    setIsCompleted(true)
    setTimeout(() => {
      onBack()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Image */}
      <div className="relative h-[50vh] bg-muted">
        <img src={exercise.image || "/placeholder.svg"} alt={exercise.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-background" />

        {/* Back Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 left-4 text-white bg-black/40 hover:bg-black/60"
          onClick={onBack}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Timer Overlay */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-6xl font-bold text-white mb-2">{formatTime(currentTime)}</div>
          <div className="flex items-center gap-8 text-white/80 text-sm">
            <div>
              <div className="text-primary font-semibold">{Math.floor(progress)}%</div>
              <div className="text-xs">Completo</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div>
              <div className="font-semibold">{formatTime(totalSeconds)}</div>
              <div className="text-xs">Tempo Total</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-8 relative z-10">
        {/* Exercise Info Card */}
        <Card className="bg-card/95 backdrop-blur border-primary/20">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-2">{exercise.name}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <span className="text-primary">🔥</span>
                <span>{exercise.calories} Kcal</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-primary">⏱️</span>
                <span>{exercise.duration}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2 mb-6">
              <Progress value={progress} className="h-2" />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full"
                onClick={() => setCurrentTime(Math.max(0, currentTime - 15))}
              >
                <SkipBack className="w-5 h-5" />
              </Button>

              <Button
                size="icon"
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 rounded-full"
                onClick={() => setCurrentTime(Math.min(totalSeconds, currentTime + 15))}
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Exercise Rounds */}
        <div className="space-y-4">
          {exercise.steps.map((step) => (
            <Card key={step.round}>
              <CardContent className="p-4">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full">
                    Round {step.round}
                  </Badge>
                </h3>
                <div className="space-y-3">
                  {step.exercises.map((ex, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                        <img
                          src={ex.image || "/placeholder.svg"}
                          alt={ex.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{ex.name}</p>
                        <p className="text-xs text-muted-foreground">{ex.duration}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complete Button */}
        <Button
          className={cn("w-full h-14 text-lg font-semibold", isCompleted && "bg-green-600 hover:bg-green-600")}
          onClick={handleComplete}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <Check className="w-5 h-5 mr-2" />
              Treino Concluído!
            </>
          ) : (
            <>
              <Check className="w-5 h-5 mr-2" />
              Marcar como Concluído
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
