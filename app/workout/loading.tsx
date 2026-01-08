import React from 'react'

interface LoadingWorkoutProps {
  children: React.ReactNode
}

export default function loading({ children }: LoadingWorkoutProps) {
  return (
    <main>
      {children}
    </main>
  )
}
