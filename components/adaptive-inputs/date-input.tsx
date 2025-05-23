"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { useMobileOS } from "@/hooks/use-mobile-os"

interface DateInputProps {
  value?: Date
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  id?: string
  name?: string
  required?: boolean
}

export function DateInput({
  value,
  onChange,
  placeholder = "Seleccionar fecha",
  className,
  id,
  name,
  required = false,
}: DateInputProps) {
  const os = useMobileOS()
  const [date, setDate] = useState<Date | undefined>(value)

  useEffect(() => {
    setDate(value)
  }, [value])

  const handleChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onChange(newDate)
  }

  const handleNativeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : undefined
    handleChange(newDate)
  }

  // Usar input nativo en Android e iOS
  if (os === "android" || os === "ios") {
    return (
      <Input
        type="date"
        value={date ? format(date, "yyyy-MM-dd") : ""}
        onChange={handleNativeChange}
        className={className}
        placeholder={placeholder}
        id={id}
        name={name}
        required={required}
      />
    )
  }

  // Usar componente de shadcn en otros sistemas operativos
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground", className)}
          id={id}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
