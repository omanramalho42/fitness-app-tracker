"use client"

import React, { useCallback, useState } from 'react'

import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"
// import { Badge } from '@/components/ui/badge'

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

import { Check, ChevronsUpDown } from "lucide-react"

import { CreateCategoryProps, CategoryProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import { Control, useController } from 'react-hook-form'
import { ModalitySchemaProps } from './create-modality-dialog'
import CreateCategoryDialog from './create-category-dialog'

interface MultiCategoryPickerProps {
  control: Control<ModalitySchemaProps>
}

const MultiCategoriesPicker:React.FC<MultiCategoryPickerProps> = ({ control }) => {
  const [categories, setCategories] = useState<CategoryProps[]>([])

  const [open, setOpen] = useState(true)
  
  const handleCategoryChange = useCallback(
    (value: CreateCategoryProps) => {
      setCategories([...categories, value])
    },
    [categories],
  )

  if(!control) {
    return null
  }

  const { field } = useController({
    control: control,
    name: 'categoriesId'
  })

  const categoriesListStorage:CategoryProps[] = 
    categories.filter((category) => 
      field.value?.flat().includes(category.id)
    )

  const [categoriesList, setCategoriesList] =
    useState<CategoryProps[]>(categoriesListStorage)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="flex flex-row w-full overflow-x-auto h-full justify-between hover:text-foreground"
        >
          {categoriesList.length > 0 ? (
            categoriesList.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`flex w-full items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md`}
                >
                  <Image
                    width={64}
                    height={64}
                    src={category.imageUrl || "/placeholder.svg"}
                    alt={category.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col items-start gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{category.name}</h4>
                      <div className='flex flex-row justify-between gap-2'>
                        {/* RECUPERAR OS EXERCICIOS E LISTAR DE ACORDO COM OS ID´S DE EXERCICIOS NA LISTA EXERCISES ID */}
                        {/* <Badge variant="outline" className="text-xs bg-gray-900">
                          {category.exercises?.name}
                        </Badge> */}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
                  </div>
                </div>
              )
            })
          ) : (
            'Selecione a categoria'
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Pesquise pela categoria..." />
          <CreateCategoryDialog
            onSuccessCallback={handleCategoryChange}
          />
          <div
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <Label className="text-sm font-semibold px-4 py-2">
              Categorias{" "}
              <span className="text-muted-foreground font-normal">
                ({categoriesList.length} selecionados)
              </span>
            </Label>
          </div>
          <CommandEmpty className='p-3'>
            <p className='text-sm'>Categoria não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Criar uma nova categoria
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categories &&
                categories.map((category: CategoryProps, idx: number) => {
                  return (
                    <CommandItem
                      key={category.id}
                      onSelect={(category) => {
                        // console.log(category, "fn")
                      }}
                    >
                      <CategoryRow
                        control={control}
                        category={category}
                        categoriesList={categoriesList}
                        setCategoriesList={setCategoriesList}
                      />
                    </CommandItem>
                  )
              })}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}


function CategoryRow({
  category,
  categoriesList,
  setCategoriesList,
  control
}: {
  category: CategoryProps,
  categoriesList: CategoryProps[],
  setCategoriesList: React.Dispatch<React.SetStateAction<CategoryProps[]>>,
  control: Control<ModalitySchemaProps>
}) {
  const [open, setOpen] = useState<boolean>(false)
  
  const toggleCategory = useCallback((categoryId: string) => {
    //VERIFICA SE EXERCICIO EXISTE NO BANCO DE DADOS
    const existCategory:CategoryProps | undefined = categoriesList.find(
      (category) => {
        return (
          category.id === categoryId
        )
      }
    )

    if(existCategory) {
      // SE O ARRAY FOR VAZIO ENTAO ADICIONE O EXERCICIO A LISTA
      if (categoriesList.length === 0) {
        //DEFINIR OS IDS DO EXERCICIOS
        const newCategoriesId: string[] = [existCategory.id]

        field.onChange([newCategoriesId])
        setCategoriesList([existCategory])
      } else {
        //CASO JA EXISTA ALGUM VALOR DENTRO DA LISTA
        //VERIFICA SE EXERCICIO EXISTE NA LISTA
        const existUserOnList = categoriesList.find((category) => (
          category.id === categoryId
        ))
        //CASO EXERCICIO NAO EXISTA NA LISTA
        if (!existUserOnList) {
          //CRIE UM NOVO ARRAY COM OS EXERCICIOS QUE JÁ EXISTIAM NA LISTA E ADICONE O NOVO EXERCICIO
          const newListCategories: CategoryProps[] = [
            ...categoriesList,
            existCategory
          ]
          //SETE O NOVO exercicio
          setCategoriesList(newListCategories);
          //DEFINIR OS IDS DO EXERCICIOS
          const categoriesId: string[] = 
            newListCategories.map(
              (category) => category.id
            )

          field.onChange(categoriesId)
        } else {
          ///CASO O EXERCICIO JÁ TENHA SIDO ADICIONADO
          //CRIE UMA NOVA LISTA COM TODOS OS EXERCICIOS MENOS O QUE FOI REMOVIDA AGORA
          const newListCategories: CategoryProps[] =
            categoriesList.filter((category) => (
              category.id !== categoryId
            ))
          //DEFINIR OS IDS DO EXERCICIOS
          const categoriesId: string[] = 
            newListCategories.map(
              (category) => category.id
            )
          //SETE A NOVA LSITA DE EXERCICIOS, AGORA REMOVENDO O EXERCICIO DESVINCULADO
          setCategoriesList(newListCategories)
          field.onChange(categoriesId)
        }
      }
    }
  }, [categoriesList])

  if(!control) {
    return null
  }

  const { field } = useController({
    control: control,
    name: 'categoriesId'
  })

  const isSelected = field.value?.flat().includes(category.id)

  return (
    <TooltipProvider key={category.id}>
      <Tooltip
        open={open}
        defaultOpen={false}
        onOpenChange={setOpen}
      >
        <TooltipTrigger asChild>
          <div
            onClick={(e) => {
              toggleCategory(category.id)
            }}
            className={`flex w-full items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
              isSelected
                ? "bg-primary/10 border-primary"
                : "bg-card border-border text-foreground hover:border-primary/40"
            }`}
          >
            <Image
              width={64}
              height={64}
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col items-start gap-2 mb-1">
                <h4 className="font-semibold text-sm">{category.name}</h4>
                {/* <Badge variant="outline" className="text-xs bg-gray-900">
                  {category.category?.name}
                </Badge> */}
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">{category.description}</p>
            </div>
            <div className="shrink-0">
              <div
                className={cn(
                  'w-6 h-6 rounded-full ',
                  isSelected && 'bg-primary flex items-center justify-center',
                  !isSelected && 'border-2 border-muted-foreground/30'
                )}
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs bg-transparent overflow-hidden">
          <div className="relative">
            <Image
              width={256}
              height={192}
              src={category.imageUrl || "/placeholder.svg"}
              alt={category.name}
              className="w-64 h-48 object-cover"
            />
            <div className="p-3 bg-background/95 backdrop-blur">
              <h4 className="font-bold mb-1 text-foreground">
                {category.name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {category.description}
              </p>
              {/* <Badge variant="secondary" className="mt-2 text-xs">
                {category?.category?.name}
              </Badge> */}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default MultiCategoriesPicker