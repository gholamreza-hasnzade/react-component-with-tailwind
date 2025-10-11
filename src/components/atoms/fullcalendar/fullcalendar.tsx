import React, { useRef, useEffect, useState, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventInput, DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core'
import { cn } from '@/lib/utils'

// Custom Persian locale for FullCalendar
import { createLocale } from '@fullcalendar/core'

const customPersianLocale = createLocale({
  code: 'fa-custom',
  week: {
    dow: 6, // Saturday is the first day of the week
    doy: 12 // The week that contains Jan 12th is the first week of the year
  },
  buttonText: {
    prev: 'قبلی',
    next: 'بعدی',
    today: 'امروز',
    month: 'ماه',
    week: 'هفته',
    day: 'روز',
    list: 'لیست'
  },
  weekText: 'هفته',
  allDayText: 'تمام روز',
  moreLinkText: 'بیشتر',
  noEventsText: 'رویدادی وجود ندارد',
  monthNames: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],
  monthNamesShort: [
    'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
    'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
  ],
  dayNames: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
  dayNamesShort: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
  dayNamesMin: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
})
const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
]

const PERSIAN_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج']
const PERSIAN_WEEKDAYS_LONG = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه']


export interface FullCalendarEvent {
  id: string
  title: string
  start: Date | string
  end?: Date | string
  allDay?: boolean
  color?: string
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  description?: string
  extendedProps?: Record<string, unknown>
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'urgent' | 'meeting' | 'holiday'
}

export interface EventActionHandlers {
  onEdit?: (event: FullCalendarEvent) => void
  onDelete?: (event: FullCalendarEvent) => void
}

export interface FullCalendarProps {
  events?: FullCalendarEvent[]
  onDateSelect?: (selectInfo: DateSelectArg) => void
  onEventClick?: (clickInfo: EventClickArg) => void
  onEventDrop?: (dropInfo: EventDropArg) => void
  onEventResize?: (resizeInfo: { event: unknown; startDelta: unknown; endDelta: unknown }) => void
  persianMode?: boolean
  className?: string
  height?: string | number
  editable?: boolean
  selectable?: boolean
  selectMirror?: boolean
  dayMaxEvents?: boolean | number
  weekends?: boolean
  initialView?: 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'
  headerToolbar?: {
    left?: string
    center?: string
    right?: string
  }
  locale?: string
  direction?: 'ltr' | 'rtl'
  firstDay?: number
  showTodayButton?: boolean
  showWeekends?: boolean
  hiddenDays?: number[]
  slotMinTime?: string
  slotMaxTime?: string
  businessHours?: boolean | object
  nowIndicator?: boolean
  scrollTime?: string
  aspectRatio?: number
  handleWindowResize?: boolean
  windowResizeDelay?: number
  eventActions?: EventActionHandlers
}

export const FullCalendarComponent: React.FC<FullCalendarProps> = ({
  events = [],
  onDateSelect,
  onEventClick,
  onEventDrop,
  onEventResize,
  persianMode = true,
  className = '',
  height = 'auto',
  editable = true,
  selectable = true,
  selectMirror = true,
  dayMaxEvents = true,
  weekends = true,
  hiddenDays,
  initialView = 'dayGridMonth',
  headerToolbar = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  locale = 'fa',
  direction = 'rtl',
  firstDay = 6,
  slotMinTime = '00:00:00',
  slotMaxTime = '24:00:00',
  businessHours = false,
  nowIndicator = true,
  scrollTime = '08:00:00',
  aspectRatio = 1.35,
  handleWindowResize = true,
  windowResizeDelay = 100,
  eventActions
}) => {
  const calendarRef = useRef<FullCalendar>(null)
  const [currentEvents, setCurrentEvents] = useState<EventInput[]>([])

  const getStatusStyles = useCallback((status?: string) => {
    switch (status) {
      case 'pending':
        return {
          bgClass: 'bg-yellow-100',
          hoverBgClass: 'hover:bg-yellow-200',
          textClass: 'text-yellow-800'
        }
      case 'confirmed':
        return {
          bgClass: 'bg-blue-100',
          hoverBgClass: 'hover:bg-blue-200',
          textClass: 'text-blue-800'
        }
      case 'completed':
        return {
          bgClass: 'bg-green-100',
          hoverBgClass: 'hover:bg-green-200',
          textClass: 'text-green-800'
        }
      case 'cancelled':
        return {
          bgClass: 'bg-red-100',
          hoverBgClass: 'hover:bg-red-200',
          textClass: 'text-red-800'
        }
      case 'urgent':
        return {
          bgClass: 'bg-red-200',
          hoverBgClass: 'hover:bg-red-300',
          textClass: 'text-red-900'
        }
      case 'meeting':
        return {
          bgClass: 'bg-purple-100',
          hoverBgClass: 'hover:bg-purple-200',
          textClass: 'text-purple-800'
        }
      case 'holiday':
        return {
          bgClass: 'bg-orange-100',
          hoverBgClass: 'hover:bg-orange-200',
          textClass: 'text-orange-800'
        }
      default:
        return {
          bgClass: 'bg-gray-100',
          hoverBgClass: 'hover:bg-gray-200',
          textClass: 'text-gray-800'
        }
    }
  }, [])

  const convertEvents = useCallback((events: FullCalendarEvent[]): EventInput[] => {
    return events.map(event => {
      const statusStyles = getStatusStyles(event.status)
      return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        color: event.color,
        backgroundColor: event.backgroundColor,
        borderColor: event.borderColor,
        textColor: event.textColor,
        extendedProps: {
          description: event.description,
          status: event.status,
          ...statusStyles,
          ...event.extendedProps
        }
      }
    })
  }, [getStatusStyles])

  useEffect(() => {
    const convertedEvents = convertEvents(events)
    setCurrentEvents(convertedEvents)
  }, [events, convertEvents])

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    if (onDateSelect) {
      onDateSelect(selectInfo)
    }
  }, [onDateSelect])

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    if (onEventClick) {
      onEventClick(clickInfo)
    }
  }, [onEventClick])

  const handleEventDrop = useCallback((dropInfo: EventDropArg) => {
    if (onEventDrop) {
      onEventDrop(dropInfo)
    }
  }, [onEventDrop])

  const handleEventResize = useCallback((resizeInfo: { event: unknown; startDelta: unknown; endDelta: unknown }) => {
    if (onEventResize) {
      onEventResize(resizeInfo)
    }
  }, [onEventResize])

  const customHeaderToolbar = persianMode ? {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  } : headerToolbar

  const customButtonText = persianMode ? {
    prev: 'قبلی',
    next: 'بعدی',
    today: 'امروز',
    month: 'ماه',
    week: 'هفته',
    day: 'روز',
    list: 'لیست'
  } : undefined

  return (
    <div 
      className={cn(
        'fullcalendar-container bg-white rounded-lg shadow-lg border border-gray-200',
        persianMode && 'persian-calendar',
        className
      )}
      dir={persianMode ? 'rtl' : 'ltr'}
    >
      <style>{`
        /* Override FullCalendar default event styles */
        .fc-event {
          border: none !important;
          background: transparent !important;
          color: inherit !important;
        }
        
        .fc-event:hover {
          opacity: 1 !important;
        }
        
        /* Status-based event styling */
        .fc-event-yellow {
          background: #fef3c7 !important;
          color: #92400e !important;
          border: 1px solid #f59e0b !important;
        }
        
        .fc-event-yellow:hover {
          background: #fde68a !important;
          border-color: #d97706 !important;
        }
        
        .fc-event-blue {
          background: #dbeafe !important;
          color: #1e40af !important;
          border: 1px solid #3b82f6 !important;
        }
        
        .fc-event-blue:hover {
          background: #bfdbfe !important;
          border-color: #2563eb !important;
        }
        
        .fc-event-green {
          background: #d1fae5 !important;
          color: #065f46 !important;
          border: 1px solid #10b981 !important;
        }
        
        .fc-event-green:hover {
          background: #a7f3d0 !important;
          border-color: #059669 !important;
        }
        
        .fc-event-red {
          background: #fee2e2 !important;
          color: #991b1b !important;
          border: 1px solid #ef4444 !important;
        }
        
        .fc-event-red:hover {
          background: #fecaca !important;
          border-color: #dc2626 !important;
        }
        
        .fc-event-urgent {
          background: #fecaca !important;
          color: #7f1d1d !important;
          border: 2px solid #dc2626 !important;
          font-weight: 600 !important;
        }
        
        .fc-event-urgent:hover {
          background: #fca5a5 !important;
          border-color: #b91c1c !important;
        }
        
        .fc-event-purple {
          background: #e9d5ff !important;
          color: #6b21a8 !important;
          border: 1px solid #8b5cf6 !important;
        }
        
        .fc-event-purple:hover {
          background: #ddd6fe !important;
          border-color: #7c3aed !important;
        }
        
        .fc-event-orange {
          background: #fed7aa !important;
          color: #9a3412 !important;
          border: 1px solid #f97316 !important;
        }
        
        .fc-event-orange:hover {
          background: #fdba74 !important;
          border-color: #ea580c !important;
        }
        
        .fc-event-gray {
          background: #f3f4f6 !important;
          color: #374151 !important;
          border: 1px solid #9ca3af !important;
        }
        
        .fc-event-gray:hover {
          background: #e5e7eb !important;
          border-color: #6b7280 !important;
        }
        
        /* Day view specific styling */
        .fc-timegrid-event {
          border-radius: 6px !important;
          margin: 1px !important;
        }
        
        .fc-daygrid-event {
          border-radius: 4px !important;
          margin: 1px !important;
        }
        
        /* Override event content styling */
        .fc-event .fc-event-main {
          padding: 0 !important;
        }
        
        .fc-event .fc-event-title {
          font-weight: 500 !important;
        }
      `}</style>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={customHeaderToolbar}
        buttonText={customButtonText}
        initialView={initialView}
        editable={editable}
        selectable={selectable}
        selectMirror={selectMirror}
        dayMaxEvents={dayMaxEvents}
        weekends={weekends}
        hiddenDays={hiddenDays}
        events={currentEvents}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height={height}
        locale={persianMode ? 'fa' : locale}
        direction={persianMode ? 'rtl' : direction}
        firstDay={persianMode ? 6 : (firstDay || 0)}
        slotMinTime={slotMinTime}
        slotMaxTime={slotMaxTime}
        businessHours={businessHours}
        nowIndicator={nowIndicator}
        scrollTime={scrollTime}
        aspectRatio={aspectRatio}
        handleWindowResize={handleWindowResize}
        windowResizeDelay={windowResizeDelay}
        {...(persianMode && {
          monthNames: PERSIAN_MONTHS,
          monthNamesShort: PERSIAN_MONTHS,
          dayNames: PERSIAN_WEEKDAYS_LONG,
          dayNamesShort: PERSIAN_WEEKDAYS,
          dayNamesMin: PERSIAN_WEEKDAYS,
          weekText: 'هفته',
          allDayText: 'تمام روز',
          moreLinkText: 'بیشتر',
          noEventsText: 'رویدادی وجود ندارد',
          firstDay: 6, 
          lastDay: 5,
          
        })}
        dayCellClassNames={(dateInfo) => {
          if (persianMode && dateInfo.date.getDay() === 5) {
            return 'bg-gray-100 hover:bg-gray-200 transition-colors duration-200'
          }
          return 'hover:bg-gray-50 transition-colors duration-200'
        }}
        eventContent={(eventInfo) => {
          const status = eventInfo.event.extendedProps.status
          const getStatusStyles = (status?: string) => {
            switch (status) {
              case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
              case 'confirmed': return 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              case 'completed': return 'bg-green-100 text-green-800 hover:bg-green-200'
              case 'cancelled': return 'bg-red-100 text-red-800 hover:bg-red-200'
              case 'urgent': return 'bg-red-200 text-red-900 hover:bg-red-300'
              case 'meeting': return 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              case 'holiday': return 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }
          }
          
          return (
            <div className={`p-1 text-xs rounded-md shadow-sm transition-colors duration-200 ${getStatusStyles(status)} group relative`}>
              <div className="font-medium truncate pr-6">{eventInfo.event.title}</div>
              {eventInfo.event.extendedProps.description && (
                <div className="text-gray-600 truncate text-xs mt-0.5 pr-6">
                  {eventInfo.event.extendedProps.description}
                </div>
              )}
              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 p-1">
                <button
                  className="w-4 h-4 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (eventActions?.onEdit) {
                      const originalEvent = events.find(e => e.id === eventInfo.event.id)
                      if (originalEvent) {
                        eventActions.onEdit(originalEvent)
                      }
                    }
                  }}
                  title="ویرایش"
                >
                  ✏️
                </button>
                <button
                  className="w-4 h-4 bg-red-500 hover:bg-red-600 text-white rounded text-xs flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (eventActions?.onDelete) {
                      const originalEvent = events.find(e => e.id === eventInfo.event.id)
                      if (originalEvent) {
                        eventActions.onDelete(originalEvent)
                      }
                    }
                  }}
                  title="حذف"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        }}
        eventClassNames={(eventInfo) => {
          const status = eventInfo.event.extendedProps.status
          const getStatusStyles = (status?: string) => {
            switch (status) {
              case 'pending': return 'fc-event-yellow cursor-pointer'
              case 'confirmed': return 'fc-event-blue cursor-pointer'
              case 'completed': return 'fc-event-green cursor-pointer'
              case 'cancelled': return 'fc-event-red cursor-pointer'
              case 'urgent': return 'fc-event-urgent cursor-pointer'
              case 'meeting': return 'fc-event-purple cursor-pointer'
              case 'holiday': return 'fc-event-orange cursor-pointer'
              default: return 'fc-event-gray cursor-pointer'
            }
          }
          return getStatusStyles(status)
        }}
      />
    </div>
  )
}

export default FullCalendarComponent