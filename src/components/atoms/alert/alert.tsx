import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X, AlertCircle, CheckCircle, AlertTriangle, Info, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

function useTextDirection(dir?: "ltr" | "rtl" | "auto") {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">("ltr");

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

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10",
        success: "border-green-500/50 text-green-700 dark:text-green-400 dark:border-green-500 [&>svg]:text-green-600 bg-green-50 dark:bg-green-950/20",
        warning: "border-yellow-500/50 text-yellow-700 dark:text-yellow-400 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-950/20",
        info: "border-blue-500/50 text-blue-700 dark:text-blue-400 dark:border-blue-500 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-950/20",
      },
      size: {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-3 text-sm",
        lg: "px-5 py-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

const iconMap = {
  default: Bell,
  destructive: AlertCircle,
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
} as const

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string
  description?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  dir?: "ltr" | "rtl" | "auto"
  showIcon?: boolean
  children?: React.ReactNode
  animated?: boolean
  animationDuration?: number
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    title,
    description,
    icon,
    dismissible = false,
    onDismiss,
    dir,
    showIcon = true,
    children,
    animated = true,
    animationDuration = 300,
    ...props 
  }, ref) => {
    const textDirection = useTextDirection(dir)
    const [isVisible, setIsVisible] = React.useState(true)
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [isEntering, setIsEntering] = React.useState(animated)
    
    const IconComponent = iconMap[variant || "default"]
    
    React.useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => {
          setIsEntering(false)
        }, 10)
        
        return () => clearTimeout(timer)
      }
    }, [animated])
    
    const handleDismiss = () => {
      if (animated) {
        setIsAnimating(true)
        setTimeout(() => {
          setIsVisible(false)
          onDismiss?.()
        }, animationDuration)
      } else {
        setIsVisible(false)
        onDismiss?.()
      }
    }

    if (!isVisible) return null

    const animationClasses = animated ? cn(
      "transition-all ease-in-out",
      isEntering 
        ? "opacity-0 -translate-y-2 scale-95" 
        : isAnimating 
          ? "opacity-0 -translate-y-2 scale-95" 
          : "opacity-100 translate-y-0 scale-100"
    ) : ""

    const animationStyle = animated ? {
      transitionDuration: `${animationDuration}ms`
    } : {}

    return (
      <div
        ref={ref}
        role="alert"
        dir={textDirection}
        className={cn(
          alertVariants({ variant, size }),
          textDirection === "rtl" && "rtl [&>svg]:left-auto [&>svg]:right-4 [&>svg~*]:pl-0 [&>svg~*]:pr-7",
          dismissible && "pr-10",
          animationClasses,
          className
        )}
        style={animationStyle}
        {...props}
      >
        {showIcon && !icon && <IconComponent className="h-4 w-4" />}
        {icon && <div className="h-4 w-4">{icon}</div>}
        
        <div className="flex-1">
          {title && (
            <h5 className="mb-1 font-medium leading-none tracking-tight">
              {title}
            </h5>
          )}
          {description && (
            <div className="text-sm [&_p]:leading-relaxed">
              {description}
            </div>
          )}
          {children}
        </div>
        
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              "absolute top-2 right-2 rounded-sm p-1 opacity-70 ring-offset-background transition-all duration-200 ease-in-out hover:opacity-100 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              textDirection === "rtl" && "right-auto left-2"
            )}
            aria-label="Dismiss alert"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export const AlertSuccess = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="success" {...props} />
)
AlertSuccess.displayName = "AlertSuccess"

export const AlertError = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="destructive" {...props} />
)
AlertError.displayName = "AlertError"

export const AlertWarning = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="warning" {...props} />
)
AlertWarning.displayName = "AlertWarning"

export const AlertInfo = React.forwardRef<HTMLDivElement, Omit<AlertProps, 'variant'>>(
  (props, ref) => <Alert ref={ref} variant="info" {...props} />
)
AlertInfo.displayName = "AlertInfo"

export { Alert, AlertTitle, AlertDescription }
export default Alert

