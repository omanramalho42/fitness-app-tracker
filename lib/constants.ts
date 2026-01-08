import type { ExerciseProps, CronSplitProps, RoutineExercise } from "@/lib/types"

const availableExercises: ExerciseProps[] = [
  {
    id: "31231231232132131231312",
    name: "Supino Reto",
    category: {
      id: "123123123123132",
      name: "Peito",
      icon: "💪"
    },
    duration: 0,
    icon: "👋",
    description: "Exercício composto para peito com barra",
    image: "/bench-press.png",
  },
  {
    id: "12312312312313131313",
    name: "Tríceps Testa",
    category: {
      id: "ASCASCAC",
      name: "Triceps",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Isolamento de tríceps deitado",
    image: "/tricep-extension.png",
  },
  {
    id: "d1231313131231231231",
    name: "Desenvolvimento",
    category: {
      id: "ACSSACAC",
      name: "Ombro",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Pressão de ombros com barra ou halteres",
    image: "/shoulder-press.png",
  },
  {
    id: "1231313131313",
    name: "Puxada Frontal",
    category: {
      id: "CASCACAC",
      name: "Costas",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Puxada alta para dorsal",
    image: "/lat-pulldown.jpg",
  },
  {
    id: "1231312312321333",
    name: "Rosca Direta",
    category: {
      id: "CASCACA",
      name: "Triceps",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Isolamento de bíceps com barra",
    image: "/barbell-curl.png",
  },
  {
    id: "1231231231231231",
    name: "Agachamento",
    category: {
      id: "ACSACACA",
      name: "Pernas",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Exercício composto para pernas",
    image: "/person-doing-squat.png",
  },
  {
    id: "12312312312312312312",
    name: "Leg Press",
    category: {
      id: "CASCACA",
      name: "Pernas",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Pressão de pernas na máquina",
    image: "/leg-press.jpg",
  },
  {
    id: "1231231123123123",
    name: "Esteira",
    category: {
      id: "CASCACAC",
      name: "Cardio",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Corrida ou caminhada na esteira",
    image: "/treadmill.png",
  },
  {
    id: "12312312321312",
    name: "Bicicleta",
    category: {
      id: "ACSACACA",
      name: "Cardio",
      icon: ""
    },
    duration: 0,
    icon: "",
    description: "Pedalada para cardio",
    image: "/exercise-bike.jpg",
  },
  {
    id: "3123213123123",
    name: "Alongamento",
    category: {
      id: "CSCSCSCCSCS",
      name: "Aquecimento",
      icon: "🌍"
    },
    duration: 0,
    icon: "🥊",
    description: "Alongamento dinâmico pré-treino",
    image: "/person-stretching.png",
  },
  {
    id: "12312312",
    name: "Mobilidade",
    category: {
      id: "ASASASAAS",
      name: "Aquecimento",
      icon: "✅"
    },
    duration: 0,
    icon: "🎉",
    description: "Exercícios de mobilidade articular",
    image: "/abstract-mobility.png",
  },
]

const emojiOptions = ["💪", "🦾", "🦵", "🏃", "🚴", "🏋️", "🤸", "🧘", "⚡", "🔥", "💥", "🎯"]

const splitSchedules: Record<CronSplitProps, (string | null)[]> = {
  ABC: ["Treino A", "Treino B", "Treino C", null, "Treino A", "Treino B", null],
  ABCD: ["Treino A", "Treino B", "Treino C", "Treino D", "Treino A", "Treino B", null],
  ABCDE: ["Treino A", "Treino B", "Treino C", "Treino D", "Treino E", "Treino A", null],
  "Push Pull Legs": ["Push", "Pull", "Legs", null, "Push", "Pull", null],
  "Upper Lower": ["Superior", "Inferior", null, "Superior", "Inferior", null, null],
}

const generationSteps = [
  "Analisando suas informações...",
  "Processando objetivos...",
  "Criando plano personalizado...",
  "Ajustando exercícios...",
  "Finalizando seu treino...",
]

const customEmojis = [
  {
    id: 'github',
    name: 'GitHub',
    emojis: [
      {
        id: 'octocat',
        name: 'Octocat',
        keywords: ['github'],
        skins: [{ src: './octocat.png' }],
      },
      {
        id: 'shipit',
        name: 'Squirrel',
        keywords: ['github'],
        skins: [
          { src: './shipit-1.png' }, { src: './shipit-2.png' }, { src: './shipit-3.png' },
          { src: './shipit-4.png' }, { src: './shipit-5.png' }, { src: './shipit-6.png' },
        ],
      },
    ],
  },
  {
    id: 'gifs',
    name: 'GIFs',
    emojis: [
      {
        id: 'party_parrot',
        name: 'Party Parrot',
        keywords: ['dance', 'dancing'],
        skins: [{ src: './party_parrot.gif' }],
      },
    ],
  },
]

const customCategoryIcons = {
  categoryIcons: {
    activity: {
      svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M57.89 397.2c-6.262-8.616-16.02-13.19-25.92-13.19c-23.33 0-31.98 20.68-31.98 32.03c0 6.522 1.987 13.1 6.115 18.78l46.52 64C58.89 507.4 68.64 512 78.55 512c23.29 0 31.97-20.66 31.97-32.03c0-6.522-1.988-13.1-6.115-18.78L57.89 397.2zM496.1 352c-44.13 0-79.72 35.75-79.72 80s35.59 80 79.72 80s79.91-35.75 79.91-80S540.2 352 496.1 352zM640 99.38c0-13.61-4.133-27.34-12.72-39.2l-23.63-32.5c-13.44-18.5-33.77-27.68-54.12-27.68c-13.89 0-27.79 4.281-39.51 12.8L307.8 159.7C262.2 192.8 220.4 230.9 183.4 273.4c-24.22 27.88-59.18 63.99-103.5 99.63l56.34 77.52c53.79-35.39 99.15-55.3 127.1-67.27c51.88-22 101.3-49.87 146.9-82.1l202.3-146.7C630.5 140.4 640 120 640 99.38z"/></svg>',
    },
    people: {
      src: './people.png',
    },
  },
}


export type RoutineExercises = {
  id: string
  name: string
  order: number
  duration: number
}

type CategoryRoutine = {
  name: string
  exercises: RoutineExercises[]
}


export const MOCK_ROUTINES: CategoryRoutine[] = [
  {
    name: "Jiu-Jitsu",
    exercises: [
      { id: "1", name: "Aquecimento técnico", order: 1, duration: 45 },
      { id: "2", name: "Passagem de guarda", order: 2, duration: 45 },
      { id: "3", name: "Raspagens", order: 3, duration: 45 }
    ]
  },
  {
    name: "Musculação",
    exercises: [
      { id: "4", name: "Supino reto", order: 1, duration: 45 },
      { id: "5", name: "Agachamento livre", order: 2, duration: 45 },
      { id: "6", name: "Levantamento terra", order: 3, duration: 45 }
    ]
  },
  {
    name: "Funcional",
    exercises: [
      { id: "7", name: "Circuito HIIT", order: 1, duration: 45 },
      { id: "8", name: "Core e mobilidade", order: 2, duration: 45 }
    ]
  }
]


export const MOCK_EXERCISES: RoutineExercises[] = [
  { id: "1", name: "Arm Lock Drill", order: 1, duration: 45 },
  { id: "2", name: "Passagem de Guarda", order: 2, duration: 45 },
  { id: "3", name: "Raspagens", order: 3, duration: 45 },
  { id: "4", name: "Finalizações", order: 4, duration: 45 }
]


export {
  availableExercises,
  emojiOptions,
  splitSchedules,
  generationSteps,
  customEmojis,
  customCategoryIcons,
};