import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  Loader2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import "./accordion.css";

const iconVariants = {
  chevron: {
    closed: ChevronRightIcon,
    open: ChevronDownIcon,
  },
  plus: {
    closed: PlusIcon,
    open: MinusIcon,
  },
  arrow: {
    closed: ChevronRightIcon,
    open: ChevronDownIcon,
  },
} as const;

// Size variants
type SizeVariants = {
  sm: "py-2 px-3 text-xs";
  md: "py-4 px-4 text-sm";
  lg: "py-6 px-6 text-base";
  xl: "py-8 px-8 text-lg";
};

type RoundedVariants = {
  none: "rounded-none";
  sm: "rounded-sm";
  md: "rounded-md";
  lg: "rounded-lg";
  xl: "rounded-xl";
  "2xl": "rounded-2xl";
  full: "rounded-full";
};

type ColorVariants = {
  default: {
    trigger: "text-foreground hover:bg-muted/80 focus-visible:bg-muted/80 data-[state=open]:bg-muted/50";
    content: "text-foreground";
    icon: "text-muted-foreground";
  };
  primary: {
    trigger: "text-primary hover:bg-primary/10 focus-visible:bg-primary/10 data-[state=open]:bg-primary/5";
    content: "text-primary/90";
    icon: "text-primary";
  };
  secondary: {
    trigger: "text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80 data-[state=open]:bg-secondary/50";
    content: "text-secondary-foreground";
    icon: "text-secondary-foreground";
  };
  success: {
    trigger: "text-green-600 hover:bg-green-50 focus-visible:bg-green-50 data-[state=open]:bg-green-50";
    content: "text-green-700";
    icon: "text-green-600";
  };
  warning: {
    trigger: "text-yellow-600 hover:bg-yellow-50 focus-visible:bg-yellow-50 data-[state=open]:bg-yellow-50";
    content: "text-yellow-700";
    icon: "text-yellow-600";
  };
  danger: {
    trigger: "text-red-600 hover:bg-red-50 focus-visible:bg-red-50 data-[state=open]:bg-red-50";
    content: "text-red-700";
    icon: "text-red-600";
  };
};

type IconVariant = keyof typeof iconVariants;
type SizeVariant = keyof SizeVariants;
type RoundedVariant = keyof RoundedVariants;
type ColorVariant = keyof ColorVariants;

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  className?: string;
  children?: React.ReactNode;
  variant?: "default" | "bordered" | "card" | "ghost";
  rounded?: RoundedVariant;
  fullWidth?: boolean;
  disabled?: boolean;
  dir?: "ltr" | "rtl" | "auto";
  animationDuration?: number;
  onValueChange?: (value: string | string[]) => void;
}

interface AccordionItemProps {
  value: string;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface AccordionTriggerProps {
  iconVariant?: IconVariant;
  showIcon?: boolean;
  iconClassName?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: SizeVariant;
  color?: ColorVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  transition?: "slide" | "fade" | "none";
}

function useTextDirection(dir?: "ltr" | "rtl" | "auto") {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">(
    "ltr"
  );

  React.useEffect(() => {
    if (dir === "auto") {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      const detectedDir = htmlDir || bodyDir || "ltr";
      setTextDirection(detectedDir);
    } else if (dir) {
      setTextDirection(dir);
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      setTextDirection(htmlDir || bodyDir || "ltr");
    }
  }, [dir]);

  return textDirection;
}

