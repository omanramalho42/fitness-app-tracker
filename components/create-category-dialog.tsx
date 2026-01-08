"use client"

import React, { useState } from 'react'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

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

import { CategoryProps } from '@/lib/types'
import MultiExercisesPicker from '@/components/multi-exercicies-picker'

import { Button } from "@/components/ui/button"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'

import { toast } from 'sonner'

import { cn } from '@/lib/utils'

import { customEmojis } from '@/lib/constants'

import { CircleOff, Plus, PlusSquare } from 'lucide-react'

//PASSAR OS EXERCICIOS ATRAVES DE DROPFILLING PARA PODER ATUALIZAR EM TEMPO REAL OS ESTADOS LOCAIS
//REMOVER DROPFILLING E SUBSTITUIR POR MUTATIONS E QUERY


interface CreateCategoryDialogProps {
  trigger?: React.ReactNode
  onSuccessCallback: (category: CategoryProps) => void
}

const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(20),
  description: z.string().max(100),
  icon: z.string(),
  careatedAt: z.string().optional(),
  updatedAt: z.string().default(Date.now().toString()),
  exercisesId: z.array(z.string().min(1)).optional()
}) 

export type CategorieSchemaType = z.infer<typeof categorySchema> 

const CreateCategoryDialog:React.FC<CreateCategoryDialogProps> = ({
  onSuccessCallback,
  trigger
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<CategorieSchemaType>({
    defaultValues: {
      name: "",
      description: "",
      icon: "",
    }
  })

  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = form

  const onSubmit: SubmitHandler<CategorieSchemaType> = (data) => {
    const toastId = 
      toast.loading("Criando categoria...")

    console.log(data, "data")
    console.log(errors, "errors")

    try {
      const newCategorie: CategoryProps = {
        ...data,
        id: crypto.randomUUID(),
        color: "#F9F9F9",
        createdAt: Date.now().toString(),
      }

      toast.success("Categoria criada com sucesso! 🎉", {
        id: toastId
      })
  
      onSuccessCallback?.(newCategorie)
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message, "error")
        return toast.error("Ocorreu um erro ao criar a categoria", {
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

      <DialogContent className="max-w-[90vw] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            Criar uma nova categoria
          </DialogTitle>
          <DialogDescription>
            Categorias são usadas para unir seus exercicios
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 px-2 overflow-y-auto pr-1">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="space-y-3">
                <Label
                  htmlFor="category-name" 
                  className={
                    cn(
                      "text-sm font-medium",
                      errors.name && "text-red-500"
                    )
                  }
                >
                  Nome da categoria
                </Label>
                <Controller
                  name='name'
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="category-name"
                      placeholder="Ex: Treino de peito"
                      disabled={isSubmitting}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-small text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>


              <div className="space-y-3">
                <Label htmlFor="category-description" className="text-sm font-medium">
                  Descrição (opcional)
                </Label>
                <Controller
                  name='description'
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="category-description"
                      placeholder="Descreva a categoria..."
                      disabled={isSubmitting}
                      rows={3}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-small text-red-500">
                    {errors.description.message}
                  </p>
                )}
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

              <div className="space-y-3">
                <Label htmlFor="exercise-category" className="text-sm font-medium">
                  Vincular exercicios
                </Label>
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <Label className="text-sm font-semibold px-4 py-2">
                    Exercícios{" "}
                    <span className="text-muted-foreground font-normal">
                      ({watch('exercisesId')?.length || 0} selecionados)
                    </span>
                  </Label>
                </div>

                {/* PASSAR A INFORMAÇÃO DO EXERCICIO AQUI */}
                <MultiExercisesPicker
                  control={control}
                />
              </div>

            </form>
          </Form>
        </div>

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
                disabled={isSubmitting}
                className="flex-1 bg-primary text-accent-foreground"
                onClick={handleSubmit(onSubmit)}
              >
                <Plus className="w-4 h-4 mr-2" />
              {isSubmitting ? "Caregando..." : "Criar Categoria"}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default CreateCategoryDialog