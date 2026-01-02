"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Trophy,
  Medal,
  Flame,
  Target,
  TrendingUp,
  Award,
  Clock,
  Zap,
  ChevronRight,
  Crown,
  X,
  Home,
  Users,
  User,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"

// Mock data for ranking with more details
const leaderboardData = [
  {
    rank: 1,
    name: "Carlos Silva",
    username: "@carlos_fit",
    avatar: "/diverse-group-athletes.png",
    points: 2450,
    workouts: 28,
    streak: 14,
    badge: "gold",
    bio: "Atleta profissional, coach de fitness",
    completedChallenges: [
      { name: "30 Dias de Treino", icon: "🔥", date: "Jan 2026" },
      { name: "Desafio 100kg Supino", icon: "💪", date: "Dez 2025" },
      { name: "Maratona 42km", icon: "🏃", date: "Nov 2025" },
    ],
  },
  {
    rank: 2,
    name: "Ana Santos",
    username: "@ana_strong",
    avatar: "/woman-athlete.jpg",
    points: 2380,
    workouts: 26,
    streak: 12,
    badge: "silver",
    bio: "Personal trainer e entusiasta fitness",
    completedChallenges: [
      { name: "Yoga Challenge 21 dias", icon: "🧘", date: "Jan 2026" },
      { name: "Cardio Intenso 30 dias", icon: "🏋️", date: "Dez 2025" },
    ],
  },
  {
    rank: 3,
    name: "Pedro Costa",
    username: "@pedro_power",
    avatar: "/fit-man-gym.png",
    points: 2290,
    workouts: 25,
    streak: 10,
    badge: "bronze",
    bio: "Transformando corpo e mente através do treino",
    completedChallenges: [{ name: "Hipertrofia 12 semanas", icon: "💪", date: "Jan 2026" }],
  },
]