function Accordion({
  type = "single",
  collapsible = true,
  defaultValue,
  className,
  children,
  variant = "default",
  rounded = "md",
  fullWidth = false,
  disabled = false,
  dir,
  animationDuration = 200,
  onValueChange,
  ...props
}: AccordionProps) {
  // Validate animation duration
  const validAnimationDuration = Math.max(100, Math.min(2000, animationDuration));
  
  const textDirection = useTextDirection(dir);

  const rootProps =
    type === "single"
      ? {
          type: "single" as const,
          collapsible,
          defaultValue: defaultValue as string | undefined,
        }
      : {
          type: "multiple" as const,
          defaultValue: defaultValue as string[] | undefined,
        };

  React.useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute('data-accordion-animation', 'true');
    style.textContent = `
      .accordion-content[data-state="closed"] {
        animation-duration: ${validAnimationDuration}ms !important;
      }
      .accordion-content[data-state="open"] {
        animation-duration: ${validAnimationDuration}ms !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.querySelector('style[data-accordion-animation="true"]');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, [validAnimationDuration]);

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      data-slot="accordion"
      dir={textDirection}
      className={cn(
        "accordion",
        fullWidth ? "accordion-full-width" : "accordion-auto-width",
        `accordion-variant-${variant}`,
        `accordion-rounded-${rounded}`,
        disabled && "accordion-disabled",
        textDirection === "rtl" && "rtl",
        className
      )}
      onValueChange={onValueChange}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  );
}

function AccordionItem({
  className,
  value,
  disabled = false,
  children,
  ...props
}: AccordionItemProps) {
  return (
    <AccordionPrimitive.Item
      value={value}
      data-slot="accordion-item"
      className={cn(
        "accordion-item",
        disabled && "accordion-item-disabled",
        className
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Item>
  );
}

function AccordionTrigger({
  className,
  children,
  iconVariant = "chevron",
  showIcon = true,
  iconClassName,
  disabled = false,
  loading = false,
  size = "md",
  color = "default",
  onClick,
  ...props
}: AccordionTriggerProps) {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">(
    "ltr"
  );

  const IconComponent = iconVariants[iconVariant];

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const accordionRoot = document.querySelector('[data-slot="accordion"]');
    if (accordionRoot) {
      const dir = accordionRoot.getAttribute("dir") as "ltr" | "rtl";
      setTextDirection(dir || "ltr");
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      setTextDirection(htmlDir || bodyDir || "ltr");
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "accordion-trigger group",
          `accordion-size-${size}`,
          `accordion-color-${color}`,
          textDirection === "rtl" && "rtl text-right",
          disabled && "accordion-trigger-disabled",
          className
        )}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        <span
          className={cn(
            "flex-1 flex items-center gap-2",
            textDirection === "rtl" && "flex-row-reverse"
          )}
        >
          {loading && <Loader2Icon className="accordion-loading" />}
          {children}
        </span>
        {showIcon && !loading && (
          <div
            className={cn(
              "accordion-icon-container",
              textDirection === "rtl" && "order-first"
            )}
          >
            <IconComponent.closed
              className={cn(
                "accordion-icon",
                "group-data-[state=open]:hidden",
                textDirection === "rtl" && "rotate-90",
                iconClassName
              )}
            />
            <IconComponent.open
              className={cn(
                "accordion-icon",
                "hidden group-data-[state=open]:block",
                textDirection === "rtl" && "rotate-90",
                iconClassName
              )}
            />
          </div>
        )}
        {loading && (
          <div
            className={cn(
              "accordion-icon-container",
              textDirection === "rtl" && "order-first"
            )}
          >
            <Loader2Icon className="accordion-loading" />
          </div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  transition = "slide",
  ...props
}: AccordionContentProps) {
  const [textDirection, setTextDirection] = React.useState<"ltr" | "rtl">(
    "ltr"
  );

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const accordionRoot = document.querySelector('[data-slot="accordion"]');
    if (accordionRoot) {
      const dir = accordionRoot.getAttribute("dir") as "ltr" | "rtl";
      setTextDirection(dir || "ltr");
    } else {
      const htmlDir = document.documentElement.dir as "ltr" | "rtl";
      const bodyDir = document.body.dir as "ltr" | "rtl";
      setTextDirection(htmlDir || bodyDir || "ltr");
    }
  }, []);

  const transitionClasses = {
    slide:
      "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    fade: "data-[state=closed]:opacity-0 data-[state=open]:opacity-100 transition-opacity",
    none: "",
  };

  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "accordion-content",
        transitionClasses[transition],
        className
      )}
      {...props}
    >
      <div className={cn(textDirection === "rtl" && "text-right")}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionTriggerProps,
  type AccordionContentProps,
  type IconVariant,
  type SizeVariant,
  type RoundedVariant,
  type ColorVariant,
};
