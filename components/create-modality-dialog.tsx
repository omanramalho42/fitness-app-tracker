"use client"

import React, { useState } from 'react'

import type { ModalityProps } from '@/lib/types'

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

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form"

import { Textarea } from '@/components/ui/textarea'
import MultiCategoriesPicker from '@/components/multi-categories-picker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { cn } from '@/lib/utils'
import { customEmojis } from '@/lib/constants'

import { CircleOff, Plus, PlusSquare } from 'lucide-react'

interface CreateModalityDialogProps {
  trigger?: React.ReactNode;
  onSuccessCallback: (modality: ModalityProps) => void
}

const schemaModality = z.object({
  id: z.string(),
  name: z.string().min(1, "O nome precisa ter mais que 4 caracteres alfabéticos"),
  icon: z.string().optional(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),
  updatedAt: z.string().default(Date.now().toString()),
  categoriesId: z.array(z.string()).optional()
})

export type ModalitySchemaProps = z.infer<typeof schemaModality>

const CreateModalityDialog: React.FC<CreateModalityDialogProps> = ({
  trigger,
  onSuccessCallback,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<ModalitySchemaProps>({
    defaultValues: {
      name: "",
      description: ""
    }
  })

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isSubmitting
    }
  } = form

  const onSubmit = (data: ModalitySchemaProps) => {
    console.log(data, "data")
    console.log(errors, "errros")

    const toasterId =
      toast.loading('Criando modalidade...')

    try {
      const newModality: ModalityProps = {
        ...data,
        id: crypto.randomUUID()
      }
      
      //INSERIR NO BANCO DE DADOS
      toast.success('Modalidade criada com sucesso', {
        id: toasterId
      })
      
      onSuccessCallback(newModality)
    } catch (error) {
      if (error instanceof Error) {
        return toast.error("Erro ao criar modalidade...", {
          id: toasterId
        })
      }
    } finally {
      setOpen((prev) => !prev)
      reset()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
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

      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>
            Criar uma nova modalidade
          </DialogTitle>
          <DialogDescription>
            Modalidades são usadas para unir suas categorias
          </DialogDescription>
        </DialogHeader>
        
        <div className='flex-1 px-2 overflow-y-auto pr-1'>
          <Form {...form}>
            <form className='flex flex-col gap-4'>
              <div className="space-y-3">
                <FormField
                  control={control}
                  name='name'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="modality-name"
                          className={
                            cn(
                              'text-sm',
                              errors.name && 'text-red-500'
                            )
                          }
                        >
                          Nome
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={field.onChange}
                          disabled={isSubmitting}
                          id="modality-name"
                        />
                      </FormControl>
                      {errors.name && (
                        <p className='text-red-500 text-sm'>
                          {errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <FormField
                  control={control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="modality-description"
                          className={
                            cn(
                              'text-sm',
                              errors.description && 'text-red-500'
                            )
                          }
                        >
                          Descrição
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="modality-description"
                          placeholder="Descreva a modalidade..."
                          rows={3}
                        />
                      </FormControl>
                        {errors.description && (<span className='text-red-500 text-sm'>
                          {errors.description.message}
                        </span>)}
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

              {/* DEVE SER POSSIVEL DE VINCULAR UMA OU MAIS CATEGORIAS EXISTENTES */}
              <div className="space-y-3">
                <Label htmlFor="exercise-category" className="text-sm font-medium">
                  Vincular categorias
                </Label>
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <Label className="text-sm font-semibold px-4 py-2">
                    Categorias{" "}
                    <span className="text-muted-foreground font-normal">
                      ({watch('categoriesId')?.length || 0} selecionados)
                    </span>
                  </Label>
                </div>
                {/* PASSAR ESTADO VIA DROP FELLING ATE UE ALTERE PROS TANSTACK QUERY */}
                <MultiCategoriesPicker
                  control={control}
                />
              </div>
            </form>
          </Form>
        </div>

        <DialogFooter className='gap-2 sm:gap-1'>
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
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
              >
                <Plus className="w-4 h-4" />
                Criar
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateModalityDialog