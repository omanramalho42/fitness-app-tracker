import React from 'react'

// import { Category } from '@prisma/client'

// import { useMutation, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

// import { DeleteCategory } from '../_actions/categories'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

import type { CategoryProps } from '@/lib/types'

// import { TransactionType } from '@/lib/types'
// import { DeleteCategorySchemaType } from '@/schema/categories'

interface DeleteCategoryDialogProps {
  category: CategoryProps
  trigger: React.ReactNode
  onSuccessCallback: (category: CategoryProps) => void
}

const DeleteCategoryDialog: React.FC<DeleteCategoryDialogProps> = ({
  category,
  trigger,
  onSuccessCallback
}) => {
  const categoryIdentifier = `${category.id}`
  // const queryClient = useQueryClient()

  // const deleteMutation = useMutation({
  //   mutationFn: async (values: DeleteCategorySchemaType) => {
  //     return await DeleteCategory(values)
  //   },
  //   onSuccess: async () => {
  //     toast.success('Categoria deletada com sucesso! 🎉', {
  //       id: categoryIdentifier,
  //     })

  //     await queryClient.invalidateQueries({
  //       queryKey: ['categories'],
  //     })
  //   },
  //   onError: () => {
  //     toast.error('Aconteceu algo de errado', {
  //       id: categoryIdentifier,
  //     })
  //   },
  // })
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-foreground'>
            Você têm certeza absoluta?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Está ação não poderá ser desfeita. Isso vai exlcuir permanentemente
            sua categoria.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.loading('Deletando categoria...', {
                id: categoryIdentifier,
              })
              onSuccessCallback(category)
              // deleteMutation.mutate({
              //   name: category.name,
              //   type: category.type as TransactionType,
              // })
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteCategoryDialog
