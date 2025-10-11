"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "./calendar"
import { cn } from "@/lib/utils"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

interface DateRangePickerProps {
  selected?: DayPickerDateRange
  onSelect?: (range: DayPickerDateRange | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({
  selected,
  onSelect,
  placeholder = "انتخاب بازه تاریخ",
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // Check screen size
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  const handleSelect = (range: DayPickerDateRange | undefined) => {
    onSelect?.(range)
    // Close only when both dates are selected
    if (range?.from && range?.to) {
      setIsOpen(false)
    }
  }

  const formatDateRange = () => {
    if (!selected?.from) return placeholder

    if (selected.from && selected.to) {
      return `${selected.from.toLocaleDateString("fa-IR")} تا ${selected.to.toLocaleDateString("fa-IR")}`
    }

    return selected.from.toLocaleDateString("fa-IR")
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
        <span className={cn(!selected?.from && "text-gray-400")}>
          {formatDateRange()}
        </span>
        <CalendarIcon className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 z-50 mt-2 rounded-lg border bg-white shadow-lg p-1",
            "animate-in fade-in-0 zoom-in-95",
            "w-auto min-w-fit scale-90 origin-top-right"
          )}
          dir="rtl"
        >
          <Calendar
            mode="range"
            selected={selected}
            onSelect={handleSelect}
            numberOfMonths={isMobile ? 1 : 2}
            classNames={{
              months: "flex flex-row gap-2",
            }}
          />
        </div>
      )}
    </div>
  )
}

