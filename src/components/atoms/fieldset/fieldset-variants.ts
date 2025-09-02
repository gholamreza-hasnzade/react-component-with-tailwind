import { cva } from 'class-variance-authority';

export const fieldsetVariants = cva(
  "relative transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "border border-border bg-background",
        card: "border border-border bg-card shadow-sm",
        elevated: "border border-border bg-background shadow-lg",
        outlined: "border-2 border-border bg-transparent",
        filled: "border-0 bg-muted",
        ghost: "border-0 bg-transparent",
        destructive: "border border-destructive bg-destructive/5 text-destructive",
        warning: "border border-warning bg-warning/5 text-warning",
        success: "border border-success bg-success/5 text-success",
        info: "border border-info bg-info/5 text-info",
      },
      size: {
        xs: "p-2 text-xs",
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-6 text-lg",
        xl: "p-8 text-xl",
        "2xl": "p-10 text-2xl",
      },
      shape: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
        "2xl": "shadow-2xl",
        inner: "shadow-inner",
      },
      animation: {
        none: "",
        fade: "animate-in fade-in duration-300",
        slide: "animate-in slide-in-from-bottom-4 duration-300",
        scale: "animate-in zoom-in-95 duration-300",
        bounce: "animate-in bounce-in duration-500",
        pulse: "animate-pulse",
        spin: "animate-spin",
      },
      hover: {
        none: "",
        lift: "hover:shadow-lg hover:-translate-y-1 transition-all duration-200",
        glow: "hover:shadow-lg hover:shadow-primary/25 transition-all duration-200",
        scale: "hover:scale-105 transition-transform duration-200",
        opacity: "hover:opacity-90 transition-opacity duration-200",
      },
      focus: {
        none: "",
        ring: "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
        glow: "focus-within:shadow-lg focus-within:shadow-primary/25",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      required: {
        true: "border-l-4 border-l-primary",
        false: "",
      },
      error: {
        true: "border-destructive bg-destructive/5",
        false: "",
      },
      success: {
        true: "border-success bg-success/5",
        false: "",
      },
      warning: {
        true: "border-warning bg-warning/5",
        false: "",
      },
      info: {
        true: "border-info bg-info/5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "md",
      shadow: "none",
      animation: "none",
      hover: "none",
      focus: "none",
      disabled: false,
      required: false,
      error: false,
      success: false,
      warning: false,
      info: false,
    },
  }
);

export const legendVariants = cva(
  "font-medium transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        destructive: "text-destructive",
        warning: "text-warning",
        success: "text-success",
        info: "text-info",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      weight: "medium",
    },
  }
);
