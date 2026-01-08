import { RoutineExercises } from "./constants"

export type CronSplitProps = "ABC" | "ABCD" | "ABCDE" | "Push Pull Legs" | "Upper Lower"

export type RoutineExercise = {
  id: string
  name: string
  order: number
  durationMinutes: number
}

export type ScheduleRoutineTableProps = {
  startTime?: string // ex: "07:30"
  exercises: RoutineExercises[]
}


export interface CategoryProps {
  id: string
  name: string
  description?: string
  imageUrl?: string
  icon?: string
  exercisesId?: string[]
  color?: string
  createdAt?: string
  updatedAt?: string
}

export interface CreateCategoryProps {
  id: string
  name: string
  description?: string
  image?: string
  icon?: string
  exercisesId?: string[]
  color?: string
  createdAt?: string
  updatedAt?: string
}

export interface UpdateCategoryProps {
  name: string
  description?: string
  image?: string
  icon?: string
  exercisesId?: string[]
  color?: string
  updatedAt?: string
}

export interface DeleteCategoryProps {
  id: string
}

export interface ScheduleCronProps {
  name: string
  icon: string
  color: string
}

export interface WorkoutCategory {
  id: string
  name: string
  icon: string
  muscleGroups: string[]
  exercises: string[]
  color: string
}

export interface Exercise {
  id: string
  name: string
  description: string
  duration: number
  videoUrl: string
}

export interface ModalityProps {
  id: string;
  name: string
  description?: string
  icon?: string
  color?: string
  updatedAt?: string
  categoriesId?: string[]
}

export interface UpdateExerciseProps {
  id: string;
  name: string
  description?: string
  icon?: string
  duration?: number
  videoUrl?: string
}

export interface CreateExerciseProps {
  id: string
  name: string
  description: string
  image?: string
  category?: CategoryProps | null
  icon: string
  color?: string
  duration: number;
  videoUrl?: string;
}

export interface ExerciseProps {
  id: string
  name: string
  description: string
  image?: string
  category?: CategoryProps | null
  icon?: string
  color?: string
  duration: number
  videoUrl?: string
}