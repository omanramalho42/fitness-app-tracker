"use client"

import Image from 'next/image'
import React, { useCallback, useState } from 'react'

import { Control, useController } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'

import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

import CreateExerciceDialog from '@/components/create-exercicie-dialog'

import { cn } from '@/lib/utils'

import type { CreateExerciseProps, ExerciseProps } from '@/lib/types'
import type { CategorieSchemaType } from '@/components/create-category-dialog'

import { availableExercises } from '@/lib/constants'

import { Check, ChevronsUpDown } from "lucide-react"

interface MultiExercisePickerProps {
  control: Control<CategorieSchemaType>
}

const MultiExercisePicker:React.FC<MultiExercisePickerProps> = ({ control }) => {
  const [exercises, setExercises] =
    useState<ExerciseProps[]>(availableExercises)

  const [open, setOpen] = useState(true)
  
  const handleExerciseChange = useCallback(
    (value: CreateExerciseProps) => {
      setExercises([...exercises, value])
    },
    [exercises],
  )

  if(!control) {
    return null
  }

  const { field } = useController({
    control: control,
    name: 'exercisesId'
  })

  const exerciciesListStorage:ExerciseProps[] = 
    availableExercises.filter((exercise) => 
      field.value?.flat().includes(exercise.id)
    )

  const [exerciciesList, setExerciciesList] =
    useState<ExerciseProps[]>(exerciciesListStorage)
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="flex flex-row w-full overflow-x-auto h-full justify-between hover:text-foreground"
        >
          {exerciciesList.length > 0 ? (
            exerciciesList.map((exercise, index) => {
              return (
                <div
                  key={index}
                  className={`flex w-full items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md`}
                >
                  <Image
                    width={64}
                    height={64}
                    src={exercise.image || "/placeholder.svg"}
                    alt={exercise.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col items-start gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{exercise.name}</h4>
                      <Badge variant="outline" className="text-xs bg-gray-900">
                        {exercise.category?.name}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{exercise.description}</p>
                  </div>
                </div>
              )
            })
          ) : (
            'Selecione o exercicio'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Pesquise pelo exercicio..." />
          <CreateExerciceDialog
            onSuccessCallback={handleExerciseChange}
          />
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <Label className="text-sm font-semibold px-4 py-2">
              Exercícios{" "}
              <span className="text-muted-foreground font-normal">
                ({exerciciesList.length} selecionados)
              </span>
            </Label>
          </div>
          <CommandEmpty className='p-2'>
            <p className='text-sm'>Exercicio não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Criar um novo exercicio
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {exercises &&
                exercises.map((exercise: ExerciseProps, idx) => {
                  return (
                    <CommandItem
                      key={exercise.id}
                      onSelect={(exercise) => {
                        // console.log(exercise, "fn")
                      }}
                    >
                      <ExerciseRow
                        control={control}
                        exercise={exercise}
                        exerciciesList={exerciciesList}
                        setExerciciesList={setExerciciesList}
                      />
                    </CommandItem>
                  )
              })}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ExerciseRow({
  exercise,
  exerciciesList,
  setExerciciesList,
  control
}: {
  exercise: ExerciseProps,
  exerciciesList: ExerciseProps[],
  setExerciciesList: React.Dispatch<React.SetStateAction<ExerciseProps[]>>,
  control: Control<CategorieSchemaType>
}) {
  const [open, setOpen] = useState<boolean>(false)
  
  const toggleExercise = useCallback((exerciseId: string) => {
    //VERIFICA SE EXERCICIO EXISTE NO BANCO DE DADOS
    const existExercice:ExerciseProps | undefined = availableExercises.find(
      (exercise) => {
        return (
          exercise.id === exerciseId
        )
      }
    )

    if(existExercice) {
      // SE O ARRAY FOR VAZIO ENTAO ADICIONE O EXERCICIO A LISTA
      if (exerciciesList.length === 0) {
        //DEFINIR OS IDS DO EXERCICIOS
        const newExercisesId: string[] = [existExercice.id]

        field.onChange([newExercisesId])
        setExerciciesList([existExercice])
      } else {
        //CASO JA EXISTA ALGUM VALOR DENTRO DA LISTA
        //VERIFICA SE EXERCICIO EXISTE NA LISTA
        const existUserOnList = exerciciesList.find((exercise) => (
          exercise.id === exerciseId
        ))
        //CASO EXERCICIO NAO EXISTA NA LISTA
        if (!existUserOnList) {
          //CRIE UM NOVO ARRAY COM OS EXERCICIOS QUE JÁ EXISTIAM NA LISTA E ADICONE O NOVO EXERCICIO
          const newListexercises: ExerciseProps[] = [
            ...exerciciesList,
            existExercice
          ]
          //SETE O NOVO exercicio
          setExerciciesList(newListexercises);
          //DEFINIR OS IDS DO EXERCICIOS
          const exercisesId: string[] = 
            newListexercises.map(
              (exercise) => exercise.id
            )

          field.onChange(exercisesId)
        } else {
          ///CASO O EXERCICIO JÁ TENHA SIDO ADICIONADO
          //CRIE UMA NOVA LISTA COM TODOS OS EXERCICIOS MENOS O QUE FOI REMOVIDA AGORA
          const newListexercises: ExerciseProps[] =
            exerciciesList.filter((exercise) => (
              exercise.id !== exerciseId
            ))
          //DEFINIR OS IDS DO EXERCICIOS
          const exercisesId: string[] = 
            newListexercises.map(
              (exercise) => exercise.id
            )
          //SETE A NOVA LSITA DE EXERCICIOS, AGORA REMOVENDO O EXERCICIO DESVINCULADO
          setExerciciesList(newListexercises)
          field.onChange(exercisesId)
        }
      }
    }
  }, [exerciciesList])

  if(!control) {
    return null
  }

  const { field } = useController({
    control: control,
    name: 'exercisesId'
  })

  const isSelected = field.value?.flat().includes(exercise.id)

  return (
    <TooltipProvider key={exercise.id}>
      <Tooltip
        open={open}
        defaultOpen={false}
        onOpenChange={setOpen}
      >
        <TooltipTrigger asChild>
          <div
            onClick={(e) => {
              toggleExercise(exercise.id)
            }}
            className={`flex w-full items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              isSelected
                ? "bg-primary/10 border-primary"
                : "bg-card border-border text-foreground hover:border-primary/40"
            }`}
          >
            <Image
              width={64}
              height={64}
              src={exercise.image || "/placeholder.svg"}
              alt={exercise.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-start gap-2 mb-1">
                <h4 className="font-semibold text-sm">{exercise.name}</h4>
                <Badge variant="outline" className="text-xs bg-gray-900">
                  {exercise.category?.name}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{exercise.description}</p>
            </div>
            <div className="shrink-0">
              <div
                className={cn(
                  'w-6 h-6 rounded-full ',
                  isSelected && 'bg-primary flex items-center justify-center',
                  !isSelected && 'border-2 border-muted-foreground/30'
                )}
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs bg-transparent overflow-hidden">
          <div className="relative">
            <Image
              width={256}
              height={192}
              src={exercise.image || "/placeholder.svg"}
              alt={exercise.name}
              className="w-64 h-48 object-cover"
            />
            <div className="p-3 bg-background/95 backdrop-blur">
              <h4 className="font-bold mb-1 text-foreground">
                {exercise.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {exercise.description}
              </p>
              <Badge variant="secondary" className="mt-2 text-xs">
                {exercise?.category?.name}
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}


export default MultiExercisePicker