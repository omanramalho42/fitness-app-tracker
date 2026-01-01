"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { HomeTab } from "@/components/tabs/home-tab"
import { WorkoutTab } from "@/components/tabs/workout-tab"
import { NutritionTab } from "@/components/tabs/nutrition-tab"
import { ProfileTab } from "@/components/tabs/profile-tab"
import { ExerciseDetails } from "@/components/exercise-details"
import { WorkoutDetails } from "@/components/workout-details"

export default function FitnessApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [showWorkoutDetails, setShowWorkoutDetails] = useState(false)

  if (selectedExercise && !showWorkoutDetails) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-md">
          <WorkoutDetails exerciseId={selectedExercise} onBack={() => setSelectedExercise(null)} />
        </div>
      </main>
    )
  }

  if (selectedExercise && showWorkoutDetails) {
    return (
      <main className="min-h-screen bg-background">
        <div className="mx-auto max-w-md">
          <ExerciseDetails
            exerciseId={selectedExercise}
            onBack={() => {
              setSelectedExercise(null)
              setShowWorkoutDetails(false)
            }}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <div className="mx-auto max-w-md">
        {activeTab === "home" && <HomeTab onExerciseClick={setSelectedExercise} />}
        {activeTab === "workout" && <WorkoutTab />}
        {activeTab === "nutrition" && <NutritionTab />}
        {activeTab === "profile" && <ProfileTab />}

        <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </main>
  )
}
