# Persian Calendar Component (تقویم شمسی)

A beautiful Persian/Jalali calendar component built on top of `react-day-picker/persian`.

## Features

- ✅ **Persian/Jalali Calendar** - Uses the Shamsi calendar system
- ✅ **RTL Support** - Right-to-left layout for Persian text
- ✅ **Multiple Selection Modes** - Single date, date range, or multiple dates
- ✅ **Dropdown Navigation** - Easy month and year selection
- ✅ **Fully Customizable** - Tailwind CSS styling
- ✅ **TypeScript Support** - Full type safety

## Installation

This component uses `react-day-picker` version 9.9.0 or higher. It's already installed in your project.

## Usage

### Single Date Selection

```tsx
import { Calendar } from "@/components/atoms/calendar"
import { useState } from "react"

function MyComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-lg border shadow-sm"
      dir="rtl"
    />
  )
}
```

### Date Range Selection

```tsx
import { Calendar } from "@/components/atoms/calendar"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

function MyComponent() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      className="rounded-lg border shadow-sm"
      dir="rtl"
      numberOfMonths={2}
    />
  )
}
```

### Multiple Dates Selection

```tsx
import { Calendar } from "@/components/atoms/calendar"
import { useState } from "react"

function MyComponent() {
  const [dates, setDates] = useState<Date[] | undefined>([])

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      className="rounded-lg border shadow-sm"
      dir="rtl"
    />
  )
}
```

## Props

The `Calendar` component accepts all props from `react-day-picker`. Here are the most commonly used:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `"single" \| "multiple" \| "range"` | - | Selection mode |
| `selected` | `Date \| Date[] \| DateRange \| undefined` | - | Selected date(s) |
| `onSelect` | `function` | - | Callback when date(s) are selected |
| `dir` | `"rtl" \| "ltr"` | `"ltr"` | Text direction (use `"rtl"` for Persian) |
| `captionLayout` | `"label" \| "dropdown"` | `"dropdown"` | Month/year navigation style |
| `numberOfMonths` | `number` | `1` | Number of months to display |
| `disabled` | `Date[] \| DateRange \| function` | - | Disable specific dates |
| `className` | `string` | - | Additional CSS classes |

## Formatting Dates

To display dates in Persian format:

```tsx
const persianDate = date.toLocaleDateString("fa-IR")
// Output: ۱۴۰۴/۷/۲۱

const persianDateLong = date.toLocaleDateString("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
})
// Output: ۲۱ مهر ۱۴۰۴
```

## Customization

The component uses Tailwind CSS and can be customized by:

1. **Passing custom classNames**: Use the `className` prop
2. **Modifying the component**: Edit `calendar.tsx` to change default styles
3. **Using CSS variables**: Override `--cell-size` and other CSS custom properties

## Examples

Check out the example components in `calendar.example.tsx`:
- `CalendarExample` - Basic single date picker
- `CalendarRangeExample` - Date range picker
- `CalendarMultipleExample` - Multiple date selection

## References

- [React DayPicker Documentation](https://daypicker.dev/)
- [Shadcn/ui Calendar](https://ui.shadcn.com/docs/components/calendar)
- [Persian Calendar in React DayPicker](https://daypicker.dev/guides/localization#persian-calendar)

