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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/app/_components/ui/form"
import { Input } from "@/app/_components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/app/_components/ui/select"
import { Textarea } from "@/app/_components/ui/textarea"
import { useToast } from "@/app/_components/ui/use-toast"
import { API } from "@/src/services/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Cross2Icon, FilePlusIcon } from "@radix-ui/react-icons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório" })
    .min(1, { message: "Nome é obrigatório" }),
  email: z
    .string({ message: "Email é obrigatório." })
    .email({ message: "Email inválido." }),
  age: z.coerce
    .number({ message: "Idade é obrigatório." })
    .int({ message: "Idade deve ser um número inteiro." })
    .positive({ message: "Idade deve ser um número positivo." }),
  diagnosis: z
    .string({ message: "Diagnóstico é obrigatório." })
    .min(1, { message: "Diagnóstico é obrigatório." }),
  notes: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export function CreatePatient() {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const ages = Array.from({ length: 100 }, (_, index) => index)
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
      diagnosis: "",
      notes: ""
    }
  })
  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: API.createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: true })
    }
  })

  function onSubmit(values: FormValues) {
    setIsSubmitting(true)
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
          title: "Paciente criado",
          description: "O paciente foi criado com sucesso"
        })
        setIsSubmitting(false)
      }
    }

    function handleError() {
      if (isError) {
        toast({
          variant: "destructive",
          title: "Erro ao criar paciente",
          description: `${error.name}: ${error.message}`
        })
        setIsSubmitting(false)
      }
    }

    function handleFormSubmission() {
      if (form.formState.isSubmitSuccessful) {
        form.reset()
        setOpen(false)
      }
    }

    handleError()
    handleSuccess()
    handleFormSubmission()
  }, [isError, isSuccess, toast, form, error])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex h-8 items-center gap-1 font-sans" size="sm">
          <FilePlusIcon className="h-4 w-4" />
          <span className="sr-only font-sans sm:not-sr-only sm:whitespace-nowrap">
            Adicionar paciente
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold">
            Adicionar novo paciente
          </DialogTitle>
          <DialogDescription className="font-sans">
            Adicione as informações do paciente
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex w-full items-center justify-between gap-1">
              {/* NOME */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-4/5">
                    <FormLabel className="font-sans">Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={isSubmitting}
                        className="w-full font-sans"
                      />
                    </FormControl>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
              {/* IDADE */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className="w-[90%] max-w-20">
                    <FormLabel className="font-sans">Idade</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue className="font-sans">
                            {field.value}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-max">
                        {ages.map((age) => (
                          <SelectItem
                            key={age}
                            value={age.toString()}
                            className="w-14 font-sans"
                          >
                            {age.toString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
            </div>
            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="font-sans">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isSubmitting}
                      className="font-sans"
                    />
                  </FormControl>
                  <FormMessage className="font-sans" />
                </FormItem>
              )}
            />
            {/* DIAGNÓSTICO */}
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans">Diagnóstico</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      disabled={isSubmitting}
                      className="font-sans"
                    />
                  </FormControl>
                  <FormMessage className="font-sans" />
                </FormItem>
              )}
            />
            {/* OBSERVAÇÕES */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans">Observações</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      disabled={isSubmitting}
                      className="resize-none font-sans"
                    />
                  </FormControl>
                  <FormMessage className="font-sans" />
                </FormItem>
              )}
            />
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
                  type="submit"
                  className="gap-1"
                  variant="default"
                  disabled={isSubmitting}
                >
                  <CheckIcon className="h-4 w-4" />
                  <span className="font-sans">
                    {isSubmitting ? "Salvando..." : "Salvar"}
                  </span>
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
