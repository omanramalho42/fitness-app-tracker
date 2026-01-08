"use client"
import { useState } from "react"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { ScheduleRoutineByCategory } from "@/components/schedule-routine-category"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

import {
  CalendarDays,
  Repeat,
  Dumbbell,
  Layers,
  Download,
  BellIcon
} from "lucide-react"

type ScheduleSummaryProps = {
  data: {
    startDate?: any
    recurrence?: "weekly" | "once"
    modality?: string | null
    categories?: string[]
  }
}

export function ScheduleSummary({ data }: ScheduleSummaryProps) {
  const {
    startDate,
    recurrence = "weekly",
    modality,
    categories = []
  } = data

  const [openCron, setOpenCron] =
    useState<boolean>(false)

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between items-center gap-2 text-base">
          <div className="flex flex-row gap-2 items-center justify-start">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md bg-green-500/10 text-green-400"
            >
              <Layers size={16} />
            </span>
            Resumo
          </div>
          <Button className="rounded-full">
            <Download className="text-[10px]" />
          </Button>
        </CardTitle>
        <CardDescription>
          descrição
        </CardDescription>
      </CardHeader>

      <Separator className="bg-zinc-800" />

      <CardContent className="space-y-3">
        {/* GRID */}
        <div className="grid grid-cols-2 px-4 items-start gap-4">
          {/* INÍCIO */}
          <SummaryItem
            icon={<CalendarDays size={16} />}
            label="Inicia em"
            value={
              startDate
                ? format(startDate, "dd 'de' MMMM yyyy", { locale: ptBR })
                : "Não definido"
            }
          />

          {/* RECORRÊNCIA */}
          <SummaryItem
            icon={<Repeat size={16} />}
            label="Frequência"
            value={recurrence === "weekly" ? "Semanal (para sempre)" : "Evento único"}
          />

          {/* MODALIDADE */}
          <SummaryItem
            icon={<Dumbbell size={16} />}
            label="Modalidade"
            value={modality ?? "Nenhuma"}
          />

          {/* CATEGORIAS */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Layers size={16} />
              Categorias
            </div>

            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="bg-zinc-800 text-zinc-200"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">Nenhuma selecionada</p>
            )}
          </div>
        </div>

        <ScheduleRoutineByCategory />

        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row items-center gap-2'>
            <BellIcon className='text-primary w-4.5' />
            <Label className='text-sm text-foreground'>
              Notificações
            </Label>
          </div>
          <div className='flex items-center'>
            <Switch className='bg-primary' />
          </div>
        </div>

        <Separator className='mb-1' />

        {/* email */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="recorrence"
            defaultChecked
            onCheckedChange={() => {
              setOpenCron((prev) => !prev)
            }}
          />
          <div className="flex flex-wrap justify-start flex-row items-center gap-2">
            <Label htmlFor="recorrence">
              Enviar e-mail
            </Label>
            {" - "}
            <p className="text-primary text-sm font-light">
              1h antes
            </p>
          </div>
        </div>
        {/* sms? */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="recorrence"
            defaultChecked
            onCheckedChange={() => {
              setOpenCron((prev) => !prev)
            }}
          />
          <div className="flex flex-wrap justify-start flex-row items-center gap-2">
            <Label htmlFor="recorrence">
              Enviar SMS
            </Label>
            {" - "}
            <p className="text-primary text-sm font-light">
              30min antes
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* -------------------------------- */

function SummaryItem({
  icon,
  label,
  value
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        {icon}
        {label}
      </div>
      <p className="text-sm text-zinc-200">{value}</p>
    </div>
  )
}
