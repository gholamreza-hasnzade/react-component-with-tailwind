import type { Meta, StoryObj } from "@storybook/react-vite"
import { Calendar } from "./calendar"
import { useState } from "react"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const SingleDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border shadow-sm"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">تاریخ انتخاب شده:</p>
          <p className="font-semibold">
            {date ? date.toLocaleDateString("fa-IR") : "انتخاب نشده"}
          </p>
        </div>
      </div>
    )
  },
}

export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState<DayPickerDateRange | undefined>()
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          className="rounded-lg border shadow-sm"
          numberOfMonths={2}
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">بازه انتخاب شده:</p>
          <p className="font-semibold">
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
              "انتخاب نشده"
            )}
          </p>
        </div>
      </div>
    )
  },
}

export const MultipleDates: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([])
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="multiple"
          selected={dates}
          onSelect={setDates}
          className="rounded-lg border shadow-sm"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">تاریخ‌های انتخاب شده:</p>
          <div className="font-semibold">
            {dates && dates.length > 0 ? (
              dates.map((date, index) => (
                <p key={index}>{date.toLocaleDateString("fa-IR")}</p>
              ))
            ) : (
              <p>انتخاب نشده</p>
            )}
          </div>
        </div>
      </div>
    )
  },
}

export const WithoutDropdown: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          captionLayout="label"
          className="rounded-lg border shadow-sm"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">تاریخ انتخاب شده:</p>
          <p className="font-semibold">
            {date ? date.toLocaleDateString("fa-IR") : "انتخاب نشده"}
          </p>
        </div>
      </div>
    )
  },
}

export const TwoMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          className="rounded-lg border shadow-sm"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">تاریخ انتخاب شده:</p>
          <p className="font-semibold">
            {date ? date.toLocaleDateString("fa-IR") : "انتخاب نشده"}
          </p>
        </div>
      </div>
    )
  },
}

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const disabledDays = [
      { from: new Date(2025, 0, 1), to: new Date(2025, 0, 5) },
      new Date(2025, 0, 15),
    ]
    return (
      <div className="flex flex-col gap-4 items-center" dir="rtl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={disabledDays}
          className="rounded-lg border shadow-sm"
        />
        <div className="text-center">
          <p className="text-sm text-gray-600">تاریخ انتخاب شده:</p>
          <p className="font-semibold">
            {date ? date.toLocaleDateString("fa-IR") : "انتخاب نشده"}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            برخی تاریخ‌ها غیرفعال شده‌اند
          </p>
        </div>
      </div>
    )
  },
}

