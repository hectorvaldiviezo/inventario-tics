"use client"

import { useMobileOS } from "@/hooks/use-mobile-os"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface SelectInputProps {
  options: Option[]
  value?: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  id?: string
  name?: string
  required?: boolean
}

export function SelectInput({
  options,
  value,
  onChange,
  placeholder = "Seleccionar opción",
  className,
  id,
  name,
  required = false,
}: SelectInputProps) {
  const os = useMobileOS()

  // Usar select nativo en Android e iOS
  if (os === "android" || os === "ios") {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full p-2 border rounded-md ${className}`}
        id={id}
        name={name}
        required={required}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  // Usar componente de shadcn en otros sistemas operativos
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id={id} className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
