import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

const colorMap = {
  primary: {
    base: "border-blue-600",
    checked: "border-blue-600 bg-white after:bg-blue-600",
    focus: "focus:ring-blue-500 focus:border-blue-500",
  },
  secondary: {
    base: "border-gray-600",
    checked: "border-gray-600 bg-white after:bg-gray-600",
    focus: "focus:ring-gray-500 focus:border-gray-500",
  },
  success: {
    base: "border-green-600",
    checked: "border-green-600 bg-white after:bg-green-600",
    focus: "focus:ring-green-500 focus:border-green-500",
  },
  error: {
    base: "border-red-600",
    checked: "border-red-600 bg-white after:bg-red-600",
    focus: "focus:ring-red-500 focus:border-red-500",
  },
  warning: {
    base: "border-yellow-500",
    checked: "border-yellow-500 bg-white after:bg-yellow-500",
    focus: "focus:ring-yellow-500 focus:border-yellow-500",
  },
  info: {
    base: "border-sky-500",
    checked: "border-sky-500 bg-white after:bg-sky-500",
    focus: "focus:ring-sky-500 focus:border-sky-500",
  },
};

type ColorKey = keyof typeof colorMap;

export type RadioGroupProps = React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  disabled?: boolean;
  className?: string;
};

export const RadioGroup = React.forwardRef<
  HTMLDivElement,
  RadioGroupProps
>(({ disabled, className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      ref={ref}
      dir="rtl"
      disabled={disabled}
      className={cn(
        "flex flex-col gap-2",
        className
      )}
      {...props}
    />
  );
});
RadioGroup.displayName = "RadioGroup";

export type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  label: React.ReactNode;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  readOnly?: boolean;
  color?: ColorKey;
  className?: string;
};

const sizeMap = {
  sm: "w-4 h-4 text-xs",
  md: "w-5 h-5 text-base",
  lg: "w-6 h-6 text-lg",
};

export const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  RadioGroupItemProps
>(({ label, size = "md", disabled, readOnly, color = "primary", className, ...props }, ref) => {
  const colorClasses = colorMap[color] || colorMap.primary;
  return (
    <label className={cn("inline-flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}> 
      <RadioGroupPrimitive.Item
        ref={ref}
        disabled={disabled}
        aria-readonly={readOnly}
        data-readonly={readOnly}
        className={cn(
          "relative flex items-center justify-center rounded-full border bg-white shadow-sm transition-colors outline-none disabled:opacity-50 disabled:cursor-not-allowed",
          sizeMap[size],
          colorClasses.base,
          colorClasses.focus,
          // checked state
          "after:content-[''] after:absolute after:rounded-full after:transition-all after:scale-0 after:w-2/3 after:h-2/3 after:left-1/6 after:top-1/6",
          `data-[state=checked]:after:scale-100 data-[state=checked]:${colorClasses.checked}`,
          readOnly && "pointer-events-none opacity-70",
          className
        )}
        tabIndex={readOnly ? -1 : 0}
        {...props}
      />
      <span className="select-none text-gray-900">{label}</span>
    </label>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";
