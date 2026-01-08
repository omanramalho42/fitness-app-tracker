"use client"

import { cn } from "@/lib/utils"
import { useCallback, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Flame, ArrowRight, Play, TrendingUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { StreakModal } from "@/components/streak-modal"

import SelectModalWorkout from "../modality-picker"
import ModalityPicker from "../modality-picker"

type WorkoutCategory = "warmup" | "cardio" | "strength"
type WorkoutDay = "seg" | "ter" | "qua" | "qui" | "sex" | "sab" | "dom"

interface Exercise {
  id: string
  name: string
  image: string
  duration: string
  category: string
  workoutCategory: WorkoutCategory
  dayOfWeek: WorkoutDay
}

type WorkoutSchedule = Record<WorkoutDay, string>

type WorkoutByModality = {
  [key: string]: WorkoutSchedule
}

export const WORKOUT_SCHEDULES: WorkoutByModality = {
  "jiu-jitsu": {
    seg: "Técnica + Drills",
    ter: "Rolo Leve",
    qua: "Técnica + Posicional",
    qui: "Rolo Forte",
    sex: "Técnica + Finalizações",
    sab: "Open Mat",
    dom: "Descanso",
  },

  "muay-thay": {
    seg: "Técnica de Chutes",
    ter: "Boxe + Manoplas",
    qua: "Condicionamento",
    qui: "Clinch + Joelhos",
    sex: "Sparring",
    sab: "Técnica Geral",
    dom: "Descanso",
  },

  "musculacao": {
    seg: "Peito + Tríceps",
    ter: "Costas + Bíceps",
    qua: "Pernas",
    qui: "Ombro + Abdômen",
    sex: "Full Body",
    sab: "Cardio Leve",
    dom: "Descanso",
  },
}

const workoutSchedule: Record<WorkoutDay, string> = {
  seg: "Peito, Tríceps e Ombro",
  ter: "Costas e Bíceps",
  qua: "Membros Inferiores",
  qui: "Descanso",
  sex: "Peito, Tríceps e Ombro",
  sab: "Costas e Bíceps",
  dom: "Descanso",
}

const modelWrokoutSchedule: Record<WorkoutDay, string> = {
  seg: "JiuJitsu",
  ter: "Muay Thai",
  qua: "Natação",
  qui: "Descanso",
  sex: "Musculação",
  sab: "Cooper",
  dom: "Futebol",
}

const allExercises: Exercise[] = [
  {
    id: "supino-reto",
    name: "Supino Reto",
    image: "/bench-press-exercise.png",
    duration: "45 min",
    category: "Peito",
    workoutCategory: "strength",
    dayOfWeek: "seg",
  },
  {
    id: "triceps-testa",
    name: "Tríceps Testa",
    image: "/tricep-exercise.png",
    duration: "30 min",
    category: "Tríceps",
    workoutCategory: "strength",
    dayOfWeek: "seg",
  },
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    image: "/shoulder-press.png",
    duration: "35 min",
    category: "Ombro",
    workoutCategory: "strength",
    dayOfWeek: "seg",
  },
  {
    id: "puxada-frontal",
    name: "Puxada Frontal",
    image: "/lat-pulldown.png",
    duration: "40 min",
    category: "Costas",
    workoutCategory: "strength",
    dayOfWeek: "ter",
  },
  {
    id: "rosca-direta",
    name: "Rosca Direta",
    image: "/bicep-curl.png",
    duration: "30 min",
    category: "Bíceps",
    workoutCategory: "strength",
    dayOfWeek: "ter",
  },
  {
    id: "agachamento",
    name: "Agachamento",
    image: "/person-doing-squat.jpg",
    duration: "40 min",
    category: "Pernas",
    workoutCategory: "strength",
    dayOfWeek: "qua",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    image: "/leg-press.png",
    duration: "35 min",
    category: "Pernas",
    workoutCategory: "strength",
    dayOfWeek: "qua",
  },
  {
    id: "esteira",
    name: "Esteira",
    image: "/treadmill.png",
    duration: "20 min",
    category: "Cardio",
    workoutCategory: "cardio",
    dayOfWeek: "seg",
  },
  {
    id: "bicicleta",
    name: "Bicicleta",
    image: "/cycling.png",
    duration: "25 min",
    category: "Cardio",
    workoutCategory: "cardio",
    dayOfWeek: "ter",
  },
  {
    id: "alongamento",
    name: "Alongamento",
    image: "/stretching.png",
    duration: "15 min",
    category: "Aquecimento",
    workoutCategory: "warmup",
    dayOfWeek: "seg",
  },
  {
    id: "mobilidade",
    name: "Mobilidade",
    image: "/mobility.png",
    duration: "12 min",
    category: "Aquecimento",
    workoutCategory: "warmup",
    dayOfWeek: "ter",
  },
]

