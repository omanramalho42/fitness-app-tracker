import { redirect } from 'next/navigation'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { toast } from 'sonner'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import MultiCategoriesPicker from '@/components/multi-categories-picker'

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'


import { cn } from '@/lib/utils'

import type { ModalitySchemaProps } from '@/components/create-modality-dialog'
import type { DialogProps } from '@radix-ui/react-dialog'
import type { ModalityProps } from '@/lib/types'

import { CircleOff, PlusSquare } from 'lucide-react'
import { customEmojis } from '@/lib/constants'

interface UpdateModalityDialogProps extends DialogProps {
  modality: ModalityProps
  trigger?: React.ReactNode
  onSuccessCallback: (modality: ModalityProps) => void
}

const UpdateModalityDialog: React.FC<UpdateModalityDialogProps> = ({
  modality,
  trigger,
  onSuccessCallback,
  ...props
}) => {
  const [open, setOpen] = useState<boolean>(false)

  if(!modality.id) {
    return redirect("/")
  }

  const form = useForm<ModalitySchemaProps>({
    defaultValues: {
      id: modality.id,
      name: modality.name,
      icon: modality.icon,
      description: modality.description || "",
      categoriesId: modality.categoriesId
    }
  })

  const {
    formState: { errors, isSubmitting },
    control,
    watch,
    handleSubmit
  } = form
  
  const onSubmit = (data: ModalityProps) => {
    const toasterId =
      toast.loading('Atualizando modalidade...');

    console.log(data, 'data')
    console.log(errors, 'errors')

    try {
      toast.success("Modalidade criada com sucesso! 🎉", {
        id: toasterId
      })
      const newModality: ModalityProps = {
        ...data,
        name: data.name,
        description: data.description,
        updatedAt: Date.now().toString()
      }

      onSuccessCallback(newModality)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          'Ocorreu um erro ao atualizar Modalidade... ⚠️',{
            id: toasterId
        })
      }
    } finally {
      setOpen((prev) => !prev)
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
            Atualizar modalidade
          </DialogTitle>
          <DialogDescription>
            Modalidades são usadas para unir suas categorias
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form>
            <div className="space-y-4">
              <div className="grid gap-3">
                <FormField
                  control={control}
                  name='name'
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="modality-name"
                          className={cn('text-small', errors.name && 'text-red-500z')}
                        >
                          Nome
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="modality-name"
                          disabled={isSubmitting}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      {errors.name && (<span className='text-red-500 text-sm'>
                        {errors.name.message}
                      </span>)}
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={control}
                  name='description'
                  rules={{ required: false }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Label
                          htmlFor="modality-description"
                          className={cn('text-small', errors.description && 'text-red-500z')}
                        >
                          Nome
                        </Label>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          id="modality-description"
                          value={field.value}
                          onChange={field.onChange}
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
                <MultiCategoriesPicker
                  control={control}
                />
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter className='gap-2 sm:gap-1'>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? 'Carregando...' : 'Criar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateModalityDialog