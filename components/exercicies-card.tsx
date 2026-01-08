"use client"

import React, { Fragment, useCallback, useState } from 'react'

import { toast } from 'sonner'

import DeleteExerciseDialog from '@/components/delete-exercicie-dialog'
import UpdateExerciseDialog from '@/components/update-exercise-dialog'
import CreateExerciceDialog from '@/components/create-exercicie-dialog'

import type {
  CreateExerciseProps,
  UpdateExerciseProps,
  ExerciseProps
} from '@/lib/types'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Download
} from "lucide-react"

const ExerciciesCard:React.FC = () => {
  const [exercises, setExercises] = useState<ExerciseProps[]>([
    { 
      id: "123",
      name: "Arm Lock",
      icon: "🎉",
      duration: 55,
      color: "#f5f5f5",
      videoUrl: "https://youtube.com/falabaixo_cuts",
      description: "",
      image: ""
    }
  ])

  console.log(exercises, "exercises")

  const handleDeleteExercise = useCallback((value: string) => {
    const exercisesAfterRemoving = exercises.filter(
      (exercise) => 
        exercise.id !== value
      )
    setExercises(exercisesAfterRemoving)

    toast.success("Deletenado exercicio...", {
      id: value
    })
  },[exercises])

  const handleExerciseChange = useCallback(
    (value: CreateExerciseProps) => {
      setExercises([...exercises, value])
    },
    [exercises],
  )

  const handleExercisesUpdate = useCallback((
    value: UpdateExerciseProps
  ) => {
    // PERCORRENDO A MINHA LISTA DE EXERCICIOS E VENDO SE O CONTEUDO É ENCONTRADO
    const updateExercise: ExerciseProps | undefined =
      exercises.find((exercise) => 
        exercise.id === value.id
      )

    if(updateExercise) {
      //CRIANDO ATUALIZACAO DO EXERCICIO, COM O MESMO ID, APENAS ALTERANDO OS VALORES
      const newUpdateExercise: ExerciseProps = {
        ...updateExercise,
        name: value.name,
        description: value.description || "",
        icon: value.icon || ""
      }
      //FILTRANDO TODOS OS EXERCICIOS NOS QUAIS SÃO DIFERENTES DO ID
      const allExercises: ExerciseProps[] = 
        exercises.filter(
          (exercise) => exercise.id !== value.id
        )
      //A NOVA LISTA POSSUI TODOS OS REGISTROS EXCETO AQUELE QUE POSSUI MESMO ID, 
      // ADICIONANDO AGORA O NOVO ELEMENTO CRIADO COM OS DADOS ATUALIZADOS
      const newListExercisesAfterUpdate: ExerciseProps[] = [
        ...allExercises,
        newUpdateExercise
      ]
      setExercises([...newListExercisesAfterUpdate])
    }  
  }, [exercises])

  const handleDuplicateExercicies = (exercicie: ExerciseProps) => {
    const newExercicies = {
      ...exercicie,
      id: Date.now().toString(),
      name: `${exercicie.name} (cópia)`,
    }
    setExercises([...exercises, newExercicies])
  }

  const handleExportExercicies = (exercicie: ExerciseProps) => {
    const dataStr = JSON.stringify(exercicie, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${exercicie.name.toLowerCase().replace(/\s+/g, "-")}.json`
    link.click()
  }

  return (
    <Fragment>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Exercicios</h3>
          <CreateExerciceDialog
            onSuccessCallback={handleExerciseChange}
            trigger={
              <Button
                className="hover:text-foreground"
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nova
              </Button>
            }  
          />
        </div>

        {exercises.length > 0 ? exercises.map((exercise, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-2 ${exercise.color}`} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{exercise.icon}</span>
                      <h4 className="font-semibold">{exercise.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      <UpdateExerciseDialog
                        exercise={exercise}
                        exerciseId={exercise.id}
                        onSuccessCallback={handleExercisesUpdate}
                        trigger={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleDuplicateExercicies(exercise)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleExportExercicies(exercise)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <DeleteExerciseDialog
                        exercise={exercise}
                        onSuccessCallback={handleDeleteExercise}
                        trigger={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <CreateExerciceDialog
            onSuccessCallback={handleExerciseChange}
            trigger={
              <Card
                className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <Plus className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Criar exercicio Personalizado</h4>
                    <p className="text-sm text-muted-foreground">Adicione exercicios customizados ao seu banco</p>
                  </div>
                </CardContent>
              </Card>
            }
          />
        )}
      </div>
    </Fragment>
  )
}

export default ExerciciesCard