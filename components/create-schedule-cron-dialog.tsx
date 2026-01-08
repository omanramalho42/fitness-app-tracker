"use client"

import React, { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Checkbox } from "@/components/ui/checkbox"
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
import { Badge } from '@/components/ui/badge'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'

import type { ScheduleCronProps } from '@/lib/types'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Bell, BellDot, BellIcon, BellOffIcon, BellPlusIcon, Calendar1Icon, Check, ChevronDownIcon, Clock1, LucideOption, PlusSquare, Signpost, Workflow, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Textarea } from './ui/textarea'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Calendar } from './ui/calendar'
import ModalityPicker from './modality-picker'
import CategoryPicker from './category-picker'
import MultiCategoriesPicker from './multi-categories-picker'
import { toast } from 'sonner'
import { Separator } from './ui/separator'
import { ScheduleSummary } from './schedule-summary'
import { Switch } from './ui/switch'

interface CreateCronProps {
  trigger?: React.ReactNode
  onSuccessCallback: (cron: ScheduleCronProps) => void;
} 

const CreateScheduleCronDialog:React.FC<CreateCronProps> = ({ trigger }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [openCron, setOpenCron] =
  useState<boolean>(false)
  const [customSplitDays, setCustomSplitDays] = useState<boolean[]>([true, true, true, false, true, true, false])
  
  
  const toggleCustomDay = (index: number) => {
    const newDays = [...customSplitDays]
    newDays[index] = !newDays[index]
    setCustomSplitDays(newDays)
  }

  function formatDate(date: Date | undefined) {
    if (!date) {
      return ""
    }
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  const crons = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  const scheduleCronSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    date: z.object({
      from: z.date(),
      to: z.date()
    }).optional(),
    time: z.string().optional(),
    modalityId: z.string().optional(),
    categoriesId: z.array(z.string()).optional(),
    recurrence: z.string(),
  })

  type ScheduleCronSchemaType = z.infer<typeof scheduleCronSchema>

  const form = useForm<ScheduleCronSchemaType>({
    defaultValues: {
      name: "",
      description: "",
      time:  "",
      categoriesId: [""],
      modalityId: ""
    }
  })
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false)

  const onSubmit = (data: ScheduleCronSchemaType) => {
    const toasterId =
      toast.loading("Criando cronograma...");

      console.log(data, "data");
      console.log(errors, 'errors')

    try {      
      toast.success("Cronograma criado com sucesso. 🎉", {
        id: toasterId
      })
    } catch (error) {
      if (error instanceof Error) {
        console.log(error, "error")
        toast.error("Erro ao criar cronograma....", {
          id: toasterId
        })
        throw new Error(error.message)
      }
    } finally {
      setOpen((prev) => !prev)
      reset()
    }
  }
  
  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: {
      errors,
      isSubmitting
    }
  } = form

  const buttonTxt = !isSubmitting
    ? 'Criar cronograma' 
    : 'Criando...'

  const dateCalendarPicker = watch('date')
  useEffect(() => {
    console.log(dateCalendarPicker, "dateCalendarPicker");
  },[dateCalendarPicker])

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
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Criar Divisão Personalizada</DialogTitle>
          <DialogDescription className='text-sm text-muted-foreground'>
            Escolha os dias da semana em que você deseja treinar
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form className="space-y-4">
            <div className="flex w-full flex-col gap-6">
              <Tabs defaultValue="schedule">
                <TabsList>
                  <TabsTrigger value="schedule">cronograma</TabsTrigger>
                  <TabsTrigger disabled={openCron} value="summary">resumo</TabsTrigger>
                </TabsList>
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Cronograma</CardTitle>
                      <CardDescription>
                        Faça as mudanças para sua conta aqui. clique para salvar
                        quando estiver pronto.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {/* recorrente? */}
                      {/* <div className="flex items-start gap-3">
                        <Checkbox
                          id="recorrence"
                          defaultChecked
                          onCheckedChange={() => {
                            setOpenCron((prev) => !prev)
                          }}
                        />
                        <div className="grid gap-2">
                          <Label htmlFor="recorrence">
                            Tornar atividade recorrente?
                          </Label>
                          <p className="text-muted-foreground text-sm">
                            Ativar para agendar automaticamente.
                          </p>
                        </div>
                      </div> */}

                      <div className="grid gap-3">
                        <FormField
                          control={control}
                          name='name'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label
                                  htmlFor="tabs-demo-name"
                                  className={cn('text-sm', errors.name && 'rext-red-500')}
                                >
                                  Nome do cronograma
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className='placeholder:text-gray-500 placeholder:text-sm'
                                  {...field}
                                  id="tabs-demo-name"
                                  placeholder='Treino Personalizado'
                                />
                              </FormControl>
                              {errors.name && (
                                <span className='text-red-500'>{errors.name.message}</span>
                              )}
                            </FormItem>
                          )}
                        />
                      </div>
                      {/* <div className="grid gap-3">
                        <FormField
                          control={control}
                          name='description'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                <Label
                                  className={cn('text-sm', errors.description && 'rext-red-500')}
                                >
                                  Descrição
                                </Label>
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={3}
                                  value={field.value}
                                  placeholder='Descreva seu cronograma...'
                                  className={cn('text-sm', errors.description && 'rext-red-500')}
                                >
                                  Descrição
                                </Textarea>
                              </FormControl>
                              {errors.name && (
                                <span className='text-red-500'>{errors?.description?.message}</span>
                              )}
                            </FormItem>
                          )}
                        />
                      </div> */}
                      <div className="flex flex-row gap-2 justify-between items-center">
                        <div className="flex flex-col space-y-2 w-full">
                          <Label htmlFor="date-picker" className="px-1">
                            Data
                          </Label>
                          <Popover
                            open={openDatePicker}
                            onOpenChange={setOpenDatePicker}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date-picker"
                                className="justify-between font-normal hover:text-foreground"
                              >
                                <Calendar1Icon className='text-primary' />
                                {
                                  dateCalendarPicker?.from && dateCalendarPicker?.to
                                  ? <p className='text-[12px]'>
                                      {dateCalendarPicker.from.toLocaleDateString()} 
                                      {" - "}
                                      {dateCalendarPicker.to.toLocaleDateString()}
                                    </p>
                                  : (
                                    <span className="text-sm text-gray-500">
                                      Selecione uma data
                                    </span>
                                  )
                                }
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <FormField
                                name='date'
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Calendar
                                        mode="range"
                                        defaultMonth={field.value?.from}
                                        selected={field?.value}
                                        captionLayout="dropdown"
                                        onSelect={(date) => {
                                          field.onChange(date)
                                          setOpenDatePicker((prev) => !prev)
                                        }}
                                      />
                                    </FormControl>
                                    {errors.date && (
                                      <span className="text-red-500">
                                        {errors.date.message}
                                      </span>
                                    )}
                                  </FormItem>
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                          {/* {watch('date') !== undefined && (
                            <div className="text-muted-foreground px-1 text-sm">
                              Your post will be published on{" "}
                              <span className="font-medium">
                                {formatDate(watch('date')!)}
                              </span>.
                            </div>
                          )} */}
                        </div>
                        <div className="flex flex-col space-y-2 w-full">
                          <Label
                            htmlFor="time-picker"
                            className={cn("px-1", errors.time && 'text-red-500')}
                          >
                            Horário
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="time-picker"
                                className="justify-between font-normal hover:text-foreground"
                              >
                                <Clock1 className='text-primary' />
                                {
                                  watch('time') 
                                  ? (
                                      <p className='text-[12px]'>
                                        {watch('time')}
                                      </p>
                                    ) : (
                                    <span className="text-[12px] text-gray-500">
                                      Hora
                                    </span>
                                  )
                                }
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <FormField
                                name='time'
                                control={control}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        {...field}
                                        name='time'
                                        type="time"
                                        id="time-picker"
                                        step="1"
                                        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                      />
                                    </FormControl>
                                    {errors.time && (
                                      <span className="text-red-500">
                                        {errors.time.message}
                                      </span>
                                    )}
                                  </FormItem>
                                )}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      
                      {/* REPETIR */}
                      <div className="flex flex-col w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="recorrence-picker"
                              className="justify-between border-l-4 border-l-green-700 font-normal hover:text-foreground"
                            >
                              <div className='flex flex-row-reverse items-center justify-start gap-1'>
                                <Label
                                  htmlFor="recorrence-picker"
                                  className={cn("px-1", errors.recurrence && 'text-red-500')}
                                >
                                  Repetir
                                </Label>
                                <Clock1 className='text-primary' />
                              </div>
                              {
                                watch('recurrence') 
                                ? watch('recurrence') 
                                : (
                                  <span className="text-sm text-gray-500">
                                    Semanalmente (toda semana)
                                  </span>
                                )
                              }
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <FormField
                              name='recurrence'
                              control={control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="recurrence"
                                      id="recurrence-picker"
                                      step="1"
                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                  </FormControl>
                                  {errors.recurrence && (
                                    <span className="text-red-500">
                                      {errors.recurrence.message}
                                    </span>
                                  )}
                                </FormItem>
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* ENCERRAR */}
                      {/* <div className="flex flex-col w-full">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              id="recorrence-picker"
                              className="justify-between border-l-4 border-l-green-700 font-normal hover:text-foreground"
                            >
                              <div className='flex flex-row-reverse items-center justify-start gap-1'>
                                <Label
                                  htmlFor="recorrence-picker"
                                  className={cn("px-1", errors.recorrence && 'text-red-500')}
                                >
                                  Encerrar
                                </Label>
                                <LucideOption className='text-primary' />
                              </div>
                              {
                                watch('recorrence') 
                                ? watch('recorrence') 
                                : (
                                  <span className="text-sm text-gray-500">
                                    Nunca
                                  </span>
                                )
                              }
                              <ChevronDownIcon />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <FormField
                              name='recorrence'
                              control={control}
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      name='recorrence'
                                      type="recorrence"
                                      id="recorrence-picker"
                                      step="1"
                                      className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                    />
                                  </FormControl>
                                  {errors.recorrence && (
                                    <span className="text-red-500">
                                      {errors.recorrence.message}
                                    </span>
                                  )}
                                </FormItem>
                              )}
                            />
                          </PopoverContent>
                        </Popover>
                      </div> */}

                      {/* DAYS PF ACTIVITY */}
                      {/* <div className='flex justify-start items-center gap-2'>
                        <Workflow className='w-4 text-gray-500' />
                        <Label>Dias de treino</Label>
                      </div>
                      <div className="flex flex-wrap flex-row gap-2 border rounded-md px-4 py-2">
                        {['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].map((item) => {
                          return (
                            <Badge className='flex items-center w-12 h-6 bg-accent-foreground border-primary border rounded-sm'>
                              <p className='text-sm text-primary font-light uppercase'>
                                {item}
                              </p>
                            </Badge>
                          )
                        })}
                      </div> */}

                      {/* ORGANIZATION */}
                      <div className="flex flex-col space-y-2">
                        <div className="space-y-3">
                          <Label>Vincular modalidade</Label>
                          <ModalityPicker onChange={() => {}} />
                        </div>

                        <div className="space-y-3 pb-4">
                          <Label>Vincular categorias</Label>
                          <MultiCategoriesPicker
                            // @ts-ignore
                            control={control}
                          />
                        </div>
                      </div>

                      {/* SUMMARY */}
                      

                    </CardContent>
{/* 
                    <CardFooter>
                      <Button>Criar</Button>
                    </CardFooter> */}

                  </Card>
                </TabsContent>

                <TabsContent value="summary">
                  {/* <Card>
                    <CardHeader>
                      <CardTitle>Repetir</CardTitle>
                      <CardDescription>
                        Crie uma rotina, aqui você pode escolher os dias da semana que vai exercer a sua atividade
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                      <div className="space-y-2">
                        {crons.map((day, index) => (
                          <div
                            key={day}
                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              customSplitDays[index] ? "bg-primary/10 border-primary" : "bg-secondary/30 border-transparent"
                            }`}
                            onClick={() => toggleCustomDay(index)}
                          >
                            <span className="font-medium">{day}</span>
                            <div className="flex items-center gap-2">
                              {customSplitDays[index] ? (
                                <>
                                  <Badge variant="default">Treino</Badge>
                                  <Check className="w-5 h-5 text-primary" />
                                </>
                              ) : (
                                <>
                                  <Badge variant="secondary">Descanso</Badge>
                                  <X className="w-5 h-5 text-muted-foreground" />
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button>Aplicar divisão</Button>
                    </CardFooter>
                  </Card> */}
                  <ScheduleSummary
                    data={{
                      startDate: Date.now(),
                      recurrence: watch("recurrence") ? "weekly" : "once",
                      modality: "jiu jitsu",
                      categories: [{ name: "" }].map(c => c.name)
                    }}
                  />

                </TabsContent>
              </Tabs>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='button'
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {buttonTxt}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}

export default CreateScheduleCronDialog