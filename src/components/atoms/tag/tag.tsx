import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { FaTimes, FaTag } from "react-icons/fa";
import { cn } from "@/lib/utils";

const tagVariants = cva(
  "inline-flex items-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border shadow-sm",
  {
    variants: {
      variant: {
        default: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-200 hover:border-gray-300 focus:ring-gray-500 active:bg-gray-300 active:border-gray-400 active:font-semibold",
        primary: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-200 hover:border-blue-300 focus:ring-blue-500 active:bg-blue-300 active:border-blue-400 active:font-semibold",
        secondary: "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-200 hover:border-slate-300 focus:ring-slate-500 active:bg-slate-300 active:border-slate-400 active:font-semibold",
        success: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-200 hover:border-emerald-300 focus:ring-emerald-500 active:bg-emerald-300 active:border-emerald-400 active:font-semibold",
        warning: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-200 hover:border-amber-300 focus:ring-amber-500 active:bg-amber-300 active:border-amber-400 active:font-semibold",
        error: "bg-red-50 text-red-700 border-red-200 hover:bg-red-200 hover:border-red-300 focus:ring-red-500 active:bg-red-300 active:border-red-400 active:font-semibold",
        info: "bg-sky-50 text-sky-700 border-sky-200 hover:bg-sky-200 hover:border-sky-300 focus:ring-sky-500 active:bg-sky-300 active:border-sky-400 active:font-semibold",
        outline: "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400 focus:ring-gray-500 active:bg-gray-200 active:border-gray-500 active:font-semibold",
        ghost: "bg-transparent text-gray-700 border-transparent hover:bg-gray-200 hover:border-gray-200 focus:ring-gray-500 active:bg-gray-300 active:border-gray-300 active:font-semibold",
      },
      size: {
        sm: "px-2.5 py-1 text-xs leading-4 rounded-md",
        md: "px-3 py-1.5 text-sm leading-5 rounded-lg",
        lg: "px-4 py-2 text-base leading-6 rounded-xl",
      },
      rounded: {
        true: "rounded-full",
        false: "",
      },
      clickable: {
        true: "cursor-pointer hover:scale-105 hover:shadow-md active:scale-95 active:shadow-lg",
        false: "",
      },
      dismissible: {
        true: "pr-1",
        false: "",
      },
      pressed: {
        true: "font-semibold shadow-md scale-105",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      rounded: false,
      clickable: false,
      dismissible: false,
      pressed: false,
    },
  }
);

const iconVariants = cva(
  "flex-shrink-0 [&>*]:text-inherit",
  {
    variants: {
      size: {
        sm: "w-3.5 h-3.5",
        md: "w-4 h-4",
        lg: "w-5 h-5",
      },
      variant: {
        default: "text-gray-600",
        primary: "text-blue-600",
        secondary: "text-slate-600",
        success: "text-emerald-600",
        warning: "text-amber-600",
        error: "text-red-600",
        info: "text-sky-600",
        outline: "text-gray-600",
        ghost: "text-gray-600",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const dismissButtonVariants = cva(
  "ml-2 p-1 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 active:scale-95",
  {
    variants: {
      size: {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
      },
      variant: {
        default: "hover:bg-gray-200 focus:ring-gray-500 text-gray-500 hover:text-gray-700",
        primary: "hover:bg-blue-200 focus:ring-blue-500 text-blue-500 hover:text-blue-700",
        secondary: "hover:bg-slate-200 focus:ring-slate-500 text-slate-500 hover:text-slate-700",
        success: "hover:bg-emerald-200 focus:ring-emerald-500 text-emerald-500 hover:text-emerald-700",
        warning: "hover:bg-amber-200 focus:ring-amber-500 text-amber-500 hover:text-amber-700",
        error: "hover:bg-red-200 focus:ring-red-500 text-red-500 hover:text-red-700",
        info: "hover:bg-sky-200 focus:ring-sky-500 text-sky-500 hover:text-sky-700",
        outline: "hover:bg-gray-200 focus:ring-gray-500 text-gray-500 hover:text-gray-700",
        ghost: "hover:bg-gray-200 focus:ring-gray-500 text-gray-500 hover:text-gray-700",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

export interface TagProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {
  /** The content to display inside the tag */
  children: React.ReactNode;
  /** Whether the tag should be clickable */
  clickable?: boolean;
  /** Whether the tag should be dismissible */
  dismissible?: boolean;
  /** Icon component to display before the text */
  icon?: React.ReactNode;
  /** Position of the icon relative to text */
  iconPosition?: "left" | "right";
  /** Whether to show a default tag icon when no custom icon is provided */
  showDefaultIcon?: boolean;
  /** Callback when tag is dismissed */
  onDismiss?: () => void;
  /** Click handler for clickable tags */
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  /** Whether the tag is disabled */
  disabled?: boolean;
  /** Whether the tag is loading */
  loading?: boolean;
  /** Whether the tag is in pressed/active state */
  pressed?: boolean;
  /** Maximum width of the tag */
  maxWidth?: string | number;
  /** Whether to truncate long text */
  truncate?: boolean;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      children,
      variant,
      size,
      rounded,
      clickable,
      dismissible,
      icon,
      iconPosition = "left",
      showDefaultIcon = false,
      onDismiss,
      onClick,
      disabled = false,
      loading = false,
      pressed = false,
      maxWidth,
      truncate = false,
      className,
      ...props
    },
    ref
  ) => {
    const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (!disabled && !loading) {
        onDismiss?.();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled && !loading) {
          onDismiss?.();
        }
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!disabled && !loading && clickable) {
        onClick?.(e);
      }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled && !loading && clickable) {
          // For keyboard events, we'll just call onClick without the event object
          // since the component is already focused and accessible
          onClick?.(e as unknown as React.MouseEvent<HTMLSpanElement>);
        }
      }
    };

    const baseClasses = cn(
      tagVariants({
        variant,
        size,
        rounded,
        clickable: clickable && !disabled && !loading,
        dismissible,
        pressed,
        className,
      }),
      disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      loading && "opacity-75 cursor-wait pointer-events-none"
    );

    const iconClasses = cn(
      iconVariants({ size, variant }),
      iconPosition === "left" ? "mr-1" : "ml-1"
    );

    const dismissButtonClasses = dismissButtonVariants({ size, variant });

    const contentClasses = cn(
      "flex-1",
      truncate && "truncate",
      maxWidth && "max-w-full"
    );

    const defaultIcon = showDefaultIcon && !icon ? <FaTag /> : icon;

    return (
      <span
        ref={ref}
        className={baseClasses}
        style={maxWidth ? { maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth } : undefined}
        {...(clickable && !disabled && !loading && {
          role: "button",
          tabIndex: 0,
          "aria-disabled": disabled,
        })}
        onClick={handleClick}
        onKeyPress={handleKeyPress}
        {...props}
      >
        {defaultIcon && iconPosition === "left" && (
          <span className={iconClasses} aria-hidden="true">
            {defaultIcon}
          </span>
        )}
        
        <span className={contentClasses}>
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-3 h-3" />
              {children}
            </span>
          ) : (
            children
          )}
        </span>

        {defaultIcon && iconPosition === "right" && (
          <span className={iconClasses} aria-hidden="true">
            {defaultIcon}
          </span>
        )}

        {dismissible && !disabled && !loading && (
          <button
            type="button"
            className={dismissButtonClasses}
            onClick={handleDismiss}
            onKeyDown={handleKeyDown}
            aria-label="Remove tag"
            tabIndex={0}
            disabled={disabled || loading}
          >
            <FaTimes className="w-full h-full" />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = "Tag";