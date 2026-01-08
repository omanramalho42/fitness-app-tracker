"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Clock,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { ScheduleRoutineTableProps } from "@/lib/types"
import { MOCK_EXERCISES } from "@/lib/constants"
import { addMinutes } from "@/lib/utils"

export function ScheduleRoutineTable({
  startTime = "07:30",
  exercises
}: ScheduleRoutineTableProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col sm:w-auto w-80 space-y-1">
      <Separator className="bg-zinc-800" />

      {/* HEADER */}
      <Button
        type="button"
        variant="ghost"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-0 text-zinc-300 hover:text-zinc-100"
      >
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <p className="text-sm">
            rotina
          </p>
          <span className="text-xs text-zinc-500">
            ({exercises.length} exercícios ·{" "}
            {exercises.length * 45} min)
          </span>
        </div>

        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </Button>

      {/* TABLE */}
      {open && (
        <div className="rounded-md border border-zinc-800 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-zinc-900">
                <TableHead className="w-12.5">#</TableHead>
                <TableHead>Exercício</TableHead>
                <TableHead className="text-center">Início</TableHead>
                <TableHead className="text-center">Fim</TableHead>
                {/* <TableHead className="text-center">Duração</TableHead> */}
              </TableRow>
            </TableHeader>

            <TableBody>
              {exercises.map((exercise, index) => {
                const start =
                  index === 0
                    ? startTime
                    : addMinutes(
                        startTime,
                        index * exercise.duration
                      )

                const end = addMinutes(start, exercise.duration)

                return (
                  <TableRow
                    key={exercise.id}
                    className="hover:bg-zinc-900/50 transition"
                  >
                    <TableCell className="text-zinc-400">
                      {exercise.order}
                    </TableCell>

                    <TableCell className="text-zinc-200">
                      {exercise.name}
                    </TableCell>

                    <TableCell className="text-center">
                      {start}
                    </TableCell>

                    <TableCell className="text-center">
                      {end}
                    </TableCell>

                    {/* <TableCell className="text-center text-zinc-400">
                      {exercise.duration} min
                    </TableCell> */}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
