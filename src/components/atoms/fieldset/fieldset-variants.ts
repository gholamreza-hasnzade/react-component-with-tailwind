import { cva } from 'class-variance-authority';

export const fieldsetVariants = cva(
  "relative transition-all duration-300 ease-in-out border-0",
  {
    variants: {
      variant: {
        default: "bg-background border border-border/50 shadow-sm",
        card: "bg-card border border-border/60 shadow-md backdrop-blur-sm",
        elevated: "bg-background border border-border/70 shadow-xl backdrop-blur-md",
        outlined: "bg-transparent border-2 border-border/80 shadow-none",
        filled: "bg-muted/80 border border-muted-foreground/20 shadow-inner",
        ghost: "bg-transparent border border-transparent shadow-none",
        destructive: "bg-destructive/10 border border-destructive/30 text-destructive shadow-sm",
        warning: "bg-warning/10 border border-warning/30 text-warning shadow-sm",
        success: "bg-success/10 border border-success/30 text-success shadow-sm",
        info: "bg-info/10 border border-info/30 text-info shadow-sm",
      },
      size: {
        xs: "p-3 text-xs gap-2",
        sm: "p-4 text-sm gap-3",
        md: "p-5 text-base gap-4",
        lg: "p-6 text-lg gap-5",
        xl: "p-8 text-xl gap-6",
        "2xl": "p-10 text-2xl gap-8",
      },
      shape: {
        none: "rounded-none",
        sm: "rounded-lg",
        md: "rounded-xl",
        lg: "rounded-2xl",
        xl: "rounded-3xl",
        "2xl": "rounded-[1.5rem]",
        "3xl": "rounded-[2rem]",
        full: "rounded-full",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm shadow-black/5",
        md: "shadow-md shadow-black/10",
        lg: "shadow-lg shadow-black/15",
        xl: "shadow-xl shadow-black/20",
        "2xl": "shadow-2xl shadow-black/25",
        inner: "shadow-inner shadow-black/10",
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
        lift: "hover:shadow-xl hover:-translate-y-2 hover:shadow-black/20 transition-all duration-300 ease-out",
        glow: "hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out",
        scale: "hover:scale-[1.02] transition-transform duration-300 ease-out",
        opacity: "hover:opacity-95 transition-opacity duration-300 ease-out",
      },
      focus: {
        none: "",
        ring: "focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background",
        glow: "focus-within:shadow-xl focus-within:shadow-primary/30",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
      required: {
        true: "border-l-4 border-l-primary/80 shadow-sm",
        false: "",
      },
      error: {
        true: "border-destructive/50 bg-destructive/5 shadow-sm",
        false: "",
      },
      success: {
        true: "border-success/50 bg-success/5 shadow-sm",
        false: "",
      },
      warning: {
        true: "border-warning/50 bg-warning/5 shadow-sm",
        false: "",
      },
      info: {
        true: "border-info/50 bg-info/5 shadow-sm",
        false: "",
      },
      direction: {
        ltr: "text-left",
        rtl: "text-right",
        auto: "",
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
      direction: "auto",
    },
  }
);

export const legendVariants = cva(
  "font-semibold transition-all duration-300 ease-out leading-tight",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground/80",
        destructive: "text-destructive font-bold",
        warning: "text-warning font-bold",
        success: "text-success font-bold",
        info: "text-info font-bold",
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
      direction: {
        ltr: "text-left",
        rtl: "text-right",
        auto: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      weight: "semibold",
      direction: "auto",
    },
  }
);
