import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer hover:shadow-md active:scale-95",
  {
    variants: {
      variant: {
        default: "focus:ring-gray-500",
        primary: "focus:ring-blue-500",
        secondary: "focus:ring-slate-500",
        success: "focus:ring-emerald-500",
        warning: "focus:ring-amber-500",
        error: "focus:ring-red-500",
        info: "focus:ring-sky-500",
      },
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-14",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Default variant
      {
        variant: "default",
        checked: true,
        class: "bg-gray-600 hover:bg-gray-700",
      },
      {
        variant: "default",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Primary variant
      {
        variant: "primary",
        checked: true,
        class: "bg-blue-600 hover:bg-blue-700",
      },
      {
        variant: "primary",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Secondary variant
      {
        variant: "secondary",
        checked: true,
        class: "bg-slate-600 hover:bg-slate-700",
      },
      {
        variant: "secondary",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Success variant
      {
        variant: "success",
        checked: true,
        class: "bg-emerald-600 hover:bg-emerald-700",
      },
      {
        variant: "success",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Warning variant
      {
        variant: "warning",
        checked: true,
        class: "bg-amber-600 hover:bg-amber-700",
      },
      {
        variant: "warning",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Error variant
      {
        variant: "error",
        checked: true,
        class: "bg-red-600 hover:bg-red-700",
      },
      {
        variant: "error",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
      // Info variant
      {
        variant: "info",
        checked: true,
        class: "bg-sky-600 hover:bg-sky-700",
      },
      {
        variant: "info",
        checked: false,
        class: "bg-gray-200 hover:bg-gray-300",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "md",
      checked: false,
    },
  }
);

const thumbVariants = cva(
  "absolute pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition-all duration-300 ease-in-out border border-gray-200 hover:shadow-xl",
  {
    variants: {
      size: {
        sm: "h-4 w-4 top-0.5",
        md: "h-5 w-5 top-0.5",
        lg: "h-6 w-6 top-0.5",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        checked: true,
        class: "translate-x-5 shadow-lg",
      },
      {
        size: "sm",
        checked: false,
        class: "translate-x-1",
      },
      {
        size: "md",
        checked: true,
        class: "translate-x-6 shadow-lg",
      },
      {
        size: "md",
        checked: false,
        class: "translate-x-1",
      },
      {
        size: "lg",
        checked: true,
        class: "translate-x-7 shadow-lg",
      },
      {
        size: "lg",
        checked: false,
        class: "translate-x-1",
      },
    ],
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

const iconVariants = cva(
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center text-white transition-opacity duration-300",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      checked: {
        true: "opacity-100",
        false: "opacity-0",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
    },
  }
);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange">,
    VariantProps<typeof switchVariants> {
  /** Whether the switch is checked */
  checked?: boolean;
  /** Callback when switch state changes */
  onChange?: (checked: boolean) => void;
  /** Label text for the switch */
  label?: string;
  /** Description text below the switch */
  description?: string;
  /** Whether to show icons on the switch */
  showIcons?: boolean;
  /** Custom icon for checked state */
  checkedIcon?: React.ReactNode;
  /** Custom icon for unchecked state */
  uncheckedIcon?: React.ReactNode;
  /** Whether the switch is loading */
  loading?: boolean;
  /** Whether to show the switch in a form layout */
  formLayout?: boolean;
  /** Additional CSS classes for the container */
  containerClassName?: string;
  /** Additional CSS classes for the label */
  labelClassName?: string;
  /** Additional CSS classes for the description */
  descriptionClassName?: string;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      checked = false,
      onChange,
      variant,
      size,
      label,
      description,
      showIcons = false,
      checkedIcon,
      uncheckedIcon,
      loading = false,
      formLayout = false,
      disabled = false,
      containerClassName,
      labelClassName,
      descriptionClassName,
      className,
      id,
    },
    ref
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && !loading) {
        onChange?.(e.target.checked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled && !loading) {
          onChange?.(!checked);
        }
      }
    };

    const defaultCheckedIcon = (
      <svg className="h-full w-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    );

    const defaultUncheckedIcon = (
      <svg className="h-full w-full" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );

    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const switchClasses = cn(
      switchVariants({ variant, size, checked }),
      loading && "opacity-75 cursor-wait",
      checked && "shadow-lg",
      className
    );

    const thumbClasses = cn(
      thumbVariants({ size, checked }),
      loading && "animate-pulse"
    );

    const iconClasses = cn(
      iconVariants({ size, checked: showIcons ? checked : false }),
      "pointer-events-none"
    );

    const containerClasses = cn(
      "flex items-start gap-3",
      formLayout && "flex-col gap-2",
      containerClassName
    );

    const labelClasses = cn(
      "text-sm font-medium text-gray-900 cursor-pointer select-none",
      disabled && "cursor-not-allowed text-gray-400",
      loading && "cursor-wait",
      labelClassName
    );

    const descriptionClasses = cn(
      "text-sm text-gray-500",
      disabled && "text-gray-400",
      descriptionClassName
    );

    return (
      <div className={containerClasses}>
        <div className="flex items-center">
          <button
            type="button"
            role="switch"
            aria-checked={checked ? "true" : "false"}
            aria-labelledby={`${switchId}-label`}
            aria-describedby={description ? `${switchId}-description` : undefined}
            disabled={disabled || loading}
            className={switchClasses}
            onClick={() => !disabled && !loading && onChange?.(!checked)}
            onKeyDown={handleKeyDown}
            tabIndex={disabled || loading ? -1 : 0}
          >
            <input
              ref={ref}
              type="checkbox"
              id={switchId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled || loading}
              className="sr-only"
              aria-hidden="true"
            />
            
            {/* Switch Track */}
            <div className="relative w-full h-full rounded-full transition-colors duration-300">
              {/* Icons */}
              {showIcons && (
                <>
                  <div className={cn(iconClasses, "left-2")}>
                    {checkedIcon || defaultCheckedIcon}
                  </div>
                  <div className={cn(iconClasses, "right-2")}>
                    {uncheckedIcon || defaultUncheckedIcon}
                  </div>
                </>
              )}
              
              {/* Thumb */}
              <div className={thumbClasses}>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 animate-spin rounded-full border border-current border-t-transparent" />
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                id={`${switchId}-label`}
                htmlFor={switchId}
                className={labelClasses}
                onClick={() => !disabled && !loading && onChange?.(!checked)}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                id={`${switchId}-description`}
                className={descriptionClasses}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";