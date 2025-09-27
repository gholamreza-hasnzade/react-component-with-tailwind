import React, { useState } from 'react'
import { FullCalendarComponent as FullCalendar } from './fullcalendar'
import type { FullCalendarEvent } from './fullcalendar'
import { ConfirmDialog, Dialog } from '../dialog/dialog'
import { useDialog } from '../dialog/useDialog'

export const FullCalendarExample: React.FC = () => {
  const deleteDialog = useDialog()
  const createDialog = useDialog()
  const [eventToDelete, setEventToDelete] = useState<FullCalendarEvent | null>(null)
  const [newEventData, setNewEventData] = useState<{
    title: string
    start: Date
    end: Date
    allDay: boolean
    status: string
  } | null>(null)
  
  const [events, setEvents] = useState<FullCalendarEvent[]>(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()
    
    return [
      {
        id: '1',
        title: 'جلسه تیم',
        start: new Date(currentYear, currentMonth, 5, 10, 0),
        end: new Date(currentYear, currentMonth, 5, 11, 0),
        description: 'جلسه هفتگی تیم توسعه',
        status: 'meeting'
      },
      {
        id: '2',
        title: 'ارائه پروژه',
        start: new Date(currentYear, currentMonth, 10, 14, 0),
        end: new Date(currentYear, currentMonth, 10, 16, 0),
        description: 'ارائه نهایی پروژه به مشتری',
        status: 'confirmed'
      },
      {
        id: '3',
        title: 'تعطیلات',
        start: new Date(currentYear, currentMonth, 15),
        allDay: true,
        description: 'تعطیلات آخر هفته',
        status: 'holiday'
      },
      {
        id: '4',
        title: 'رویداد فوری',
        start: new Date(currentYear, currentMonth, 20, 9, 0),
        end: new Date(currentYear, currentMonth, 20, 12, 0),
        description: 'رویداد مهم و فوری',
        status: 'urgent'
      },
      {
        id: '5',
        title: 'کار تکمیل شده',
        start: new Date(currentYear, currentMonth, 25, 14, 0),
        end: new Date(currentYear, currentMonth, 25, 16, 0),
        description: 'پروژه تکمیل شده',
        status: 'completed'
      },
      {
        id: '6',
        title: 'رویداد لغو شده',
        start: new Date(currentYear, currentMonth, 28, 10, 0),
        end: new Date(currentYear, currentMonth, 28, 12, 0),
        description: 'رویداد لغو شده',
        status: 'cancelled'
      }
    ]
  })

  const handleDateSelect = (selectInfo: any) => {
    setNewEventData({
      title: '',
      start: selectInfo.start,
      end: selectInfo.end,
      allDay: selectInfo.allDay,
      status: 'pending'
    })
    createDialog.open()
  }

  const handleCreateEvent = () => {
    if (newEventData && newEventData.title.trim()) {
      const newEvent: FullCalendarEvent = {
        id: Date.now().toString(),
        title: newEventData.title,
        start: newEventData.start,
        end: newEventData.end,
        allDay: newEventData.allDay,
        status: newEventData.status
      }
      setEvents([...events, newEvent])
      setNewEventData(null)
      createDialog.close()
    }
  }

  const handleCreateCancel = () => {
    setNewEventData(null)
    createDialog.close()
  }

  const handleEventClick = (clickInfo: any) => {
    console.log('Event clicked:', clickInfo.event.title)
  }

  const handleEditEvent = (event: FullCalendarEvent) => {
    console.log('Edit event:', event)
    // You can open an edit dialog here
    alert(`ویرایش رویداد: ${event.title}`)
  }

  const handleDeleteEvent = (event: FullCalendarEvent) => {
    setEventToDelete(event)
    deleteDialog.open()
  }

  const handleDeleteConfirm = () => {
    if (eventToDelete) {
      setEvents(events.filter(event => event.id !== eventToDelete.id))
      setEventToDelete(null)
      deleteDialog.close()
    }
  }

  const handleDeleteCancel = () => {
    setEventToDelete(null)
    deleteDialog.close()
  }

  const handleEventDrop = (dropInfo: any) => {
    setEvents(events.map(event => 
      event.id === dropInfo.event.id 
        ? { ...event, start: dropInfo.event.start, end: dropInfo.event.end }
        : event
    ))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">نمونه تقویم فارسی</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">راهنمای استفاده:</h2>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>برای ایجاد رویداد جدید، روی تاریخ مورد نظر کلیک کنید</li>
          <li>برای ویرایش یا حذف رویداد، روی آن hover کنید و از دکمه‌های ✏️ و 🗑️ استفاده کنید</li>
          <li>برای جابجایی رویداد، آن را بکشید و رها کنید</li>
          <li>از دکمه‌های ناوبری برای تغییر ماه استفاده کنید</li>
        </ul>
      </div>

      <FullCalendar
        events={events}
        onDateSelect={handleDateSelect}
        onEventClick={handleEventClick}
        onEventDrop={handleEventDrop}
        persianMode={true}
        editable={true}
        selectable={true}
        height={600}
        className="shadow-lg rounded-lg"
        eventActions={{
          onEdit: handleEditEvent,
          onDelete: handleDeleteEvent
        }}
      />

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">رویدادهای فعلی:</h3>
        <div className="space-y-2">
          {events.map(event => {
            const getStatusColor = (status?: string) => {
              switch (status) {
                case 'pending': return 'bg-yellow-100 text-yellow-800'
                case 'confirmed': return 'bg-blue-100 text-blue-800'
                case 'completed': return 'bg-green-100 text-green-800'
                case 'cancelled': return 'bg-red-100 text-red-800'
                case 'urgent': return 'bg-red-200 text-red-900'
                case 'meeting': return 'bg-purple-100 text-purple-800'
                case 'holiday': return 'bg-orange-100 text-orange-800'
                default: return 'bg-gray-100 text-gray-800'
              }
            }
            
            return (
              <div key={event.id} className="flex items-center gap-2 p-2 bg-white rounded">
                <div className={`w-4 h-4 rounded ${getStatusColor(event.status)}`} />
                <span className="font-medium">{event.title}</span>
                <span className="text-sm text-gray-500">
                  {event.start instanceof Date 
                    ? event.start.toLocaleDateString('fa-IR')
                    : new Date(event.start).toLocaleDateString('fa-IR')
                  }
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(event.status)}`}>
                  {event.status || 'بدون وضعیت'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Create Event Dialog */}
      <Dialog
        isOpen={createDialog.isOpen}
        onClose={handleCreateCancel}
        title="ایجاد رویداد جدید"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عنوان رویداد
            </label>
            <input
              type="text"
              value={newEventData?.title || ''}
              onChange={(e) => {
                setNewEventData(prev => prev ? { ...prev, title: e.target.value } : null)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="عنوان رویداد را وارد کنید"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وضعیت رویداد
            </label>
            <select
              value={newEventData?.status || 'pending'}
              onChange={(e) => {
                setNewEventData(prev => prev ? { ...prev, status: e.target.value } : null)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">در انتظار</option>
              <option value="confirmed">تأیید شده</option>
              <option value="completed">تکمیل شده</option>
              <option value="cancelled">لغو شده</option>
              <option value="urgent">فوری</option>
              <option value="meeting">جلسه</option>
              <option value="holiday">تعطیلات</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-600">
            <p><strong>تاریخ شروع:</strong> {newEventData?.start.toLocaleDateString('fa-IR')}</p>
            <p><strong>تاریخ پایان:</strong> {newEventData?.end.toLocaleDateString('fa-IR')}</p>
            {newEventData?.allDay && <p><strong>تمام روز:</strong> بله</p>}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={handleCreateCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              لغو
            </button>
            <button
              onClick={handleCreateEvent}
              disabled={!newEventData?.title.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              ایجاد رویداد
            </button>
          </div>
        </div>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="حذف رویداد"
        message={`آیا می‌خواهید رویداد "${eventToDelete?.title}" را حذف کنید؟`}
        confirmText="حذف"
        cancelText="لغو"
        confirmVariant="danger"
      />
    </div>
  )
}

export default FullCalendarExample
