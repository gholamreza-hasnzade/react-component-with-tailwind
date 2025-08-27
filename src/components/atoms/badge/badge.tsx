import React from "react";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

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
  /** Icon component to display before the text */
  icon?: React.ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: "left" | "right";
  /** Callback when badge is dismissed */
  onDismiss?: () => void;
  /** Click handler for clickable badges */
  onClick?: (e: React.MouseEvent) => void;
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
  icon,
  iconPosition = "left",
  onDismiss,
  onClick,
  className,
  ...props
}) => {
  const baseClasses = clsx(
    // Base styles
    "inline-flex items-center font-semibold transition-all duration-300 ease-out",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "shadow-sm border backdrop-blur-sm",
    
    // Size variants with better spacing
    size === "sm" && "px-3 py-1.5 text-xs leading-4",
    size === "md" && "px-4 py-2 text-sm leading-5",
    size === "lg" && "px-5 py-2.5 text-base leading-6",
    
    // Rounded variants
    rounded ? "rounded-full" : "rounded-xl",
    
    // Variant styles with modern gradients and better contrast
    variant === "primary" && "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-200 hover:from-blue-100 hover:to-blue-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 focus:ring-blue-500",
    variant === "secondary" && "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100/50 focus:ring-gray-500",
    variant === "success" && "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-100/50 focus:ring-emerald-500",
    variant === "error" && "bg-gradient-to-r from-red-50 to-red-100 text-red-800 border-red-200 hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/50 focus:ring-red-500",
    variant === "warning" && "bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800 border-amber-200 hover:from-amber-100 hover:to-amber-200 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-100/50 focus:ring-amber-500",
    variant === "info" && "bg-gradient-to-r from-sky-50 to-sky-100 text-sky-800 border-sky-200 hover:from-sky-100 hover:to-sky-200 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50 focus:ring-sky-500",
    variant === "outline" && "bg-white/80 text-gray-800 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-100/50 focus:ring-gray-500",
    
    // Interactive states with enhanced hover effects
    clickable && "cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95 transform transition-transform",
    
    // Dismissible styles
    dismissible && "pr-1",
    
    className
  );

  const dotClasses = clsx(
    "w-2.5 h-2.5 rounded-full mr-2 shadow-sm ring-2 ring-white/50",
    variant === "primary" && "bg-blue-500",
    variant === "secondary" && "bg-gray-500",
    variant === "success" && "bg-emerald-500",
    variant === "error" && "bg-red-500",
    variant === "warning" && "bg-amber-500",
    variant === "info" && "bg-sky-500",
    variant === "outline" && "bg-gray-500"
  );

  const dismissButtonClasses = clsx(
    "ml-2 p-1.5 rounded-full transition-all duration-300 ease-out",
    "hover:bg-gray-200/80 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1",
    "text-gray-500 hover:text-gray-700 active:scale-95 transform",
    "hover:shadow-sm"
  );

  const iconClasses = clsx(
    "flex-shrink-0 [&>*]:text-inherit transition-all duration-300",
    size === "sm" && "w-3.5 h-3.5",
    size === "md" && "w-4 h-4",
    size === "lg" && "w-5 h-5",
    iconPosition === "left" ? "mr-2" : "ml-2",
    // Icon colors based on variant with better contrast
    variant === "primary" && "text-blue-700",
    variant === "secondary" && "text-gray-700",
    variant === "success" && "text-emerald-700",
    variant === "error" && "text-red-700",
    variant === "warning" && "text-amber-700",
    variant === "info" && "text-sky-700",
    variant === "outline" && "text-gray-700"
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
      onClick={onClick}
      onMouseEnter={(e) => {
        if (clickable) {
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (clickable) {
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
      {...props}
    >
      {showDot && <span className={dotClasses} aria-hidden="true" />}
      {icon && iconPosition === "left" && (
        <span className={iconClasses} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="flex-1">{children}</span>
      {icon && iconPosition === "right" && (
        <span className={iconClasses} aria-hidden="true">
          {icon}
        </span>
      )}
      {dismissible && (
        <button
          type="button"
          className={dismissButtonClasses}
          onClick={handleDismiss}
          onKeyDown={handleKeyDown}
          aria-label="Remove badge"
          tabIndex={0}
        >
          <FaTimes className="w-3.5 h-3.5" />
        </button>
      )}
    </span>
  );
};
