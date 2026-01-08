"use client"

import React, { useCallback, useState } from 'react'

import CreateModalityDialog from '@/components/create-modality-dialog'
import DeleteModalityDialog from '@/components/delete-modality-dialog'
import UpdateModalityDialog from '@/components/update-modality-dialog'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import type { ModalityProps } from '@/lib/types'

import {
  Copy,
  Download,
  Edit,
  Plus,
  Trash2
} from 'lucide-react'
import { toast } from 'sonner'

const ModalityCard:React.FC = () => {
  const [modalities, setModalities] = useState<ModalityProps[]>([
    {
      id: crypto.randomUUID(),
      name: "Treino A",
      icon: "💪",
    },
  ])

  // const [currentModality, setCurrentModality] = useState<string>("")
  // const handleModalityChange = useCallback(
  //   (value: ModalityProps) => {
  //     setCurrentModality(value.name)
  //   },
  //   [currentModality],
  // )

  const handleUpdateModality = useCallback((modality: ModalityProps) => {
    //ATUALIZAR AS INFORMAÇOES DA MODALIDADE A PARTIR DO ID
    //FILTRAR OS DADOS DAS MODALIDADES E REMOVER A MODALIDADE QUE SERA EDITADA
    const newListModalities: ModalityProps[] = modalities.filter(
      (modalityData) => 
        modalityData.id !== modalityData.id
    )
    //CRIAR NOVO OBJETO COM AS INFORMAÇOES ATUALIZADAS
    const newModality: ModalityProps = {
      ...modality,
      id: modality.id,
      name: modality.name,
      description: modality.description,
      updatedAt: Date.now().toString(),
    }

    //CRIAR NOVA LISTA COM NOVO ELEMENTO ATUALIZADO
    setModalities([...newListModalities, newModality])

  },[modalities])

  const handleModalityDelete = useCallback((modalityId: string) => {
    const listAfterRemoving =
      modalities.filter(
        (modality) => 
          modality.id !== modalityId
      )
    
    setModalities(listAfterRemoving)

    toast.success("Modalidade deletada com sucesso. 🎉", { id: modalityId })
  },[modalities])

  const handleModalityCreate = useCallback(
    (value: ModalityProps) => {
      setModalities([...modalities, value])
    },
    [modalities],
  )

  const handleDuplicateModality = (modality: ModalityProps) => {
    const newmodalitys = {
      ...modality,
      id: Date.now().toString(),
      name: `${modality.name} (cópia)`,
    }
    setModalities([...modalities, newmodalitys])
  }

  const handleExportModality = (modality: ModalityProps) => {
    const dataStr = JSON.stringify(modality, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${modality.name.toLowerCase().replace(/\s+/g, "-")}.json`
    link.click()
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Modalidades</h3>
        <CreateModalityDialog
          onSuccessCallback={handleModalityCreate}
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

      {modalities.length > 0 ? (
        modalities.map((modality, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className={`w-2 ${modality.color}`} />
                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{modality.icon}</span>
                      <h4 className="font-semibold">{modality.name}</h4>
                    </div>
                    <div className="flex gap-1">
                      <UpdateModalityDialog
                        modality={modality}
                        onSuccessCallback={handleUpdateModality}
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
                        onClick={() => handleDuplicateModality(modality)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8"
                        onClick={() => handleExportModality(modality)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>

                      <DeleteModalityDialog
                        modality={modality}
                        onSuccessCallback={() => handleModalityDelete(modality.id)}
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
        <CreateModalityDialog
          onSuccessCallback={handleModalityCreate}
          trigger={
            <Card
              className="border-dashed border-2 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <CardContent className="p-6 text-center space-y-3">
                <Plus className="w-12 h-12 mx-auto text-muted-foreground" />
                <div>
                  <h4 className="font-semibold">Criar modalidade Personalizado</h4>
                  <p className="text-sm text-muted-foreground">Adicione modalidades customizados ao seu banco</p>
                </div>
              </CardContent>
            </Card>
          }
        />
      )}
    </div>
  )
}

export default ModalityCard