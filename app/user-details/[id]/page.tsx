"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, MoreVertical, Trophy, Heart, MessageCircle, Share2, Zap } from "lucide-react"

// Mock data - em produção viria de uma API
const getUserData = (id: string) => ({
  id,
  name: "Maria Silva",
  username: "@maria_fitness",
  avatar: "/woman-athlete.jpg",
  isCompetitor: true,
  rankPosition: 2,
  followers: 1234,
  following: 567,
  posts: 89,
  bio: "Atleta profissional 🏆 | Competidora ativa | Vida saudável 💪\nTreinos diários | Nutrição balanceada\n📍 São Paulo, BR",
  highlights: ["Treino", "Dieta", "Eventos", "Conquistas"],
  userPosts: [
    {
      id: 1,
      image: "/woman-athlete.jpg",
      likes: 234,
      comments: 45,
      type: "post",
    },
    {
      id: 2,
      image: "/fitness-woman.png",
      likes: 189,
      comments: 32,
      type: "post",
    },
    {
      id: 3,
      image: "/diverse-group-athletes.png",
      likes: 567,
      comments: 89,
      type: "post",
    },
    {
      id: 4,
      image: "/fit-man-gym.png",
      likes: 345,
      comments: 67,
      type: "workout",
    },
    {
      id: 5,
      image: "/woman-athlete.jpg",
      likes: 456,
      comments: 78,
      type: "challenge",
    },
    {
      id: 6,
      image: "/fitness-woman.png",
      likes: 298,
      comments: 54,
      type: "post",
    },
  ],
  workouts: [
    { id: 1, title: "Treino de Pernas", duration: "45 min", calories: 380 },
    { id: 2, title: "HIIT Cardio", duration: "30 min", calories: 420 },
    { id: 3, title: "Upper Body", duration: "50 min", calories: 350 },
  ],
  challenges: [
    { id: 1, title: "30 Dias de Agachamento", completed: true, participants: 234 },
    { id: 2, title: "100 Flexões Challenge", completed: true, participants: 189 },
    { id: 3, title: "Corrida 5km", completed: false, participants: 567 },
  ],
})

export default function UserDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const userData = getUserData(params.id as string)

  const [isFollowing, setIsFollowing] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [showUnfollowDialog, setShowUnfollowDialog] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)

  const handleFollowToggle = () => {
    if (isFollowing) {
      setShowUnfollowDialog(true)
    } else {
      setIsFollowing(true)
    }
  }

  const confirmUnfollow = () => {
    setIsFollowing(false)
    setShowUnfollowDialog(false)
  }

  const handleBlock = () => {
    setIsBlocked(true)
    setIsFollowing(false)
    setShowBlockDialog(false)
  }

  const renderCompetitorBadge = (user: any) => {
    if (!user.isCompetitor) return null
    return (
      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 px-2 py-1 rounded-full border border-yellow-500/50">
        <Trophy className="h-3 w-3 text-yellow-500" />
        <span className="text-xs font-semibold text-yellow-500">#{user.rankPosition}</span>
      </div>
    )
  }

  if (isBlocked) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="text-4xl">🚫</div>
            <h2 className="text-xl font-bold">Usuário Bloqueado</h2>
            <p className="text-muted-foreground">Você bloqueou este usuário e não pode mais ver seu conteúdo.</p>
            <Button onClick={() => router.push("/social")} className="w-full">
              Voltar para o Feed
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h1 className="font-bold">{userData.name}</h1>
            <p className="text-xs text-muted-foreground">{userData.posts} publicações</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.share?.({ url: window.location.href })}>
                Compartilhar Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowBlockDialog(true)} className="text-destructive">
                Bloquear Usuário
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex items-start gap-4">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={userData.avatar || "/placeholder.svg"} />
            <AvatarFallback>{userData.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold">{userData.name}</h2>
                {renderCompetitorBadge(userData)}
              </div>
              <p className="text-sm text-muted-foreground">{userData.username}</p>
            </div>

            <div className="flex gap-4 text-sm">
              <div>
                <span className="font-bold">{userData.posts}</span> publicações
              </div>
              <button className="hover:underline">
                <span className="font-bold">{userData.followers}</span> seguidores
              </button>
              <button className="hover:underline">
                <span className="font-bold">{userData.following}</span> seguindo
              </button>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <p className="text-sm whitespace-pre-line">{userData.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleFollowToggle} className="flex-1" variant={isFollowing ? "outline" : "default"}>
            {isFollowing ? "Seguindo" : "Seguir"}
          </Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Mensagem
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Highlights */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {userData.highlights.map((highlight, i) => (
            <button key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center border-2 border-primary">
                <span className="text-lg font-semibold">{highlight[0]}</span>
              </div>
              <span className="text-xs text-center line-clamp-1">{highlight}</span>
            </button>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="posts">Publicações</TabsTrigger>
            <TabsTrigger value="workouts">Treinos</TabsTrigger>
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {userData.userPosts.map((post) => (
                <button key={post.id} className="relative aspect-square group">
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <div className="flex items-center gap-1 text-white">
                      <Heart className="h-5 w-5" fill="white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white">
                      <MessageCircle className="h-5 w-5" fill="white" />
                      <span className="font-semibold">{post.comments}</span>
                    </div>
                  </div>
                  {post.type === "workout" && (
                    <div className="absolute top-2 right-2">
                      <Zap className="h-4 w-4 text-primary" fill="currentColor" />
                    </div>
                  )}
                  {post.type === "challenge" && (
                    <div className="absolute top-2 right-2">
                      <Trophy className="h-4 w-4 text-yellow-500" fill="currentColor" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="workouts" className="mt-4">
            <div className="space-y-3">
              {userData.workouts.map((workout) => (
                <Card key={workout.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <Zap className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{workout.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {workout.duration} • {workout.calories} cal
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Ver Treino</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="challenges" className="mt-4">
            <div className="space-y-3">
              {userData.challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            challenge.completed
                              ? "bg-gradient-to-br from-green-500 to-emerald-500"
                              : "bg-gradient-to-br from-orange-500 to-red-500"
                          }`}
                        >
                          <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{challenge.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {challenge.participants} participantes •{" "}
                            {challenge.completed ? "Concluído" : "Em andamento"}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant={challenge.completed ? "outline" : "default"}>
                        {challenge.completed ? "Ver" : "Participar"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Unfollow Confirmation Dialog */}
      <Dialog open={showUnfollowDialog} onOpenChange={setShowUnfollowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deixar de seguir {userData.name}?</DialogTitle>
            <DialogDescription>Você pode seguir esta pessoa novamente a qualquer momento.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUnfollowDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmUnfollow}>
              Deixar de Seguir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Block Confirmation Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquear {userData.name}?</DialogTitle>
            <DialogDescription>
              Esta pessoa não poderá ver seu perfil, publicações ou entrar em contato com você. Ela não será notificada
              do bloqueio.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleBlock}>
              Bloquear
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
