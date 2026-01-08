import React, { useEffect, useState } from 'react'

import { redirect } from 'next/navigation'

import type { CategoryProps } from '@/lib/types'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { Button } from "@/components/ui/button"
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

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { CircleOff, Plus, PlusSquare } from 'lucide-react'
import { CategorieSchemaType } from '@/components/create-category-dialog'

import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import MultiExercisesPicker from '@/components/multi-exercicies-picker'

import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { customEmojis } from '@/lib/constants'

interface UpdateCategoryDialogProps {
  categoryId: string;
  trigger?: React.ReactNode;
  category: CategoryProps;
  onSuccessCallback: (category: CategoryProps) => void;
}

const UpdateCategoryDialog:React.FC<UpdateCategoryDialogProps> = ({
  categoryId,
  onSuccessCallback,
  trigger,
  category
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<CategorieSchemaType>({
    defaultValues: {
      name: category.name,
      description: category.description || "",
      icon: category.icon,
      exercisesId: category.exercisesId || [],
      id: categoryId
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
        id: categoryId,
        name: data.name,
        description: data.description,
        updatedAt: Date.now().toString()
      }

      onSuccessCallback?.(newCategorie)

      toast.success("Categoria atualizada com sucesso! 🎉", {
        id: toastId
      })
    } catch (error) {
      if(error instanceof Error) {
        console.log(error.message, "error");
        return toast.error("Ocorreu um erro ao atualizar categoria", {
          id: toastId
        })
      }
    } finally {
      setOpen((prev) => !prev)
    }
  }

  useEffect(() => {
    if(!category) {
      return redirect("/?redirect=workout")
    }
  },[isSubmitting])

  
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
            Atualizar categoria {categoryId}
          </DialogTitle>
          <DialogDescription>
            Categorias são usadas para unir seus exercicios
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 px-2 overflow-y-auto pr-1 space-y-4 py-4">
          <Form {...form}>
            <form>
              <div className="space-y-3">
                <FormField
                  control={control}
                  name='name'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="update-category-name"
                          className={
                            cn(
                              "text-sm font-medium",
                              errors.name && 'text-red-500'
                            )
                          }
                        >
                          Nome da categoria
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="update-category-name"
                          placeholder="Ex: Treino de peito"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {errors.name && (
                        <span className='text-red-500 text-sm'>
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="update-category-description"
                          className="text-sm font-medium"
                        >
                          Descrição (opcional)
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="update-category-description"
                          placeholder="Descreva a categoria..."
                          value={field.value}
                          onChange={field.onChange}
                          rows={3}
                        />
                      </FormControl>
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

              <div className="space-y-3">
                <Label htmlFor="update-exercise-category" className="text-sm font-medium">
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
                {isSubmitting ? 'Caregando...' : 'Atualizar categoria'}
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default UpdateCategoryDialog