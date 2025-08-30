import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { FaSpinner } from "react-icons/fa";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";


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
  <FaSpinner data-testid="button-spinner" className="h-4 w-4 animate-spin" />
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
