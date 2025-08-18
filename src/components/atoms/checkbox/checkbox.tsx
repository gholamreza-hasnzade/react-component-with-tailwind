import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const colorMap = {
  primary: {
    base: "border-blue-600 text-blue-600",
    checked: "bg-blue-600 text-white border-blue-600",
    error: "border-red-500 text-red-600",
  },
  secondary: {
    base: "border-gray-600 text-gray-600",
    checked: "bg-gray-600 text-white border-gray-600",
    error: "border-red-500 text-red-600",
  },
  success: {
    base: "border-green-600 text-green-600",
    checked: "bg-green-600 text-white border-green-600",
    error: "border-red-500 text-red-600",
  },
  error: {
    base: "border-red-600 text-red-600",
    checked: "bg-red-600 text-white border-red-600",
    error: "border-red-500 text-red-600",
  },
  warning: {
    base: "border-yellow-500 text-yellow-600",
    checked: "bg-yellow-500 text-black border-yellow-500",
    error: "border-red-500 text-red-600",
  },
  info: {
    base: "border-sky-500 text-sky-500",
    checked: "bg-sky-500 text-white border-sky-500",
    error: "border-red-500 text-red-600",
  },
};

type ColorKey = keyof typeof colorMap;

export type CheckboxProps = {
  id: string;
  label: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  color?: ColorKey;
  className?: string;
} & Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, "checked" | "onCheckedChange" | "required" | "disabled" | "id">;

function Checkbox({
  id,
  label,
  checked,
  onCheckedChange,
  error,
  helperText,
  required = false,
  disabled = false,
  color = "primary",
  className,
  ...props
}: CheckboxProps) {
  const colorClasses = error
    ? colorMap[color].error
    : checked
    ? colorMap[color].checked
    : colorMap[color].base;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className={cn("flex items-center gap-2 text-sm font-medium", disabled && "opacity-50")}> 
        <CheckboxPrimitive.Root
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          data-slot="checkbox"
          className={cn(
            "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 disabled:cursor-not-allowed disabled:opacity-50",
            colorClasses,
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-none"
          >
            <CheckIcon className="size-3.5" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {error && <p className="mt-1 text-xs text-red-500 flex items-center">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

export { Checkbox }
