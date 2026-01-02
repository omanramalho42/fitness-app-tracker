"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Heart,
  MessageCircle,
  Share,
  Plus,
  X,
  ImageIcon,
  Video,
  Dumbbell,
  Trophy,
  Send,
  Settings,
  Bell,
  Search,
  TrendingUp,
  Home,
  Users,
  Award,
  Pin,
  Trash2,
  Smile,
  Target,
  Calendar,
  Clock,
  Flame,
  MapPin,
  Repeat2,
  Copy,
  Link2,
  ExternalLink,
  AlertCircle,
  MoreHorizontal,
} from "lucide-react"
import Link from "next/link"

const currentUserPosts = [
  {
    id: 1,
    user: { name: "Você", username: "@voce", avatar: "/abstract-geometric-shapes.png" },
    content: "Acabei de completar meu treino matinal! 💪 Foco total nos objetivos de 2025!",
    image: "/diverse-group-athletes.png",
    likes: 45,
    comments: 8,
    reposts: 3,
    isLiked: false,
    timestamp: "há 2 horas",
  },
  {
    id: 2,
    user: { name: "Você", username: "@voce", avatar: "/abstract-geometric-shapes.png" },
    content: "Novo PR no supino! 120kg x 5 reps 🔥",
    image: "/fit-man-gym.png",
    likes: 72,
    comments: 12,
    reposts: 5,
    isLiked: false,
    timestamp: "há 5 horas",
  },
]

const stories = [
  { id: 1, user: "Maria", avatar: "/woman-athlete.jpg", hasNew: true, image: "/woman-athlete.jpg" },
  { id: 2, user: "João", avatar: "/fit-man-gym.png", hasNew: true, image: "/fit-man-gym.png" },
  { id: 3, user: "Ana", avatar: "/fitness-woman.png", hasNew: false, image: "/fitness-woman.png" },
  { id: 4, user: "Carlos", avatar: "/diverse-group-athletes.png", hasNew: true, image: "/diverse-group-athletes.png" },
]

const myPosts = [
  {
    id: 1,
    user: { name: "Você", username: "@voce", avatar: "/abstract-geometric-shapes.png", isCompetitor: true, rankPosition: 3 },
    content: "Finalizei meu treino de hoje! 💪 Supino: 80kg x 12 reps",
    image: "/fit-man-gym.png",
    likes: 145,
    comments: 23,
    reposts: 5,
    timestamp: "2h atrás",
    isLiked: false,
  },
  {
    id: 2,
    user: { name: "Você", username: "@voce", avatar: "/abstract-geometric-shapes.png" },
    content: "Nova categoria de treino criada: Hipertrofia Avançada 🏋️",
    likes: 89,
    comments: 12,
    reposts: 3,
    timestamp: "1 dia atrás",
    isLiked: false,
  },
]

const followingPosts = [
  {
    id: 3,
    user: {
      name: "Maria Santos",
      username: "@maria_fit",
      avatar: "/woman-athlete.jpg",
      isCompetitor: true,
      rankPosition: 3,
    },
    content: "Quem topa um treino de legs amanhã às 6h? 🦵",
    type: "invite",
    location: "Academia Elite",
    date: "Amanhã, 6:00",
    likes: 67,
    comments: 18,
    reposts: 4,
    timestamp: "30min atrás",
    isLiked: false,
  },
  {
    id: 4,
    user: {
      name: "João Costa",
      username: "@joao_power",
      avatar: "/fit-man-gym.png",
      isCompetitor: true,
      rankPosition: 5,
    },
    content: "Compartilhando meu treino favorito de ombros!",
    type: "workout",
    workout: { name: "Ombro Completo", duration: "45min", calories: 320, exercises: 8 },
    image: "/fit-man-gym.png",
    likes: 234,
    comments: 45,
    reposts: 28,
    timestamp: "1h atrás",
    isLiked: false,
  },
  {
    id: 5,
    user: { name: "Ana Silva", username: "@ana_strong", avatar: "/fitness-woman.png" },
    content: "Nova categoria criada: Cardio HIIT 🔥",
    type: "category",
    category: { name: "Cardio HIIT", workouts: 12, followers: 456 },
    likes: 178,
    comments: 31,
    reposts: 15,
    timestamp: "3h atrás",
    isLiked: false,
  },
]

