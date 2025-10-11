"use client"

import * as React from "react"
import { DatePicker } from "./datePicker"

export function DateFormatExamples() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="p-8 space-y-8" dir="rtl">
      <h1 className="text-2xl font-bold">فرمت‌های مختلف نمایش تاریخ</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Persian Short */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت کوتاه فارسی (fa-short)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="fa-short"
            placeholder="۱۴۰۴/۷/۲۱"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("fa-IR")}
          </p>
        </div>

        {/* Persian Medium */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت متوسط فارسی (fa-medium)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="fa-medium"
            placeholder="۲۱ مهر ۱۴۰۴"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("fa-IR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Persian Long */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت بلند فارسی (fa-long)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="fa-long"
            placeholder="شنبه، ۲۱ مهر ۱۴۰۴"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("fa-IR", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* English Short */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت کوتاه انگلیسی (en-short)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="en-short"
            placeholder="10/11/2025"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("en-US")}
          </p>
        </div>

        {/* English Medium */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت متوسط انگلیسی (en-medium)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="en-medium"
            placeholder="Oct 11, 2025"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* English Long */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت بلند انگلیسی (en-long)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="en-long"
            placeholder="Saturday, October 11, 2025"
          />
          <p className="text-xs text-gray-500">
            نمایش: {date?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* ISO Format */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت ISO (iso)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="iso"
            placeholder="2025-10-11"
          />
          <p className="text-xs text-gray-500">
            نمایش: YYYY-MM-DD
          </p>
        </div>

        {/* Custom Format */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            فرمت سفارشی (custom)
          </label>
          <DatePicker
            selected={date}
            onSelect={setDate}
            format="custom"
            customFormat={(date) => {
              const day = date.getDate()
              const month = date.toLocaleDateString("fa-IR", { month: "long" })
              const year = date.toLocaleDateString("fa-IR", { year: "numeric" })
              return `روز ${day} ${month} سال ${year}`
            }}
            placeholder="روز ۲۱ مهر سال ۱۴۰۴"
          />
          <p className="text-xs text-gray-500">
            فرمت دلخواه شما
          </p>
        </div>
      </div>

      {/* Custom Format Examples */}
      <div className="mt-8 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">مثال‌های فرمت سفارشی</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Only Day and Month */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              فقط روز و ماه
            </label>
            <DatePicker
              selected={date}
              onSelect={setDate}
              format="custom"
              customFormat={(date) => 
                date.toLocaleDateString("fa-IR", {
                  month: "long",
                  day: "numeric",
                })
              }
              placeholder="۲۱ مهر"
            />
          </div>

          {/* Slash separated */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              فرمت با اسلش
            </label>
            <DatePicker
              selected={date}
              onSelect={setDate}
              format="custom"
              customFormat={(date) => {
                const year = date.toLocaleDateString("fa-IR", { year: "numeric" })
                const month = String(date.getMonth() + 1).padStart(2, '0')
                const day = String(date.getDate()).padStart(2, '0')
                return `${year}/${month}/${day}`
              }}
              placeholder="۱۴۰۴/۰۷/۲۱"
            />
          </div>

          {/* With Text */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              با متن توضیحی
            </label>
            <DatePicker
              selected={date}
              onSelect={setDate}
              format="custom"
              customFormat={(date) => {
                const weekday = date.toLocaleDateString("fa-IR", { weekday: "long" })
                const day = date.toLocaleDateString("fa-IR", { day: "numeric" })
                const month = date.toLocaleDateString("fa-IR", { month: "long" })
                return `${weekday} - ${day} ${month}`
              }}
              placeholder="شنبه - ۲۱ مهر"
            />
          </div>

          {/* Timestamp */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              تایم‌استمپ
            </label>
            <DatePicker
              selected={date}
              onSelect={setDate}
              format="custom"
              customFormat={(date) => String(date.getTime())}
              placeholder="1728648000000"
            />
          </div>
        </div>
      </div>

      {/* Selected Date Info */}
      {date && (
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold mb-4">تاریخ انتخاب شده در فرمت‌های مختلف:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>فارسی کوتاه:</strong> {date.toLocaleDateString("fa-IR")}
            </div>
            <div>
              <strong>فارسی بلند:</strong> {date.toLocaleDateString("fa-IR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div>
              <strong>انگلیسی:</strong> {date.toLocaleDateString("en-US")}
            </div>
            <div>
              <strong>ISO:</strong> {date.toISOString().split('T')[0]}
            </div>
            <div>
              <strong>Timestamp:</strong> {date.getTime()}
            </div>
            <div>
              <strong>Year/Month/Day:</strong> {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DateFormatExamples

