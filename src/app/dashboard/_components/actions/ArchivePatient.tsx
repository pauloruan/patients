"use client"

import { Button } from "@/app/_components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/app/_components/ui/dialog"
import { useToast } from "@/app/_components/ui/use-toast"
import { API } from "@/src/services/axios"
import { ArchiveIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"

interface Props {
  patient: Patient
}

export function ArchivePatient({ patient }: Props) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: API.updatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: true })
    }
  })

  function onSubmit() {
    setIsSubmitting(true)
    const values = {
      ...patient,
      status: patient.status === "ACTIVE" ? "ARCHIVED" : "ACTIVE"
    }
    mutate(values)
    toast({
      variant: "default",
      title: "Dados enviados",
      description: "Estamos processando as informações, aguarde um momento."
    })
  }

  useEffect(() => {
    function handleSuccess() {
      if (isSuccess) {
        toast({
          variant: "default",
          title: "Paciente arquivado",
          description: "O paciente foi arquivado com sucesso"
        })
        setIsSubmitting(false)
        setOpen(false)
      }
    }

    function handleError() {
      if (isError) {
        toast({
          variant: "destructive",
          title: "Erro ao editar paciente",
          description: `${error.name}: ${error.message}`
        })
        setIsSubmitting(false)
      }
    }

    handleSuccess()
    handleError()
  }, [isError, isSuccess, toast, error])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 font-sans" size="sm">
          <ArchiveIcon className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            {patient.status === "ACTIVE" ? "Arquivar" : "Desarquivar"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold">
            {patient.status === "ACTIVE" ? "Arquivar" : "Desarquivar"} paciente
          </DialogTitle>
          <DialogDescription className="font-sans">
            Os dados de {patient.name} serão{" "}
            {patient.status === "ACTIVE" ? "arquivados" : "desarquivados"}.
            Deseja continuar?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button
                size="sm"
                type="button"
                className="gap-1"
                variant="secondary"
                disabled={isSubmitting}
              >
                <Cross2Icon className="h-4 w-4" />
                <span className="font-sans">Cancelar</span>
              </Button>
            </DialogClose>
            <Button
              size="sm"
              type="button"
              className="gap-1"
              variant="default"
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              <CheckIcon className="h-4 w-4" />
              <span className="font-sans">
                {isSubmitting ? "Salvando..." : "Salvar"}
              </span>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