// Added trendPosts for context menu
const trendPosts = [...myPosts, ...followingPosts]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("feed")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [createPostType, setCreatePostType] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [imageHoverMenu, setImageHoverMenu] = useState<{ postId: number; x: number; y: number } | null>(null)
  const [showStory, setShowStory] = useState(false)
  const [currentStory, setCurrentStory] = useState<any>(null)
  const [showComments, setShowComments] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [showMessages, setShowMessages] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [pinnedChats, setPinnedChats] = useState<number[]>([])
  const [storyReplyContext, setStoryReplyContext] = useState<any>(null)
  const [commentLikes, setCommentLikes] = useState<Record<number, number>>({})
  const [replyingTo, setReplyingTo] = useState<number | null>(null)
  const [reactionPicker, setReactionPicker] = useState<number | null>(null)
  const [comments, setComments] = useState<any[]>([
    {
      id: 1,
      user: "Carlos Silva",
      username: "@carlos_fit",
      avatar: "/diverse-group-athletes.png",
      isCompetitor: true,
      rankPosition: 1,
      comment: "Excelente treino! Continue assim 💪",
      likes: 24,
      isPinned: true,
      replies: [],
    },
    {
      id: 2,
      user: "Ana Santos",
      username: "@ana_strong",
      avatar: "/woman-athlete.jpg",
      comment: "Inspirador! Vou tentar esse treino hoje",
      likes: 12,
      replies: [
        {
          id: 21,
          user: "Julia Lima",
          avatar: "/fitness-woman.png",
          comment: "Também vou tentar! Vamos juntas?",
          likes: 3,
        },
      ],
    },
    {
      id: 3,
      user: "Pedro Costa",
      username: "@pedro_power",
      avatar: "/fit-man-gym.png",
      comment: "Qual é a sua dieta?",
      likes: 8,
      replies: [],
    },
  ])
  const [newComment, setNewComment] = useState("")
  const [replyText, setReplyText] = useState("")
  const [repostedPosts, setRepostedPosts] = useState<number[]>([])
  const [showShareModal, setShowShareModal] = useState(false)
  const [sharePost, setSharePost] = useState<any>(null)
  const [pinnedComments, setPinnedComments] = useState<number[]>([1])

  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [userSettings, setUserSettings] = useState({
    username: "Sarah Johnson",
    bio: "Fitness enthusiast | Marathon runner | Yoga lover",
    isPrivate: false,
    allowMessages: true,
    showActivity: true,
  })

  // Mock search results
  const searchResults = [
    {
      id: 1,
      name: "Mike Chen",
      username: "@mikechen",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: true,
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      username: "@alexr",
      avatar: "/placeholder.svg?height=40&width=40",
      isFollowing: false,
    },
  ].filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Mock notifications
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Mike Chen",
      action: "curtiu seu post",
      time: "2 min atrás",
      avatar: "/placeholder.svg?height=40&width=40",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      user: "Emma Wilson",
      action: "comentou no seu treino",
      time: "15 min atrás",
      avatar: "/placeholder.svg?height=40&width=40",
      read: false,
    },
    {
      id: 3,
      type: "follow",
      user: "Alex Rodriguez",
      action: "começou a seguir você",
      time: "1 hora atrás",
      avatar: "/placeholder.svg?height=40&width=40",
      read: true,
    },
    {
      id: 4,
      type: "mention",
      user: "Lisa Park",
      action: "mencionou você em um comentário",
      time: "2 horas atrás",
      avatar: "/placeholder.svg?height=40&width=40",
      read: true,
    },
  ]

  const handleLike = (postId: number) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter((id) => id !== postId))
    } else {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const handleImageDoubleClick = (postId: number) => {
    if (!likedPosts.includes(postId)) {
      setLikedPosts([...likedPosts, postId])
    }
  }

  const handleImageRightClick = (e: React.MouseEvent, postId: number) => {
    e.preventDefault()
    setImageHoverMenu({ postId, x: e.clientX, y: e.clientY })
  }

  const handleCopyImageUrl = (imageUrl: string) => {
    navigator.clipboard.writeText(imageUrl)
    setImageHoverMenu(null)
  }

  const handleOpenImageNewTab = (imageUrl: string) => {
    window.open(imageUrl, "_blank")
    setImageHoverMenu(null)
  }

  const handleReportImage = (postId: number) => {
    console.log("[v0] Reporting post:", postId)
    setImageHoverMenu(null)
  }

  const handleCommentClick = (post: any) => {
    setSelectedPost(post)
    setShowComments(true)
  }

  const handleProfileClick = (user: any) => {
    setSelectedProfile({
      ...user,
      followers: 1234,
      following: 567,
      posts: 89,
      bio: "Fitness enthusiast | Competitor | Living a healthy lifestyle 💪",
      highlights: ["Treino", "Dieta", "Eventos"],
      gallery: ["/woman-athlete.jpg", "/fit-man-gym.png", "/fitness-woman.png", "/diverse-group-athletes.png"],
    })
    setShowProfile(true)
  }

  const handleStoryReply = () => {
    setStoryReplyContext(currentStory)
    setShowStory(false)
    setShowMessages(true)
    setSelectedConversation({
      id: 99,
      user: currentStory.user,
      avatar: currentStory.avatar,
      lastMessage: "Resposta ao story",
      time: "Agora",
    })
  }

  const handleCommentLike = (commentId: number) => {
    setCommentLikes((prev) => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + (prev[commentId] > 0 ? -1 : 1),
    }))
  }

  const handleCommentReaction = (commentId: number, reaction: string) => {
    console.log(`[v0] Comment ${commentId} reacted with ${reaction}`)
    setReactionPicker(null)
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    const comment = {
      id: Date.now(),
      user: "Você",
      username: "@voce",
      avatar: "/abstract-geometric-shapes.png",
      comment: newComment,
      likes: 0,
      replies: [],
      isPinned: false,
    }
    setComments([...comments, comment])
    setNewComment("")
  }

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            {
              id: Date.now(),
              user: "Você",
              avatar: "/abstract-geometric-shapes.png",
              comment: replyText,
              likes: 0,
            },
          ],
        }
      }
      return comment
    })
    setComments(updatedComments)
    setReplyText("")
    setReplyingTo(null)
  }

  const handlePinComment = (commentId: number) => {
    if (pinnedComments.includes(commentId)) {
      setPinnedComments(pinnedComments.filter((id) => id !== commentId))
      setComments(comments.map((c) => (c.id === commentId ? { ...c, isPinned: false } : c)))
    } else {
      setPinnedComments([...pinnedComments, commentId])
      setComments(comments.map((c) => (c.id === commentId ? { ...c, isPinned: true } : c)))
    }
  }

  const handleRepost = (postId: number) => {
    if (!repostedPosts.includes(postId)) {
      setRepostedPosts([...repostedPosts, postId])
    }
  }

  const handleShare = (post: any) => {
    setSharePost(post)
    setShowShareModal(true)
  }

  const renderCompetitorBadge = (user: any) => {
    if (!user.isCompetitor) return null
    return (
      <Badge
        className="text-xs bg-gold/20 text-gold border-gold/50 cursor-pointer hover:bg-gold/30 transition-colors"
        onClick={(e) => {
          e.stopPropagation()
          window.location.href = `/ranking?user=${user.username}`
        }}
      >
        <Trophy className="h-2.5 w-2.5 mr-1" />#{user.rankPosition}
      </Badge>
    )
  }

  const renderPost = (post: any) => {
    const isLiked = likedPosts.includes(post.id) || post.isLiked
    const commentCount = post.comments + comments.filter((c) => !c.isPinned).length
    const isReposted = repostedPosts.includes(post.id)

    return (
      <Card key={post.id} className="bg-card border-border">
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => handleProfileClick(post.user)}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-sm">{post.user.name}</p>
                {renderCompetitorBadge(post.user)}
              </div>
              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
            </div>
          </div>

          <p className="text-sm mb-3">{post.content}</p>

          {post.type === "invite" && (
            <Card className="bg-primary/10 border-primary/30 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Convite para Treino</span>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  {post.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-primary hover:bg-primary/90">
                Aceitar Convite
              </Button>
            </Card>
          )}

          {post.type === "workout" && post.workout && (
            <Card className="bg-accent/10 border-accent/30 p-3 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="h-4 w-4 text-accent" />
                <span className="font-semibold text-sm">{post.workout.name}</span>
              </div>
              <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.workout.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3" />
                  {post.workout.calories} cal
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  {post.workout.exercises} exercícios
                </div>
              </div>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Ver Treino Completo
              </Button>
            </Card>
          )}

          {post.type === "category" && post.category && (
            <Card className="bg-secondary border-border p-3 mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-sm">{post.category.name}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {post.category.workouts} treinos
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{post.category.followers} seguidores</p>
              <Button size="sm" variant="outline" className="w-full bg-transparent">
                Seguir Categoria
              </Button>
            </Card>
          )}

          {post.image && (
            <div
              className="relative rounded-lg overflow-hidden mb-3 group cursor-pointer"
              onDoubleClick={() => handleImageDoubleClick(post.id)}
              onContextMenu={(e) => handleImageRightClick(e, post.id)}
            >
              <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto max-h-96 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleImageRightClick(e as any, post.id)
                  }}
                >
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${isLiked ? "text-red-500" : ""}`}
              onClick={() => handleLike(post.id)}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span className="text-xs">{post.likes + (isLiked && !post.isLiked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handleCommentClick(post)}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{commentCount}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${isReposted ? "text-green-500" : ""}`}
              onClick={() => handleRepost(post.id)}
            >
              <Repeat2 className="h-4 w-4" />
              <span className="text-xs">{post.reposts + (isReposted ? 1 : 0)}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleShare(post)}>
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/">
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-accent">
              FitSocial
            </h1>
          </Link>

          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSearch(e.target.value.length > 0)
                }}
                className="pl-9 bg-secondary border-0"
              />
            </div>

            <Button variant="ghost" size="icon" className="relative" onClick={() => setShowNotifications(true)}>
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {showSearch && searchQuery && (
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-lg max-h-96 overflow-y-auto">
            <div className="container max-w-2xl mx-auto px-4 py-2">
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 hover:bg-secondary rounded-lg cursor-pointer transition-colors"
                      onClick={() => {
                        window.location.href = `/user-details/${user.id}`
                        setShowSearch(false)
                        setSearchQuery("")
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.username}</p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={user.isFollowing ? "outline" : "default"}
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        {user.isFollowing ? "Seguindo" : "Seguir"}
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-4">Nenhum usuário encontrado</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Stories */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto scrollbar-thin">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex flex-col items-center gap-1 cursor-pointer flex-shrink-0"
                onClick={() => {
                  setCurrentStory(story)
                  setShowStory(true)
                }}
              >
                <div
                  className={`rounded-full p-0.5 ${story.hasNew ? "bg-gradient-to-tr from-primary via-accent to-primary" : "bg-border"}`}
                >
                  <Avatar className="h-14 w-14 border-2 border-background">
                    <AvatarImage src={story.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{story.user[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs text-muted-foreground truncate w-16 text-center">{story.user}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="following">Seguindo</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            <Card className="bg-card">
              <CardContent className="p-4">
                <div className="flex flex-row gap-3">
                  {/* <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src="/generic-placeholder-300px.png" />
                    <AvatarFallback>EU</AvatarFallback>
                  </Avatar> */}
                  <div className="flex-1 space-y-3">
                    <Textarea
                      placeholder="O que você está pensando?"
                      className="resize-none border bg-background/50"
                      onClick={() => setShowCreatePost(true)}
                    />
                    <div className="flex flex-wrap items-center justify-between">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setCreatePostType("image")
                            setShowCreatePost(true)
                          }}
                        >
                          <ImageIcon className="h-4 w-4 mr-2" />
                          Foto
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setCreatePostType("video")
                            setShowCreatePost(true)
                          }}
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Vídeo
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setCreatePostType("workout")
                            setShowCreatePost(true)
                          }}
                        >
                          <Dumbbell className="h-4 w-4 mr-2" />
                          Treino
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                          onClick={() => {
                            setCreatePostType("challenge")
                            setShowCreatePost(true)
                          }}
                        >
                          <Trophy className="h-4 w-4 mr-2" />
                          Desafio
                        </Button>
                      </div>
                      <Button className="bg-primary mt-2 hover:bg-primary/90" onClick={() => setShowCreatePost(true)}>
                        Publicar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {myPosts.map((post) => renderPost(post))}
          </TabsContent>

          <TabsContent value="following" className="space-y-4">
            {followingPosts.map((post) => renderPost(post))}
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="space-y-4">
              {trendPosts
                .sort(() => Math.random() - 0.5)
                .map((post) => (
                  <Card key={post.id} className="bg-card border-border overflow-hidden">
                    {post.image && (
                      <div className="relative w-full h-[500px]">
                        <img
                          src={post.image || "/placeholder.svg"}
                          alt="Trend"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <div
                            className="flex items-center gap-3 mb-2 cursor-pointer"
                            onClick={() => handleProfileClick(post.user)}
                          >
                            <Avatar className="h-10 w-10 border-2 border-white">
                              <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-sm text-white">{post.user.name}</p>
                                {post.user.isCompetitor && (
                                  <Badge className="text-xs bg-gold/90 text-black border-0">
                                    <Trophy className="h-2.5 w-2.5 mr-1" />#{post.user.rankPosition}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-white/80">{post.timestamp}</p>
                            </div>
                          </div>
                          <p className="text-sm text-white mb-3">{post.content}</p>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-white" onClick={() => handleLike(post.id)}>
                              <Heart
                                className={`h-6 w-6 ${likedPosts.includes(post.id) ? "fill-red-500 text-red-500" : ""}`}
                              />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button
                              className="flex items-center gap-1 text-white"
                              onClick={() => handleCommentClick(post)}
                            >
                              <MessageCircle className="h-6 w-6" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                            <button className="flex items-center gap-1 text-white">
                              <Share className="h-6 w-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {!post.image && <div className="p-4">{renderPost(post)}</div>}
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Context Menu */}
      {imageHoverMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setImageHoverMenu(null)} />
          <div
            className="fixed z-50 bg-card border border-border rounded-lg shadow-xl py-2 min-w-[200px]"
            style={{
              left: `${imageHoverMenu.x}px`,
              top: `${imageHoverMenu.y}px`,
            }}
          >
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
              onClick={() => {
                const post = trendPosts.find((p) => p.id === imageHoverMenu.postId)
                if (post?.image) handleCopyImageUrl(post.image)
              }}
            >
              <Link2 className="h-4 w-4" />
              Copiar URL da imagem
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
              onClick={() => {
                const post = trendPosts.find((p) => p.id === imageHoverMenu.postId)
                if (post?.image) handleOpenImageNewTab(post.image)
              }}
            >
              <ExternalLink className="h-4 w-4" />
              Abrir em nova guia
            </button>
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2"
              onClick={() => {
                const post = trendPosts.find((p) => p.id === imageHoverMenu.postId)
                if (post?.image) {
                  navigator.clipboard.writeText(post.image)
                  setImageHoverMenu(null)
                }
              }}
            >
              <Copy className="h-4 w-4" />
              Copiar imagem
            </button>
            <div className="border-t border-border my-1" />
            <button
              className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-center gap-2 text-red-500"
              onClick={() => handleReportImage(imageHoverMenu.postId)}
            >
              <AlertCircle className="h-4 w-4" />
              Denunciar
            </button>
          </div>
        </>
      )}

      <Dialog open={showComments} onOpenChange={setShowComments}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-lg font-bold">Comentários</h3>
              {/* <Button size="icon" variant="ghost" onClick={() => setShowComments(false)}>
                <X className="h-4 w-4" />
              </Button> */}
            </div>

            {selectedPost && (
              <div className="pb-4 border-b border-border">
                <div
                  className="flex items-center gap-3 mb-3 cursor-pointer"
                  onClick={() => handleProfileClick(selectedPost.user)}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedPost.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedPost.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{selectedPost.user.name}</p>
                      {renderCompetitorBadge(selectedPost.user)}
                    </div>
                    <p className="text-xs text-muted-foreground">{selectedPost.timestamp}</p>
                  </div>
                </div>
                <p className="text-sm">{selectedPost.content}</p>
                {selectedPost.image && (
                  <img
                    src={selectedPost.image || "/placeholder.svg"}
                    alt="Post"
                    className="w-full rounded-lg mt-3 max-h-60 object-cover"
                  />
                )}
              </div>
            )}

            <div className="space-y-3">
              {comments
                .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
                .map((comment) => (
                  <div
                    key={comment.id}
                    className={comment.isPinned ? "bg-secondary/30 p-3 rounded-lg border border-border" : ""}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        className="h-8 w-8 cursor-pointer"
                        onClick={() =>
                          handleProfileClick({
                            name: comment.user,
                            username: comment.username,
                            avatar: comment.avatar,
                            isCompetitor: comment.isCompetitor,
                            rankPosition: comment.rankPosition,
                          })
                        }
                      >
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{comment.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-sm">{comment.user}</p>
                          {comment.isPinned && (
                            <Badge className="text-xs bg-primary/20 text-primary border-primary/50">
                              <Pin className="h-2 w-2 mr-1" />
                              Fixado
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{comment.comment}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground hover:text-red-500"
                            onClick={() => handleCommentLike(comment.id)}
                          >
                            <Heart
                              className={`h-3 w-3 mr-1 ${commentLikes[comment.id] ? "fill-red-500 text-red-500" : ""}`}
                            />
                            {comment.likes + (commentLikes[comment.id] || 0)}
                          </Button>
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-auto p-0 text-xs text-muted-foreground"
                              onClick={() => setReactionPicker(reactionPicker === comment.id ? null : comment.id)}
                            >
                              <Smile className="h-3 w-3 mr-1" />
                              Reagir
                            </Button>
                            {reactionPicker === comment.id && (
                              <div className="absolute bottom-full left-0 mb-1 bg-popover border border-border rounded-lg p-2 flex gap-1 shadow-lg z-10">
                                {["❤️", "👍", "🔥", "💪", "👏"].map((emoji) => (
                                  <button
                                    key={emoji}
                                    className="text-xl hover:scale-125 transition-transform"
                                    onClick={() => handleCommentReaction(comment.id, emoji)}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground"
                            onClick={() => setReplyingTo(comment.id)}
                          >
                            Responder
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-xs text-muted-foreground"
                            onClick={() => handlePinComment(comment.id)}
                          >
                            <Pin className="h-3 w-3" />
                            {comment.isPinned ? "Desafixar" : "Fixar"}
                          </Button>
                        </div>
                        {replyingTo === comment.id && (
                          <div className="mt-2 flex gap-2">
                            <Input
                              placeholder="Escreva sua resposta..."
                              className="text-sm"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            />
                            <Button size="sm" onClick={() => handleAddReply(comment.id)}>
                              <Send className="h-3 w-3" />
                            </Button>
                          </div>
                        )}

                        {/* Nested Replies */}
                        {comment.replies.length > 0 && (
                          <div className="ml-8 mt-3 pt-3 border-l-2 border-border pl-3 space-y-3">
                            {comment.replies.map((reply: any) => (
                              <div key={reply.id} className="flex items-start gap-2">
                                <Avatar className="h-6 w-6 cursor-pointer">
                                  <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{reply.user[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="font-semibold text-xs">{reply.user}</p>
                                  <p className="text-xs">{reply.comment}</p>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-auto p-0 text-xs text-muted-foreground mt-1 hover:text-red-500"
                                    onClick={() => handleCommentLike(reply.id)}
                                  >
                                    <Heart
                                      className={`h-2 w-2 mr-1 ${commentLikes[reply.id] ? "fill-red-500 text-red-500" : ""}`}
                                    />
                                    {reply.likes + (commentLikes[reply.id] || 0)}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-start gap-3 pt-4 border-t border-border">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-geometric-shapes.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Adicione um comentário..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                />
                <Button size="icon" onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      <Dialog open={showProfile} onOpenChange={setShowProfile}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card border-border">
          {selectedProfile && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={selectedProfile.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedProfile.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold">{selectedProfile.name}</h3>
                    {renderCompetitorBadge(selectedProfile)}
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedProfile.username}</p>
                </div>
                <Button asChild>
                  <a href={`/user-details/${selectedProfile.username?.replace("@", "")}`}>Ver Perfil</a>
                </Button>
              </div>

              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-xl font-bold">{selectedProfile.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{selectedProfile.followers}</p>
                  <p className="text-xs text-muted-foreground">Seguidores</p>
                </div>
                <div>
                  <p className="text-xl font-bold">{selectedProfile.following}</p>
                  <p className="text-xs text-muted-foreground">Seguindo</p>
                </div>
              </div>

              <div>
                <p className="text-sm">{selectedProfile.bio}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Destaques</h4>
                <div className="flex gap-3">
                  {selectedProfile.highlights?.map((highlight: string, i: number) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
                        <span className="text-xs font-semibold">{highlight[0]}</span>
                      </div>
                      <span className="text-xs">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Galeria</h4>
                <div className="grid grid-cols-3 gap-2">
                  {selectedProfile.gallery?.map((img: string, i: number) => (
                    <img
                      key={i}
                      src={img || "/placeholder.svg"}
                      alt="Gallery"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Story Viewer */}
      <Dialog open={showStory} onOpenChange={setShowStory}>
        <DialogContent className="max-w-md h-[90vh] p-0 bg-black border-0 overflow-hidden">
          {currentStory && (
            <div className="relative w-full h-full flex flex-col">
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={currentStory.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentStory.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-white font-semibold text-sm">{currentStory.user}</span>
                </div>
                <Button size="icon" variant="ghost" className="text-white" onClick={() => setShowStory(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <img
                  src={currentStory.image || "/placeholder.svg"}
                  alt="Story"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="flex gap-2">
                  <Input
                    placeholder="Responder ao story..."
                    className="bg-black/50 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Button size="icon" className="bg-primary" onClick={handleStoryReply}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Messages Sidebar */}
      {showMessages && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMessages(false)} />
          <div className="ml-auto w-full max-w-md bg-card border-l border-border relative flex flex-col h-full">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-bold">Mensagens</h3>
              <Button size="icon" variant="ghost" onClick={() => setShowMessages(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {!selectedConversation ? (
              <div className="flex-1 overflow-y-auto">
                {[
                  {
                    id: 1,
                    user: "Maria Santos",
                    avatar: "/woman-athlete.jpg",
                    lastMessage: "Vamos treinar juntos!",
                    time: "10min",
                  },
                  {
                    id: 2,
                    user: "João Costa",
                    avatar: "/fit-man-gym.png",
                    lastMessage: "Obrigado pelo treino!",
                    time: "1h",
                  },
                  {
                    id: 99,
                    user: currentStory?.user,
                    avatar: currentStory?.avatar,
                    lastMessage: "Resposta ao story",
                    time: "Agora",
                  },
                ]
                  .filter((c) => c.user)
                  .map((chat) => (
                    <div
                      key={chat.id}
                      className={`p-4 border-b border-border hover:bg-secondary/50 cursor-pointer ${
                        pinnedChats.includes(chat.id) ? "bg-primary/10" : ""
                      }`}
                      onClick={() => setSelectedConversation(chat)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{chat.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{chat.user}</p>
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPinnedChats((prev) =>
                                prev.includes(chat.id) ? prev.filter((id) => id !== chat.id) : [...prev, chat.id],
                              )
                            }}
                          >
                            <Pin className={`h-4 w-4 ${pinnedChats.includes(chat.id) ? "text-primary" : ""}`} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive"
                            onClick={(e) => {
                              e.stopPropagation()
                              console.log("[v0] Delete chat", chat.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <Button size="icon" variant="ghost" onClick={() => setSelectedConversation(null)}>
                    <X className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.user[0]}</AvatarFallback>
                  </Avatar>
                  <p className="font-semibold">{selectedConversation.user}</p>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {storyReplyContext && (
                    <div className="bg-secondary/50 rounded-lg p-3 mb-4">
                      <p className="text-xs text-muted-foreground mb-2">Você respondeu ao story</p>
                      <img
                        src={storyReplyContext.image || "/placeholder.svg"}
                        alt="Story"
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <div className="bg-secondary rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm">{selectedConversation.lastMessage}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-border flex gap-2">
                  <Input placeholder="Digite uma mensagem..." />
                  <Button size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container max-w-2xl mx-auto px-4 py-3 flex items-center justify-around">
          <Button variant={activeTab === "feed" ? "default" : "ghost"} size="icon" onClick={() => setActiveTab("feed")}>
            <Home className="h-5 w-5" />
          </Button>
          <Button
            variant={activeTab === "following" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("following")}
          >
            <Users className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            variant={activeTab === "trends" ? "default" : "ghost"}
            size="icon"
            onClick={() => setActiveTab("trends")}
          >
            <TrendingUp className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => (window.location.href = "/ranking")}>
            <Award className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Dialog open={showShareModal} onOpenChange={setShowShareModal}>
        <DialogContent className="max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Compartilhar Publicação</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={() => setShowShareModal(false)}
            >
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">f</div>
              Compartilhar no Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={() => setShowShareModal(false)}
            >
              <div className="h-8 w-8 rounded-full bg-blue-400 flex items-center justify-center text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              Compartilhar no Twitter
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={() => setShowShareModal(false)}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                <ImageIcon className="h-4 w-4" />
              </div>
              Compartilhar no Instagram
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={() => setShowShareModal(false)}
            >
              <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <Share className="h-4 w-4" />
              </div>
              Compartilhar no WhatsApp
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-3 bg-transparent"
              onClick={() => setShowShareModal(false)}
            >
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                <Copy className="h-3 w-3" />
              </div>
              Copiar Link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle>Criar Publicação</DialogTitle>
          </DialogHeader>
          {!createPostType ? (
            <div className="space-y-4">
              <Textarea placeholder="O que você está pensando?" className="min-h-[100px]" />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("image")}
                >
                  <ImageIcon className="h-4 w-4" />
                  Foto/Imagem
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("video")}
                >
                  <Video className="h-4 w-4" />
                  Vídeo
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("workout")}
                >
                  <Dumbbell className="h-4 w-4" />
                  Treino
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("challenge")}
                >
                  <Trophy className="h-4 w-4" />
                  Desafio
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("invite")}
                >
                  <Users className="h-4 w-4" />
                  Convite
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-transparent"
                  onClick={() => setCreatePostType("category")}
                >
                  <Target className="h-4 w-4" />
                  Categoria
                </Button>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Publicar</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setCreatePostType(null)} className="mb-2">
                ← Voltar
              </Button>

              {createPostType === "image" && (
                <>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Arraste uma imagem ou clique para fazer upload</p>
                    <Button variant="outline" size="sm">
                      Escolher Arquivo
                    </Button>
                  </div>
                  <Textarea placeholder="Adicione uma legenda..." className="min-h-[80px]" />
                  <div className="flex items-center gap-2">
                    <Input placeholder="Mencionar pessoas... @" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Publicar Foto</Button>
                </>
              )}

              {createPostType === "video" && (
                <>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Video className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">Arraste um vídeo ou clique para fazer upload</p>
                    <Button variant="outline" size="sm">
                      Escolher Vídeo
                    </Button>
                  </div>
                  <Textarea placeholder="Adicione uma descrição..." className="min-h-[80px]" />
                  <Button className="w-full bg-primary hover:bg-primary/90">Publicar Vídeo</Button>
                </>
              )}

              {createPostType === "workout" && (
                <>
                  <Input placeholder="Nome do Treino" />
                  <Textarea placeholder="Descrição do treino..." className="min-h-[80px]" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Duração (min)" type="number" />
                    <Input placeholder="Calorias estimadas" type="number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exercícios</label>
                    <div className="space-y-2">
                      <Input placeholder="Ex: Flexões - 3x15" />
                      <Input placeholder="Ex: Agachamento - 4x12" />
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        + Adicionar Exercício
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Publicar Treino</Button>
                </>
              )}

              {createPostType === "challenge" && (
                <>
                  <Input placeholder="Nome do Desafio" />
                  <Textarea placeholder="Descrição do desafio..." className="min-h-[80px]" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Duração (dias)" type="number" />
                    <Input placeholder="Pontos de recompensa" type="number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Metas</label>
                    <Input placeholder="Ex: Completar 100 flexões" />
                    <Input placeholder="Ex: Correr 5km" />
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Criar Desafio</Button>
                </>
              )}

              {createPostType === "invite" && (
                <>
                  <Input placeholder="Título do convite" />
                  <Textarea placeholder="Descrição da atividade..." className="min-h-[80px]" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Data" type="date" />
                    <Input placeholder="Horário" type="time" />
                  </div>
                  <Input placeholder="Local" />
                  <Input placeholder="Mencionar amigos... @" />
                  <Button className="w-full bg-primary hover:bg-primary/90">Enviar Convite</Button>
                </>
              )}

              {createPostType === "category" && (
                <>
                  <Input placeholder="Nome da Categoria" />
                  <Textarea placeholder="Descrição..." className="min-h-[80px]" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Exercícios Vinculados</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input placeholder="Nome do exercício" />
                        <Button variant="outline" size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary/90">Publicar Categoria</Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Notificações</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`flex items-start gap-3 p-3 rounded-lg hover:bg-secondary cursor-pointer transition-colors ${
                  !notif.read ? "bg-primary/10" : ""
                }`}
              >
                <Avatar>
                  <AvatarImage src={notif.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{notif.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold">{notif.user}</span> {notif.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
                {!notif.read && <div className="h-2 w-2 bg-primary rounded-full mt-2" />}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Configurações</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Nome de Usuário</label>
              <Input
                value={userSettings.username}
                onChange={(e) => setUserSettings({ ...userSettings, username: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea
                value={userSettings.bio}
                onChange={(e) => setUserSettings({ ...userSettings, bio: e.target.value })}
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="space-y-3 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Perfil Privado</p>
                  <p className="text-xs text-muted-foreground">Apenas seguidores podem ver suas publicações</p>
                </div>
                <Button
                  variant={userSettings.isPrivate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserSettings({ ...userSettings, isPrivate: !userSettings.isPrivate })}
                >
                  {userSettings.isPrivate ? "Privado" : "Público"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Permitir Mensagens</p>
                  <p className="text-xs text-muted-foreground">Qualquer pessoa pode enviar mensagens</p>
                </div>
                <Button
                  variant={userSettings.allowMessages ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserSettings({ ...userSettings, allowMessages: !userSettings.allowMessages })}
                >
                  {userSettings.allowMessages ? "Sim" : "Não"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mostrar Atividade</p>
                  <p className="text-xs text-muted-foreground">Outros podem ver quando você está online</p>
                </div>
                <Button
                  variant={userSettings.showActivity ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserSettings({ ...userSettings, showActivity: !userSettings.showActivity })}
                >
                  {userSettings.showActivity ? "Sim" : "Não"}
                </Button>
              </div>
            </div>

            <Button className="w-full" onClick={() => setShowSettings(false)}>
              Salvar Alterações
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
