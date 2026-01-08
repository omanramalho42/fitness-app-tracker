"use client"

import React, { useCallback, useState } from 'react'

import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { z } from "zod"

// import CategoryPicker from '@/components/category-picker'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import type { CreateExerciseProps, ExerciseProps } from '@/lib/types'

import { Clock, Plus, PlusSquare, Video } from 'lucide-react'

interface CreateExercicieDialogProps {
  trigger?: React.ReactNode
  onSuccessCallback: (exercicie: CreateExerciseProps) => void
}

const CreateExerciceDialog:React.FC<CreateExercicieDialogProps> = ({
  trigger,
  onSuccessCallback
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const exerciciesSchema = z.object({
    id: z.string().uuid(),
    name: z.string()
      .min(5, {
        message:`Name must have characters or more`}
      ),
    description: z.string().min(1, "descrição muito curta"),
    icon: z.string(),
    duration: z.string(),
    videoUrl: z.string(),
  })

  type ExerciciesSchemaProps = z.infer<typeof exerciciesSchema>

  const {
    control,
    handleSubmit,
    formState: { 
      errors,
      isSubmitting
    },
    reset
  } = useForm<ExerciciesSchemaProps>({
    defaultValues: {
      name: "",
      duration: "",
      videoUrl: "",
      description: "",
    },
  })

  const onSubmit: SubmitHandler<ExerciciesSchemaProps> = (data) => {
    const toastId = 
      toast.loading('Criando exercicio...')

    console.log(data)
    console.log(errors, "errors")

    try {
      const newExercise: CreateExerciseProps = {
        ...data,
        id: crypto.randomUUID(), // ou viria da API
        duration: Number(data.duration), // converte para number se precisar
        category: null,
      }
  
      onSuccessCallback?.(newExercise)

      toast.success("Exercício criado com sucesso! 🎉", {
        id: toastId
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        return toast.error("Ocorreu um erro ao criar exercicio", {
          id: toastId
        })
      }
    } finally {
      setOpen((prev) => !prev)
      
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'
          >
            <PlusSquare className="mr-2 h-4 w-4" />
            Criar novo
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-[90vw]">
        <DialogHeader>
          <DialogTitle>
            Criar um novo exercicio
          </DialogTitle>
          <DialogDescription>
            Exercicios são usadas para unir suas atividades
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4 py-4">
          {/* NOME */}
          <div className="space-y-3">
            <Label
              htmlFor="exercise-name"
              className={
                cn(
                  errors.name && "text-red-500",
                  "text-sm font-medium"
                )
              }
            >
              Nome do Exercício
            </Label>
            <Controller
              control={control}
              name='name'
              rules={{ required: true }}
              render={({ field }) => {
                return (
                  <Input
                    {...field}
                    id="exercise-name"
                    placeholder="Ex: Rosca Alternada"
                  />
                )
              }}
            />
            {errors.name && (
              <span className='text-sm text-red-500'>
                {errors.name.message}
              </span>
            )}
          </div>

          {/* DURAÇÃO */}
          <div className="space-y-2">
            <Label htmlFor="duration" className={cn(errors.duration && "text-destructive")}>
              Duração aproximada (minutos)
            </Label>
            <div className="relative">
              <Controller
                control={control}
                name="duration"
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="duration"
                    type="text"
                    inputMode="numeric"
                    placeholder="45"
                    className="pl-9"
                    disabled={isSubmitting}
                  />
                )}
              />
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.duration && (
              <p className="text-sm text-destructive">{errors.duration.message}</p>
            )}
          </div>

          {/* VÍDEO */}
          <div className="space-y-2">
            <Label htmlFor="videoUrl" className={cn(errors.videoUrl && "text-destructive")}>
              Link do vídeo demonstrativo (opcional)
            </Label>
            <div className="relative">
              <Controller
                control={control}
                name="videoUrl"
                render={({ field }) => (
                  <Input
                    {...field}
                    id="videoUrl"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="pl-9"
                    disabled={isSubmitting}
                  />
                )}
              />
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            {errors.videoUrl && (
              <p className="text-sm text-destructive">{errors.videoUrl.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              Links válidos do YouTube e Vimeo
            </p>
          </div>

          {/* DESCRIÇÃO */}
          <div className="space-y-3">
            <Label 
              htmlFor="exercise-description"
              className={
                cn(
                  errors.description && "text-red-500",
                  "text-sm font-medium"
                )
              }
            >
              Descrição (opcional)
            </Label>
            <Controller
              control={control}
              name='description'
              render={({ field }) => {
                return (
                  <Textarea
                    {...field}
                    id="exercise-description"
                    placeholder="Descreva o exercício..."
                    rows={3}
                  />
                )
              }}
            />
            {errors.description && (
              <span className='text-sm text-red-500'>
                {errors.description.message}
              </span>
            )}
          </div>
        </form>

        <DialogFooter className='flex gap-2 pt-4'>
          <DialogClose asChild>
            <div>
              <Button
                type="button"
                variant="secondary"
                className="flex-1 bg-transparent"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                className="flex-1 bg-primary"
                onClick={handleSubmit(onSubmit)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Criar Exercício
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateExerciceDialog