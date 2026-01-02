"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Trophy,
  Flame,
  Award,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Share2,
  Download,
  Zap,
  Crown,
  FileText,
  Eye,
  Star,
  Target,
} from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function MyRankingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)
  const [showCertificate, setShowCertificate] = useState(false)

  const userStats = {
    rank: 15,
    points: 1890,
    totalWorkouts: 45,
    streak: 5,
    longestStreak: 14,
    totalTime: "32h 15min",
    badges: [
      { name: "Iniciante", icon: "🎯", earned: "Jan 2026" },
      { name: "Semana Completa", icon: "🔥", earned: "Jan 2026" },
      { name: "10 Treinos", icon: "💪", earned: "Dez 2025" },
    ],
    completedChallenges: [
      {
        name: "Desafio 7 Dias",
        description: "Complete 7 dias seguidos de treino",
        icon: "🔥",
        date: "15 Jan 2026",
        points: 250,
        tasks: [
          { day: 1, title: "Treino de Pernas", completed: true, date: "09 Jan" },
          { day: 2, title: "Cardio 30min", completed: true, date: "10 Jan" },
          { day: 3, title: "Treino de Peito", completed: true, date: "11 Jan" },
          { day: 4, title: "Yoga Matinal", completed: true, date: "12 Jan" },
          { day: 5, title: "Treino de Costas", completed: true, date: "13 Jan" },
          { day: 6, title: "HIIT 20min", completed: true, date: "14 Jan" },
          { day: 7, title: "Treino Full Body", completed: true, date: "15 Jan" },
        ],
        requirements: "Completar 7 treinos consecutivos sem faltar nenhum dia",
        reward: "Badge de Sequência + 250 pontos",
      },
      {
        name: "Força Total",
        description: "Complete 10 treinos de força",
        icon: "💪",
        date: "10 Jan 2026",
        points: 300,
        tasks: [
          { day: 1, title: "Supino Reto 3x10", completed: true, date: "28 Dez" },
          { day: 2, title: "Agachamento 4x12", completed: true, date: "29 Dez" },
          { day: 3, title: "Levantamento Terra 3x8", completed: true, date: "30 Dez" },
          { day: 4, title: "Desenvolvimento 3x10", completed: true, date: "02 Jan" },
          { day: 5, title: "Remada Curvada 3x10", completed: true, date: "03 Jan" },
          { day: 6, title: "Leg Press 4x15", completed: true, date: "05 Jan" },
          { day: 7, title: "Rosca Direta 3x12", completed: true, date: "06 Jan" },
          { day: 8, title: "Tríceps Pulley 3x12", completed: true, date: "08 Jan" },
          { day: 9, title: "Crucifixo 3x12", completed: true, date: "09 Jan" },
          { day: 10, title: "Stiff 3x10", completed: true, date: "10 Jan" },
        ],
        requirements: "Completar 10 treinos focados em força muscular",
        reward: "Badge Força Total + 300 pontos",
      },
      {
        name: "Cardio Master",
        description: "Complete 5 treinos de cardio",
        icon: "🏃",
        date: "5 Jan 2026",
        points: 200,
        tasks: [
          { day: 1, title: "Corrida 5km", completed: true, date: "01 Jan" },
          { day: 2, title: "Bicicleta 30min", completed: true, date: "02 Jan" },
          { day: 3, title: "HIIT 20min", completed: true, date: "03 Jan" },
          { day: 4, title: "Caminhada 10km", completed: true, date: "04 Jan" },
          { day: 5, title: "Jump Rope 15min", completed: true, date: "05 Jan" },
        ],
        requirements: "Completar 5 sessões de exercícios cardiovasculares",
        reward: "Badge Cardio Master + 200 pontos",
      },
    ],
    rankHistory: [
      { event: "Desafio de Verão 2025", rank: 15, points: 1890, date: "Em andamento" },
      { event: "Desafio de Natal 2024", rank: 8, points: 2100, date: "Dez 2024" },
      { event: "Desafio de Inverno 2024", rank: 12, points: 1950, date: "Nov 2024" },
    ],
    weeklyProgress: [
      { day: "Seg", workouts: 2, points: 150 },
      { day: "Ter", workouts: 1, points: 100 },
      { day: "Qua", workouts: 2, points: 180 },
      { day: "Qui", workouts: 1, points: 90 },
      { day: "Sex", workouts: 2, points: 200 },
      { day: "Sáb", workouts: 0, points: 0 },
      { day: "Dom", workouts: 1, points: 120 },
    ],
  }

  const handleShare = () => {
    alert("Compartilhar ranking nas redes sociais!")
  }

  const handleDownload = () => {
    alert("Download do relatório de ranking!")
  }

  const handleDownloadCertificate = () => {
    alert("Certificado de competências será baixado!")
  }

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
              <h1 className="text-xl font-bold">Meu Ranking</h1>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={handleDownload}>
                <Download className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <Card className="overflow-hidden border-2 border-primary">
          <div className="relative h-32 bg-gradient-to-br from-primary via-accent to-primary/80">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-16">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="flex-1 mb-2">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">Você</h2>
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    <Trophy className="h-3 w-3 mr-1" />#{userStats.rank}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Membro desde Jan 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 mt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{userStats.points}</p>
                <p className="text-xs text-muted-foreground">Pontos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{userStats.totalWorkouts}</p>
                <p className="text-xs text-muted-foreground">Treinos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{userStats.streak}</p>
                <p className="text-xs text-muted-foreground">Sequência</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">#{userStats.rank}</p>
                <p className="text-xs text-muted-foreground">Posição</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="challenges"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Desafios
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Weekly Progress */}
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Progresso Semanal
              </h3>
              <div className="grid grid-cols-7 gap-2">
                {userStats.weeklyProgress.map((day) => (
                  <div key={day.day} className="text-center">
                    <div
                      className={`h-20 rounded-lg mb-2 flex flex-col items-center justify-center ${
                        day.workouts > 0
                          ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                          : "bg-secondary"
                      }`}
                    >
                      <p className="text-2xl font-bold">{day.workouts}</p>
                      <p className="text-xs opacity-80">{day.points}pts</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{day.day}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
                <Flame className="h-8 w-8 mx-auto mb-2 text-warning" />
                <p className="text-2xl font-bold">{userStats.longestStreak}</p>
                <p className="text-xs text-muted-foreground">Melhor Sequência</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-accent/10 to-accent/5">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-accent" />
                <p className="text-2xl font-bold">+{userStats.points}</p>
                <p className="text-xs text-muted-foreground">Este Mês</p>
              </Card>
              <Card className="p-4 text-center bg-gradient-to-br from-primary/10 to-primary/5">
                <Zap className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{userStats.totalTime}</p>
                <p className="text-xs text-muted-foreground">Tempo Total</p>
              </Card>
            </div>

            {/* Badges */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Conquistas
                </h3>
                <Badge variant="secondary">{userStats.badges.length} badges</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {userStats.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-border bg-secondary/30 text-center hover:border-primary transition-colors"
                  >
                    <span className="text-4xl mb-2 block">{badge.icon}</span>
                    <p className="text-xs font-semibold mb-1">{badge.name}</p>
                    <p className="text-xs text-muted-foreground">{badge.earned}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certificate Section */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Certificado de Competências
                </h3>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  <Star className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Seu certificado oficial de conquistas e competências está pronto para exportação
              </p>
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-gradient-to-r from-primary to-accent"
                  onClick={() => setShowCertificate(true)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Visualizar Certificado
                </Button>
                <Button variant="outline" onClick={handleDownloadCertificate}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="space-y-4 mt-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Desafios Concluídos</h3>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  {userStats.completedChallenges.length} concluídos
                </Badge>
              </div>
              <div className="space-y-3">
                {userStats.completedChallenges.map((challenge, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-border bg-secondary/30 hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setSelectedChallenge(challenge)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{challenge.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{challenge.name}</h4>
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{challenge.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {challenge.date}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-primary/20 text-primary">
                              +{challenge.points} pts
                            </Badge>
                            <Badge variant="outline" className="hover:bg-primary/10">
                              <Eye className="h-3 w-3 mr-1" />
                              Ver Detalhes
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 mt-6">
            <Card className="p-6 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Histórico de Eventos
              </h3>
              <div className="space-y-3">
                {userStats.rankHistory.map((event, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      index === 0 ? "border-primary bg-primary/10" : "border-border bg-secondary/30"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{event.event}</h4>
                          {index === 0 && <Badge className="bg-primary text-primary-foreground">Atual</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${
                            event.rank <= 3
                              ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                              : event.rank <= 10
                                ? "bg-primary/20 text-primary"
                                : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {event.rank <= 3 && <Crown className="h-3 w-3" />}
                          <span className="font-bold">#{event.rank}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pontuação Final</span>
                      <span className="font-bold text-primary">{event.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Share CTA */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
          <div className="text-center space-y-3">
            <Trophy className="h-12 w-12 mx-auto text-primary" />
            <h3 className="text-lg font-bold">Compartilhe Suas Conquistas!</h3>
            <p className="text-sm text-muted-foreground">Mostre para seus amigos seu progresso no ranking</p>
            <Button className="w-full bg-gradient-to-r from-primary to-accent" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar nas Redes Sociais
            </Button>
          </div>
        </Card>
      </div>

      {/* Challenge Details Modal */}
      <Dialog open={!!selectedChallenge} onOpenChange={() => setSelectedChallenge(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          {selectedChallenge && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <span className="text-4xl">{selectedChallenge.icon}</span>
                  {selectedChallenge.name}
                </DialogTitle>
                <DialogDescription>{selectedChallenge.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Challenge Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-primary/10">
                    <p className="text-sm text-muted-foreground mb-1">Data de Conclusão</p>
                    <p className="font-bold text-lg">{selectedChallenge.date}</p>
                  </Card>
                  <Card className="p-4 bg-accent/10">
                    <p className="text-sm text-muted-foreground mb-1">Pontos Ganhos</p>
                    <p className="font-bold text-lg text-primary">+{selectedChallenge.points} pts</p>
                  </Card>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Requisitos
                  </h4>
                  <Card className="p-4 bg-secondary/30">
                    <p className="text-sm">{selectedChallenge.requirements}</p>
                  </Card>
                </div>

                {/* Tasks Completed */}
                <div>
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    Tarefas Realizadas ({selectedChallenge.tasks.length})
                  </h4>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {selectedChallenge.tasks.map((task: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-border"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm">{task.title}</p>
                          <p className="text-xs text-muted-foreground">Dia {task.day}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.date}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reward */}
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Recompensa
                  </h4>
                  <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30">
                    <p className="text-sm font-semibold">{selectedChallenge.reward}</p>
                  </Card>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-accent"
                    onClick={() => {
                      alert("Compartilhando conquista...")
                      setSelectedChallenge(null)
                    }}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar Conquista
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedChallenge(null)}>
                    Fechar
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Certificate Modal */}
      <Dialog open={showCertificate} onOpenChange={setShowCertificate}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Certificado de Competências</DialogTitle>
            <DialogDescription>Certificado oficial de conquistas verificadas</DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            {/* Certificate Design */}
            <div className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-4 border-primary/30 rounded-lg p-8 aspect-[1.4/1]">
              {/* Decorative corners */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-primary/50 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-primary/50 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-primary/50 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-primary/50 rounded-br-lg" />

              {/* Content */}
              <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                <Trophy className="h-16 w-16 text-primary" />
                <h2 className="text-3xl font-bold">Certificado de Excelência</h2>
                <p className="text-muted-foreground">Este certificado é concedido a</p>
                <h3 className="text-4xl font-bold text-primary">Você</h3>
                <p className="text-muted-foreground max-w-md">
                  Por demonstrar dedicação excepcional e conquistar {userStats.totalWorkouts} treinos completos,{" "}
                  {userStats.completedChallenges.length} desafios e alcançar a posição #{userStats.rank} no ranking
                  global
                </p>

                <div className="grid grid-cols-3 gap-6 pt-6 w-full max-w-lg">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{userStats.points}</p>
                    <p className="text-xs text-muted-foreground">Pontos Totais</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">{userStats.badges.length}</p>
                    <p className="text-xs text-muted-foreground">Badges Ganhos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">#{userStats.rank}</p>
                    <p className="text-xs text-muted-foreground">Ranking Global</p>
                  </div>
                </div>

                <div className="pt-6 space-y-1">
                  <p className="text-sm text-muted-foreground">Certificado Verificado</p>
                  <p className="text-xs text-muted-foreground">Janeiro de 2026</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-6">
              <Button className="flex-1 bg-gradient-to-r from-primary to-accent" onClick={handleDownloadCertificate}>
                <Download className="h-4 w-4 mr-2" />
                Baixar Certificado (PDF)
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  alert("Compartilhando certificado...")
                }}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
