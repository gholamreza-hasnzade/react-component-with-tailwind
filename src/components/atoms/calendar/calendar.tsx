import React, { useState, useCallback, useMemo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

// Types
export interface CalendarEvent {
  id: string
  title: string
  date: Date
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'indigo' | 'gray'
  allDay?: boolean
  description?: string
  startTime?: string
  endTime?: string
}

export interface CalendarProps {
  events?: CalendarEvent[]
  onDateClick?: (date: Date) => void
  onEventClick?: (event: CalendarEvent) => void
  onEventDrop?: (event: CalendarEvent, newDate: Date) => void
  onEventUpdate?: (event: CalendarEvent) => void
  onEventCreate?: (event: Omit<CalendarEvent, 'id'>) => void
  persianMode?: boolean
  className?: string
  height?: string
  editable?: boolean
  showTodayButton?: boolean
  showEventCount?: boolean
}

// Persian calendar utilities
const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]

const PERSIAN_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
const GREGORIAN_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Color configurations
const EVENT_COLORS = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
  green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
  red: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
  purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200',
  pink: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200',
  gray: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
} as const

// Persian date conversion utilities
const toPersianDate = (date: Date) => {
  // Simple Persian date conversion (approximate)
  const gregorianYear = date.getFullYear()
  const gregorianMonth = date.getMonth() + 1
  const gregorianDay = date.getDate()
  
  // Convert to Persian date (approximation)
  const persianYear = gregorianYear - 621
  const persianMonth = Math.floor((gregorianMonth - 1) * 0.97) + 1
  const persianDay = Math.floor(gregorianDay * 0.97) + 1
  
  return {
    year: persianYear,
    month: Math.max(1, Math.min(12, persianMonth)),
    day: Math.max(1, Math.min(31, persianDay)),
    weekday: date.getDay()
  }
}

const fromPersianDate = (year: number, month: number, day: number): Date => {
  // Convert Persian date to Gregorian (approximation)
  const gregorianYear = year + 621
  const gregorianMonth = Math.floor((month - 1) / 0.97) + 1
  const gregorianDay = Math.floor((day - 1) / 0.97) + 1
  
  return new Date(gregorianYear, gregorianMonth - 1, gregorianDay)
}

const getDaysInMonth = (year: number, month: number, isPersian: boolean): number => {
  if (isPersian) {
    // Persian calendar days
    const persianDays = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
    return persianDays[month - 1] || 30
  } else {
    // Gregorian calendar days
    return new Date(year, month, 0).getDate()
  }
}

// Event Edit Modal Component
interface EventEditModalProps {
  event: CalendarEvent | null
  isOpen: boolean
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete: (eventId: string) => void
  persianMode: boolean
}

