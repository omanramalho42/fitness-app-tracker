import React, { useState } from 'react'

import { redirect } from 'next/navigation'

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
import { Badge } from '@/components/ui/badge'

import { Check, PlusSquare, X } from 'lucide-react'

import { CronProps } from '@/lib/types'

interface UpdateCronProps {
  trigger?: React.ReactNode
  onSuccessCallback: (cron: CronProps) => void;
  cronId: string;
} 

const UpdateCronDialog:React.FC<UpdateCronProps> = ({ trigger, cronId }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [customSplitDays, setCustomSplitDays] = useState<boolean[]>([true, true, true, false, true, true, false])
  const toggleCustomDay = (index: number) => {
    const newDays = [...customSplitDays]
    newDays[index] = !newDays[index]
    setCustomSplitDays(newDays)
  }

  const crons = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  if (!cronId) {
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
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Atualizar cronograma</DialogTitle>
          <DialogDescription className='text-sm text-muted-foreground'>
            Escolha os dias da semana em que você deseja treinar
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4">
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
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button className="w-full" size="lg">
              Atualizar Cronograma
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCronDialog