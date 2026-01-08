"use client"

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { generationSteps } from '@/lib/constants'

import { Check, PlusSquare, Sparkles } from 'lucide-react'

interface CreateIaFitnessDialogProps {
  trigger: React.ReactNode;
}

const CreateIaFitnessDialog:React.FC<CreateIaFitnessDialogProps> = ({ trigger }) => {
  const [open, setOpen] = useState<boolean>(false)

  const [step, setStep] = useState<number>(0)
  const [isLoading, setIsloading] = useState<boolean>(false)
  const [showResult, setShowResult] = useState<boolean>(false)
  
  const handleGenerateWorkout = () => {
    setIsloading(true)
    setStep(1)

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      setStep(currentStep)

      if (currentStep >= generationSteps.length) {
        clearInterval(interval)
        setTimeout(() => {
          setIsloading(false)
          setShowResult(true)
        }, 500)
      }
    }, 1200)
  }

  return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          {trigger || (
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'
            >
              <PlusSquare className="mr-2 h-4 w-4" />
              Criar novo
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Criar Treino com IA
            </DialogTitle>
          </DialogHeader>

          {/* STEP 1 */}
          {open && step === 0 && (
            <form className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="goal" className="text-sm font-semibold">
                  Qual é o seu objetivo?
                </Label>
                <Input id="goal" placeholder="Ex: Ganhar massa muscular, perder peso..." className="h-11" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="experience" className="text-sm font-semibold">
                  Nível de experiência
                </Label>
                <Select defaultValue="intermediario">
                  <SelectTrigger id="experience" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="days" className="text-sm font-semibold">
                  Dias por semana
                </Label>
                <Select defaultValue="3">
                  <SelectTrigger id="days" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 dias</SelectItem>
                    <SelectItem value="4">4 dias</SelectItem>
                    <SelectItem value="5">5 dias</SelectItem>
                    <SelectItem value="6">6 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="restrictions" className="text-sm font-semibold">
                  Restrições ou preferências
                </Label>
                <Textarea
                  id="restrictions"
                  placeholder="Ex: Não posso fazer agachamento, prefiro treinos rápidos..."
                  className="resize-none min-h-25"
                  rows={4}
                />
              </div>
            </form>
          )}

          {/* CARREGANDO RESULTADO */}
          {step > 0 && !showResult && isLoading && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <Sparkles className="absolute inset-0 m-auto w-10 h-10 text-primary animate-pulse" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold text-lg">{generationSteps[step - 1]}</p>
                <div className="flex gap-1 justify-center">
                  {generationSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index < step ? "bg-primary w-8" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MOSTRANDO RESULTADO */}
          {showResult && (
            <div className="space-y-4">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="w-5 h-5 text-primary" />
                  <h4 className="font-bold">Treino Criado com Sucesso!</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Criamos um plano de treino personalizado baseado nas suas informações. Confira abaixo:
                </p>
                <div className="space-y-3">
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Divisão Recomendada</div>
                    <div className="font-semibold">ABC (3 dias)</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Duração Estimada</div>
                    <div className="font-semibold">60-75 minutos por sessão</div>
                  </div>
                  <div className="bg-background rounded-lg p-3">
                    <div className="text-xs text-muted-foreground mb-1">Foco Principal</div>
                    <div className="font-semibold">Hipertrofia e Força</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <DialogClose asChild>
              {step === 0 ? (
                <Button
                  className="w-full hover:scale-[1.02] hover:shadow-xl transition-all duration-300 font-semibold"
                  size="lg"
                  onClick={(ev) => {
                    ev.preventDefault()
                    handleGenerateWorkout()
                  }}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gerar Treino Personalizado
                </Button>
              ) : showResult ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setStep(0)
                    setShowResult(false)
                  }}
                >
                  Aplicar ao Meu Plano
                </Button>
              ) : (
                null
              )}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
  )
}

export default CreateIaFitnessDialog