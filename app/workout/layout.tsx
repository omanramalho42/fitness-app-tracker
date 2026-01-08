import React from 'react'

import { Toaster } from 'sonner'

import { Button } from '@/components/ui/button'

import { Settings2 } from 'lucide-react'

interface LayoutWorkoutProps {
  children: React.ReactNode
}

export default function layout({ children }: LayoutWorkoutProps) {
  return (
    <main className='min-h-screen bg-background pb-20 mx-5'>
      <div className='mx-auto sm:max-w-2xl max-w-sm'>
        <header className="flex items-center justify-between px-4 my-5">
          <div>
            <h1 className="text-2xl font-bold">Meus Treinos</h1>
            <p className="text-sm text-muted-foreground">Configure seu plano de treino</p>
          </div>
          <Button size="icon" variant="outline">
            <Settings2 className="w-5 h-5 text-foreground" />
          </Button>
        </header>
        { children }
      </div>
    </main>
  )
}
