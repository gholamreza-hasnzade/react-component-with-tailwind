import type { Meta, StoryObj } from '@storybook/react-vite'
import { FullCalendarComponent as FullCalendar } from './fullcalendar'
import type { FullCalendarEvent } from './fullcalendar'

const meta: Meta<typeof FullCalendar> = {
  title: 'Atoms/FullCalendar',
  component: FullCalendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive FullCalendar component with Persian date support and RTL layout.'
      }
    }
  },
  argTypes: {
    persianMode: {
      control: 'boolean',
      description: 'Enable Persian calendar mode with RTL layout'
    },
    editable: {
      control: 'boolean',
      description: 'Allow events to be edited, dragged, and resized'
    },
    selectable: {
      control: 'boolean',
      description: 'Allow date selection for creating new events'
    },
    height: {
      control: 'text',
      description: 'Height of the calendar'
    },
    initialView: {
      control: 'select',
      options: ['dayGridMonth', 'timeGridWeek', 'timeGridDay', 'listWeek'],
      description: 'Initial view of the calendar'
    }
  }
}

export default meta
type Story = StoryObj<typeof FullCalendar>

const sampleEvents: FullCalendarEvent[] = [
  {
    id: '1',
    title: 'جلسه تیم',
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 0),
    color: '#3b82f6',
    description: 'جلسه هفتگی تیم توسعه'
  },
  {
    id: '2',
    title: 'ارائه پروژه',
    start: new Date(2024, 0, 20, 14, 0),
    end: new Date(2024, 0, 20, 16, 0),
    color: '#10b981',
    description: 'ارائه نهایی پروژه به مشتری'
  },
  {
    id: '3',
    title: 'تعطیلات',
    start: new Date(2024, 0, 25),
    allDay: true,
    color: '#f59e0b',
    description: 'تعطیلات آخر هفته'
  },
  {
    id: '4',
    title: 'کارگاه آموزشی',
    start: new Date(2024, 0, 28, 9, 0),
    end: new Date(2024, 0, 28, 17, 0),
    color: '#8b5cf6',
    description: 'کارگاه آموزش React و TypeScript'
  }
]

export const Default: Story = {
  args: {
    events: sampleEvents,
    persianMode: true,
    editable: true,
    selectable: true,
    height: 600
  }
}

export const English: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'Team Meeting',
        start: new Date(2024, 0, 15, 10, 0),
        end: new Date(2024, 0, 15, 11, 0),
        color: '#3b82f6',
        description: 'Weekly team development meeting'
      },
      {
        id: '2',
        title: 'Project Presentation',
        start: new Date(2024, 0, 20, 14, 0),
        end: new Date(2024, 0, 20, 16, 0),
        color: '#10b981',
        description: 'Final project presentation to client'
      }
    ],
    persianMode: false,
    editable: true,
    selectable: true,
    height: 600
  }
}

export const ReadOnly: Story = {
  args: {
    events: sampleEvents,
    persianMode: true,
    editable: false,
    selectable: false,
    height: 500
  }
}

export const WeekView: Story = {
  args: {
    events: sampleEvents,
    persianMode: true,
    editable: true,
    selectable: true,
    initialView: 'timeGridWeek',
    height: 600
  }
}

export const DayView: Story = {
  args: {
    events: sampleEvents,
    persianMode: true,
    editable: true,
    selectable: true,
    initialView: 'timeGridDay',
    height: 600
  }
}

export const CustomColors: Story = {
  args: {
    events: [
      {
        id: '1',
        title: 'رویداد آبی',
        start: new Date(2024, 0, 15, 10, 0),
        end: new Date(2024, 0, 15, 11, 0),
        color: '#3b82f6',
        backgroundColor: '#dbeafe',
        borderColor: '#3b82f6',
        textColor: '#1e40af'
      },
      {
        id: '2',
        title: 'رویداد سبز',
        start: new Date(2024, 0, 16, 14, 0),
        end: new Date(2024, 0, 16, 16, 0),
        color: '#10b981',
        backgroundColor: '#d1fae5',
        borderColor: '#10b981',
        textColor: '#065f46'
      },
      {
        id: '3',
        title: 'رویداد قرمز',
        start: new Date(2024, 0, 17, 9, 0),
        end: new Date(2024, 0, 17, 12, 0),
        color: '#ef4444',
        backgroundColor: '#fee2e2',
        borderColor: '#ef4444',
        textColor: '#991b1b'
      }
    ],
    persianMode: true,
    editable: true,
    selectable: true,
    height: 600
  }
}
