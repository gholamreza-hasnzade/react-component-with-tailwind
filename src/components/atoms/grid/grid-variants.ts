import { cva } from 'class-variance-authority';

export const gridVariants = cva(
  "grid transition-all duration-300 ease-in-out",
  {
    variants: {
      // Grid template columns
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
        6: "grid-cols-6",
        7: "grid-cols-7",
        8: "grid-cols-8",
        9: "grid-cols-9",
        10: "grid-cols-10",
        11: "grid-cols-11",
        12: "grid-cols-12",
        none: "grid-cols-none",
        subgrid: "grid-cols-subgrid",
        auto: "grid-cols-auto",
        "auto-fit": "grid-cols-auto-fit",
        "auto-fill": "grid-cols-auto-fill",
      },
      
      // Grid template rows
      rows: {
        1: "grid-rows-1",
        2: "grid-rows-2",
        3: "grid-rows-3",
        4: "grid-rows-4",
        5: "grid-rows-5",
        6: "grid-rows-6",
        none: "grid-rows-none",
        subgrid: "grid-rows-subgrid",
        auto: "grid-rows-auto",
        "auto-fit": "grid-rows-auto-fit",
        "auto-fill": "grid-rows-auto-fill",
      },
      
      // Gap variants
      gap: {
        0: "gap-0",
        1: "gap-1",
        2: "gap-2",
        3: "gap-3",
        4: "gap-4",
        5: "gap-5",
        6: "gap-6",
        7: "gap-7",
        8: "gap-8",
        9: "gap-9",
        10: "gap-10",
        11: "gap-11",
        12: "gap-12",
        14: "gap-14",
        16: "gap-16",
        20: "gap-20",
        24: "gap-24",
        28: "gap-28",
        32: "gap-32",
        36: "gap-36",
        40: "gap-40",
        44: "gap-44",
        48: "gap-48",
        52: "gap-52",
        56: "gap-56",
        60: "gap-60",
        64: "gap-64",
        72: "gap-72",
        80: "gap-80",
        96: "gap-96",
      },
      
      // Column gap variants
      gapX: {
        0: "gap-x-0",
        1: "gap-x-1",
        2: "gap-x-2",
        3: "gap-x-3",
        4: "gap-x-4",
        5: "gap-x-5",
        6: "gap-x-6",
        7: "gap-x-7",
        8: "gap-x-8",
        9: "gap-x-9",
        10: "gap-x-10",
        11: "gap-x-11",
        12: "gap-x-12",
        14: "gap-x-14",
        16: "gap-x-16",
        20: "gap-x-20",
        24: "gap-x-24",
        28: "gap-x-28",
        32: "gap-x-32",
        36: "gap-x-36",
        40: "gap-x-40",
        44: "gap-x-44",
        48: "gap-x-48",
        52: "gap-x-52",
        56: "gap-x-56",
        60: "gap-x-60",
        64: "gap-x-64",
        72: "gap-x-72",
        80: "gap-x-80",
        96: "gap-x-96",
      },
      
      // Row gap variants
      gapY: {
        0: "gap-y-0",
        1: "gap-y-1",
        2: "gap-y-2",
        3: "gap-y-3",
        4: "gap-y-4",
        5: "gap-y-5",
        6: "gap-y-6",
        7: "gap-y-7",
        8: "gap-y-8",
        9: "gap-y-9",
        10: "gap-y-10",
        11: "gap-y-11",
        12: "gap-y-12",
        14: "gap-y-14",
        16: "gap-y-16",
        20: "gap-y-20",
        24: "gap-y-24",
        28: "gap-y-28",
        32: "gap-y-32",
        36: "gap-y-36",
        40: "gap-y-40",
        44: "gap-y-44",
        48: "gap-y-48",
        52: "gap-y-52",
        56: "gap-y-56",
        60: "gap-y-60",
        64: "gap-y-64",
        72: "gap-y-72",
        80: "gap-y-80",
        96: "gap-y-96",
      },
      
      // Auto flow
      autoFlow: {
        row: "grid-flow-row",
        col: "grid-flow-col",
        dense: "grid-flow-dense",
        "row-dense": "grid-flow-row-dense",
        "col-dense": "grid-flow-col-dense",
      },
      
      // Auto columns
      autoCols: {
        auto: "auto-cols-auto",
        min: "auto-cols-min",
        max: "auto-cols-max",
        fr: "auto-cols-fr",
      },
      
      // Auto rows
      autoRows: {
        auto: "auto-rows-auto",
        min: "auto-rows-min",
        max: "auto-rows-max",
        fr: "auto-rows-fr",
      },
      
      // Justify items
      justifyItems: {
        start: "justify-items-start",
        end: "justify-items-end",
        center: "justify-items-center",
        stretch: "justify-items-stretch",
      },
      
      // Align items
      alignItems: {
        start: "items-start",
        end: "items-end",
        center: "items-center",
        baseline: "items-baseline",
        stretch: "items-stretch",
      },
      
      // Justify content
      justifyContent: {
        start: "justify-start",
        end: "justify-end",
        center: "justify-center",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
        stretch: "justify-stretch",
      },
      
      // Align content
      alignContent: {
        start: "content-start",
        end: "content-end",
        center: "content-center",
        between: "content-between",
        around: "content-around",
        evenly: "content-evenly",
        stretch: "content-stretch",
      },
      
      // Place items
      placeItems: {
        start: "place-items-start",
        end: "place-items-end",
        center: "place-items-center",
        stretch: "place-items-stretch",
      },
      
      // Place content
      placeContent: {
        start: "place-content-start",
        end: "place-content-end",
        center: "place-content-center",
        between: "place-content-between",
        around: "place-content-around",
        evenly: "place-content-evenly",
        stretch: "place-content-stretch",
      },
      
      // Size variants
      size: {
        xs: "p-1",
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
        xl: "p-6",
        "2xl": "p-8",
      },
      
      // Shape variants
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
      
      // Shadow variants
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm shadow-black/5",
        md: "shadow-md shadow-black/10",
        lg: "shadow-lg shadow-black/15",
        xl: "shadow-xl shadow-black/20",
        "2xl": "shadow-2xl shadow-black/25",
        inner: "shadow-inner shadow-black/10",
      },
      
      // Background variants
      background: {
        none: "bg-transparent",
        subtle: "bg-muted/30",
        muted: "bg-muted/50",
        card: "bg-card",
        background: "bg-background",
        primary: "bg-primary/10",
        secondary: "bg-secondary/10",
        accent: "bg-accent/10",
        destructive: "bg-destructive/10",
        warning: "bg-warning/10",
        success: "bg-success/10",
        info: "bg-info/10",
      },
      
      // Border variants
      border: {
        none: "border-0",
        subtle: "border border-border/30",
        default: "border border-border/50",
        strong: "border border-border/80",
        primary: "border border-primary/50",
        secondary: "border border-secondary/50",
        destructive: "border border-destructive/50",
        warning: "border border-warning/50",
        success: "border border-success/50",
        info: "border border-info/50",
      },
      
      // Animation variants
      animation: {
        none: "",
        fade: "animate-in fade-in duration-300",
        slide: "animate-in slide-in-from-bottom-4 duration-300",
        scale: "animate-in zoom-in-95 duration-300",
        bounce: "animate-in bounce-in duration-500",
        pulse: "animate-pulse",
        spin: "animate-spin",
      },
      
      // Hover variants
      hover: {
        none: "",
        lift: "hover:shadow-xl hover:-translate-y-1 hover:shadow-black/20 transition-all duration-300 ease-out",
        glow: "hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 ease-out",
        scale: "hover:scale-[1.02] transition-transform duration-300 ease-out",
        opacity: "hover:opacity-90 transition-opacity duration-300 ease-out",
        background: "hover:bg-muted/80 transition-colors duration-300 ease-out",
      },
      
      // Focus variants
      focus: {
        none: "",
        ring: "focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background",
        glow: "focus-within:shadow-xl focus-within:shadow-primary/30",
      },
      
      // Responsive variants
      responsive: {
        none: "",
        sm: "sm:grid-cols-2 sm:gap-4",
        md: "md:grid-cols-3 md:gap-6",
        lg: "lg:grid-cols-4 lg:gap-8",
        xl: "xl:grid-cols-5 xl:gap-10",
      },
      
      // Direction support
      direction: {
        ltr: "text-left",
        rtl: "text-right",
        auto: "",
      },
      
      // Disabled state
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      cols: 1,
      rows: "auto",
      gap: 0,
      autoFlow: "row",
      autoCols: "auto",
      autoRows: "auto",
      justifyItems: "stretch",
      alignItems: "stretch",
      justifyContent: "start",
      alignContent: "stretch",
      placeItems: "stretch",
      placeContent: "start",
      size: "md",
      shape: "md",
      shadow: "none",
      background: "none",
      border: "none",
      animation: "none",
      hover: "none",
      focus: "none",
      responsive: "none",
      direction: "auto",
      disabled: false,
    },
  }
);
