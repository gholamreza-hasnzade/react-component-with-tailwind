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

export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  clickable?: boolean;
  showDot?: boolean;
  dismissible?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onDismiss?: () => void;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  [key: string]: unknown;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = true,
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
    "inline-flex items-center font-medium transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-1",
    // Size variants - much smaller and more badge-like
    size === "xs" && "px-1.5 py-0.5 text-xs leading-none",
    size === "sm" && "px-2 py-0.5 text-xs leading-none",
    size === "md" && "px-2.5 py-1 text-sm leading-none",
    size === "lg" && "px-3 py-1.5 text-sm leading-none",
    // Shape
    rounded ? "rounded-full" : "rounded-md",
    // Variant colors - solid colors like real badges
    variant === "primary" &&
      "bg-blue-100 text-blue-800 hover:bg-blue-200 focus:ring-blue-500",
    variant === "secondary" &&
      "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-500",
    variant === "success" &&
      "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500",
    variant === "error" &&
      "bg-red-100 text-red-800 hover:bg-red-200 focus:ring-red-500",
    variant === "warning" &&
      "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500",
    variant === "info" &&
      "bg-cyan-100 text-cyan-800 hover:bg-cyan-200 focus:ring-cyan-500",
    variant === "outline" &&
      "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
    // Interactive states
    clickable && "cursor-pointer hover:scale-105 active:scale-95 transform",
    dismissible && "pr-1",
    className
  );

  const dotClasses = clsx(
    "w-1.5 h-1.5 rounded-full mr-1.5",
    variant === "primary" && "bg-blue-500",
    variant === "secondary" && "bg-gray-500",
    variant === "success" && "bg-green-500",
    variant === "error" && "bg-red-500",
    variant === "warning" && "bg-yellow-500",
    variant === "info" && "bg-cyan-500",
    variant === "outline" && "bg-gray-500"
  );

  const dismissButtonClasses = clsx(
    "ml-1.5 p-0.5 rounded-full transition-colors duration-200",
    "hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-gray-400",
    "text-gray-500 hover:text-gray-700 active:scale-95 transform"
  );

  const iconClasses = clsx(
    "flex-shrink-0",
    size === "xs" && "w-3 h-3",
    size === "sm" && "w-3 h-3",
    size === "md" && "w-3.5 h-3.5",
    size === "lg" && "w-4 h-4",
    iconPosition === "left" ? "mr-1.5" : "ml-1.5"
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
      <span className="whitespace-nowrap">{children}</span>
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
          <FaTimes className="w-2.5 h-2.5" />
        </button>
      )}
    </span>
  );
};
