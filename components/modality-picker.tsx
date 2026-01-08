'use client'

import { useCallback, useEffect, useState } from 'react'

import CreateWrokoutTypeDialog from '@/components/create-modality-dialog'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { cn } from '@/lib/utils'

import { ChevronsUpDownIcon, Check } from 'lucide-react'
import { CategoryProps } from './category-picker'
import { ModalityProps } from '@/lib/types'

interface ModalityPickerProps {
  onChange: (value: string) => void;
}

const ModalityPicker:React.FC<ModalityPickerProps> = ({
  onChange,
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')
  
  useEffect(() => {
    if (!value) return

    onChange(value)
  }, [onChange, value])

  // REALIZAR UMA QUERY PARA MODALIDADES
  const modalities: { data: ModalityProps[] } = {
    data:[ 
      { name: "Jiu Jitsu", icon: "🥋", id: crypto.randomUUID() },
      { name: "Muay Thay", icon: "🥊", id: crypto.randomUUID() },
      { name: "Musculação", icon: "💪", id: crypto.randomUUID() },
    ]
  }

  const selectedModality =
    modalities.data.find(
      (modality:ModalityProps) => 
        modality.name === value
    )

  const onSuccessCallback = useCallback(
    (modality: ModalityProps) => {
      setValue(modality.name)
      setOpen((prev) => !prev)
    },
    [setValue, setOpen],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='bg-background hover:text-foreground hover:bg-background border-input w-full justify-between px-3 font-normal outline-offset-0 outline-none focus-visible:outline-[3px]'
        >
          {selectedModality ? (
            <ModalityRow modality={selectedModality} />
          ) : (
            "Selecione a modalidade"
          )}
          <ChevronsUpDownIcon className='text-muted-foreground/80 shrink-0' aria-hidden='true' />
        </Button>
      </PopoverTrigger>

      <PopoverContent className='border-input w-full min-w-(--radix-popper-anchor-width) p-0' align='start'>
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder='pesquise a modalidade...' />
          <CreateWrokoutTypeDialog
            onSuccessCallback={onSuccessCallback}
          />
          <CommandEmpty className='p-2'>
            <p className='text-sm'>Modalidade não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Criar uma nova modalidade
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {modalities.data && 
                modalities.data.map((modality: ModalityProps) => (
                  <CommandItem
                    key={modality.name}
                    onSelect={currentValue => {
                      setValue(modality.name)
                      setOpen((prev) => !prev)
                    }}
                  >
                    <ModalityRow modality={modality} />
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 opacity-0',
                        value === modality.name && 'opacity-100',
                      )}
                    />
                  </CommandItem>
                ))
              }
            </CommandList>
          </CommandGroup>          
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function ModalityRow({ modality }: { modality: ModalityProps }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{modality.icon}</span>
      <span>{modality.name}</span>
    </div>
  )
}

export default ModalityPicker