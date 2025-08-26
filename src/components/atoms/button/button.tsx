import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { FaSpinner } from "react-icons/fa";

import { cn } from "@/lib/utils";

const colorMap = {
  primary: {
    contained:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-2 focus:ring-blue-300 disabled:bg-blue-400",
    outlined:
      "border border-blue-600 text-blue-600 hover:bg-blue-100 hover:border-blue-700 active:bg-blue-200 active:border-blue-800 focus:ring-2 focus:ring-blue-300 disabled:text-blue-400 disabled:border-blue-400",
    text: "text-blue-600 hover:text-blue-900 active:text-blue-950 focus:outline-none disabled:text-blue-400",
  },
  secondary: {
    contained:
      "bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-2 focus:ring-gray-300 disabled:bg-gray-400",
    outlined:
      "border border-gray-600 text-gray-600 hover:bg-gray-100 hover:border-gray-700 active:bg-gray-200 active:border-gray-800 focus:ring-2 focus:ring-gray-300 disabled:text-gray-400 disabled:border-gray-400",
    text: "text-gray-600 hover:text-gray-900 active:text-gray-950 focus:outline-none disabled:text-gray-400",
  },
  success: {
    contained:
      "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-2 focus:ring-green-300 disabled:bg-green-400",
    outlined:
      "border border-green-600 text-green-600 hover:bg-green-100 hover:border-green-700 active:bg-green-200 active:border-green-800 focus:ring-2 focus:ring-green-300 disabled:text-green-400 disabled:border-green-400",
    text: "text-green-600 hover:text-green-900 active:text-green-950 focus:outline-none disabled:text-green-400",
  },
  error: {
    contained:
      "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-2 focus:ring-red-300 disabled:bg-red-400",
    outlined:
      "border border-red-600 text-red-600 hover:bg-red-100 hover:border-red-700 active:bg-red-200 active:border-red-800 focus:ring-2 focus:ring-red-300 disabled:text-red-400 disabled:border-red-400",
    text: "text-red-600 hover:text-red-700 active:text-red-950 focus:outline-none disabled:text-red-400",
  },
  warning: {
    contained:
      "bg-yellow-500 text-black hover:bg-yellow-600 active:bg-yellow-700 focus:ring-2 focus:ring-yellow-300 disabled:bg-yellow-300",
    outlined:
      "border border-yellow-500 text-yellow-600 hover:bg-yellow-100 hover:border-yellow-700 active:bg-yellow-200 active:border-yellow-800 focus:ring-2 focus:ring-yellow-300 disabled:text-yellow-400 disabled:border-yellow-400",
    text: "text-yellow-600 hover:text-yellow-900 active:text-yellow-950 focus:outline-none disabled:text-yellow-400",
  },
  info: {
    contained:
      "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 focus:ring-2 focus:ring-sky-300 disabled:bg-sky-300",
    outlined:
      "border border-sky-500 text-sky-500 hover:bg-sky-100 hover:border-sky-700 active:bg-sky-200 active:border-sky-800 focus:ring-2 focus:ring-sky-300 disabled:text-sky-400 disabled:border-sky-400",
    text: "text-sky-500 hover:text-sky-900 active:text-sky-950 focus:outline-none disabled:text-sky-400",
  },
};

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        contained: "",
        outlined: "",
        text: "",
      },
      size: {
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-sm",
        md: "h-9 px-4 py-2 has-[>svg]:px-3 text-base",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4 text-lg",
        icon: "size-9",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      iconOnly: {
        true: "p-1 min-w-0 justify-center",
        false: "",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "md",
      fullWidth: false,
      iconOnly: false,
    },
  }
);

type ColorKey = keyof typeof colorMap;

type ButtonProps = {
  variant?: "contained" | "outlined" | "text";
  color?: ColorKey;
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
  asChild?: boolean;
  debounce?: number; // Debounce delay in milliseconds
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Spinner = () => (
  <FaSpinner data-testid="button-spinner" className="mr-2 inline-block h-4 w-4 animate-spin" />
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
      asChild = false,
      debounce,
      onClick,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;
    const colorClasses = colorMap[color]?.[variant];
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
        {startIcon && <span className="mx-2">{startIcon}</span>}
        {children}
        {endIcon && <span className="mx-2">{endIcon}</span>}
      </>
    );

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            iconOnly,
            className,
          }),
          colorClasses
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
