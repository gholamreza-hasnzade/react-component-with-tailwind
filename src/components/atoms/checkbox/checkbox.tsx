import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useTextDirection } from "@/hooks/useTextDirection"

const colorMap = {
  primary: {
    base: "border-blue-500 text-blue-600 hover:border-blue-600 hover:bg-blue-50",
    checked: "bg-blue-600 text-white border-blue-600 hover:bg-blue-700",
    error: "border-red-500 text-red-600 hover:border-red-600",
  },
  secondary: {
    base: "border-gray-500 text-gray-600 hover:border-gray-600 hover:bg-gray-50",
    checked: "bg-gray-600 text-white border-gray-600 hover:bg-gray-700",
    error: "border-red-500 text-red-600 hover:border-red-600",
  },
  success: {
    base: "border-green-500 text-green-600 hover:border-green-600 hover:bg-green-50",
    checked: "bg-green-600 text-white border-green-600 hover:bg-green-700",
    error: "border-red-500 text-red-600 hover:border-red-600",
  },
  error: {
    base: "border-red-500 text-red-600 hover:border-red-600 hover:bg-red-50",
    checked: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    error: "border-red-500 text-red-600 hover:border-red-600",
  },
  warning: {
    base: "border-yellow-500 text-yellow-600 hover:border-yellow-600 hover:bg-yellow-50",
    checked: "bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-600",
    error: "border-red-500 text-red-600 hover:border-red-600",
  },
  info: {
    base: "border-sky-500 text-sky-600 hover:border-sky-600 hover:bg-sky-50",
    checked: "bg-sky-500 text-white border-sky-500 hover:bg-sky-600",
    error: "border-red-500 text-red-600 hover:border-red-600",
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
  dir?: 'ltr' | 'rtl' | 'auto';
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
  dir,
  ...props
}: CheckboxProps) {
  const textDirection = useTextDirection();
  const currentDir = dir || textDirection;
  const isRTL = currentDir === 'rtl';

  const colorClasses = error
    ? colorMap[color].error
    : checked
    ? colorMap[color].checked
    : colorMap[color].base;

  return (
    <div className="flex flex-col gap-1" dir={currentDir as 'ltr' | 'rtl'}>
      <div className={cn(
        "flex items-center gap-3 text-sm font-medium cursor-pointer select-none",
        isRTL ? "flex-row-reverse" : "flex-row",
        disabled && "opacity-50 cursor-not-allowed"
      )}>
        <CheckboxPrimitive.Root
          id={id}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          required={required}
          aria-invalid={!!error}
          data-slot="checkbox"
          className={cn(
            "peer size-4 shrink-0 rounded border-2 transition-all duration-200 outline-none",
            "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "data-[state=checked]:animate-in data-[state=unchecked]:animate-out",
            "data-[state=checked]:zoom-in-50 data-[state=unchecked]:zoom-out-50",
            colorClasses,
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            data-slot="checkbox-indicator"
            className="flex items-center justify-center text-current transition-all duration-200"
          >
            <CheckIcon className="size-3.5 animate-in zoom-in-50 duration-200" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label 
          htmlFor={id} 
          className="flex-1 cursor-pointer"
        >
          {label}
          {required && (
            <span className={cn("text-red-500", isRTL ? "mr-1" : "ml-1")}>*</span>
          )}
        </label>
      </div>
      {error && (
        <p className={cn(
          "mt-1 text-xs text-red-500 flex items-center gap-1",
          isRTL ? "flex-row-reverse" : "flex-row"
        )}>
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">{helperText}</p>
      )}
    </div>
  )
}

export { Checkbox }
