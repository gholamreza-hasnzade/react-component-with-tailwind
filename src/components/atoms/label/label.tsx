import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

const colorMap = {
  primary: "text-blue-600",
  secondary: "text-gray-600",
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-sky-600",
};

const sizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

type ColorKey = keyof typeof colorMap;

type SizeKey = keyof typeof sizeMap;

export interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  color?: ColorKey;
  size?: SizeKey;
  className?: string;
}

function Label({
  className,
  color = "primary",
  size = "md",
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        colorMap[color],
        sizeMap[size],
        className
      )}
      {...props}
    />
  )
}

export { Label }