const EventEditModal: React.FC<EventEditModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
  onDelete,
  persianMode
}) => {
  const [formData, setFormData] = useState<CalendarEvent>({
    id: '',
    title: '',
    date: new Date(),
    color: 'blue',
    description: '',
    allDay: true
  })

  React.useEffect(() => {
    if (event) {
      setFormData({
        ...event,
        date: new Date(event.date)
      })
    }
  }, [event])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }, [formData, onSave, onClose])

  const handleDelete = useCallback(() => {
    if (event) {
      onDelete(event.id)
      onClose()
    }
  }, [event, onDelete, onClose])

  if (!isOpen || !event) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">
          {persianMode ? 'ویرایش رویداد' : 'Edit Event'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {persianMode ? 'عنوان' : 'Title'}
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={persianMode ? 'عنوان رویداد' : 'Event title'}
              aria-label={persianMode ? 'عنوان رویداد' : 'Event title'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {persianMode ? 'رنگ' : 'Color'}
            </label>
            <select
              value={formData.color}
              onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value as CalendarEvent['color'] }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={persianMode ? 'رنگ رویداد' : 'Event color'}
            >
              {Object.entries(EVENT_COLORS).map(([color]) => (
                <option key={color} value={color}>
                  {persianMode ? 
                    { blue: 'آبی', green: 'سبز', red: 'قرمز', yellow: 'زرد', purple: 'بنفش', pink: 'صورتی', indigo: 'نیلی', gray: 'خاکستری' }[color] :
                    color.charAt(0).toUpperCase() + color.slice(1)
                  }
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {persianMode ? 'توضیحات' : 'Description'}
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={persianMode ? 'توضیحات رویداد' : 'Event description'}
              aria-label={persianMode ? 'توضیحات رویداد' : 'Event description'}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {persianMode ? 'ذخیره' : 'Save'}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              {persianMode ? 'حذف' : 'Delete'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
            >
              {persianMode ? 'لغو' : 'Cancel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// Main Calendar Component
export const Calendar: React.FC<CalendarProps> = ({
  events = [],
  onDateClick,
  onEventClick,
  onEventDrop,
  onEventUpdate,
  onEventCreate,
  persianMode = true,
  className = '',
  height = '600px',
  editable = true,
  showTodayButton = true,
  showEventCount = true
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null)
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null)
  const [dragOverDate, setDragOverDate] = useState<Date | null>(null)

  // Get calendar data for current month
  const calendarData = useMemo(() => {
    const now = new Date()
    const current = persianMode ? toPersianDate(currentDate) : {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate(),
      weekday: currentDate.getDay()
    }

    const year = current.year
    const month = current.month
    
    // Get first day of month
    const firstDay = persianMode ? 
      fromPersianDate(year, month, 1) : 
      new Date(year, month - 1, 1)
    
    const firstDayWeekday = firstDay.getDay()
    const daysInMonth = getDaysInMonth(year, month, persianMode)
    
    const days = []
    
    // Previous month days
    const prevMonth = month === 1 ? 12 : month - 1
    const prevYear = month === 1 ? year - 1 : year
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth, persianMode)
    
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      const date = persianMode ? 
        fromPersianDate(prevYear, prevMonth, day) :
        new Date(prevYear, prevMonth - 1, day)
      
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: date.toDateString() === now.toDateString()
      })
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = persianMode ? 
        fromPersianDate(year, month, day) :
        new Date(year, month - 1, day)
      
      days.push({
        day,
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === now.toDateString()
      })
    }
    
    // Next month days
    const totalCells = 42 // 6 weeks
    const remainingDays = totalCells - days.length
    const nextMonth = month === 12 ? 1 : month + 1
    const nextYear = month === 12 ? year + 1 : year
    
    for (let day = 1; day <= remainingDays; day++) {
      const date = persianMode ? 
        fromPersianDate(nextYear, nextMonth, day) :
        new Date(nextYear, nextMonth - 1, day)
      
      days.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: date.toDateString() === now.toDateString()
      })
    }
    
    return days
  }, [currentDate, persianMode])

  // Get events for a specific date
  const getEventsForDate = useCallback((date: Date): CalendarEvent[] => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }, [events])

  // Navigation functions
  const goToPreviousMonth = useCallback(() => {
    setCurrentDate(prev => {
      const current = persianMode ? toPersianDate(prev) : {
        year: prev.getFullYear(),
        month: prev.getMonth() + 1
      }
      
      if (current.month === 1) {
        return persianMode ? 
          fromPersianDate(current.year - 1, 12, 1) :
          new Date(current.year - 1, 11, 1)
      } else {
        return persianMode ? 
          fromPersianDate(current.year, current.month - 1, 1) :
          new Date(current.year, current.month - 2, 1)
      }
    })
  }, [persianMode])

  const goToNextMonth = useCallback(() => {
    setCurrentDate(prev => {
      const current = persianMode ? toPersianDate(prev) : {
        year: prev.getFullYear(),
        month: prev.getMonth() + 1
      }
      
      if (current.month === 12) {
        return persianMode ? 
          fromPersianDate(current.year + 1, 1, 1) :
          new Date(current.year + 1, 0, 1)
      } else {
        return persianMode ? 
          fromPersianDate(current.year, current.month + 1, 1) :
          new Date(current.year, current.month, 1)
      }
    })
  }, [persianMode])

  const goToToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  // Event handlers
  const handleEventClick = useCallback((event: CalendarEvent, e: React.MouseEvent) => {
    e.stopPropagation()
    if (editable) {
      setEditingEvent(event)
    } else if (onEventClick) {
      onEventClick(event)
    }
  }, [editable, onEventClick])

  const handleEventSave = useCallback((updatedEvent: CalendarEvent) => {
    if (onEventUpdate) {
      onEventUpdate(updatedEvent)
    }
  }, [onEventUpdate])

  const handleEventDelete = useCallback((eventId: string) => {
    if (onEventUpdate) {
      const eventToDelete = events.find(e => e.id === eventId)
      if (eventToDelete) {
        onEventUpdate({ ...eventToDelete, id: `deleted_${eventId}` })
      }
    }
  }, [events, onEventUpdate])

  const handleDateClick = useCallback((dayData: { day: number; date: Date; isCurrentMonth: boolean }) => {
    if (onDateClick) {
      onDateClick(dayData.date)
    } else if (onEventCreate && editable && dayData.isCurrentMonth) {
      const newEvent: Omit<CalendarEvent, 'id'> = {
        title: persianMode ? 'رویداد جدید' : 'New Event',
        date: dayData.date,
        color: 'blue',
        description: '',
        allDay: true
      }
      onEventCreate(newEvent)
    }
  }, [onDateClick, onEventCreate, editable, persianMode])

  const handleEventDragStart = useCallback((event: CalendarEvent, e: React.DragEvent) => {
    if (!editable) return
    e.dataTransfer.setData('text/plain', event.id)
    e.dataTransfer.effectAllowed = 'move'
    setDraggedEvent(event)
  }, [editable])

  const handleEventDragEnd = useCallback(() => {
    setDraggedEvent(null)
    setDragOverDate(null)
  }, [])

  const handleDateDragOver = useCallback((date: Date, e: React.DragEvent) => {
    if (!editable) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverDate(date)
  }, [editable])

  const handleDateDrop = useCallback((date: Date, e: React.DragEvent) => {
    if (!editable || !draggedEvent) return
    e.preventDefault()
    
    if (onEventDrop) {
      onEventDrop(draggedEvent, date)
    }
    
    setDraggedEvent(null)
    setDragOverDate(null)
  }, [editable, draggedEvent, onEventDrop])

  // Get current month display info
  const currentMonthInfo = useMemo(() => {
    const current = persianMode ? toPersianDate(currentDate) : {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1
    }
    
    return {
      year: current.year,
      month: current.month,
      monthName: persianMode ? PERSIAN_MONTHS[current.month - 1] : 
        currentDate.toLocaleDateString('en-US', { month: 'long' })
    }
  }, [currentDate, persianMode])

  const weekdays = persianMode ? PERSIAN_WEEKDAYS : GREGORIAN_WEEKDAYS

  return (
    <div 
      className={cn(
        'bg-white rounded-lg shadow-lg border border-gray-200',
        className
      )}
      style={{ height } as React.CSSProperties}
      dir={persianMode ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={goToPreviousMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={persianMode ? 'ماه قبل' : 'Previous Month'}
          >
            <ChevronLeftIcon className={cn('w-5 h-5', persianMode && 'rotate-180')} />
          </button>
          
          <button
            onClick={goToNextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={persianMode ? 'ماه بعد' : 'Next Month'}
          >
            <ChevronRightIcon className={cn('w-5 h-5', persianMode && 'rotate-180')} />
          </button>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentMonthInfo.monthName} {currentMonthInfo.year}
          </h2>
        </div>

        {showTodayButton && (
          <button
            onClick={goToToday}
            className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
          >
            {persianMode ? 'امروز' : 'Today'}
          </button>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Week Days Header */}
        <div className="grid grid-cols-7 gap-px mb-2">
          {weekdays.map((day, index) => (
            <div 
              key={index}
              className="text-center py-3 text-sm font-medium text-gray-500 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {calendarData.map((dayData, index) => {
            const dayEvents = getEventsForDate(dayData.date)
            
            return (
              <div
                key={index}
                className={cn(
                  'min-h-[120px] p-2 bg-white cursor-pointer transition-colors',
                  'hover:bg-gray-50 border border-gray-100',
                  !dayData.isCurrentMonth && 'text-gray-400',
                  dayData.isToday && 'bg-blue-50 border-blue-200',
                  dragOverDate?.toDateString() === dayData.date.toDateString() && 'bg-green-100 border-green-300'
                )}
                onClick={() => handleDateClick(dayData)}
                onDragOver={(e) => handleDateDragOver(dayData.date, e)}
                onDrop={(e) => handleDateDrop(dayData.date, e)}
              >
                <div className="flex flex-col h-full">
                  {/* Day Number */}
                  <div className={cn(
                    'text-sm font-medium mb-1',
                    dayData.isToday && 'text-blue-600 font-bold'
                  )}>
                    {dayData.day}
                  </div>

                  {/* Events */}
                  <div className="flex-1 space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className={cn(
                          'text-xs p-1 rounded border cursor-pointer transition-colors',
                          EVENT_COLORS[event.color || 'blue'],
                          editable && 'cursor-move',
                          draggedEvent?.id === event.id && 'opacity-50'
                        )}
                        onClick={(e) => handleEventClick(event, e)}
                        onDragStart={(e) => handleEventDragStart(event, e)}
                        onDragEnd={handleEventDragEnd}
                        draggable={editable}
                        title={event.description}
                      >
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                    
                    {showEventCount && dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayEvents.length - 3} {persianMode ? 'بیشتر' : 'more'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Edit Modal */}
      <EventEditModal
        event={editingEvent}
        isOpen={!!editingEvent}
        onClose={() => setEditingEvent(null)}
        onSave={handleEventSave}
        onDelete={handleEventDelete}
        persianMode={persianMode}
      />
    </div>
  )
}

export default Calendar
