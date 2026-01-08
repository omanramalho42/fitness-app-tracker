"use client"

import React, { Fragment, useCallback, useState } from 'react'

import { toast } from 'sonner'

import CreateCategoryDialog from '@/components/create-category-dialog'
import UpdateCategoryDialog from '@/components/update-category-dialog'
import DeleteCategoryDialog from '@/components/delete-category-dialog'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from '@/components/ui/badge'

import type { CategoryProps } from '@/lib/types'

import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Download
} from "lucide-react"

const CategoriesCard:React.FC = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([
    {
      id: "a",
      name: "Treino A",
      icon: "💪",
      // muscleGroups: ["Peito", "Tríceps", "Ombro"],
      // exercisesId: ["12312312312312", "3123232312", "321321312312"],
      color: "bg-primary",
    },
  ])

  const handleCategorieCreate = useCallback(
    (value: CategoryProps) => {
      setCategories([...categories, value])
    },
    [categories],
  )

  const handleCategoriesUpdate = useCallback(
    (value: CategoryProps) => {
      const updateCategory: CategoryProps | undefined =
        categories.find((category) => 
          category.id === value.id
        )

      if(updateCategory) {
        const newUpdateCategory: CategoryProps = {
          ...updateCategory,
          id: value.id,
          name: value.name,
          description: value.description || "",
          icon: value.icon,
          exercisesId: value.exercisesId || []
        }
        const allCategories: CategoryProps[] = 
          categories.filter(
            (category) => category.id !== value.id
          )
        const newListExercisesAfterUpdate: CategoryProps[] = [
          ...allCategories,
          newUpdateCategory
        ]
        setCategories([...newListExercisesAfterUpdate])
      }
    }, [categories],
  )

  const handleDeleteCategory = useCallback(
    (value: CategoryProps) => {
      const updatedListAfterRemoving: CategoryProps[] =
        categories.filter(
          (category) => 
            category.id !== value.id
        )
      toast.success('categoria deletada com sucesso. 🎉', {
        id: value.id,
      })
      setCategories(updatedListAfterRemoving)
  }, [categories])

  const handleDuplicateCategory = (category: CategoryProps) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      name: `${category.name} (cópia)`,
    }
    setCategories([...categories, newCategory])
  }

  const handleExportCategory = (category: CategoryProps) => {
    const dataStr = JSON.stringify(category, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${category.name.toLowerCase().replace(/\s+/g, "-")}.json`
    link.click()
  }

  console.log(categories, "categories");

  return (
    <Fragment>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Categorias</h3>
          <CreateCategoryDialog
            onSuccessCallback={handleCategorieCreate}
            trigger={
              <Button
                className="hover:text-foreground"
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nova
              </Button>
            }  
          />
        </div>

        {categories.length > 0 ? categories.map((category) => (
          <Card key={category.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-2 ${category.color}`} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">
                        {category.icon}
                      </span>
                      <div className='flex flex-col items-start gap-2'>
                        <h4 className="font-semibold text-foreground">
                          {category.name}
                        </h4>
                        <p className='text-sm text-foreground relative'>
                          {/* sm:visible hidden */}
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">

                      <UpdateCategoryDialog
                        categoryId={category.id}
                        category={category}
                        onSuccessCallback={handleCategoriesUpdate}
                        trigger={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        }
                      />

                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleDuplicateCategory(category)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleExportCategory(category)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>

                      <DeleteCategoryDialog
                        category={category}
                        onSuccessCallback={handleDeleteCategory}
                        trigger={
                          <Button
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        }
                      />
                    </div>
                  </div>
                  {/* {category.muscleGroups && category.exercises && (
                    <>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {category.muscleGroups.map((muscle) => (
                          <Badge key={muscle} variant="secondary" className="text-xs">
                            {muscle}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">{category.exercises.length} exercícios</div>
                    </>
                  )} */}
                </div>
              </div>
            </CardContent>
          </Card>
        )) : (
          <CreateCategoryDialog
            onSuccessCallback={handleCategorieCreate}
            trigger={
              <Card
                className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <Plus className="w-12 h-12 mx-auto text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Criar categoria Personalizado</h4>
                    <p className="text-sm text-muted-foreground">Adicione categorias customizados ao seu banco</p>
                  </div>
                </CardContent>
              </Card>
            }
          />
        )}
      </div>
    </Fragment>
  )
}

export default CategoriesCard