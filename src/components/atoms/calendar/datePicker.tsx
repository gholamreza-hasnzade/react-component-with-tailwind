"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

export type DateFormat = 
  | "fa-short"       // ۱۴۰۴/۷/۲۱
  | "fa-long"        // شنبه، ۲۱ مهر ۱۴۰۴
  | "fa-medium"      // ۲۱ مهر ۱۴۰۴
  | "en-short"       // 10/11/2025
  | "en-long"        // Saturday, October 11, 2025
  | "en-medium"      // Oct 11, 2025
  | "iso"            // 2025-10-11
  | "custom"         // Use customFormat prop

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
  format?: DateFormat
  customFormat?: (date: Date) => string
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = "انتخاب تاریخ",
  className,
  disabled = false,
  format = "fa-short",
  customFormat,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Close when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (date: Date | undefined) => {
    onSelect?.(date)
    setIsOpen(false)
  }

  const formatDate = (date: Date): string => {
    if (customFormat) {
      return customFormat(date)
    }

    switch (format) {
      case "fa-short":
        return date.toLocaleDateString("fa-IR")
      
      case "fa-long":
        return date.toLocaleDateString("fa-IR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      
      case "fa-medium":
        return date.toLocaleDateString("fa-IR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      
      case "en-short":
        return date.toLocaleDateString("en-US")
      
      case "en-long":
        return date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      
      case "en-medium":
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      
      case "iso":
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
      
      default:
        return date.toLocaleDateString("fa-IR")
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "hover:bg-gray-50 transition-colors"
        )}
        dir="rtl"
      >
        <span className={cn(!selected && "text-gray-400")}>
          {selected ? formatDate(selected) : placeholder}
        </span>
        <CalendarIcon className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 rounded-lg border bg-white shadow-lg p-1",
            "animate-in fade-in-0 zoom-in-95",
            "scale-90 origin-top-right"
          )}
          dir="rtl"
        >
          <Calendar
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}