interface HomeTabProps {
  onExerciseClick?: (exerciseId: string) => void
}

export function HomeTab({ onExerciseClick }: HomeTabProps) {
  const [showStreakModal, setShowStreakModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState<WorkoutDay>("qua")
  const [selectedCategory, setSelectedCategory] = useState<WorkoutCategory | "all">("all")

  const [modality, setModality] = useState("")
  const handleModalityChange = useCallback(
    (value: string) => {
      setModality(value)
    },
    [],
  )
  //MODALIDADES DISPONIVEIS
  //CRIAR MODALIDADE CASO NÃO EXISTA
  //ABRIR MODAL DE CRIAÇÃO DE MODALIDADE
  //CRIAR NO BANCO DE DADOS MODALIDADE NOVA
  //MODALIDADE OBJETO JSON NOME, DESCRIÇÃO, IMAGEURL, CREATEDAT, UPDATEDAT, CRONID, CRON?, EXERCICIES?
  //A MODALIDADE VAI TER UM UNICO CRONOGRAMA INICIALMENTE COMO NULL
  //A MODALIDADE VAI TER UMA OU MAIS CATEGORIAS VINCULADAS

  //

  const weekDays: { label: string; value: WorkoutDay; date: number }[] = [
    { label: "Dom", value: "dom", date: 11 },
    { label: "Seg", value: "seg", date: 12 },
    { label: "Ter", value: "ter", date: 13 },
    { label: "Qua", value: "qua", date: 14 },
    { label: "Qui", value: "qui", date: 15 },
    { label: "Sex", value: "sex", date: 16 },
    { label: "Sáb", value: "sab", date: 17 },
  ]

  const filteredExercises = allExercises.filter((exercise) => {
    const matchesDay = exercise.dayOfWeek === selectedDay
    const matchesCategory = selectedCategory === "all" || exercise.workoutCategory === selectedCategory
    return matchesDay && matchesCategory
  })

  const workoutOfTheDay =
    modelWrokoutSchedule?.[selectedDay] ?? "Descanso"

  const isRestDay = modelWrokoutSchedule[selectedDay] === "Descanso"

  const recentActivities = [
    { name: "Caminhada", value: "7890", unit: "passos", icon: "🚶", time: "Hoje às 10:45am", color: "bg-primary" },
    { name: "Ciclismo", value: "12", unit: "km", icon: "🚴", time: "Ontem às 6:00pm", color: "bg-destructive" },
  ]

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-2 border-primary">
            <AvatarImage src="/fitness-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">EM</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm text-muted-foreground">Olá Emma</span>
              <span className="text-lg">👋</span>
            </div>
            <p className="text-xs text-muted-foreground">Pronta para treinar!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setShowStreakModal(true)}>
            <Flame className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </header>

      {/* Streak Modal */}
      <StreakModal open={showStreakModal} onOpenChange={setShowStreakModal} />

      {/* Challenge Card */}
      <Card className="bg-gradient-to-br from-primary/30 via-primary/20 to-card border-primary/30 overflow-hidden">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="inline-flex items-center gap-2 bg-background/80 rounded-full px-3 py-1.5">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium">Novo Desafio</span>
              </div>
              <h3 className="text-base font-bold">Semana de Energia</h3>
              <p className="text-xs text-muted-foreground">Complete 5 treinos esta semana</p>
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium text-primary">2/5</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 ml-4">
              INICIAR
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Week */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <button
            key={day.value}
            onClick={() => setSelectedDay(day.value)}
            className={cn(
              "flex flex-col items-center gap-1.5 p-2 rounded-xl transition-colors",
              selectedDay === day.value
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-secondary",
            )}
          >
            <span className="text-xs font-medium">{day.label}</span>
            <span className={cn("text-base font-bold", selectedDay === day.value && "text-primary-foreground")}>
              {day.date}
            </span>
          </button>
        ))}
      </div>

      {/* Workout Schedule Display */}
      <Card className="bg-secondary/50 border-primary/20">
        <CardContent className="flex flex-col space-y-6 p-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                Modalidade escolhida
              </p>
              <p className="font-bold text-lg">{modality}</p>
            </div>
          </div>

          <ModalityPicker
            onChange={handleModalityChange}
          />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Treino do Dia</p>
              <p className="font-bold text-lg">{workoutSchedule[selectedDay]}</p>
            </div>
            {workoutSchedule[selectedDay] !== "Descanso" ? (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">💪</span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">😴</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Badge
          className={cn(
            "px-4 py-2 text-sm cursor-pointer transition-colors",
            selectedCategory === "warmup"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30",
          )}
          onClick={() => setSelectedCategory(selectedCategory === "warmup" ? "all" : "warmup")}
        >
          <Flame className="w-3.5 h-3.5 mr-1.5" />
          Aquecimento
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "px-4 py-2 text-sm cursor-pointer transition-colors",
            selectedCategory === "cardio" ? "bg-primary text-primary-foreground border-primary" : "hover:bg-secondary",
          )}
          onClick={() => setSelectedCategory(selectedCategory === "cardio" ? "all" : "cardio")}
        >
          ❤️ Cardio
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "px-4 py-2 text-sm cursor-pointer transition-colors",
            selectedCategory === "strength"
              ? "bg-primary text-primary-foreground border-primary"
              : "hover:bg-secondary",
          )}
          onClick={() => setSelectedCategory(selectedCategory === "strength" ? "all" : "strength")}
        >
          💪 Força
        </Badge>
      </div>

      {/* Exercise Cards */}
      <div className="space-y-3">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((exercise) => (
            <Card
              key={exercise.name}
              className="overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => onExerciseClick?.(exercise.id)}
            >
              <CardContent className="p-0">
                <div className="flex">
                  <div className="relative w-32 h-28 bg-muted flex-shrink-0">
                    <img
                      src={exercise.image || "/placeholder.svg"}
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                        <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-semibold">{exercise.name}</h4>
                      <p className="text-sm text-muted-foreground">{exercise.duration}</p>
                      <Badge variant="secondary" className="text-xs">
                        {exercise.category}
                      </Badge>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="bg-secondary/30 border-dashed">
            <CardContent className="p-8 text-center">
              {isRestDay && selectedCategory === "all" ? (
                <>
                  <div className="text-4xl mb-3">😴</div>
                  <p className="font-semibold mb-1">Dia de Descanso</p>
                  <p className="text-sm text-muted-foreground">Aproveite para recuperar!</p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="font-semibold mb-1">Nenhum exercício encontrado</p>
                  <p className="text-sm text-muted-foreground">Tente outro filtro ou dia da semana</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Atividade Recente</h3>
          <Button variant="ghost" size="sm" className="text-primary">
            Ver tudo
          </Button>
        </div>

        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <Card key={activity.name}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn("w-12 h-12 rounded-full flex items-center justify-center text-2xl", activity.color)}
                  >
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{activity.name}</h4>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">{activity.value}</p>
                    <p className="text-xs text-muted-foreground">{activity.unit}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
