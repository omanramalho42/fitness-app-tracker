"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  Camera,
  Plus,
  Sparkles,
  Droplet,
  TrendingUp,
  ChevronRight,
  Calendar,
  Utensils,
  Coffee,
  Apple,
  Timer,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MealEntry {
  id: string
  date: string
  meal: string
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
  time: string
  image?: string
}

const mealHistory: MealEntry[] = [
  {
    id: "1",
    date: "2025-01-15",
    meal: "Café da Manhã",
    description: "Ovos mexidos, aveia e banana",
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 15,
    time: "7:30 AM",
    image: "/scrambled-eggs-oatmeal-banana-breakfast.jpg",
  },
  {
    id: "2",
    date: "2025-01-15",
    meal: "Almoço",
    description: "Frango grelhado, arroz integral e brócolis",
    calories: 700,
    protein: 55,
    carbs: 65,
    fat: 18,
    time: "12:45 PM",
    image: "/grilled-chicken-brown-rice-broccoli.jpg",
  },
]

export function NutritionTab() {
  const [showScanModal, setShowScanModal] = useState(false)
  const [showAiDietModal, setShowAiDietModal] = useState(false)
  const [showAddMealModal, setShowAddMealModal] = useState(false)
  const [scanningFood, setScanningFood] = useState(false)
  const [scannedResult, setScannedResult] = useState<any>(null)
  const [waterGlasses, setWaterGlasses] = useState(5)
  const [isFasting, setIsFasting] = useState(false)
  const [fastingHours, setFastingHours] = useState(14)

  const todayCalories = 1120
  const targetCalories = 2100
  const todayProtein = 98
  const targetProtein = 150
  const todayCarbs = 120
  const targetCarbs = 250
  const todayFat = 40
  const targetFat = 70

  const calorieProgress = (todayCalories / targetCalories) * 100
  const proteinProgress = (todayProtein / targetProtein) * 100
  const carbsProgress = (todayCarbs / targetCarbs) * 100
  const fatProgress = (todayFat / targetFat) * 100

  const handleScanFood = () => {
    setScanningFood(true)
    setTimeout(() => {
      setScannedResult({
        name: "Salmão Grelhado com Batata Doce",
        calories: 520,
        protein: 45,
        carbs: 38,
        fat: 18,
        confidence: 94,
      })
      setScanningFood(false)
    }, 2500)
  }

  const dailyMeals = [
    {
      name: "Café da Manhã",
      icon: Coffee,
      time: "7:00 - 9:00",
      consumed: true,
      calories: 420,
      image: "/healthy-breakfast-eggs.jpg",
    },
    {
      name: "Almoço",
      icon: Utensils,
      time: "12:00 - 14:00",
      consumed: true,
      calories: 700,
      image: "/grilled-chicken-rice-vegetables.jpg",
    },
    {
      name: "Lanche",
      icon: Apple,
      time: "16:00 - 17:00",
      consumed: false,
      calories: 0,
    },
    {
      name: "Jantar",
      icon: Utensils,
      time: "19:00 - 21:00",
      consumed: false,
      calories: 0,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-card/30 pb-24">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src="/fitness-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">EM</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">Olá Emma</span>
              <span className="text-base">👋</span>
            </div>
            <p className="text-xs text-muted-foreground">Bora nutrir o corpo!</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost" className="w-9 h-9">
            <Bell className="w-4 h-4" />
          </Button>
          <Button size="icon" variant="ghost" className="w-9 h-9">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className="px-4 space-y-6">
        <div className="relative">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              {/* Circular progress for calories */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-muted/20"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 56}`}
                  strokeDashoffset={`${2 * Math.PI * 56 * (1 - calorieProgress / 100)}`}
                  className="text-primary transition-all duration-500"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-3xl font-bold">{todayCalories}</p>
                <p className="text-xs text-muted-foreground">de {targetCalories} kcal</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <Card className="bg-card/50 border-chart-4/30">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">🔥</div>
                <p className="text-xs text-muted-foreground mb-1">Carbos</p>
                <p className="text-sm font-bold">
                  {todayCarbs}g <span className="text-xs text-muted-foreground">/ {targetCarbs}g</span>
                </p>
                <Progress value={carbsProgress} className="h-1 mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-chart-2/30">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">🥩</div>
                <p className="text-xs text-muted-foreground mb-1">Proteína</p>
                <p className="text-sm font-bold">
                  {todayProtein}g <span className="text-xs text-muted-foreground">/ {targetProtein}g</span>
                </p>
                <Progress value={proteinProgress} className="h-1 mt-2" />
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-chart-5/30">
              <CardContent className="p-3 text-center">
                <div className="text-2xl mb-1">🥑</div>
                <p className="text-xs text-muted-foreground mb-1">Gordura</p>
                <p className="text-sm font-bold">
                  {todayFat}g <span className="text-xs text-muted-foreground">/ {targetFat}g</span>
                </p>
                <Progress value={fatProgress} className="h-1 mt-2" />
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => setShowScanModal(true)}
            className="h-auto py-4 bg-gradient-to-br from-primary to-chart-2 hover:opacity-90 transition-opacity"
          >
            <div className="flex flex-col items-center gap-2">
              <Camera className="w-6 h-6" />
              <span className="text-sm font-semibold">Escanear Prato</span>
            </div>
          </Button>
          <Button
            onClick={() => setShowAiDietModal(true)}
            className="h-auto py-4 bg-gradient-to-br from-chart-3 to-chart-5 hover:opacity-90 transition-opacity"
          >
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="w-6 h-6" />
              <span className="text-sm font-semibold">Dieta com IA</span>
            </div>
          </Button>
        </div>

        {isFasting && (
          <Card className="bg-gradient-to-br from-destructive/20 to-transparent border-destructive/30">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-destructive" />
                  <div>
                    <h4 className="font-semibold text-sm">Jejum Intermitente</h4>
                    <p className="text-xs text-muted-foreground">{fastingHours}h / 16h</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive/30 text-destructive bg-transparent"
                  onClick={() => setIsFasting(false)}
                >
                  Encerrar
                </Button>
              </div>
              <Progress value={(fastingHours / 16) * 100} className="h-2" />
            </CardContent>
          </Card>
        )}

        <Card className="bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-chart-2" />
                <div>
                  <h4 className="font-semibold text-sm">Hidratação</h4>
                  <p className="text-xs text-muted-foreground">{waterGlasses * 250}ml de 2000ml</p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-chart-2 text-white"
                onClick={() => setWaterGlasses(Math.min(waterGlasses + 1, 8))}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex-1 h-8 rounded-lg transition-colors cursor-pointer",
                    i < waterGlasses ? "bg-chart-2" : "bg-muted/30",
                  )}
                  onClick={() => setWaterGlasses(i + 1)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Refeições Diárias</h3>
            <Button
              size="sm"
              variant="ghost"
              className="text-primary"
              onClick={() => {
                if (!isFasting) setIsFasting(true)
              }}
            >
              {isFasting ? "Jejum Ativo" : "Iniciar Jejum"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {dailyMeals.map((meal) => (
              <Card
                key={meal.name}
                className={cn(
                  "overflow-hidden cursor-pointer transition-all hover:border-primary/50",
                  meal.consumed ? "bg-card" : "bg-card/30 border-dashed",
                )}
                onClick={() => !meal.consumed && setShowAddMealModal(true)}
              >
                <CardContent className="p-0">
                  {meal.consumed && meal.image ? (
                    <div className="relative h-24 bg-muted">
                      <img
                        src={meal.image || "/placeholder.svg"}
                        alt={meal.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                        {meal.calories} kcal
                      </div>
                    </div>
                  ) : (
                    <div className="h-24 flex items-center justify-center bg-muted/30">
                      <meal.icon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-sm">{meal.name}</h4>
                        <p className="text-xs text-muted-foreground">{meal.time}</p>
                      </div>
                      {!meal.consumed && (
                        <Button size="icon" className="w-7 h-7 rounded-full bg-primary">
                          <Plus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Histórico Recente</h3>
            <Button variant="ghost" size="sm" className="text-primary">
              Ver Tudo
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {mealHistory.map((meal) => (
              <Card key={meal.id} className="group cursor-pointer hover:border-primary/50 transition-colors">
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {meal.image && (
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={meal.image || "/placeholder.svg"}
                          alt={meal.meal}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="font-semibold text-sm">{meal.meal}</h4>
                          <p className="text-xs text-muted-foreground truncate">{meal.description}</p>
                        </div>
                        <Badge variant="secondary" className="ml-2 flex-shrink-0">
                          {meal.calories} kcal
                        </Badge>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          P: {meal.protein}g
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          C: {meal.carbs}g
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-0">
                          G: {meal.fat}g
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Média Semanal</p>
                <p className="text-3xl font-bold">
                  1,890 <span className="text-base text-muted-foreground">kcal/dia</span>
                </p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Proteína</p>
                <p className="text-lg font-bold">142g</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Carbos</p>
                <p className="text-lg font-bold">185g</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Gordura</p>
                <p className="text-lg font-bold">58g</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showScanModal} onOpenChange={setShowScanModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escanear Alimento</DialogTitle>
            <DialogDescription>Aponte a câmera para seu prato e deixe a IA identificar</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {!scannedResult ? (
              <div className="relative aspect-square bg-muted rounded-2xl overflow-hidden flex items-center justify-center">
                {scanningFood ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Analisando seu prato...</p>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">Câmera simulada para demonstração</p>
                    <Button onClick={handleScanFood} className="bg-primary">
                      Escanear Prato
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <Card className="bg-primary/10 border-primary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">{scannedResult.name}</h4>
                        <p className="text-xs text-muted-foreground">Confiança: {scannedResult.confidence}%</p>
                      </div>
                      <Badge className="bg-primary text-primary-foreground">{scannedResult.calories} kcal</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-3 pt-3 border-t border-border/50">
                      <div>
                        <p className="text-xs text-muted-foreground">Proteína</p>
                        <p className="text-sm font-bold">{scannedResult.protein}g</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Carbos</p>
                        <p className="text-sm font-bold">{scannedResult.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Gordura</p>
                        <p className="text-sm font-bold">{scannedResult.fat}g</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 bg-transparent"
                    onClick={() => {
                      setScannedResult(null)
                      setScanningFood(false)
                    }}
                  >
                    Escanear Novamente
                  </Button>
                  <Button
                    className="flex-1 bg-primary"
                    onClick={() => {
                      setShowScanModal(false)
                      setScannedResult(null)
                    }}
                  >
                    Adicionar Refeição
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAiDietModal} onOpenChange={setShowAiDietModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Criar Dieta com IA
            </DialogTitle>
            <DialogDescription>Personalize sua dieta com inteligência artificial</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary/10 to-chart-2/10 border-primary/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Objetivo</span>
                  <Badge variant="outline">Hipertrofia</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Restrições</span>
                  <Badge variant="outline">Sem lactose</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Calorias/dia</span>
                  <Badge variant="outline">2,100 kcal</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Refeições/dia</span>
                  <Badge variant="outline">5 refeições</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-primary to-chart-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Plano Alimentar
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Editar Preferências
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                A IA analisará seu perfil, objetivos e preferências para criar um plano alimentar personalizado e
                balanceado.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMealModal} onOpenChange={setShowAddMealModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Refeição</DialogTitle>
            <DialogDescription>Escolha como deseja registrar sua refeição</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <Button
              className="h-auto py-6 bg-gradient-to-br from-primary to-chart-2"
              onClick={() => {
                setShowAddMealModal(false)
                setShowScanModal(true)
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <Camera className="w-6 h-6" />
                <span className="text-sm font-semibold">Escanear</span>
              </div>
            </Button>
            <Button className="h-auto py-6 bg-gradient-to-br from-card to-secondary" variant="outline">
              <div className="flex flex-col items-center gap-2">
                <Plus className="w-6 h-6" />
                <span className="text-sm font-semibold">Manual</span>
              </div>
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground text-center mb-2">Ou escolha uma sugestão:</p>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Coffee className="w-4 h-4 mr-2" />
              Café da Manhã Padrão (420 kcal)
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Utensils className="w-4 h-4 mr-2" />
              Almoço Fitness (650 kcal)
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Apple className="w-4 h-4 mr-2" />
              Lanche Proteico (220 kcal)
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
