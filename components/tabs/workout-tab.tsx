"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Settings2, Plus, Calendar, Sparkles, Edit, Trash2, Copy, Download, Info, Check, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

type WorkoutSplit = "ABC" | "ABCD" | "ABCDE" | "Push Pull Legs" | "Upper Lower"

interface WorkoutCategory {
  id: string
  name: string
  emoji: string
  muscleGroups: string[]
  exercises: string[]
  color: string
}

interface Exercise {
  id: string
  name: string
  category: string
  description: string
  image: string
}

const availableExercises: Exercise[] = [
  {
    id: "supino-reto",
    name: "Supino Reto",
    category: "Peito",
    description: "Exercício composto para peito com barra",
    image: "/bench-press.png",
  },
  {
    id: "triceps-testa",
    name: "Tríceps Testa",
    category: "Tríceps",
    description: "Isolamento de tríceps deitado",
    image: "/tricep-extension.png",
  },
  {
    id: "desenvolvimento",
    name: "Desenvolvimento",
    category: "Ombro",
    description: "Pressão de ombros com barra ou halteres",
    image: "/shoulder-press.png",
  },
  {
    id: "puxada-frontal",
    name: "Puxada Frontal",
    category: "Costas",
    description: "Puxada alta para dorsal",
    image: "/lat-pulldown.jpg",
  },
  {
    id: "rosca-direta",
    name: "Rosca Direta",
    category: "Bíceps",
    description: "Isolamento de bíceps com barra",
    image: "/barbell-curl.png",
  },
  {
    id: "agachamento",
    name: "Agachamento",
    category: "Pernas",
    description: "Exercício composto para pernas",
    image: "/person-doing-squat.png",
  },
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Pernas",
    description: "Pressão de pernas na máquina",
    image: "/leg-press.jpg",
  },
  {
    id: "esteira",
    name: "Esteira",
    category: "Cardio",
    description: "Corrida ou caminhada na esteira",
    image: "/treadmill.png",
  },
  {
    id: "bicicleta",
    name: "Bicicleta",
    category: "Cardio",
    description: "Pedalada para cardio",
    image: "/exercise-bike.jpg",
  },
  {
    id: "alongamento",
    name: "Alongamento",
    category: "Aquecimento",
    description: "Alongamento dinâmico pré-treino",
    image: "/person-stretching.png",
  },
  {
    id: "mobilidade",
    name: "Mobilidade",
    category: "Aquecimento",
    description: "Exercícios de mobilidade articular",
    image: "/abstract-mobility.png",
  },
]

const emojiOptions = ["💪", "🦾", "🦵", "🏃", "🚴", "🏋️", "🤸", "🧘", "⚡", "🔥", "💥", "🎯"]

const splitSchedules: Record<WorkoutSplit, (string | null)[]> = {
  ABC: ["Treino A", "Treino B", "Treino C", null, "Treino A", "Treino B", null],
  ABCD: ["Treino A", "Treino B", "Treino C", "Treino D", "Treino A", "Treino B", null],
  ABCDE: ["Treino A", "Treino B", "Treino C", "Treino D", "Treino E", "Treino A", null],
  "Push Pull Legs": ["Push", "Pull", "Legs", null, "Push", "Pull", null],
  "Upper Lower": ["Superior", "Inferior", null, "Superior", "Inferior", null, null],
}