const currentEvent = {
  name: "Desafio de Verão 2025",
  description: "Complete o máximo de treinos e ganhe prêmios incríveis!",
  endDate: "31 Jan 2025",
  daysLeft: 15,
  participants: 1243,
  prizes: [
    { place: "1º Lugar", prize: "R$ 5.000 + Kit Completo", icon: "🥇", description: "Cash + equipamentos premium" },
    { place: "2º Lugar", prize: "R$ 3.000 + Suplementos", icon: "🥈", description: "Cash + kit de suplementos" },
    { place: "3º Lugar", prize: "R$ 1.500 + Acessórios", icon: "🥉", description: "Cash + acessórios fitness" },
    { place: "Top 10", prize: "6 Meses Premium Grátis", icon: "🏆", description: "Assinatura premium" },
  ],
}

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState("weekly")
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  const userRank = 15
  const userPoints = 1890

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/social-midia">
                <Button size="icon" variant="ghost">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Rankings
                </h1>
                <p className="text-xs text-muted-foreground">Compete e ganhe prêmios</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-3 py-2">
              <Trophy className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-lg font-bold text-foreground">{userPoints}</span>
              <span className="text-xs text-muted-foreground">pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        <Card className="bg-linear-to-br from-primary/20 via-accent/10 to-primary/5 border-primary/30 overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Crown className="h-5 w-5 text-primary flex-shrink-0" />
                  <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                    Em Andamento
                  </Badge>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    {currentEvent.daysLeft} dias restantes
                  </Badge>
                </div>
                <h2 className="text-2xl font-bold text-foreground">{currentEvent.name}</h2>
                <p className="text-sm text-muted-foreground">{currentEvent.description}</p>
                <p className="text-sm text-muted-foreground">Termina em {currentEvent.endDate}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <p className="text-3xl font-bold text-primary">{currentEvent.participants}</p>
                <p className="text-xs text-muted-foreground">participantes</p>
              </div>
            </div>

            {/* Prizes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentEvent.prizes.map((prize, index) => (
                <div
                  key={index}
                  className="bg-card/60 backdrop-blur rounded-lg p-4 border border-border/50 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{prize.icon}</span>
                    <div className="flex-1">
                      <p className="font-bold text-sm text-foreground">{prize.place}</p>
                      <p className="text-xs text-muted-foreground">{prize.description}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-primary">{prize.prize}</p>
                </div>
              ))}
            </div>

            <Link href="/event/1">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Ver Detalhes do Evento
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>

        <Link href="/my-ranking">
          <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5 cursor-pointer hover:scale-[1.02] transition-transform">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <Avatar className="h-16 w-16 border-2 border-accent">
                    <AvatarImage src="/abstract-geometric-shapes.png" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold border-2 border-background">
                    #{userRank}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-lg text-foreground">Sua Posição</p>
                  <p className="text-sm text-muted-foreground">Continue subindo no ranking!</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">8 treinos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-warning" />
                      <span className="text-xs text-warning font-bold">5 dias</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-accent">{userPoints}</p>
                  <p className="text-xs text-muted-foreground">pontos</p>
                </div>
              </div>
            </div>
          </Card>
        </Link>

        {/* Tabs for different rankings */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mt-5">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger
              value="weekly"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Semanal
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Mensal
            </TabsTrigger>
            <TabsTrigger
              value="alltime"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Geral
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="space-y-3 mt-6">
            {leaderboardData.map((user, index) => (
              <Card
                key={user.rank}
                className={`overflow-hidden transition-all hover:scale-[1.02] cursor-pointer ${
                  index < 3 ? "border-2" : ""
                } ${
                  user.badge === "gold"
                    ? "border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5"
                    : user.badge === "silver"
                      ? "border-slate-400 bg-gradient-to-br from-slate-400/10 to-slate-400/5"
                      : user.badge === "bronze"
                        ? "border-amber-600 bg-gradient-to-br from-amber-600/10 to-amber-600/5"
                        : "border-border bg-card"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                        user.badge === "gold"
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                          : user.badge === "silver"
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-white"
                            : user.badge === "bronze"
                              ? "bg-gradient-to-br from-amber-500 to-amber-700 text-white"
                              : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <Avatar
                      className={`h-14 w-14 border-2 flex-shrink-0 ${
                        user.badge === "gold"
                          ? "border-yellow-500"
                          : user.badge === "silver"
                            ? "border-slate-400"
                            : user.badge === "bronze"
                              ? "border-amber-600"
                              : "border-border"
                      }`}
                    >
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-foreground truncate">{user.name}</p>
                        {index < 3 && (
                          <Medal
                            className={`h-4 w-4 flex-shrink-0 ${
                              user.badge === "gold"
                                ? "text-yellow-500"
                                : user.badge === "silver"
                                  ? "text-slate-400"
                                  : "text-amber-600"
                            }`}
                          />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{user.username}</p>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Target className="h-3 w-3" />
                          {user.workouts} treinos
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Flame className="h-3 w-3 text-warning" />
                          <span className="text-warning font-bold">{user.streak}</span>
                        </div>
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`text-xl font-bold ${
                          user.badge === "gold"
                            ? "text-yellow-500"
                            : user.badge === "silver"
                              ? "text-slate-400"
                              : user.badge === "bronze"
                                ? "text-amber-600"
                                : "text-primary"
                        }`}
                      >
                        {user.points}
                      </p>
                      <p className="text-xs text-muted-foreground">pontos</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-3 mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Ranking mensal em breve</p>
            </div>
          </TabsContent>

          <TabsContent value="alltime" className="space-y-3 mt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Ranking geral em breve</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-card border-border">
            <div className="p-4 text-center">
              <Zap className="h-6 w-6 mx-auto mb-2 text-warning" />
              <p className="text-2xl font-bold text-foreground">5</p>
              <p className="text-xs text-muted-foreground">Sequência</p>
            </div>
          </Card>
          <Card className="bg-card border-border">
            <div className="p-4 text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-success" />
              <p className="text-2xl font-bold text-foreground">+125</p>
              <p className="text-xs text-muted-foreground">Esta Semana</p>
            </div>
          </Card>
          <Card className="bg-card border-border">
            <div className="p-4 text-center">
              <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold text-foreground">32h</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </div>
          </Card>
        </div>
      </div>

      <Dialog open={selectedUser !== null} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-md bg-card border-border p-0 max-h-[90vh] overflow-y-auto">
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Perfil do Competidor</h3>
              {/* <Button size="icon" variant="ghost" onClick={() => setSelectedUser(null)}>
                <X className="h-4 w-4" />
              </Button> */}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-primary">
                  <AvatarImage src={selectedUser?.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedUser?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                {selectedUser?.rank === 1 && <Crown className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-xl text-foreground">{selectedUser?.name}</p>
                  <Badge
                    variant="secondary"
                    className={`${
                      selectedUser?.rank === 1
                        ? "bg-yellow-500/20 text-yellow-500"
                        : selectedUser?.rank === 2
                          ? "bg-gray-400/20 text-gray-400"
                          : "bg-orange-700/20 text-orange-700"
                    }`}
                  >
                    <Trophy className="h-3 w-3 mr-1" />#{selectedUser?.rank}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{selectedUser?.username}</p>
                <p className="text-xs text-muted-foreground mt-1">{selectedUser?.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{selectedUser?.points}</p>
                <p className="text-xs text-muted-foreground">Pontos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{selectedUser?.workouts}</p>
                <p className="text-xs text-muted-foreground">Treinos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{selectedUser?.streak}</p>
                <p className="text-xs text-muted-foreground">Sequência</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Desafios Concluídos
              </h4>
              <div className="space-y-2">
                {selectedUser?.completedChallenges?.map((challenge: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg border border-border"
                  >
                    <div className="text-2xl">{challenge.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{challenge.name}</p>
                      <p className="text-xs text-muted-foreground">{challenge.date}</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Link href="/social-midia" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <Users className="h-4 w-4 mr-2" />
                  Ver Perfil Social
                </Button>
              </Link>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Users className="h-4 w-4 mr-2" />
                Seguir
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-around">
          <Link href="/social-midia">
            <Button variant="ghost" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/social-midia">
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/my-ranking">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="default" size="icon">
            <Trophy className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
