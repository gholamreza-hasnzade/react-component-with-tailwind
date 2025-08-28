import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon, ChevronRightIcon, PlusIcon, MinusIcon, Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

// Icon variants for different accordion styles
const iconVariants = {
  chevron: {
    closed: ChevronRightIcon,
    open: ChevronDownIcon,
  },
  plus: {
    closed: PlusIcon,
    open: MinusIcon,
  },
  arrow: {
    closed: ChevronRightIcon,
    open: ChevronDownIcon,
  },
} as const

// Size variants
const sizeVariants = {
  sm: "py-2 px-3 text-xs",
  md: "py-4 px-4 text-sm",
  lg: "py-6 px-6 text-base",
  xl: "py-8 px-8 text-lg",
} as const

// Rounded variants
const roundedVariants = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
} as const

// Color variants
const colorVariants = {
  default: {
    trigger: "text-foreground hover:bg-muted/80 focus-visible:bg-muted/80 data-[state=open]:bg-muted/50",
    content: "text-foreground",
    icon: "text-muted-foreground",
  },
  primary: {
    trigger: "text-primary hover:bg-primary/10 focus-visible:bg-primary/10 data-[state=open]:bg-primary/5",
    content: "text-primary/90",
    icon: "text-primary",
  },
  secondary: {
    trigger: "text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80 data-[state=open]:bg-secondary/50",
    content: "text-secondary-foreground",
    icon: "text-secondary-foreground",
  },
  success: {
    trigger: "text-green-600 hover:bg-green-50 focus-visible:bg-green-50 data-[state=open]:bg-green-50",
    content: "text-green-700",
    icon: "text-green-600",
  },
  warning: {
    trigger: "text-yellow-600 hover:bg-yellow-50 focus-visible:bg-yellow-50 data-[state=open]:bg-yellow-50",
    content: "text-yellow-700",
    icon: "text-yellow-600",
  },
  danger: {
    trigger: "text-red-600 hover:bg-red-50 focus-visible:bg-red-50 data-[state=open]:bg-red-50",
    content: "text-red-700",
    icon: "text-red-600",
  },
} as const

type IconVariant = keyof typeof iconVariants
type SizeVariant = keyof typeof sizeVariants
type RoundedVariant = keyof typeof roundedVariants
type ColorVariant = keyof typeof colorVariants

interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
  defaultValue?: string | string[]
  className?: string
  children?: React.ReactNode
  variant?: "default" | "bordered" | "card" | "ghost"
  rounded?: RoundedVariant
  fullWidth?: boolean
  disabled?: boolean
  dir?: "ltr" | "rtl" | "auto"
}

interface AccordionItemProps {
  value: string
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

interface AccordionTriggerProps {
  iconVariant?: IconVariant
  showIcon?: boolean
  iconClassName?: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  size?: SizeVariant
  color?: ColorVariant
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

// Hook to detect text direction
function useTextDirection(dir?: "ltr" | "rtl" | "auto") {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">("ltr")

  React.useEffect(() => {
    if (dir === "auto") {
      // Auto-detect from document or parent element
      const htmlDir = document.documentElement.dir as "ltr" | "rtl"
      const bodyDir = document.body.dir as "ltr" | "rtl"
      const detectedDir = htmlDir || bodyDir || "ltr"
      setTextDirection(detectedDir)
    } else if (dir) {
      setTextDirection(dir)
    } else {
      // Fallback to document direction
      const htmlDir = document.documentElement.dir as "ltr" | "rtl"
      const bodyDir = document.body.dir as "ltr" | "rtl"
      setTextDirection(htmlDir || bodyDir || "ltr")
    }
  }, [dir])

  return textDirection
}

function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
  variant = "default",
  rounded = "md",
  fullWidth = false,
  disabled = false,
  dir,
  ...props
}: AccordionProps) {
  const textDirection = useTextDirection(dir)
  
  const rootProps = type === "single" 
    ? { type: "single" as const, collapsible, defaultValue: defaultValue as string | undefined }
    : { type: "multiple" as const, defaultValue: defaultValue as string[] | undefined }

  const variantClasses = {
    default: "border-b border-border last:border-b-0",
    bordered: "border border-border rounded-lg",
    card: "bg-card border border-border shadow-sm rounded-lg",
    ghost: "hover:bg-muted/50 rounded-lg",
  }

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      data-slot="accordion"
      dir={textDirection}
      className={cn(
        fullWidth ? "w-full" : "w-auto",
        variantClasses[variant],
        roundedVariants[rounded],
        disabled && "opacity-50 pointer-events-none",
        textDirection === "rtl" && "rtl",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  )
}

function AccordionItem({
  className,
  value,
  disabled = false,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      data-slot="accordion-item"
      className={cn(
        "transition-colors",
        "hover:bg-muted/50 focus-within:bg-muted/50",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  iconVariant = "chevron",
  showIcon = true,
  iconClassName,
  disabled = false,
  loading = false,
  size = "md",
  color = "default",
  ...props
}: AccordionTriggerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">("ltr")
  
  const IconComponent = iconVariants[iconVariant]
  
  // Detect text direction from parent accordion or document
  React.useEffect(() => {
    const accordionRoot = document.querySelector('[data-slot="accordion"]')
    if (accordionRoot) {
      const dir = accordionRoot.getAttribute('dir') as "ltr" | "rtl"
      setTextDirection(dir || "ltr")
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl"
      const bodyDir = document.body.dir as "ltr" | "rtl"
      setTextDirection(htmlDir || bodyDir || "ltr")
    }
  }, [])
  
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 text-left font-medium transition-all duration-200",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          sizeVariants[size],
          colorVariants[color].trigger,
          disabled && "opacity-50 pointer-events-none",
          textDirection === "rtl" && "rtl text-right",
          className
        )}
        onPointerDown={() => setIsOpen(!isOpen)}
        disabled={disabled || loading}
        {...props}
      >
        <span className={cn(
          "flex-1 flex items-center gap-2",
          textDirection === "rtl" && "flex-row-reverse"
        )}>
          {loading && <Loader2Icon className="size-4 animate-spin" />}
          {children}
        </span>
        {showIcon && !loading && (
          <div className={cn(
            "flex items-center justify-center",
            textDirection === "rtl" && "order-first"
          )}>
            <IconComponent.closed
              className={cn(
                "size-4 shrink-0 transition-transform duration-200",
                "group-data-[state=open]:hidden",
                colorVariants[color].icon,
                textDirection === "rtl" && "rotate-180",
                iconClassName
              )}
            />
            <IconComponent.open
              className={cn(
                "size-4 shrink-0 transition-transform duration-200",
                "hidden group-data-[state=open]:block",
                colorVariants[color].icon,
                textDirection === "rtl" && "rotate-180",
                iconClassName
              )}
            />
          </div>
        )}
        {loading && (
          <div className={cn(
            "flex items-center justify-center",
            textDirection === "rtl" && "order-first"
          )}>
            <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">("ltr")
  
  // Detect text direction from parent accordion or document
  React.useEffect(() => {
    const accordionRoot = document.querySelector('[data-slot="accordion"]')
    if (accordionRoot) {
      const dir = accordionRoot.getAttribute('dir') as "ltr" | "rtl"
      setTextDirection(dir || "ltr")
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl"
      const bodyDir = document.body.dir as "ltr" | "rtl"
      setTextDirection(htmlDir || bodyDir || "ltr")
    }
  }, [])
  
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm transition-all duration-200",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      )}
      {...props}
    >
      <div className={cn(
        "px-4 pb-4 pt-0",
        textDirection === "rtl" && "text-right",
        className
      )}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

export { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type IconVariant,
  type SizeVariant,
  type RoundedVariant,
  type ColorVariant,
}
