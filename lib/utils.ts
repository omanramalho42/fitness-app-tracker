import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function addMinutes(time: string, minutes: number) {
  const [h, m] = time.split(":").map(Number)
  const date = new Date()
  date.setHours(h, m + minutes)

  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  })
}
