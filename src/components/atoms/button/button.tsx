import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { FaSpinner } from "react-icons/fa";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        contained: "shadow-sm hover:shadow-md active:shadow-inner",
        outlined: "border-2 bg-transparent",
        text: "bg-transparent hover:bg-gray-100 active:bg-gray-200",
      },
      color: {
        primary: "focus:ring-blue-500",
        secondary: "focus:ring-gray-500",
        success: "focus:ring-green-500",
        error: "focus:ring-red-500",
        warning: "focus:ring-yellow-500",
        info: "focus:ring-sky-500",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        icon: "h-10 w-10 p-2",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        lg: "rounded-lg",
        xl: "rounded-xl",
        none: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      iconOnly: {
        true: "p-2 min-w-0 justify-center",
        false: "",
      },
    },
    compoundVariants: [
      // Contained variants
      {
        variant: "contained",
        color: "primary",
        className: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400",
      },
      {
        variant: "contained",
        color: "secondary",
        className: "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 disabled:bg-gray-400",
      },
      {
        variant: "contained",
        color: "success",
        className: "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 disabled:bg-green-400",
      },
      {
        variant: "contained",
        color: "error",
        className: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-400",
      },
      {
        variant: "contained",
        color: "warning",
        className: "bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700 disabled:bg-yellow-300",
      },
      {
        variant: "contained",
        color: "info",
        className: "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 disabled:bg-sky-300",
      },
      // Outlined variants
      {
        variant: "outlined",
        color: "primary",
        className: "border-blue-600 text-blue-600 hover:bg-blue-50 hover:border-blue-700 active:bg-blue-100 disabled:text-blue-400 disabled:border-blue-400",
      },
      {
        variant: "outlined",
        color: "secondary",
        className: "border-gray-600 text-gray-600 hover:bg-gray-50 hover:border-gray-700 active:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400",
      },
      {
        variant: "outlined",
        color: "success",
        className: "border-green-600 text-green-600 hover:bg-green-50 hover:border-green-700 active:bg-green-100 disabled:text-green-400 disabled:border-green-400",
      },
      {
        variant: "outlined",
        color: "error",
        className: "border-red-600 text-red-600 hover:bg-red-50 hover:border-red-700 active:bg-red-100 disabled:text-red-400 disabled:border-red-400",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:border-yellow-600 active:bg-yellow-100 disabled:text-yellow-400 disabled:border-yellow-400",
      },
      {
        variant: "outlined",
        color: "info",
        className: "border-sky-500 text-sky-500 hover:bg-sky-50 hover:border-sky-600 active:bg-sky-100 disabled:text-sky-400 disabled:border-sky-400",
      },
      // Text variants
      {
        variant: "text",
        color: "primary",
        className: "text-blue-600 hover:text-blue-700 active:text-blue-800 disabled:text-blue-400",
      },
      {
        variant: "text",
        color: "secondary",
        className: "text-gray-600 hover:text-gray-700 active:text-gray-800 disabled:text-gray-400",
      },
      {
        variant: "text",
        color: "success",
        className: "text-green-600 hover:text-green-700 active:text-green-800 disabled:text-green-400",
      },
      {
        variant: "text",
        color: "error",
        className: "text-red-600 hover:text-red-700 active:text-red-800 disabled:text-red-400",
      },
      {
        variant: "text",
        color: "warning",
        className: "text-yellow-600 hover:text-yellow-700 active:text-yellow-800 disabled:text-yellow-400",
      },
      {
        variant: "text",
        color: "info",
        className: "text-sky-500 hover:text-sky-600 active:text-sky-700 disabled:text-sky-400",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "md",
      rounded: "default",
      fullWidth: false,
      iconOnly: false,
    },
  }
);

type ButtonProps = {
  variant?: "contained" | "outlined" | "text";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  iconOnly?: boolean;
  tooltip?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "md" | "lg" | "icon";
  rounded?: "default" | "full" | "lg" | "xl" | "none";
  asChild?: boolean;
  debounce?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Spinner = () => (
  <FaSpinner 
    data-testid="button-spinner" 
    className="h-4 w-4 animate-spin" 
  />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "contained",
      color = "primary",
      loading = false,
      startIcon,
      endIcon,
      disabled = false,
      fullWidth = false,
      iconOnly = false,
      tooltip,
      children,
      type = "button",
      size = "md",
      rounded = "default",
      asChild = false,
      debounce,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const Comp: React.ElementType = asChild ? Slot : "button";
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleClick = React.useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (debounce && debounce > 0) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          timeoutRef.current = setTimeout(() => {
            if (onClick) {
              onClick(event);
            }
          }, debounce);
        } else {
          if (onClick) {
            onClick(event);
          }
        }
      },
      [debounce, onClick]
    );

    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const content = loading ? (
      <Spinner />
    ) : iconOnly ? (
      startIcon
    ) : (
      <>
        {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
        {children && <span className="flex-shrink-0">{children}</span>}
        {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
      </>
    );

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            rounded,
            fullWidth,
            iconOnly,
          }),
          className
        )}
        title={tooltip}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        type={type}
        onClick={handleClick}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
