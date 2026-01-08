'use client'

import React, { useCallback, useEffect, useState } from 'react'

// import { useQuery } from '@tanstack/react-query'
// import { Category } from '@prisma/client'

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
import CreateWorkoutCronDialog from '@/components/create-schedule-cron-dialog'
import { Badge } from '@/components/ui/badge'

import { Check, ChevronsUpDown } from 'lucide-react'


import { cn } from '@/lib/utils'
import { CronProps } from '@/lib/types'

interface WorkoutCronPickerProps {
  onChange: (value: string) => void
}

const WorkoutCronPicker:React.FC<WorkoutCronPickerProps> = ({ onChange }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return

    onChange(value)
  }, [onChange, value])

    // REALIZAR UMA QUERY PARA MODALIDADES
    const crons: { data: CronProps[] } = {
      data:[ 
        { name: "ABC", color: "", icon: ""  },
        { name: "ABCD", color: "", icon: "" },
        { name: "ABCDE" , color: "", icon: ""},
      ]
    }
  
    const selectedCron =
      crons.data.find(
        (cron:CronProps) => 
          cron.name === value
      )
  
    const onSuccessCallback = useCallback(
      (cron: CronProps) => {
        setValue(cron.name)
        setOpen((prev) => !prev)
      },
      [setValue, setOpen],
    )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-14"
        >
          {selectedCron ? (
            <CronRow cron={selectedCron} />
          ) : (
            <p className='text-foreground'>
              Selecione o cronograma
            </p>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Pesquise pelo cronograma..." />
          <CreateWorkoutCronDialog
            onSuccessCallback={onSuccessCallback}
          />
          <CommandEmpty className='p-2'>
            <p className='text-sm'>Cronograma não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Criar um novo cronograma
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {crons.data &&
                crons.data.map((cron: CronProps) => (
                  <CommandItem
                    key={cron.name}
                    onSelect={() => {
                      setValue(cron.name)
                      setOpen((prev) => !prev)
                    }}
                  >
                    <CronRow cron={cron} />
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 opacity-0',
                        value === cron.name && 'opacity-100',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CronRow({ cron }: { cron: CronProps }) {
  return (
    <div className="flex items-center justify-between w-full gap-8">
      <div>
        <div className="font-semibold text-base mb-0.5 text-foreground">{cron.name}</div>
        <div className="text-xs text-muted-foreground">3 treinos diferentes com repetição</div>
      </div>
      <Badge variant="secondary" className="ml-3 shrink-0">
        3 dias
      </Badge>
    </div>
  )
}


export default WorkoutCronPicker