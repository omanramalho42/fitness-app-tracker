"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Settings, Edit, Target, TrendingUp, Calendar, Plus, ArrowLeft, CheckCircle2 } from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const quizQuestions = [
  {
    question: "Qual é seu principal objetivo fitness?",
    options: ["Perder peso", "Ganhar massa muscular", "Melhorar condicionamento", "Manter saúde"],
  },
  {
    question: "Quantas vezes por semana você treina atualmente?",
    options: ["0-1 vez", "2-3 vezes", "4-5 vezes", "6+ vezes"],
  },
  {
    question: "Qual seu nível de experiência?",
    options: ["Iniciante", "Intermediário", "Avançado", "Profissional"],
  },
  {
    question: "Quanto tempo você tem disponível por treino?",
    options: ["Menos de 30min", "30-45min", "45-60min", "Mais de 60min"],
  },
  {
    question: "Você tem alguma restrição física?",
    options: ["Nenhuma", "Lesão anterior", "Problema articular", "Limitação cardíaca"],
  },
  {
    question: "Qual seu histórico com dietas?",
    options: ["Nunca fiz", "Já fiz algumas", "Faço regularmente", "Sigo à risca"],
  },
  {
    question: "Como é seu nível de energia diário?",
    options: ["Muito baixo", "Baixo", "Moderado", "Alto"],
  },
  {
    question: "Você pratica algum esporte além da academia?",
    options: ["Não", "Corrida", "Natação", "Outros esportes"],
  },
  {
    question: "Qual sua meta de prazo?",
    options: ["1-3 meses", "3-6 meses", "6-12 meses", "Longo prazo"],
  },
  {
    question: "Como você avalia sua alimentação atual?",
    options: ["Precisa melhorar", "Razoável", "Boa", "Excelente"],
  },
]

const activityData = [
  { day: "Dom", treino: 0, cardio: 0, calorias: 0 },
  { day: "Seg", treino: 45, cardio: 20, calorias: 520 },
  { day: "Ter", treino: 60, cardio: 0, calorias: 480 },
  { day: "Qua", treino: 50, cardio: 30, calorias: 650 },
  { day: "Qui", treino: 0, cardio: 0, calorias: 0 },
  { day: "Sex", treino: 55, cardio: 15, calorias: 590 },
  { day: "Sáb", treino: 40, cardio: 25, calorias: 610 },
]

const workoutTypeData = [
  { type: "Peito", count: 12 },
  { type: "Costas", count: 10 },
  { type: "Pernas", count: 8 },
  { type: "Ombros", count: 7 },
  { type: "Braços", count: 9 },
]

const moodData = [
  { day: "Dom", mood: 6, workouts: 0 },
  { day: "Seg", mood: 7, workouts: 1 },
  { day: "Ter", mood: 8, workouts: 1 },
  { day: "Qua", mood: 7.5, workouts: 1 },
  { day: "Qui", mood: 6.5, workouts: 0 },
  { day: "Sex", mood: 8.5, workouts: 1 },
  { day: "Sáb", mood: 9, workouts: 1 },
]

export function ProfileTab() {
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [showMeasurements, setShowMeasurements] = useState(false)
  const [hasGoals, setHasGoals] = useState(true)
  const [isProcessingGoals, setIsProcessingGoals] = useState(false)
  const [processingMessage, setProcessingMessage] = useState("")
  const [currentMood, setCurrentMood] = useState(7)
  const [showMoodWidget, setShowMoodWidget] = useState(true)

  const [measurements, setMeasurements] = useState({
    rightArm: "35",
    leftArm: "34.5",
    chest: "98",
    waist: "82",
    rightThigh: "58",
    leftThigh: "57.5",
    rightCalf: "38",
    leftCalf: "38",
  })

  const stats = [
    { label: "Treinos", value: "127", icon: TrendingUp, color: "text-primary" },
    { label: "Dias Ativos", value: "89", icon: Calendar, color: "text-chart-2" },
    { label: "Sequência", value: "12", icon: Target, color: "text-chart-4" },
  ]

  const [goals, setGoals] = useState([
    {
      title: "Conquistar o Corpo Perfeito",
      name: "Perder Peso",
      target: 75,
      current: 68,
      unit: "kg",
      progress: 70,
    },
    {
      title: "Conquistar o Corpo Perfeito",
      name: "Massa Muscular",
      target: 15,
      current: 12,
      unit: "%",
      progress: 80,
    },
    {
      title: "Conquistar o Corpo Perfeito",
      name: "Carga Máxima",
      target: 120,
      current: 85,
      unit: "kg",
      progress: 71,
    },
  ])

  const [metaGoals, setMetaGoals] = useState([
    { name: "Meta de Peso", target: 75, current: 78, unit: "kg" },
    { name: "Meta de Carga", target: 120, current: 85, unit: "kg" },
    { name: "Meta de Calorias", target: 2200, current: 1850, unit: "kcal/dia" },
    { name: "Meta de Proteína", target: 150, current: 120, unit: "g/dia" },
  ])

  const handleQuizComplete = async () => {
    setIsProcessingGoals(true)

    setProcessingMessage("Processando informações...")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setProcessingMessage("Criando plano personalizado...")
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setProcessingMessage("Finalizando objetivos...")
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const newGoals = [
      {
        title: "Transformação Corporal Completa",
        name: "Redução de Gordura",
        target: 100,
        current: 35,
        unit: "%",
        progress: 35,
      },
      {
        title: "Transformação Corporal Completa",
        name: "Ganho Muscular",
        target: 100,
        current: 28,
        unit: "%",
        progress: 28,
      },
      {
        title: "Transformação Corporal Completa",
        name: "Condicionamento",
        target: 100,
        current: 42,
        unit: "%",
        progress: 42,
      },
    ]
    setGoals(newGoals)
    setHasGoals(true)
    setIsProcessingGoals(false)
    setShowQuiz(false)
    setShowGoalModal(false)
    setQuizStep(0)
    setQuizAnswers([])
  }

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex]
    setQuizAnswers(newAnswers)

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      handleQuizComplete()
    }
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      <header className="flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Perfil</h2>
        <Button size="icon" variant="ghost">
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <div className="px-4 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-primary">
              <AvatarImage src="/fitness-avatar.png" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">EM</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary/90"
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>

          <div>
            <h3 className="text-2xl font-bold">Emma Silva</h3>
            <p className="text-muted-foreground">Entusiasta de Fitness</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full bg-transparent">
              Editar Perfil
            </Button>
            <Button className="bg-primary text-primary-foreground rounded-full">Compartilhar</Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <Icon className={cn("w-6 h-6", stat.color)} />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {showMoodWidget && (
          <Card className="fixed bottom-24 right-4 z-50 w-64 shadow-2xl border-primary/50 bg-gradient-to-br from-primary/10 to-card">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm">Como você está hoje?</h4>
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setShowMoodWidget(false)}>
                  ✕
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>😢</span>
                  <span>Satisfação: {currentMood}/10</span>
                  <span>😄</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentMood}
                  onChange={(e) => setCurrentMood(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                />
              </div>
              <Button size="sm" className="w-full bg-primary">
                Salvar
              </Button>
            </CardContent>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Meus Objetivos
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={() => setShowGoalModal(true)}
            >
              {hasGoals ? "Editar" : "Criar"}
            </Button>
          </div>

          {hasGoals ? (
            <div className="space-y-4">
              <Card className="bg-gradient-to-r from-primary/20 to-chart-2/20 border-primary/50">
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold text-center">{goals[0]?.title}</h3>
                  <p className="text-sm text-center text-muted-foreground mt-1">Baseado no seu perfil e humor atual</p>
                </CardContent>
              </Card>

              {goals.map((goal) => (
                <Card key={goal.name} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {goal.current} / {goal.target} {goal.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{goal.progress}%</p>
                      </div>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center space-y-3">
                <Target className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Você ainda não tem objetivos definidos</p>
                <Button onClick={() => setShowGoalModal(true)} className="bg-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Novo Objetivo
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Metas de Performance
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {metaGoals.map((meta) => (
              <Card key={meta.name} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs text-muted-foreground">{meta.name}</p>
                  <p className="text-lg font-bold">
                    {meta.current} {meta.unit}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Meta: {meta.target} {meta.unit}
                  </p>
                  <Progress value={(meta.current / meta.target) * 100} className="h-1.5" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Treinos por Categoria</h3>
          <Card>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={workoutTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="type" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Evolução do Humor vs Treinos
          </h3>
          <Card>
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="hsl(var(--chart-2))"
                    fillOpacity={1}
                    fill="url(#colorMood)"
                    name="Humor"
                  />
                  <Area
                    type="monotone"
                    dataKey="workouts"
                    stroke="hsl(var(--primary))"
                    fill="transparent"
                    strokeWidth={2}
                    name="Treinos"
                  />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-2"></div>
                  <span className="text-xs text-muted-foreground">Humor</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-xs text-muted-foreground">Treinos</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={showGoalModal} onOpenChange={setShowGoalModal}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isProcessingGoals
                ? "Criando Plano Personalizado"
                : hasGoals
                  ? "Editar Objetivos"
                  : "Criar Novos Objetivos"}
            </DialogTitle>
          </DialogHeader>

          {isProcessingGoals ? (
            <div className="space-y-6 py-12">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 animate-pulse"></div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-semibold">{processingMessage}</p>
                  <p className="text-sm text-muted-foreground">
                    Analisando suas respostas e criando o melhor plano para você
                  </p>
                </div>
              </div>
            </div>
          ) : !showQuiz ? (
            <div className="space-y-4 py-4">
              <Card className="bg-gradient-to-br from-primary/20 via-chart-2/10 to-primary/10 border-primary/50 overflow-hidden relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,255,120,0.1),transparent)]"></div>
                <CardContent className="p-6 relative space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-bold text-lg">Plano Personalizado com IA</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Responda 10 perguntas rápidas sobre seus hábitos, objetivos e preferências. Nossa IA criará
                        metas personalizadas baseadas no seu perfil e monitorará sua evolução.
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowQuiz(true)}
                    className="w-full bg-primary hover:bg-primary/90 transition-all hover:scale-[1.02]"
                    size="lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Criar Plano com IA
                  </Button>
                </CardContent>
              </Card>

              <p className="text-sm text-muted-foreground text-center">
                Ou edite seus objetivos manualmente nas configurações
              </p>
            </div>
          ) : (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Pergunta {quizStep + 1} de {quizQuestions.length}
                  </span>
                  <span className="font-semibold">{Math.round(((quizStep + 1) / quizQuestions.length) * 100)}%</span>
                </div>
                <Progress value={((quizStep + 1) / quizQuestions.length) * 100} className="h-2" />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">{quizQuestions[quizStep].question}</h3>
                <div className="grid gap-3">
                  {quizQuestions[quizStep].options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto py-4 px-4 hover:bg-primary hover:text-primary-foreground transition-all bg-transparent"
                      onClick={() => handleQuizAnswer(index)}
                    >
                      <span className="text-left">{option}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (quizStep > 0) {
                      setQuizStep(quizStep - 1)
                      setQuizAnswers(quizAnswers.slice(0, -1))
                    } else {
                      setShowQuiz(false)
                    }
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowQuiz(false)
                    setQuizStep(0)
                    setQuizAnswers([])
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showMeasurements} onOpenChange={setShowMeasurements}>
        <DialogContent className="max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Gerenciar Medidas Corporais</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Braço Direito (cm)</Label>
                <Input
                  type="number"
                  value={measurements.rightArm}
                  onChange={(e) => setMeasurements({ ...measurements, rightArm: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Braço Esquerdo (cm)</Label>
                <Input
                  type="number"
                  value={measurements.leftArm}
                  onChange={(e) => setMeasurements({ ...measurements, leftArm: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Peitoral (cm)</Label>
                <Input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Cintura (cm)</Label>
                <Input
                  type="number"
                  value={measurements.waist}
                  onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Coxa Direita (cm)</Label>
                <Input
                  type="number"
                  value={measurements.rightThigh}
                  onChange={(e) => setMeasurements({ ...measurements, rightThigh: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Coxa Esquerda (cm)</Label>
                <Input
                  type="number"
                  value={measurements.leftThigh}
                  onChange={(e) => setMeasurements({ ...measurements, leftThigh: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Panturrilha Direita (cm)</Label>
                <Input
                  type="number"
                  value={measurements.rightCalf}
                  onChange={(e) => setMeasurements({ ...measurements, rightCalf: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Panturrilha Esquerda (cm)</Label>
                <Input
                  type="number"
                  value={measurements.leftCalf}
                  onChange={(e) => setMeasurements({ ...measurements, leftCalf: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={() => setShowMeasurements(false)} className="w-full bg-primary">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Salvar Medidas
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
