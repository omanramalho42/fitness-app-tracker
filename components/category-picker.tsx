'use client'

import React, { useCallback, useEffect, useState } from 'react'

// import { useQuery } from '@tanstack/react-query'
// import { Category } from '@prisma/client'
import CreateCategoryDialog from '@/components/create-category-dialog'

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


import { cn } from '@/lib/utils'

import { Check, ChevronsUpDown } from 'lucide-react'
import { CategoryProps } from '@/lib/types'

interface CategoryPickerProps {
  onChange: (value: string) => void
}

export default function CategoryPicker({
  onChange,
}: CategoryPickerProps) {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return

    onChange(value)
  }, [onChange, value])

  // const categories = useQuery({
  //   queryKey: ['categories', type],
  //   queryFn: () =>
  //     fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  // })

  // REALIZAR UMA QUERY PARA MODALIDADES
  const categories: { data: CategoryProps[] } = {
    data:[ 
      { name: "Finalização arm lock", icon: "🥋", color: "#00000", exercisesId: [""], id:"" },
      { name: "Chute frontal", icon: "🥊", color: "#00000", exercisesId: [""], id:"" },
      { name: "Desenvolvimento de ombros", icon: "💪", color: "#00000", exercisesId: [""], id:"" },
    ]
  }

  const selectedCategory =
    categories.data.find(
      (category:CategoryProps) => 
        category.name === value
    )

  const onSuccessCallback = useCallback(
    (category: CategoryProps) => {
      setValue(category.name)
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
          className="w-full justify-between hover:text-foreground"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            'Selecione a categoria'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-50 p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Pesquise a categoria..." />
          <CreateCategoryDialog
            onSuccessCallback={onSuccessCallback}
          />
          <CommandEmpty className='p-2'>
            <p className='text-sm'>Categoria não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Criar uma nova categoria
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories.data &&
                categories.data.map((category: CategoryProps) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.name)
                      setOpen((prev) => !prev)
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 opacity-0',
                        value === category.name && 'opacity-100',
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

function CategoryRow({ category }: { category: CategoryProps }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}
