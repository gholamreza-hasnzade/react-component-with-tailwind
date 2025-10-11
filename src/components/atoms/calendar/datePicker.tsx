"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = "انتخاب تاریخ",
  className,
  disabled = false,
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
          {selected
            ? selected.toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : placeholder}
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

