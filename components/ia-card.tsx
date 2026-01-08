import React from 'react'

import CreateIaFitnessDialog from '@/components/create-ia-fitness-dialog'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { Sparkles } from "lucide-react"

const IaCard:React.FC = () => {
  return (
    <Card className="overflow-hidden border-2 hover:border-primary/50 shadow-lg shadow-primary/20 mt-4 px-4 transition-all">
      <CardContent className="p-0">
        <div className="bg-linear-to-br rounded-sm from-primary via-primary/90 to-primary/70 p-6 text-primary-foreground relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6" />
              <h3 className="font-bold text-xl">Fitness Coach IA</h3>
            </div>
            <p className="text-sm text-primary-foreground/95 mb-5 leading-relaxed">
              Crie um treino personalizado com inteligência artificial baseado nos seus objetivos, nível de
              experiência e preferências específicas
            </p>
            <CreateIaFitnessDialog
              trigger={
                <Button
                  className="w-full bg-background text-foreground hover:bg-background/95 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 font-semibold"
                  size="lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Criar Treino com IA
                </Button>
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default IaCard