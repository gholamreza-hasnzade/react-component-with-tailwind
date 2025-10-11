"use client"

import * as React from "react"
import type { DateRange as DayPickerDateRange } from "react-day-picker"
import { Calendar } from "./calendar"

export function CalendarExample() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">تقویم شمسی (Persian Calendar)</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border shadow-sm"
          dir="rtl"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">تاریخ انتخاب شده:</h3>
        <p className="text-lg" dir="rtl">
          {date ? date.toLocaleDateString("fa-IR") : "هیچ تاریخی انتخاب نشده"}
        </p>
      </div>
    </div>
  )
}

export function CalendarRangeExample() {
  const [range, setRange] = React.useState<DayPickerDateRange | undefined>()

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">انتخاب بازه تاریخ</h2>
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rounded-lg border shadow-sm"
          dir="rtl"
          numberOfMonths={2}
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">بازه انتخاب شده:</h3>
        <p className="text-lg" dir="rtl">
          {range?.from ? (
            range.to ? (
              <>
                {range.from.toLocaleDateString("fa-IR")} تا{" "}
                {range.to.toLocaleDateString("fa-IR")}
              </>
            ) : (
              range.from.toLocaleDateString("fa-IR")
            )
          ) : (
            "هیچ بازه‌ای انتخاب نشده"
          )}
        </p>
      </div>
    </div>
  )
}

export function CalendarMultipleExample() {
  const [dates, setDates] = React.useState<Date[] | undefined>([])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">انتخاب چند تاریخ</h2>
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-lg border shadow-sm"
          dir="rtl"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">تاریخ‌های انتخاب شده:</h3>
        <div className="space-y-1" dir="rtl">
          {dates && dates.length > 0 ? (
            dates.map((date, index) => (
              <p key={index} className="text-lg">
                {date.toLocaleDateString("fa-IR")}
              </p>
            ))
          ) : (
            <p className="text-lg">هیچ تاریخی انتخاب نشده</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalendarExample

