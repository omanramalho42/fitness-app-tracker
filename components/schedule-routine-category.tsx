"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Layers } from "lucide-react"

import { ScheduleRoutineTable } from "./schedule-routine-table"
import { MOCK_ROUTINES } from "@/lib/constants"
import { Label } from "./ui/label"

export function ScheduleRoutineByCategory() {
  const [category, setCategory] = useState(MOCK_ROUTINES[0].name)

  const currentRoutine = MOCK_ROUTINES.find(
    (r) => r.name === category
  )

  return (
    <Card className="p-4 border-zinc-800">
      {/* SELECT */}
      <div className="flex flex-col gap-3">
        <Label
          className="text-sm text-zinc-400 flex items-center gap-2"
        >
          <Layers size={16} />
          Categoria da rotina
        </Label>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="bg-zinc-900 w-full">
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>

          <SelectContent>
            {MOCK_ROUTINES.map((routine) => (
              <SelectItem
                key={routine.name}
                value={routine.name}
              >
                {routine.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      {currentRoutine && (
        <ScheduleRoutineTable
          startTime="07:30"
          exercises={currentRoutine.exercises}
        />
      )}
    </Card>
  )
}
