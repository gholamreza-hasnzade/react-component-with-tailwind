import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        primary:
          "border-transparent bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
        warning:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
        info: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
        purple:
          "border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300",
        pink: "border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300",
        indigo:
          "border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300",
        orange:
          "border-transparent bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-300",
        teal: "border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-300",
        gray: "border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-300",
        error:
          "border-transparent bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-300",
        green:
          "border-transparent bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-300",
        blue: "border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300",
        yellow:
          "border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs rounded-full",
        sm: "px-2 py-0.5 text-xs rounded-full",
        md: "px-2.5 py-0.5 text-xs rounded-full",
        lg: "px-3 py-1 text-sm rounded-full",
      },
      rounded: {
        true: "rounded-full",
        false: "rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: true,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  showDot?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  clickable?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  onClick?: (e: React.MouseEvent) => void;
}

function Badge({ 
  className, 
  variant, 
  size, 
  rounded, 
  showDot, 
  icon, 
  iconPosition = "left", 
  clickable, 
  dismissible, 
  onDismiss, 
  onClick, 
  children, 
  ...props 
}: BadgeProps) {
  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDismiss?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onDismiss?.();
    }
  };

  return (
    <div 
      className={cn(
        badgeVariants({ variant, size, rounded }), 
        clickable && "cursor-pointer hover:scale-105 active:scale-95 transform transition-transform",
        className
      )} 
      {...(clickable && { role: "button", tabIndex: 0 })}
      onClick={onClick}
      {...props}
    >
      {showDot && <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-60" aria-hidden="true" />}
      {icon && iconPosition === "left" && (
        <span className="mr-1.5 flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
      <span className="whitespace-nowrap">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-1.5 flex-shrink-0" aria-hidden="true">{icon}</span>
      )}
      {dismissible && (
        <button
          type="button"
          className="ml-1.5 p-0.5 rounded-full hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-colors"
          onClick={handleDismiss}
          onKeyDown={handleKeyDown}
          aria-label="Remove badge"
          tabIndex={0}
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </div>
  );
}

export { Badge };
