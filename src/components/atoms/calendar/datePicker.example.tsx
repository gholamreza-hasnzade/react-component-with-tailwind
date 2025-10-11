"use client"

import * as React from "react"
import { DatePicker } from "./datePicker"
import { DateRangePicker } from "./dateRangePicker"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

export function DatePickerExample() {
  const [date, setDate] = React.useState<Date | undefined>()

  return (
    <div className="flex flex-col gap-8 p-8" dir="rtl">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">انتخابگر تاریخ (Date Picker)</h2>
        <div className="max-w-sm">
          <label className="block text-sm font-medium mb-2">
            تاریخ تولد
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            placeholder="تاریخ خود را انتخاب کنید"
          />
        </div>
        {date && (
          <div className="text-sm text-gray-600">
            تاریخ انتخاب شده:{" "}
            <span className="font-semibold">
              {date.toLocaleDateString("fa-IR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function DateRangePickerExample() {
  const [range, setRange] = React.useState<DayPickerDateRange | undefined>()

  return (
    <div className="flex flex-col gap-8 p-8" dir="rtl">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">انتخابگر بازه تاریخ</h2>
        <div className="w-full">
          <label className="block text-sm font-medium mb-2">
            بازه زمانی مورد نظر
          </label>
          <DateRangePicker
            selected={range}
            onSelect={setRange}
            placeholder="از تاریخ - تا تاریخ"
            className="max-w-md"
            
          />
        </div>
        {range?.from && (
          <div className="text-sm text-gray-600">
            بازه انتخاب شده:{" "}
            <span className="font-semibold">
              {range.from.toLocaleDateString("fa-IR")}
              {range.to && ` تا ${range.to.toLocaleDateString("fa-IR")}`}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export function DatePickerFormExample() {
  const [startDate, setStartDate] = React.useState<Date | undefined>()
  const [endDate, setEndDate] = React.useState<Date | undefined>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { startDate, endDate })
    alert(`تاریخ شروع: ${startDate?.toLocaleDateString("fa-IR")}\nتاریخ پایان: ${endDate?.toLocaleDateString("fa-IR")}`)
  }

  return (
    <div className="flex flex-col gap-8 p-8" dir="rtl">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">فرم با انتخابگر تاریخ</h2>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              تاریخ شروع پروژه
            </label>
            <DatePicker
              selected={startDate}
              onSelect={setStartDate}
              placeholder="انتخاب تاریخ شروع"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              تاریخ پایان پروژه
            </label>
            <DatePicker
              selected={endDate}
              onSelect={setEndDate}
              placeholder="انتخاب تاریخ پایان"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </div>
  )
}

export default DatePickerExample

