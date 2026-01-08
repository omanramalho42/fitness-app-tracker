import { Button } from "@/components/ui/button"

import ModalityCard from "@/components/modality-card"
import CategoriesCard from "@/components/categories-card"
import ExerciciesCard from "@/components/exercicies-card"
import CronCard from "@/components/schedule-cron-card"
import IaCard from "@/components/ia-card"

import { Settings2 } from "lucide-react"

export function WorkoutTab() {
  return (
    <div className="min-h-screen bg-background pb-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between px-4">
        <div>
          <h1 className="text-2xl font-bold">Meus Treinos</h1>
          <p className="text-sm text-muted-foreground">Configure seu plano de treino</p>
        </div>
        <Button size="icon" variant="outline">
          <Settings2 className="w-5 h-5 text-foreground" />
        </Button>
      </header>

      {/* IA */}
      <IaCard />

      {/* MODALIDADE */}
      <ModalityCard />
      
      {/* CRONOGRAMA */}
      <CronCard />

      {/* CATEGORIAS */}
      <CategoriesCard />

      {/* EXERCICIES */}
      <ExerciciesCard />
    </div>
  )
}
