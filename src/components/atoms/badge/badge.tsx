import React from "react";
import clsx from "clsx";

export type BadgeVariant = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "error" 
  | "warning" 
  | "info"
  | "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  /** The content to display inside the badge */
  children: React.ReactNode;
  /** The variant/style of the badge */
  variant?: BadgeVariant;
  /** The size of the badge */
  size?: BadgeSize;
  /** Whether the badge should have rounded corners */
  rounded?: boolean;
  /** Whether the badge should be clickable */
  clickable?: boolean;
  /** Whether the badge should show a dot indicator */
  showDot?: boolean;
  /** Whether the badge should be dismissible */
  dismissible?: boolean;
  /** Callback when badge is dismissed */
  onDismiss?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  clickable = false,
  showDot = false,
  dismissible = false,
  onDismiss,
  className,
  ...props
}) => {
  const baseClasses = clsx(
    // Base styles
    "inline-flex items-center font-medium transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    
    // Size variants
    size === "sm" && "px-2 py-0.5 text-xs",
    size === "md" && "px-2.5 py-1 text-sm",
    size === "lg" && "px-3 py-1.5 text-base",
    
    // Rounded variants
    rounded ? "rounded-full" : "rounded-md",
    
    // Variant styles
    variant === "primary" && "bg-blue-100 text-blue-800 focus:ring-blue-500",
    variant === "secondary" && "bg-gray-100 text-gray-800 focus:ring-gray-500",
    variant === "success" && "bg-green-100 text-green-800 focus:ring-green-500",
    variant === "error" && "bg-red-100 text-red-800 focus:ring-red-500",
    variant === "warning" && "bg-yellow-100 text-yellow-800 focus:ring-yellow-500",
    variant === "info" && "bg-cyan-100 text-cyan-800 focus:ring-cyan-500",
    variant === "outline" && "bg-transparent border border-gray-300 text-gray-700 focus:ring-gray-500",
    
    // Interactive states
    clickable && "cursor-pointer hover:opacity-80 active:opacity-60",
    
    // Dismissible styles
    dismissible && "pr-1",
    
    className
  );

  const dotClasses = clsx(
    "w-2 h-2 rounded-full mr-1.5",
    variant === "primary" && "bg-blue-400",
    variant === "secondary" && "bg-gray-400",
    variant === "success" && "bg-green-400",
    variant === "error" && "bg-red-400",
    variant === "warning" && "bg-yellow-400",
    variant === "info" && "bg-cyan-400",
    variant === "outline" && "bg-gray-400"
  );

  const dismissButtonClasses = clsx(
    "ml-1.5 p-0.5 rounded-full transition-colors duration-200",
    "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1",
    "text-gray-500 hover:text-gray-700"
  );

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
    <span
      className={baseClasses}
      {...(clickable && { role: "button", tabIndex: 0 })}
      {...props}
    >
      {showDot && <span className={dotClasses} aria-hidden="true" />}
      <span className="flex-1">{children}</span>
      {dismissible && (
        <button
          type="button"
          className={dismissButtonClasses}
          onClick={handleDismiss}
          onKeyDown={handleKeyDown}
          aria-label="Remove badge"
          tabIndex={0}
        >
          <svg
            className="w-3 h-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </span>
  );
};
