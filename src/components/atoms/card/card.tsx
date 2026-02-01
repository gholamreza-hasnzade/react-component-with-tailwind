import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useTextDirection } from "@/hooks/useTextDirection"

// Card variants using class-variance-authority
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 ease-in-out",
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        elevated: "border-border bg-background shadow-md hover:shadow-lg",
        outlined: "border-2 border-border bg-transparent",
        filled: "border-transparent bg-muted",
        gradient: "border-transparent bg-gradient-to-br from-background to-muted",
        glass: "border-border/50 bg-background/80 backdrop-blur-sm",
        flat: "border-transparent bg-background shadow-none",
      },
      size: {
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
        xl: "p-8",
      },
      interactive: {
        true: "cursor-pointer hover:shadow-md hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]",
        false: "",
      },
      animated: {
        true: "transition-all duration-300 ease-in-out",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      animated: true,
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  dir?: "ltr" | "rtl" | "auto"
  asChild?: boolean
  children?: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md",
    interactive = false,
    animated = true,
    dir,
    asChild = false,
    children,
    ...props 
  }, ref) => {
    const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
    const Comp = asChild ? React.Fragment : "div"

    const cardClasses = cn(
      cardVariants({ variant, size, interactive, animated }),
      textDirection === "rtl" && "rtl",
      className
    )

    if (asChild) {
      return (
        <React.Fragment>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const childProps = child.props as { className?: string }
              return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                className: cn(cardClasses, childProps.className),
                dir: textDirection,
                ref,
                ...props,
              })
            }
            return child
          })}
        </React.Fragment>
      )
    }

    return (
      <Comp
        ref={ref}
        dir={textDirection}
        className={cardClasses}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Card.displayName = "Card"

// CardHeader component
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <div
      ref={ref}
      dir={textDirection}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

// CardTitle component
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <h3
      ref={ref}
      dir={textDirection}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

// CardDescription component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <p
      ref={ref}
      dir={textDirection}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

// CardContent component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <div
      ref={ref}
      dir={textDirection}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
})
CardContent.displayName = "CardContent"

// CardFooter component
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <div
      ref={ref}
      dir={textDirection}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

// CardImage component
const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    src?: string
    alt?: string
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, src, alt, dir, children, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  return (
    <div
      ref={ref}
      dir={textDirection}
      className={cn("relative overflow-hidden rounded-t-lg", className)}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      ) : (
        children
      )}
    </div>
  )
})
CardImage.displayName = "CardImage"

// CardBadge component
const CardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
    dir?: "ltr" | "rtl" | "auto"
  }
>(({ className, variant = "default", dir, ...props }, ref) => {
  const { direction: textDirection } = useTextDirection({ 
      defaultDirection: dir || "auto"
    })
  
  const badgeVariants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    destructive: "bg-destructive text-destructive-foreground",
    outline: "border border-input bg-background",
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-white",
  }
  
  return (
    <div
      ref={ref}
      dir={textDirection}
      className={cn(
        "absolute top-2 right-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        textDirection === "rtl" && "right-auto left-2",
        className
      )}
      {...props}
    />
  )
})
CardBadge.displayName = "CardBadge"

// Convenience components for different card types
export const CardElevated = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="elevated" {...props} />
)
CardElevated.displayName = "CardElevated"

export const CardOutlined = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="outlined" {...props} />
)
CardOutlined.displayName = "CardOutlined"

export const CardFilled = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="filled" {...props} />
)
CardFilled.displayName = "CardFilled"

export const CardGradient = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="gradient" {...props} />
)
CardGradient.displayName = "CardGradient"

export const CardGlass = React.forwardRef<HTMLDivElement, Omit<CardProps, 'variant'>>(
  (props, ref) => <Card ref={ref} variant="glass" {...props} />
)
CardGlass.displayName = "CardGlass"

export const CardInteractive = React.forwardRef<HTMLDivElement, Omit<CardProps, 'interactive'>>(
  (props, ref) => <Card ref={ref} interactive={true} {...props} />
)
CardInteractive.displayName = "CardInteractive"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
  CardBadge,
}
export default Card

