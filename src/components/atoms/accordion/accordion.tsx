import React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Types and Interfaces
export interface AccordionItem {
  id: string
  title: string
  content: React.ReactNode
  disabled?: boolean
}

interface BaseAccordionProps {
  items: AccordionItem[]
  className?: string
  itemClassName?: string
  triggerClassName?: string
  contentClassName?: string
  showChevron?: boolean
  chevronPosition?: 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'filled'
  icon?: React.ComponentType<{ className?: string }>
  iconClassName?: string
}

export interface AccordionSingleProps extends BaseAccordionProps {
  type?: 'single'
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  collapsible?: boolean
}

export interface AccordionMultipleProps extends BaseAccordionProps {
  type: 'multiple'
  defaultValue?: string[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  collapsible?: boolean
}

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps

// Accordion Root Component
export const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  AccordionProps
>(
  (
    {
      items,
      type = 'single',
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      className,
      itemClassName,
      triggerClassName,
      contentClassName,
      showChevron = true,
      chevronPosition = 'right',
      size = 'md',
      variant = 'default',
      icon: IconComponent = ChevronDownIcon,
      iconClassName,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const variantClasses = {
      default: 'border-0',
      bordered: 'border border-gray-200 rounded-lg',
      filled: 'bg-gray-50 border border-gray-200 rounded-lg'
    }

    const rootClassName = cn(
      'w-full',
      variantClasses[variant],
      className
    )

    // Type-safe props based on accordion type
    const accordionProps = type === 'multiple' 
      ? {
          ref,
          type: 'multiple' as const,
          defaultValue: defaultValue as string[] | undefined,
          value: value as string[] | undefined,
          onValueChange: onValueChange as ((value: string[]) => void) | undefined,
          collapsible,
          className: rootClassName,
          ...props
        }
      : {
          ref,
          type: 'single' as const,
          defaultValue: defaultValue as string | undefined,
          value: value as string | undefined,
          onValueChange: onValueChange as ((value: string) => void) | undefined,
          collapsible,
          className: rootClassName,
          ...props
        }

    return (
      <AccordionPrimitive.Root {...accordionProps}>
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            disabled={item.disabled}
            className={cn(
              'border-b border-gray-200 last:border-b-0',
              itemClassName
            )}
          >
            <AccordionTrigger
              className={cn(
                sizeClasses[size],
                'flex items-center justify-between w-full py-4 px-4 text-left font-medium transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset disabled:opacity-50 disabled:cursor-not-allowed',
                triggerClassName
              )}
              chevronPosition={chevronPosition}
              showChevron={showChevron}
              icon={IconComponent}
              iconClassName={iconClassName}
            >
              {item.title}
            </AccordionTrigger>
            <AccordionContent
              className={cn(
                'overflow-hidden text-gray-600 transition-all',
                'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
                contentClassName
              )}
            >
              <div className="py-4 px-4">
                {item.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionPrimitive.Root>
    )
  }
)

Accordion.displayName = 'Accordion'

// Individual Accordion Item Component
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('', className)}
    {...props}
  />
))

AccordionItem.displayName = 'AccordionItem'

// Accordion Trigger Component
interface AccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  showChevron?: boolean
  chevronPosition?: 'left' | 'right'
  icon?: React.ComponentType<{ className?: string }>
  iconClassName?: string
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, showChevron = true, chevronPosition = 'right', icon: IconComponent = ChevronDownIcon, iconClassName, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between transition-all [&[data-state=open]>svg]:rotate-180',
        chevronPosition === 'left' ? 'flex-row-reverse' : '',
        className
      )}
      {...props}
    >
      {chevronPosition === 'left' && showChevron && (
        <IconComponent className={cn("h-4 w-4 shrink-0 transition-transform duration-200", iconClassName)} />
      )}
      <span className="flex-1">{children}</span>
      {chevronPosition === 'right' && showChevron && (
        <IconComponent className={cn("h-4 w-4 shrink-0 transition-transform duration-200", iconClassName)} />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

// Accordion Content Component
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Export individual components for advanced usage
export { AccordionItem, AccordionTrigger, AccordionContent }