export function WorkoutTab() {
  const [currentSplit, setCurrentSplit] = useState<WorkoutSplit>("ABC")
  const [showAIDialog, setShowAIDialog] = useState(false)
  const [showCategoryDialog, setShowCategoryDialog] = useState(false)
  const [showCustomSplitDialog, setShowCustomSplitDialog] = useState(false)
  const [editingCategory, setEditingCategory] = useState<WorkoutCategory | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationStep, setGenerationStep] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [previewExercise, setPreviewExercise] = useState<string | null>(null)

  const [categoryName, setCategoryName] = useState("")
  const [categoryEmoji, setCategoryEmoji] = useState("💪")
  const [selectedExercises, setSelectedExercises] = useState<string[]>([])
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const [customSplitDays, setCustomSplitDays] = useState<boolean[]>([true, true, true, false, true, true, false])

  const [showCreateExerciseDialog, setShowCreateExerciseDialog] = useState(false)
  const [newExerciseName, setNewExerciseName] = useState("")
  const [newExerciseCategory, setNewExerciseCategory] = useState("")
  const [newExerciseDescription, setNewExerciseDescription] = useState("")
  const [customExercises, setCustomExercises] = useState<Exercise[]>([])

  const generationSteps = [
    "Analisando suas informações...",
    "Processando objetivos...",
    "Criando plano personalizado...",
    "Ajustando exercícios...",
    "Finalizando seu treino...",
  ]

  const [categories, setCategories] = useState<WorkoutCategory[]>([
    {
      id: "a",
      name: "Treino A",
      emoji: "💪",
      muscleGroups: ["Peito", "Tríceps", "Ombro"],
      exercises: ["supino-reto", "triceps-testa", "desenvolvimento"],
      color: "bg-primary",
    },
    {
      id: "b",
      name: "Treino B",
      emoji: "🦾",
      muscleGroups: ["Costas", "Bíceps"],
      exercises: ["puxada-frontal", "rosca-direta"],
      color: "bg-blue-500",
    },
    {
      id: "c",
      name: "Treino C",
      emoji: "🦵",
      muscleGroups: ["Pernas", "Glúteos"],
      exercises: ["agachamento", "leg-press"],
      color: "bg-purple-500",
    },
  ])

  const handleGenerateWorkout = () => {
    setIsGenerating(true)
    setGenerationStep(0)

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      setGenerationStep(currentStep)

      if (currentStep >= generationSteps.length) {
        clearInterval(interval)
        setTimeout(() => {
          setIsGenerating(false)
          setShowResult(true)
        }, 500)
      }
    }, 1200)
  }

  const openCategoryDialog = (category?: WorkoutCategory) => {
    if (category) {
      setEditingCategory(category)
      setCategoryName(category.name)
      setCategoryEmoji(category.emoji)
      setSelectedExercises(category.exercises)
    } else {
      setEditingCategory(null)
      setCategoryName("")
      setCategoryEmoji("💪")
      setSelectedExercises([])
    }
    setShowCategoryDialog(true)
  }

  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      alert("O nome da categoria é obrigatório")
      return
    }
    if (selectedExercises.length === 0) {
      alert("Selecione pelo menos um exercício")
      return
    }

    const muscleGroups = [
      ...new Set(
        selectedExercises
          .map((exId) => {
            const ex = allExercises.find((e) => e.id === exId)
            return ex?.category || ""
          })
          .filter(Boolean),
      ),
    ]

    const newCategory: WorkoutCategory = {
      id: editingCategory?.id || Date.now().toString(),
      name: categoryName,
      emoji: categoryEmoji,
      muscleGroups,
      exercises: selectedExercises,
      color: editingCategory?.color || "bg-primary",
    }

    if (editingCategory) {
      setCategories(categories.map((c) => (c.id === editingCategory.id ? newCategory : c)))
    } else {
      setCategories([...categories, newCategory])
    }

    setShowCategoryDialog(false)
    setCategoryName("")
    setCategoryEmoji("💪")
    setSelectedExercises([])
    setEditingCategory(null)
  }

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id))
  }

  const handleDuplicateCategory = (category: WorkoutCategory) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      name: `${category.name} (cópia)`,
    }
    setCategories([...categories, newCategory])
  }

  const handleExportCategory = (category: WorkoutCategory) => {
    const dataStr = JSON.stringify(category, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${category.name.toLowerCase().replace(/\s+/g, "-")}.json`
    link.click()
  }

  const toggleExercise = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId],
    )
  }

  const toggleCustomDay = (index: number) => {
    const newDays = [...customSplitDays]
    newDays[index] = !newDays[index]
    setCustomSplitDays(newDays)
  }

  const handleCreateExercise = () => {
    if (!newExerciseName.trim()) {
      alert("O nome do exercício é obrigatório")
      return
    }
    if (!newExerciseCategory) {
      alert("Selecione uma categoria")
      return
    }

    const newExercise = {
      id: `custom-${Date.now()}`,
      name: newExerciseName,
      category: newExerciseCategory,
      description: newExerciseDescription || `Exercício personalizado de ${newExerciseCategory}`,
      image: "/diverse-group-exercising.png",
    }

    setCustomExercises([...customExercises, newExercise])
    setShowCreateExerciseDialog(false)
    setNewExerciseName("")
    setNewExerciseCategory("")
    setNewExerciseDescription("")
  }

  const allExercises = [...availableExercises, ...customExercises]

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-bold">Meus Treinos</h1>
          <p className="text-sm text-muted-foreground">Configure seu plano de treino</p>
        </div>
        <Button size="icon" variant="outline">
          <Settings2 className="w-5 h-5" />
        </Button>
      </header>

      <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 mt-4 px-4">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Divisão Atual</p>
              <h3 className="text-xl font-bold">{currentSplit}</h3>
            </div>
            <Badge className="bg-primary/20 text-primary border-primary/30">Ativo</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Treino dividido em {currentSplit === "ABC" ? "3" : currentSplit === "ABCD" ? "4" : "5"} dias com descanso
            estratégico
          </p>
          <Button
            className="w-full bg-transparent hover:bg-primary/10 transition-all"
            variant="outline"
            size="sm"
            onClick={() => setShowCustomSplitDialog(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Criar Divisão Personalizada
          </Button>
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 mt-4 px-4">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 text-primary-foreground relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-6 h-6" />
                <h3 className="font-bold text-xl">Fitness Coach IA</h3>
              </div>
              <p className="text-sm text-primary-foreground/95 mb-5 leading-relaxed">
                Crie um treino personalizado com inteligência artificial baseado nos seus objetivos, nível de
                experiência e preferências específicas
              </p>
              <Button
                className="w-full bg-background text-foreground hover:bg-background/95 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 font-semibold"
                size="lg"
                onClick={() => setShowAIDialog(true)}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Criar Treino com IA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="px-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-bold">Divisões de Treino</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="ghost" className="w-6 h-6">
                  <Info className="w-4 h-4 text-muted-foreground" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs leading-relaxed">
                  <span className="font-semibold">ABC:</span> 3 treinos diferentes que se repetem
                  <br />
                  <span className="font-semibold">ABCD:</span> 4 treinos com maior variedade
                  <br />
                  <span className="font-semibold">Push Pull Legs:</span> Empurrar, Puxar e Pernas
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select value={currentSplit} onValueChange={(value) => setCurrentSplit(value as WorkoutSplit)}>
          <SelectTrigger className="w-full h-auto py-5 px-4 text-base font-bold border-2 border-primary/40 hover:border-primary/70 bg-card/50 hover:bg-card transition-all duration-200 shadow-md">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="max-h-[400px]">
            <SelectItem value="ABC" className="py-3">
              <div className="flex items-center justify-between w-full gap-8">
                <div>
                  <div className="font-semibold text-base mb-0.5">ABC</div>
                  <div className="text-xs text-muted-foreground">3 treinos diferentes com repetição</div>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  3 dias
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="ABCD" className="py-3">
              <div className="flex items-center justify-between w-full gap-8">
                <div>
                  <div className="font-semibold text-base mb-0.5">ABCD</div>
                  <div className="text-xs text-muted-foreground">4 treinos com progressão semanal</div>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  4 dias
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="ABCDE" className="py-3">
              <div className="flex items-center justify-between w-full gap-8">
                <div>
                  <div className="font-semibold text-base mb-0.5">ABCDE</div>
                  <div className="text-xs text-muted-foreground">5 treinos específicos por grupo</div>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  5 dias
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="Push Pull Legs" className="py-3">
              <div className="flex items-center justify-between w-full gap-8">
                <div>
                  <div className="font-semibold text-base mb-0.5">Push Pull Legs</div>
                  <div className="text-xs text-muted-foreground">Empurrar, Puxar, Pernas</div>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  3 dias
                </Badge>
              </div>
            </SelectItem>
            <SelectItem value="Upper Lower" className="py-3">
              <div className="flex items-center justify-between w-full gap-8">
                <div>
                  <div className="font-semibold text-base mb-0.5">Upper Lower</div>
                  <div className="text-xs text-muted-foreground">Parte superior e inferior</div>
                </div>
                <Badge variant="secondary" className="ml-3 shrink-0">
                  2 dias
                </Badge>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Workout Categories */}
      <div className="px-4 space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Categorias de Treino</h3>
          <Button size="sm" variant="outline" onClick={() => openCategoryDialog()}>
            <Plus className="w-4 h-4 mr-1" />
            Nova
          </Button>
        </div>
        {categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-2 ${category.color}`} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      <h4 className="font-semibold">{category.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => openCategoryDialog(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleDuplicateCategory(category)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleExportCategory(category)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-destructive"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {category.muscleGroups.map((muscle) => (
                      <Badge key={muscle} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">{category.exercises.length} exercícios</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card
          className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
          onClick={() => setShowCreateExerciseDialog(true)}
        >
          <CardContent className="p-6 text-center space-y-3">
            <Plus className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <h4 className="font-semibold">Criar Exercício Personalizado</h4>
              <p className="text-sm text-muted-foreground">Adicione exercícios customizados ao seu banco</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4 px-4">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Cronograma Semanal</h3>
          </div>
          <div className="space-y-2">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => {
              const workoutName = splitSchedules[currentSplit][index]
              return (
                <div
                  key={day}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                >
                  <span className="text-sm font-medium">{day}</span>
                  {workoutName ? (
                    <div className="flex items-center gap-2">
                      <Badge className="font-medium">{workoutName}</Badge>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">Descanso</span>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showCustomSplitDialog} onOpenChange={setShowCustomSplitDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Divisão Personalizada</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Escolha os dias da semana em que você deseja treinar</p>
            <div className="space-y-2">
              {["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"].map((day, index) => (
                <div
                  key={day}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    customSplitDays[index] ? "bg-primary/10 border-primary" : "bg-secondary/30 border-transparent"
                  }`}
                  onClick={() => toggleCustomDay(index)}
                >
                  <span className="font-medium">{day}</span>
                  <div className="flex items-center gap-2">
                    {customSplitDays[index] ? (
                      <>
                        <Badge variant="default">Treino</Badge>
                        <Check className="w-5 h-5 text-primary" />
                      </>
                    ) : (
                      <>
                        <Badge variant="secondary">Descanso</Badge>
                        <X className="w-5 h-5 text-muted-foreground" />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full" size="lg">
              Salvar Divisão
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showCategoryDialog}
        onOpenChange={(open) => {
          setShowCategoryDialog(open)
          if (!open) {
            setCategoryName("")
            setCategoryEmoji("💪")
            setSelectedExercises([])
            setEditingCategory(null)
            setShowEmojiPicker(false)
          }
        }}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="category-name" className="text-sm font-semibold">
                Nome da Categoria *
              </Label>
              <Input
                id="category-name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Ex: Treino A, Push, Hipertrofia..."
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Emoji *</Label>
              <div className="grid grid-cols-6 gap-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setCategoryEmoji(emoji)}
                    className={`p-3 text-2xl rounded-lg border-2 transition-all hover:scale-110 ${
                      categoryEmoji === emoji
                        ? "bg-primary/20 border-primary shadow-md"
                        : "bg-secondary/30 border-transparent hover:bg-secondary"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">
                Exercícios *{" "}
                <span className="text-muted-foreground font-normal">({selectedExercises.length} selecionados)</span>
              </Label>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {allExercises.map((exercise) => {
                  const isSelected = selectedExercises.includes(exercise.id)
                  return (
                    <TooltipProvider key={exercise.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            onClick={() => toggleExercise(exercise.id)}
                            onMouseEnter={() => setPreviewExercise(exercise.id)}
                            onMouseLeave={() => setPreviewExercise(null)}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                              isSelected
                                ? "bg-primary/10 border-primary"
                                : "bg-card border-border hover:border-primary/40"
                            }`}
                          >
                            <img
                              src={exercise.image || "/placeholder.svg"}
                              alt={exercise.name}
                              className="w-16 h-16 rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-sm">{exercise.name}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {exercise.category}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-1">{exercise.description}</p>
                            </div>
                            <div className="shrink-0">
                              {isSelected ? (
                                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                  <Check className="w-4 h-4 text-primary-foreground" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full border-2 border-muted-foreground/30" />
                              )}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-xs p-0 overflow-hidden">
                          <div className="relative">
                            <img
                              src={exercise.image || "/placeholder.svg"}
                              alt={exercise.name}
                              className="w-64 h-48 object-cover"
                            />
                            <div className="p-3 bg-background/95 backdrop-blur">
                              <h4 className="font-bold mb-1">{exercise.name}</h4>
                              <p className="text-xs text-muted-foreground">{exercise.description}</p>
                              <Badge variant="secondary" className="mt-2 text-xs">
                                {exercise.category}
                              </Badge>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowCategoryDialog(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSaveCategory}>
                {editingCategory ? "Salvar Alterações" : "Criar Categoria"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={showAIDialog}
        onOpenChange={(open) => {
          setShowAIDialog(open)
          if (!open) {
            setIsGenerating(false)
            setShowResult(false)
            setGenerationStep(0)
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Criar Treino com IA
            </DialogTitle>
          </DialogHeader>

          {!isGenerating && !showResult && (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="goal" className="text-sm font-semibold">
                  Qual é o seu objetivo?
                </Label>
                <Input id="goal" placeholder="Ex: Ganhar massa muscular, perder peso..." className="h-11" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="experience" className="text-sm font-semibold">
                  Nível de experiência
                </Label>
                <Select defaultValue="intermediario">
                  <SelectTrigger id="experience" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="days" className="text-sm font-semibold">
                  Dias por semana
                </Label>
                <Select defaultValue="3">
                  <SelectTrigger id="days" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="4">4 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="6">6 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="restrictions" className="text-sm font-semibold">
                  Restrições ou preferências
                </Label>
                <Textarea
                  id="restrictions"
                  placeholder="Ex: Não posso fazer agachamento, prefiro treinos rápidos..."
                  className="resize-none min-h-[100px]"
                  rows={4}
                />
              </div>
              <Button
                className="w-full hover:scale-[1.02] hover:shadow-xl transition-all duration-300 font-semibold"
                size="lg"
                onClick={handleGenerateWorkout}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Gerar Treino Personalizado
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-lg">{generationSteps[generationStep - 1]}</p>
                <div className="flex gap-1 justify-center">
                  {generationSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index < generationStep ? "bg-primary w-8" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showResult && (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-primary" />
                  <h4 className="font-bold">Treino Criado com Sucesso!</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Criamos um plano de treino personalizado baseado nas suas informações. Confira abaixo:
                </p>
                <div className="space-y-3">
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Divisão Recomendada</div>
                    <div className="font-semibold">ABC (3 dias)</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Duração Estimada</div>
                    <div className="font-semibold">60-75 minutos por sessão</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Foco Principal</div>
                    <div className="font-semibold">Hipertrofia e Força</div>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={() => setShowAIDialog(false)}>
                Aplicar ao Meu Plano
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateExerciseDialog} onOpenChange={setShowCreateExerciseDialog}>
        <DialogContent className="max-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Criar Exercício Personalizado</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label htmlFor="exercise-name" className="text-sm font-medium">
                Nome do Exercício *
              </Label>
              <Input
                id="exercise-name"
                placeholder="Ex: Rosca Alternada"
                value={newExerciseName}
                onChange={(e) => setNewExerciseName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="exercise-category" className="text-sm font-medium">
                Categoria *
              </Label>
              <Select value={newExerciseCategory} onValueChange={setNewExerciseCategory}>
                <SelectTrigger id="exercise-category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Peito">Peito</SelectItem>
                  <SelectItem value="Costas">Costas</SelectItem>
                  <SelectItem value="Pernas">Pernas</SelectItem>
                  <SelectItem value="Ombro">Ombro</SelectItem>
                  <SelectItem value="Bíceps">Bíceps</SelectItem>
                  <SelectItem value="Tríceps">Tríceps</SelectItem>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Aquecimento">Aquecimento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="exercise-description" className="text-sm font-medium">
                Descrição (opcional)
              </Label>
              <Textarea
                id="exercise-description"
                placeholder="Descreva o exercício..."
                value={newExerciseDescription}
                onChange={(e) => setNewExerciseDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setShowCreateExerciseDialog(false)
                  setNewExerciseName("")
                  setNewExerciseCategory("")
                  setNewExerciseDescription("")
                }}
              >
                Cancelar
              </Button>
              <Button className="flex-1 bg-primary" onClick={handleCreateExercise}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Exercício
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
