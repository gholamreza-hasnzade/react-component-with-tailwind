import { cva } from 'class-variance-authority';

export const panelVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-background border border-border",
        card: "bg-card border border-border shadow-sm",
        elevated: "bg-background border border-border shadow-lg",
        outlined: "bg-transparent border-2 border-border",
        filled: "bg-muted border-0",
        ghost: "bg-transparent border-0",
        destructive: "bg-destructive border border-destructive text-destructive-foreground",
        warning: "bg-warning border border-warning text-warning-foreground",
        success: "bg-success border border-success text-success-foreground",
        info: "bg-info border border-info text-info-foreground",
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
        ring: "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        glow: "focus:outline-none focus:shadow-lg focus:shadow-primary/25",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      loading: {
        true: "relative overflow-hidden",
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
      loading: false,
    },
  }
);
