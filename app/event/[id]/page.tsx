"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Trophy,
  Target,
  CheckCircle2,
  Clock,
  Users,
  Share2,
  Calendar,
  Award,
  Zap,
  Crown,
  Medal,
} from "lucide-react"
import Link from "next/link"

export default function EventDetailsPage() {
  const [registered, setRegistered] = useState(false)

  const event = {
    id: "1",
    name: "Desafio de Verão 2025",
    description: "Complete o máximo de treinos e ganhe prêmios incríveis!",
    fullDescription:
      "O Desafio de Verão 2025 é uma competição épica onde você precisa completar uma série de treinos intensos para ganhar pontos e subir no ranking. Quanto mais você treina, mais pontos você ganha!",
    startDate: "1 Jan 2025",
    endDate: "31 Jan 2025",
    daysLeft: 15,
    participants: 1243,
    image: "/diverse-group-athletes.png",
    prizes: [
      {
        place: "1º Lugar",
        prize: "R$ 5.000 + Kit Completo",
        icon: "🥇",
        description: "Cash + equipamentos premium",
      },
      {
        place: "2º Lugar",
        prize: "R$ 3.000 + Suplementos",
        icon: "🥈",
        description: "Cash + kit de suplementos",
      },
      {
        place: "3º Lugar",
        prize: "R$ 1.500 + Acessórios",
        icon: "🥉",
        description: "Cash + acessórios fitness",
      },
      { place: "Top 10", prize: "6 Meses Premium Grátis", icon: "🏆", description: "Assinatura premium" },
    ],
    requirements: [
      "Completar no mínimo 20 treinos durante o evento",
      "Treinar pelo menos 4 dias por semana",
      "Registrar todos os treinos no app",
      "Manter uma sequência de pelo menos 7 dias",
    ],
    steps: [
      {
        step: 1,
        title: "Inscreva-se no Desafio",
        description: "Clique no botão abaixo para se registrar",
        completed: true,
      },
      {
        step: 2,
        title: "Complete os Treinos",
        description: "Faça seus treinos e registre no app para ganhar pontos",
        completed: false,
      },
      {
        step: 3,
        title: "Suba no Ranking",
        description: "Quanto mais você treina, mais pontos você ganha",
        completed: false,
      },
      {
        step: 4,
        title: "Ganhe Prêmios",
        description: "Os top 10 ganham prêmios incríveis ao final do evento",
        completed: false,
      },
    ],
    currentProgress: {
      workouts: 8,
      targetWorkouts: 20,
      streak: 5,
      targetStreak: 7,
      points: 1890,
    },
  }

  const progressPercentage = (event.currentProgress.workouts / event.currentProgress.targetWorkouts) * 100

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/ranking">
                <Button size="icon" variant="ghost">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-bold">Detalhes do Evento</h1>
            </div>
            <Button size="icon" variant="ghost">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Event Hero */}
        <Card className="overflow-hidden border-0 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
          <div className="relative h-48">
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground mb-2">
                <Clock className="h-3 w-3 mr-1" />
                {event.daysLeft} dias restantes
              </Badge>
              <h2 className="text-2xl font-bold text-white mb-1">{event.name}</h2>
              <p className="text-sm text-white/90">{event.description}</p>
            </div>
          </div>
        </Card>

        {/* Event Info */}
        <Card className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Período</p>
                <p className="font-semibold text-sm">
                  {event.startDate} - {event.endDate}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Participantes</p>
                <p className="font-semibold text-sm">{event.participants} inscritos</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{event.fullDescription}</p>
        </Card>

        {/* User Progress */}
        {registered && (
          <Card className="p-6 space-y-4 border-2 border-accent">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Seu Progresso</h3>
              <Badge variant="secondary" className="bg-accent/20 text-accent">
                {event.currentProgress.points} pts
              </Badge>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Treinos Completados</span>
                  <span className="font-bold">
                    {event.currentProgress.workouts} / {event.currentProgress.targetWorkouts}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Zap className="h-4 w-4 text-warning" />
                    <span className="text-2xl font-bold">{event.currentProgress.streak}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sequência Atual (Meta: {event.currentProgress.targetStreak})
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Target className="h-4 w-4 text-primary" />
                    <span className="text-2xl font-bold">
                      {event.currentProgress.targetWorkouts - event.currentProgress.workouts}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">Treinos Restantes</p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Requirements */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Requisitos para Competir
          </h3>
          <ul className="space-y-3">
            {event.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{req}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Steps to Complete */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Passo a Passo
          </h3>
          <div className="space-y-4">
            {event.steps.map((step) => (
              <div key={step.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step.completed ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {step.completed ? <CheckCircle2 className="h-5 w-5" /> : step.step}
                  </div>
                  {step.step < event.steps.length && (
                    <div className={`w-0.5 h-12 ${step.completed ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h4 className="font-semibold mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Prizes */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Premiação
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {event.prizes.map((prize, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  index === 0
                    ? "border-yellow-500 bg-yellow-500/10"
                    : index === 1
                      ? "border-slate-400 bg-slate-400/10"
                      : index === 2
                        ? "border-amber-600 bg-amber-600/10"
                        : "border-border bg-secondary/30"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{prize.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{prize.place}</h4>
                      {index < 3 && (
                        <Medal
                          className={`h-4 w-4 ${
                            index === 0 ? "text-yellow-500" : index === 1 ? "text-slate-400" : "text-amber-600"
                          }`}
                        />
                      )}
                    </div>
                    <p className="text-sm font-semibold text-primary">{prize.prize}</p>
                    <p className="text-xs text-muted-foreground">{prize.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA Button */}
        {!registered ? (
          <Button
            className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => setRegistered(true)}
          >
            <Crown className="h-5 w-5 mr-2" />
            Participar do Desafio
          </Button>
        ) : (
          <Button className="w-full h-14 text-lg bg-transparent" variant="outline" disabled>
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Você está participando!
          </Button>
        )}
      </div>
    </div>
  )
}
