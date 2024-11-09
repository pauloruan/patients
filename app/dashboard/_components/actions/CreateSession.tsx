"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { TimePicker } from "@/components/ui/time-picker"
import { useToast } from "@/components/ui/use-toast"
import { API } from "@/services/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const paymentStatus = ["PAID", "PENDING"] as const
const local = ["ONLINE", "PRESENCIAL"] as const
const formSchema = z.object({
  patientId: z
    .string({ message: "Nome é obrigatório" })
    .min(1, { message: "Nome é obrigatório" }),
  local: z.enum(local, { message: "Local é obrigatório" }),
  payment: z.enum(paymentStatus, { message: "Pagamento é obrigatório" }),
  price: z.coerce
    .number({ message: "Preço é obrigatório." })
    .int({ message: "Preço deve ser um número inteiro." })
    .positive({ message: "Preço deve ser um número positivo." }),
  date: z.date({ message: "Data é obrigatória." })
})

type FormValues = z.infer<typeof formSchema>

export function CreateSession() {
  const queryClient = useQueryClient()
  const {
    data,
    isError: isFetchError,
    isLoading: isFetching
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: API.getDashboardData
  })
  const [date, setDate] = useState<Date>()
  const [open, setOpen] = useState<boolean>(false)
  const [openDate, setOpenDate] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const activePatients = data?.patients.active.data.slice()
  const { toast } = useToast()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      local: local[0],
      payment: paymentStatus[1],
      price: 100,
      date: new Date()
    }
  })

  const { mutate, isError, isSuccess, error } = useMutation({
    mutationFn: API.createTherapy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"], exact: true })
    }
  })

  function formatDate(date: Date | undefined) {
    if (typeof date === "undefined") {
      date = new Date()
    }
    return date.toLocaleDateString("pt-BR")
  }

  function getPatientName(patientId: string) {
    return (
      activePatients?.find((patient) => patient.id === patientId)?.name ||
      "Selecione um paciente"
    )
  }

  function renderSessionType(sessionType: (typeof local)[number]) {
    switch (sessionType) {
      case "ONLINE":
        return "Online"
      case "PRESENCIAL":
        return "Presencial"
      default:
        return ""
    }
  }

  function renderPaymentStatus(paymentType: (typeof paymentStatus)[number]) {
    switch (paymentType) {
      case "PAID":
        return "Pago"
      case "PENDING":
        return "Pendente"
      default:
        return ""
    }
  }

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
          title: "Sessão criada",
          description: "A sessão foi criada com sucesso."
        })
        setIsSubmitting(false)
      }
    }

    function handleError() {
      if (isError) {
        toast({
          variant: "destructive",
          title: "Erro ao agendar sessão",
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
        <Button
          size="sm"
          variant="default"
          className="font-sans"
          disabled={isFetching || isFetchError}
        >
          Agendar sessão
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader>
          <DialogTitle className="font-sans font-bold">
            Agendar sessão
          </DialogTitle>
          <DialogDescription className="font-sans">
            Preencha os campos abaixo para agendar uma nova sessão.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* PACIENTE */}
            <FormField
              control={form.control}
              name="patientId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="font-sans">Paciente</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                        <SelectValue
                          className="font-sans"
                          placeholder="Selecione um paciente"
                        >
                          {getPatientName(field.value)}
                        </SelectValue>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="min-w-max">
                      {activePatients?.map((patient) => (
                        <SelectItem
                          key={patient.id}
                          value={patient.id}
                          className="w-full font-sans"
                        >
                          {patient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="font-sans" />
                </FormItem>
              )}
            />
            <div className="flex w-full items-center justify-between gap-1">
              {/* LOCAL */}
              <FormField
                control={form.control}
                name="local"
                render={({ field }) => (
                  <FormItem className="w-full max-w-40">
                    <FormLabel className="font-sans">Local</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                          <SelectValue
                            className="font-sans"
                            placeholder="Selecione um local"
                          >
                            {renderSessionType(field.value)}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-max">
                        {local.map((value) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="w-full font-sans"
                          >
                            {renderSessionType(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
              {/* DATA */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full max-w-40">
                    <FormLabel className="font-sans">Data e Hora</FormLabel>
                    <FormControl>
                      <Popover open={openDate} onOpenChange={setOpenDate}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full max-w-40 justify-start text-left font-sans font-normal"
                            disabled={isSubmitting}
                          >
                            {date ? formatDate(date) : "Selecione a data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            required
                            lang="pt-BR"
                            locale={ptBR}
                            mode="single"
                            initialFocus
                            weekStartsOn={0}
                            className="font-sans"
                            selected={field.value}
                            disabled={{ before: new Date() }}
                            onSelect={(date) => {
                              setDate(date)
                              field.onChange(date)
                            }}
                          />
                          <div className="border-t border-border p-3">
                            <TimePicker
                              setDate={field.onChange}
                              date={field.value}
                              setOpen={setOpenDate}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-1">
              {/* PAGAMENTO */}
              <FormField
                control={form.control}
                name="payment"
                render={({ field }) => (
                  <FormItem className="w-full max-w-40">
                    <FormLabel className="font-sans">Pagamento</FormLabel>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50">
                          <SelectValue
                            className="font-sans"
                            placeholder="Selecione um pagamento"
                          >
                            {renderPaymentStatus(field.value)}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="min-w-max">
                        {paymentStatus.map((value) => (
                          <SelectItem
                            key={value}
                            value={value}
                            className="w-full font-sans"
                          >
                            {renderPaymentStatus(value)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
              {/* PREÇO */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full max-w-40">
                    <FormLabel className="font-sans">Preço</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        disabled={isSubmitting}
                        className="font-sans transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="font-sans" />
                  </FormItem>
                )}
              />
            </div>

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
