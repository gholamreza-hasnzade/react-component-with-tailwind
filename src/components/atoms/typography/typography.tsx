import * as React from "react"
import { cn } from "@/lib/utils"
import { useTextDirection } from "@/hooks/useTextDirection"

const variantMap = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent",
  h2: "scroll-m-20 border-b border-gray-200 pb-3 text-3xl font-semibold tracking-tight first:mt-0 text-gray-800",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight text-gray-800",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight text-gray-700",
  h5: "scroll-m-20 text-lg font-semibold tracking-tight text-gray-700",
  h6: "scroll-m-20 text-base font-semibold tracking-tight text-gray-600",
  p: "leading-7 [&:not(:first-child)]:mt-6 text-gray-600",
  lead: "text-xl text-gray-500 leading-relaxed font-medium",
  large: "text-lg font-semibold text-gray-700",
  small: "text-sm font-medium leading-none text-gray-500",
  muted: "text-sm text-gray-400",
  code: "relative rounded-md bg-gray-100 px-2 py-1 font-mono text-sm font-semibold text-gray-800 border border-gray-200",
  blockquote: "mt-6 border-l-4 border-blue-500 pl-6 italic text-gray-700 bg-blue-50 py-4 pr-4 rounded-r-lg",
  list: "my-6 ml-6 list-disc [&>li]:mt-3 text-gray-600 [&>li]:leading-relaxed",
  inlineCode: "relative rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm font-semibold text-gray-800 border border-gray-200",
  table: "w-full overflow-y-auto border border-gray-200 rounded-lg shadow-sm",
  tableHeader: "border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-700 bg-gray-50",
  tableCell: "border-b border-gray-100 px-4 py-3 text-left text-gray-600",
  tableRow: "[&_td:first-child]:pl-0 [&_td:last-child]:pr-0 hover:bg-gray-50 transition-colors",
};

const colorMap = {
  default: "text-gray-900",
  muted: "text-gray-500",
  primary: "text-blue-600",
  secondary: "text-gray-600",
  accent: "text-purple-600",
  destructive: "text-red-600",
  success: "text-emerald-600",
  warning: "text-amber-600",
  info: "text-sky-600",
  white: "text-white",
  black: "text-gray-900",
  gray: "text-gray-600",
  slate: "text-slate-600",
  zinc: "text-zinc-600",
  neutral: "text-neutral-600",
  stone: "text-stone-600",
  red: "text-red-600",
  orange: "text-orange-600",
  amber: "text-amber-600",
  yellow: "text-yellow-600",
  lime: "text-lime-600",
  green: "text-green-600",
  emerald: "text-emerald-600",
  teal: "text-teal-600",
  cyan: "text-cyan-600",
  sky: "text-sky-600",
  blue: "text-blue-600",
  indigo: "text-indigo-600",
  violet: "text-violet-600",
  purple: "text-purple-600",
  fuchsia: "text-fuchsia-600",
  pink: "text-pink-600",
  rose: "text-rose-600",
};

const sizeMap = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
  "7xl": "text-7xl",
  "8xl": "text-8xl",
  "9xl": "text-9xl",
};

const weightMap = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const alignMap = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

type VariantKey = keyof typeof variantMap;
type ColorKey = keyof typeof colorMap;
type SizeKey = keyof typeof sizeMap;
type WeightKey = keyof typeof weightMap;
type AlignKey = keyof typeof alignMap;

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: VariantKey;
  color?: ColorKey;
  size?: SizeKey;
  weight?: WeightKey;
  align?: AlignKey;
  dir?: "ltr" | "rtl" | "auto";
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
  truncate?: boolean;
  noWrap?: boolean;
  underline?: boolean;
  italic?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
}

function Typography({
  variant = "p",
  color = "default",
  size,
  weight,
  align = "left",
  dir,
  as,
  className,
  children,
  truncate = false,
  noWrap = false,
  underline = false,
  italic = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  ...props
}: TypographyProps) {
  const { direction: textDirection } = useTextDirection({ 
    defaultDirection: dir || "auto",
    detectFromDOM: true,
    detectFromLocale: true
  });
  
  // Determine the HTML element to render
  const Component = as || getDefaultElement(variant);

  // Get direction-aware alignment
  const getDirectionAwareAlignment = () => {
    if (align === "left") {
      return textDirection === "rtl" ? "text-right" : "text-left";
    }
    if (align === "right") {
      return textDirection === "rtl" ? "text-left" : "text-right";
    }
    return alignMap[align];
  };

  // Build the className
  const classes = cn(
    // Base variant styles
    variantMap[variant],
    // Color
    colorMap[color],
    // Size (only if not overridden by variant)
    !variant.startsWith('h') && size && sizeMap[size],
    // Weight (only if not overridden by variant)
    !variant.startsWith('h') && weight && weightMap[weight],
    // Direction-aware alignment
    getDirectionAwareAlignment(),
    // Text utilities
    truncate && "truncate",
    noWrap && "whitespace-nowrap",
    underline && "underline",
    italic && "italic",
    uppercase && "uppercase",
    lowercase && "lowercase",
    capitalize && "capitalize",
    className
  );

  return (
    <Component 
      className={classes} 
      dir={textDirection}
      {...props}
    >
      {children}
    </Component>
  );
}

// Helper function to determine default HTML element based on variant
function getDefaultElement(variant: VariantKey): React.ElementType {
  switch (variant) {
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return variant;
    case "p":
      return "p";
    case "lead":
      return "p";
    case "large":
      return "div";
    case "small":
      return "small";
    case "muted":
      return "p";
    case "code":
      return "code";
    case "blockquote":
      return "blockquote";
    case "list":
      return "ul";
    case "inlineCode":
      return "code";
    case "table":
      return "table";
    case "tableHeader":
      return "th";
    case "tableCell":
      return "td";
    case "tableRow":
      return "tr";
    default:
      return "div";
  }
}

// Convenience components for common use cases
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const P = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="p" {...props} />
);

export const Lead = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="lead" {...props} />
);

export const Large = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="large" {...props} />
);

export const Small = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" {...props} />
);

export const Muted = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="muted" {...props} />
);

export const Code = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="code" {...props} />
);

export const Blockquote = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="blockquote" {...props} />
);

export const List = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="list" {...props} />
);

export const InlineCode = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="inlineCode" {...props} />
);

export { Typography }
export default Typography
