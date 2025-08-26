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
    "inline-flex items-center font-semibold transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "shadow-sm border",
    
    // Size variants
    size === "sm" && "px-2.5 py-1 text-xs leading-4",
    size === "md" && "px-3 py-1.5 text-sm leading-5",
    size === "lg" && "px-4 py-2 text-base leading-6",
    
    // Rounded variants
    rounded ? "rounded-full" : "rounded-lg",
    
    // Variant styles with better contrast and modern design
    variant === "primary" && "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 focus:ring-blue-500",
    variant === "secondary" && "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100 focus:ring-gray-500",
    variant === "success" && "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 focus:ring-emerald-500",
    variant === "error" && "bg-red-50 text-red-700 border-red-200 hover:bg-red-100 focus:ring-red-500",
    variant === "warning" && "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 focus:ring-amber-500",
    variant === "info" && "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-100 focus:ring-sky-500",
    variant === "outline" && "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    
    // Interactive states with better hover effects
    clickable && "cursor-pointer hover:scale-105 hover:shadow-md active:scale-95",
    
    // Dismissible styles
    dismissible && "pr-1",
    
    className
  );

  const dotClasses = clsx(
    "w-2.5 h-2.5 rounded-full mr-2 shadow-sm",
    variant === "primary" && "bg-blue-500",
    variant === "secondary" && "bg-gray-500",
    variant === "success" && "bg-emerald-500",
    variant === "error" && "bg-red-500",
    variant === "warning" && "bg-amber-500",
    variant === "info" && "bg-sky-500",
    variant === "outline" && "bg-gray-500"
  );

  const dismissButtonClasses = clsx(
    "ml-2 p-1 rounded-full transition-all duration-200",
    "hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1",
    "text-gray-500 hover:text-gray-700 active:scale-95"
  );

  const iconClasses = clsx(
    "flex-shrink-0 [&>*]:text-inherit",
    size === "sm" && "w-3.5 h-3.5",
    size === "md" && "w-4 h-4",
    size === "lg" && "w-5 h-5",
    iconPosition === "left" ? "mr-2" : "ml-2",
    // Icon colors based on variant
    variant === "primary" && "text-blue-600",
    variant === "secondary" && "text-gray-600",
    variant === "success" && "text-emerald-600",
    variant === "error" && "text-red-600",
    variant === "warning" && "text-amber-600",
    variant === "info" && "text-sky-600",
    variant === "outline" && "text-gray-600"
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
