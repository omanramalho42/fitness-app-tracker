import ModalityCard from "@/components/modality-card"
import CategoriesCard from "@/components/categories-card"
import ExerciciesCard from "@/components/exercicies-card"
import ScheduleCronCard from "@/components/schedule-cron-card"
import IaCard from "@/components/ia-card"

export default function page() {
  return (
    <div className="min-h-screen bg-background pb-6 space-y-6">
      {/* IA */}
      <IaCard />

      {/* MODALIDADE */}
      <ModalityCard />
      
      {/* CRONOGRAMA */}
      <ScheduleCronCard />

      {/* CATEGORIAS */}
      <CategoriesCard />

      {/* EXERCICIES */}
      <ExerciciesCard />
    </div>
  )
}
