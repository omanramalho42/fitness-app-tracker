import React from 'react'

import { toast } from 'sonner'

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

import type { ExerciseProps } from '@/lib/types'

interface DeleteExerciseDialogProps {
  exercise: ExerciseProps
  trigger: React.ReactNode
  onSuccessCallback: (exerciseId: string) => void
}

const DeleteExerciseDialog: React.FC<DeleteExerciseDialogProps> = ({
  exercise,
  onSuccessCallback,
  trigger,
}) => {
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
              toast.loading("Deletenado exercicio...", {
                id: exercise.id
              })
              onSuccessCallback(exercise.id)
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteExerciseDialog
