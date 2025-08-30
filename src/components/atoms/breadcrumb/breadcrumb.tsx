import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal, Home } from "lucide-react"
import { cn } from "@/lib/utils"

// Enhanced types for better type safety
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  isCurrentPage?: boolean
  onClick?: () => void
}

export type BreadcrumbColor = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "error" 
  | "warning" 
  | "info"

export interface BreadcrumbProps extends React.ComponentProps<"nav"> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  showHomeIcon?: boolean
  homeHref?: string
  truncateLabels?: boolean
  variant?: "default" | "minimal" | "bordered" | "filled" | "gradient"
  size?: "sm" | "md" | "lg"
  color?: BreadcrumbColor
  dir?: "ltr" | "rtl" | "auto"
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

// Hook for text direction detection
function useTextDirection(dir?: "ltr" | "rtl" | "auto") {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">(
    "ltr"
  );

  React.useEffect(() => {
    if (dir === "auto") {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      const detectedDir = htmlDir || bodyDir || "ltr";
      setTextDirection(detectedDir);
    } else if (dir) {
      setTextDirection(dir);
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      setTextDirection(htmlDir || bodyDir || "ltr");
    }
  }, [dir]);

  return textDirection;
}

// Main Breadcrumb component with enhanced functionality
function BreadcrumbComponent({ 
  items, 
  separator = <ChevronRight className="h-4 w-4" />,
  maxItems = 5,
  showHomeIcon = true,
  homeHref = "/",
  truncateLabels = false,
  variant = "default",
  size = "md",
  color = "primary",
  dir,
  onItemClick,
  className,
  ...props 
}: BreadcrumbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const textDirection = useTextDirection(dir)
  
  // Determine if we need to show ellipsis
  const shouldTruncate = items.length > maxItems && !isExpanded
  const visibleItems = shouldTruncate 
    ? [...items.slice(0, 1), ...items.slice(-maxItems + 2)]
    : items

  // Size variants
  const sizeClasses = {
    sm: "text-xs gap-1",
    md: "text-sm gap-1.5",
    lg: "text-base gap-2"
  }

  // Variant styles
  const variantClasses = {
    default: "text-muted-foreground",
    minimal: "text-gray-500",
    bordered: "border border-gray-200 rounded-lg px-3 py-2 bg-gray-50",
    filled: "bg-gray-100 rounded-lg px-3 py-2",
    gradient: "bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg px-3 py-2"
  }

  // Color system - matching button component structure
  const colorClasses = {
    primary: {
      text: "text-blue-600",
      hover: "hover:text-blue-800",
      current: "text-blue-900",
      border: "border-blue-200",
      bg: "bg-blue-50",
      separator: "text-blue-400"
    },
    secondary: {
      text: "text-gray-600",
      hover: "hover:text-gray-800",
      current: "text-gray-900",
      border: "border-gray-200",
      bg: "bg-gray-50",
      separator: "text-gray-400"
    },
    success: {
      text: "text-green-600",
      hover: "hover:text-green-800",
      current: "text-green-900",
      border: "border-green-200",
      bg: "bg-green-50",
      separator: "text-green-400"
    },
    error: {
      text: "text-red-600",
      hover: "hover:text-red-800",
      current: "text-red-900",
      border: "border-red-200",
      bg: "bg-red-50",
      separator: "text-red-400"
    },
    warning: {
      text: "text-yellow-600",
      hover: "hover:text-yellow-800",
      current: "text-yellow-900",
      border: "border-yellow-200",
      bg: "bg-yellow-50",
      separator: "text-yellow-400"
    },
    info: {
      text: "text-sky-600",
      hover: "hover:text-sky-800",
      current: "text-sky-900",
      border: "border-sky-200",
      bg: "bg-sky-50",
      separator: "text-sky-400"
    }
  }

  const currentColor = colorClasses[color]

  // Variant styles with color integration
  const getVariantClasses = () => {
    const baseClasses = variantClasses[variant]
    if (variant === "bordered" || variant === "filled" || variant === "gradient") {
      return cn(
        baseClasses,
        variant === "bordered" && `border ${currentColor.border}`,
        variant === "filled" && currentColor.bg,
        variant === "gradient" && currentColor.bg
      )
    }
    return baseClasses
  }

  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.onClick) {
      item.onClick()
    }
    if (onItemClick) {
      onItemClick(item, index)
    }
  }

  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const isCurrent = item.isCurrentPage || isLast
    
    if (isCurrent) {
      return (
        <BreadcrumbItem key={`${item.label}-${index}`} className={sizeClasses[size]}>
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <BreadcrumbPage className={cn(
            "font-medium",
            currentColor.current,
            variant === "minimal" && currentColor.current,
            variant === "bordered" && currentColor.current
          )}>
            {truncateLabels && item.label.length > 20 
              ? `${item.label.substring(0, 20)}...` 
              : item.label
            }
          </BreadcrumbPage>
        </BreadcrumbItem>
      )
    }

    if (item.href) {
      return (
        <BreadcrumbItem key={`${item.label}-${index}`} className={sizeClasses[size]}>
          {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          <BreadcrumbLink
            href={item.href}
            onClick={() => handleItemClick(item, index)}
            className={cn(
              "transition-colors",
              currentColor.text,
              currentColor.hover,
              variant === "minimal" && currentColor.hover,
              variant === "bordered" && currentColor.hover
            )}
          >
            {truncateLabels && item.label.length > 20 
              ? `${item.label.substring(0, 20)}...` 
              : item.label
            }
          </BreadcrumbLink>
        </BreadcrumbItem>
      )
    }

    return (
      <BreadcrumbItem key={`${item.label}-${index}`} className={sizeClasses[size]}>
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className={cn("cursor-default", currentColor.text)}>
          {truncateLabels && item.label.length > 20 
            ? `${item.label.substring(0, 20)}...` 
            : item.label
          }
        </span>
      </BreadcrumbItem>
    )
  }

  return (
    <nav 
      aria-label="breadcrumb" 
      data-slot="breadcrumb" 
      dir={textDirection}
      className={cn(
        "w-full",
        getVariantClasses(),
        textDirection === "rtl" && "rtl",
        className
      )}
      {...props}
    >
      <BreadcrumbList className={cn(
        "flex flex-wrap items-center break-words",
        sizeClasses[size],
        variant === "bordered" && "gap-2"
      )}>
        {textDirection === "rtl" ? (
          // RTL Layout: Home on right, current page on left
          <>
            {/* Home icon first (right side) for RTL */}
            {showHomeIcon && (
              <>
                <BreadcrumbItem className={sizeClasses[size]}>
                  <BreadcrumbLink 
                    href={homeHref}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      currentColor.text,
                      currentColor.hover,
                      "flex-row-reverse"
                    )}
                    aria-label="Go to home page"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </BreadcrumbSeparator>
              </>
            )}

            {/* Truncated items with ellipsis */}
            {shouldTruncate && (
              <>
                {renderBreadcrumbItem(items[0], 0, false)}
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </BreadcrumbSeparator>
                <BreadcrumbItem className={sizeClasses[size]}>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className={cn(
                      "flex items-center justify-center p-1 rounded transition-colors",
                      currentColor.bg,
                      `hover:${currentColor.bg.replace('bg-', 'bg-')}`
                    )}
                    aria-label={`Show ${items.length - maxItems} more breadcrumb items`}
                  >
                    <BreadcrumbEllipsis />
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  <ChevronRight className="h-4 w-4 rotate-180" />
                </BreadcrumbSeparator>
              </>
            )}

            {/* Visible breadcrumb items in normal order for RTL */}
            {visibleItems.map((item, index) => {
              const isLast = index === visibleItems.length - 1
              const isFirst = index === 0
              
              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  {!isFirst && (
                    <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </BreadcrumbSeparator>
                  )}
                  {renderBreadcrumbItem(item, index, isLast)}
                </React.Fragment>
              )
            })}
          </>
        ) : (
          // LTR Layout: Items flow left to right (default)
          <>
            {/* Home icon */}
            {showHomeIcon && (
              <>
                <BreadcrumbItem className={sizeClasses[size]}>
                  <BreadcrumbLink 
                    href={homeHref}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      currentColor.text,
                      currentColor.hover
                    )}
                    aria-label="Go to home page"
                  >
                    <Home className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  {separator}
                </BreadcrumbSeparator>
              </>
            )}

            {/* Truncated items with ellipsis */}
            {shouldTruncate && (
              <>
                {renderBreadcrumbItem(items[0], 0, false)}
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  {separator}
                </BreadcrumbSeparator>
                <BreadcrumbItem className={sizeClasses[size]}>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className={cn(
                      "flex items-center justify-center p-1 rounded transition-colors",
                      currentColor.bg,
                      `hover:${currentColor.bg.replace('bg-', 'bg-')}`
                    )}
                    aria-label={`Show ${items.length - maxItems} more breadcrumb items`}
                  >
                    <BreadcrumbEllipsis />
                  </button>
                </BreadcrumbItem>
                <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                  {separator}
                </BreadcrumbSeparator>
              </>
            )}

            {/* Visible breadcrumb items */}
            {visibleItems.map((item, index) => {
              const isLast = index === visibleItems.length - 1
              const isFirst = index === 0
              
              return (
                <React.Fragment key={`${item.label}-${index}`}>
                  {!isFirst && (
                    <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                      {separator}
                    </BreadcrumbSeparator>
                  )}
                  {renderBreadcrumbItem(item, index, isLast)}
                </React.Fragment>
              )
            })}

            {/* Expand button for truncated breadcrumbs */}
            {shouldTruncate && (
              <BreadcrumbSeparator className={cn(sizeClasses[size], currentColor.separator)}>
                {separator}
              </BreadcrumbSeparator>
            )}
          </>
        )}
      </BreadcrumbList>
    </nav>
  )
}

// Enhanced individual components with better accessibility
function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm break-words",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn(
        "hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded",
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-medium", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight className="h-4 w-4" />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-6 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More breadcrumb items</span>
    </span>
  )
}

export {
  BreadcrumbComponent as Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
