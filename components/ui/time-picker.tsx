"use client"

import { Label } from "@/components/ui/label"
import * as React from "react"
import { Button } from "./button"
import { TimePickerInput } from "./time-picker-input"

interface TimePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function TimePicker({ date, setDate, setOpen }: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null)
  const hourRef = React.useRef<HTMLInputElement>(null)
  const secondRef = React.useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="font-sans text-xs">
          Horas
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="font-sans text-xs">
          Minutos
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
        />
      </div>
      <Button
        size="sm"
        variant="default"
        className="flex items-center gap-1 font-sans text-xs"
        onClick={() => setOpen(false)}
      >
        Confirmar
      </Button>
    </div>
  )
}
