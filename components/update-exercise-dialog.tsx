"use client"

import React, { useCallback, useState } from 'react'

import { redirect } from 'next/navigation'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from "zod"
import { toast } from 'sonner'

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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from './ui/form'

import { cn } from '@/lib/utils'
import { customEmojis } from '@/lib/constants'

import type { ExerciseProps, UpdateExerciseProps } from '@/lib/types'

import { CircleOff, Plus, PlusSquare } from 'lucide-react'

interface UpdateExerciseDialogProps {
  exerciseId: string;
  trigger?: React.ReactNode;
  onSuccessCallback: (exercise: UpdateExerciseProps) => void;
  exercise: ExerciseProps
}

const UpdateExerciseDialog:React.FC<UpdateExerciseDialogProps> = ({
  exerciseId,
  exercise,
  onSuccessCallback,
  trigger
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("")

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value)
    },
    [],
  )

  const exerciseSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
    duration: z.string()
  })

  type ExerciseSchemaType = z.infer<typeof exerciseSchema>

  const form = useForm<ExerciseSchemaType>({
    defaultValues: {
      id: exercise.id,
      name: exercise?.name || "",
      description: exercise?.description || "",
      icon: exercise?.icon || "",
      duration: '0',
    }
  })

  const onSubmit: SubmitHandler<ExerciseSchemaType> = (data) => {
    const toastId = 
      toast.loading('Atualizando exercicio...')

    console.log(data)
    console.log(errors, "errors")

    try {

      const newUpdatedExercise: UpdateExerciseProps = {
        ...data,
        duration: Number(data.duration),
      }

      onSuccessCallback(newUpdatedExercise)

      toast.success('Exercicio atualizado com sucesso! 🎉', {
        id: toastId
      })
    } catch (error) {
      if(error instanceof Error) {
        return toast.error('Ocorreu um erro ao atulizar exercicio. ⚠️', {
          id: toastId
        })
      }
    } finally {
      setOpen((prev) => !prev)
    }
  }

  const {
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting
    }
  } = form
  
  if (!exerciseId) {
    return redirect("/")
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
            Atualizar exercicio
          </DialogTitle>
          <DialogDescription>
            Exercicios são usadas para unir suas atividades
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form className="space-y-4 py-4">
            <div className="space-y-3">
              <FormField
                name='name'
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label
                        htmlFor="exercise-name"
                        className={
                          cn(
                            "text-sm font-medium",
                            errors.name && "text-red-500"
                          )
                        }
                      >
                        Nome do Exercício
                      </Label>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        id="exercise-name"
                        placeholder="Ex: Rosca Alternada"
                      />
                    </FormControl>
                    {errors.name && (
                      <span className='text-sm text-red-500'>
                        {errors.name.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormField
                name='description'
                control={control}
                disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Label
                        htmlFor="exercise-description"
                        className={cn(
                          "text-sm font-medium",
                          errors.name && "text-red-500"
                        )}
                      >
                        Descrição (opcional)
                      </Label>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        id="exercise-description"
                        placeholder="Descreva o exercício..."
                        rows={3}
                      />
                    </FormControl>
                    {errors.description && (
                      <span className='text-sm text-red-500'>
                        {errors.description.message}
                      </span>
                    )}
                  </FormItem>
                )}
              />
            </div>

              <FormField
                name="icon"
                control={control}
                // disabled={isSubmitting}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícone</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full min-h-18 sm:min-h-25"
                          >
                            {field.value ? (
                              <div className="flex flex-col items-center justify-center gap-1">
                                <span className="text-3xl" role="img">
                                  {field.value}
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Toque para trocar
                                </p>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-1">
                                <CircleOff className="h-8 w-8 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                  Toque para selecionar
                                </p>
                              </div>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          side="bottom"
                          align="center"
                          className="
                            w-[95vw] max-w-sm
                            sm:w-105
                            p-0
                            max-h-[80vh]
                          "
                        >
                          <div className="max-h-[70vh] overflow-y-auto">
                            <Picker
                              data={data}
                              navPosition="top"
                              previewPosition="bottom"
                              searchPosition="sticky"
                              categories= {[
                                'activity',
                                'flags',
                                'foods',
                                'frequent',
                                'nature',
                                'objects',
                                'people',
                                'places',
                                'symbols',
                              ]}
                              emojiButtonColors={['rgba(102, 51, 153, .2)']}
                              icons='solid'
                              custom={customEmojis}
                              skinTonePosition="preview"
                              onEmojiSelect={(emoji: { native: string }) => {
                                field.onChange(emoji.native)
                              }}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormDescription>
                      Esse ícone representa visualmente sua categoria
                    </FormDescription>
                  </FormItem>
                )}
              />

          </form>
        </Form>

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
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                type="button"
                className="flex-1 bg-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Caregando...' : 'Atualizar Exercício'}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateExerciseDialog