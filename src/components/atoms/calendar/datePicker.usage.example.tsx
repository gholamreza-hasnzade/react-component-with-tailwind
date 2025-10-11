"use client"

import * as React from "react"
import { DatePicker, DateRangePicker } from "./index"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

// Example 1: Get single date value
export function SingleDateValueExample() {
  const [date, setDate] = React.useState<Date | undefined>()

  // Get the date value
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    
    if (selectedDate) {
      console.log("Selected Date:", selectedDate)
      console.log("Persian Date:", selectedDate.toLocaleDateString("fa-IR"))
      console.log("ISO String:", selectedDate.toISOString())
      console.log("Timestamp:", selectedDate.getTime())
    }
  }

  return (
    <div className="p-8 space-y-4" dir="rtl">
      <h2 className="text-xl font-bold">دریافت مقدار تاریخ</h2>
      
      <DatePicker
        selected={date}
        onSelect={handleDateChange}
        placeholder="انتخاب تاریخ"
      />

      {date && (
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <p><strong>تاریخ شمسی:</strong> {date.toLocaleDateString("fa-IR")}</p>
          <p><strong>تاریخ میلادی:</strong> {date.toLocaleDateString("en-US")}</p>
          <p><strong>ISO String:</strong> {date.toISOString()}</p>
          <p><strong>Timestamp:</strong> {date.getTime()}</p>
        </div>
      )}
    </div>
  )
}

// Example 2: Get date range values
export function DateRangeValueExample() {
  const [range, setRange] = React.useState<DayPickerDateRange | undefined>()

  const handleRangeChange = (selectedRange: DayPickerDateRange | undefined) => {
    setRange(selectedRange)
    
    if (selectedRange?.from && selectedRange?.to) {
      console.log("Start Date:", selectedRange.from)
      console.log("End Date:", selectedRange.to)
      
      // Calculate days difference
      const diffTime = Math.abs(selectedRange.to.getTime() - selectedRange.from.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      console.log("Days difference:", diffDays)
    }
  }

  return (
    <div className="p-8 space-y-4" dir="rtl">
      <h2 className="text-xl font-bold">دریافت مقدار بازه تاریخ</h2>
      
      <DateRangePicker
        selected={range}
        onSelect={handleRangeChange}
        placeholder="انتخاب بازه تاریخ"
      />

      {range?.from && range?.to && (
        <div className="bg-gray-100 p-4 rounded-lg space-y-2">
          <p><strong>از تاریخ:</strong> {range.from.toLocaleDateString("fa-IR")}</p>
          <p><strong>تا تاریخ:</strong> {range.to.toLocaleDateString("fa-IR")}</p>
          <p><strong>تعداد روزها:</strong> {
            Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))
          } روز</p>
        </div>
      )}
    </div>
  )
}

// Example 3: Submit to API/Backend
export function SubmitDateExample() {
  const [startDate, setStartDate] = React.useState<Date | undefined>()
  const [endDate, setEndDate] = React.useState<Date | undefined>()
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!startDate || !endDate) {
      alert("لطفا هر دو تاریخ را انتخاب کنید")
      return
    }

    setLoading(true)

    // Prepare data for API
    const data = {
      start_date: startDate.toISOString(), // Send as ISO string
      end_date: endDate.toISOString(),
      // Or send as timestamp
      start_timestamp: startDate.getTime(),
      end_timestamp: endDate.getTime(),
      // Or send as formatted string
      start_date_fa: startDate.toLocaleDateString("fa-IR"),
      end_date_fa: endDate.toLocaleDateString("fa-IR"),
    }

    console.log("Sending to API:", data)

    // Simulate API call
    try {
      // await fetch('/api/submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // })
      
      setTimeout(() => {
        alert(`ارسال شد!\nاز: ${data.start_date_fa}\nتا: ${data.end_date_fa}`)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      setLoading(false)
    }
  }

  return (
    <div className="p-8" dir="rtl">
      <h2 className="text-xl font-bold mb-4">ارسال به سرور</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-2">تاریخ شروع</label>
          <DatePicker
            selected={startDate}
            onSelect={setStartDate}
            placeholder="انتخاب تاریخ شروع"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">تاریخ پایان</label>
          <DatePicker
            selected={endDate}
            onSelect={setEndDate}
            placeholder="انتخاب تاریخ پایان"
            disabled={!startDate}
          />
        </div>

        <button
          type="submit"
          disabled={loading || !startDate || !endDate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "در حال ارسال..." : "ارسال اطلاعات"}
        </button>
      </form>
    </div>
  )
}

// Example 4: Convert date formats
export function DateFormatExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  const formatDate = (date: Date) => {
    return {
      // Persian formats
      persian_short: date.toLocaleDateString("fa-IR"),
      persian_long: date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
      
      // English formats
      english_short: date.toLocaleDateString("en-US"),
      english_long: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      }),
      
      // ISO and Timestamps
      iso_string: date.toISOString(),
      timestamp: date.getTime(),
      
      // Custom formats
      year: date.getFullYear(),
      month: date.getMonth() + 1, // 0-indexed
      day: date.getDate(),
      
      // YYYY-MM-DD format
      yyyy_mm_dd: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    }
  }

  return (
    <div className="p-8 space-y-4" dir="rtl">
      <h2 className="text-xl font-bold">فرمت‌های مختلف تاریخ</h2>
      
      <DatePicker
        selected={date}
        onSelect={setDate}
        placeholder="انتخاب تاریخ"
      />

      {date && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <pre className="text-xs" dir="ltr">
            {JSON.stringify(formatDate(date), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

// Example 5: Store in localStorage
export function LocalStorageExample() {
  const [date, setDate] = React.useState<Date | undefined>(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem("saved_date")
    return saved ? new Date(saved) : undefined
  })

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    console.log("Selected Date:", selectedDate)
    
    // Save to localStorage
    if (selectedDate) {
      localStorage.setItem("saved_date", selectedDate.toISOString())
    } else {
      localStorage.removeItem("saved_date")
    }
  }

  const clearDate = () => {
    setDate(undefined)
    localStorage.removeItem("saved_date")
  }

  return (
    <div className="p-8 space-y-4" dir="rtl">
      <h2 className="text-xl font-bold">ذخیره در LocalStorage</h2>
      
      <DatePicker
        selected={date}
        onSelect={handleDateChange}
        
        placeholder="انتخاب تاریخ"
      />

      {date && (
        <div className="flex gap-2">
          <button
            onClick={clearDate}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            پاک کردن
          </button>
          <p className="flex items-center">
            ذخیره شده: {date.toLocaleDateString("fa-IR")}
          </p>
        </div>
      )}
    </div>
  )
}

export default SingleDateValueExample

