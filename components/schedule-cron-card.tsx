"use client"

import React, { Fragment, useCallback, useState } from 'react'

import CreateScheduleCronDialog from '@/components/create-schedule-cron-dialog'
import UpdateCronDialog from '@/components/update-cron-dialog'
import DeleteCronDialog from '@/components/delete-cron-dialog'

import { Badge } from '@/components/ui/badge'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


import {
  Plus,
  Edit,
  Trash2,
  Copy,
  Download,
  Calendar
} from "lucide-react"

import type { ScheduleCronProps } from '@/lib/types'

const ScheduleCronCard:React.FC = () => {
  const [crons, setCrons] = useState<ScheduleCronProps[]>([
    { name: "abc", icon: "🎉", color: "#dfdfdf" }
  ])

  const [currentCron, setCurrentCron] = useState<string>("")
  const handleScheduleCronChange = useCallback(
    (value: ScheduleCronProps) => {
      setCurrentCron(value.name)
    },
    [],
  )

  const handleDuplicateCron = (cron: ScheduleCronProps) => {
    const newCrons = {
      ...cron,
      id: Date.now().toString(),
      name: `${cron.name} (cópia)`,
    }
    setCrons([...crons, newCrons])
  }

  const handleExportCron = (schedule: ScheduleCronProps) => {
    const dataStr = JSON.stringify(schedule, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${schedule.name.toLowerCase().replace(/\s+/g, "-")}.json`
    link.click()
  }

  return (
    <Fragment>
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Cronograma</h3>
          <CreateScheduleCronDialog
            onSuccessCallback={handleScheduleCronChange}
            trigger={
              <Button
                className="hover:text-foreground"
                size="sm"
                variant="outline"
              >
                <Plus className="w-4 h-4 mr-1" />
                Nova
              </Button>
            }  
          />
        </div>

        {crons.length > 0 ? (
          crons.map((cron, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className={`w-2 ${cron.color}`} />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex flex-col">
                        <div className="flex items-start justify-between mb-3">
                          <div className="mt-5">
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Divisão Atual</p>
                            <div className="flex gap-2">
                              <h3 className="text-xl font-bold">{currentCron}</h3>
                              <Badge className="bg-primary/20 text-primary border-primary/30">Ativo</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          Treino dividido em {currentCron} dias com descanso
                          estratégico
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <UpdateCronDialog
                          cronId='123123'
                          onSuccessCallback={() => setCrons}
                          trigger={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-8 h-8"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          }
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => handleDuplicateCron(cron)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8"
                          onClick={() => handleExportCron(cron)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <DeleteCronDialog
                          cron={cron}
                          trigger={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="w-8 h-8 text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
      ) : (
          <CreateScheduleCronDialog
            onSuccessCallback={() => setCrons}
            trigger={
              <Card className="bg-linear-to-br from-primary/20 to-primary/5 border-primary/30 mt-4 px-4">
                <CardContent className="p-5">
                  <Button
                    className="w-full bg-transparent hover:bg-primary/10 transition-all"
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Divisão Personalizada
                  </Button>
                </CardContent>
              </Card>
            }
          />
        )}
      </div>

      {crons.length > 0 && (
        <Card className="mt-4 px-4">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Cronograma Semanal</h3>
            </div>
            <div className="space-y-2">
              {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, index) => {
                const workoutName = ""
                return (
                  <div
                    key={day}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <span className="text-sm font-medium">{day}</span>
                    {workoutName ? (
                      <div className="flex items-center gap-2">
                        <Badge className="font-medium">{workoutName}</Badge>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Descanso</span>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

    </Fragment>
  )
}

export default ScheduleCronCard