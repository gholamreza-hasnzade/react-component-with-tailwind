import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { gridVariants } from "./grid-variants";
import { useTextDirection } from "@/hooks/useTextDirection";

export interface GridProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Omit<VariantProps<typeof gridVariants>, "direction"> {
  children?: React.ReactNode;

  direction?: "ltr" | "rtl" | "auto";
  disabled?: boolean;
  className?: string;
  debug?: boolean;
  inline?: boolean;
  
  // Grid item properties
  colSpan?: string | number;
  rowSpan?: string | number;
  colStart?: string | number;
  colEnd?: string | number;
  rowStart?: string | number;
  rowEnd?: string | number;
  placeSelf?: "auto" | "start" | "end" | "center" | "stretch";
  
  // Custom grid template
  gridTemplate?: string;
  gridTemplateColumns?: string;
  gridTemplateRows?: string;
  gridTemplateAreas?: string;
  
  // Container queries
  container?: boolean;
  containerType?: "inline-size" | "block-size" | "size";
  
  // Layout properties
  aspectRatio?: string | number;
  overflow?: "auto" | "hidden" | "clip" | "visible" | "scroll";
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
  zIndex?: string | number;
  transform?: boolean;
  transition?: boolean;
  filter?: boolean;
  backdropFilter?: boolean;
  mixBlendMode?:
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";
  isolation?: "isolate" | "auto";
  willChange?:
    | "auto"
    | "scroll-position"
    | "contents"
    | "transform"
    | "opacity";
  contain?:
    | "none"
    | "strict"
    | "content"
    | "size"
    | "layout"
    | "style"
    | "paint";
  contentVisibility?: "visible" | "auto" | "hidden";
  scrollBehavior?: "auto" | "smooth";
  scrollSnapType?: "none" | "x" | "y" | "both" | "mandatory" | "proximity";
  scrollSnapAlign?: "none" | "start" | "end" | "center";
  scrollSnapStop?: "normal" | "always";
  scrollMargin?: string | number;
  scrollPadding?: string | number;
  scrollbar?: "auto" | "hidden" | "none";
  scrollbarWidth?: "auto" | "thin" | "none";
  scrollbarColor?: string;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      className,
      direction = "auto",
      disabled = false,
      debug = false,
      inline = false,
      colSpan,
      rowSpan,
      colStart,
      colEnd,
      rowStart,
      rowEnd,
      placeSelf,
      gridTemplate,
      gridTemplateColumns,
      gridTemplateRows,
      gridTemplateAreas,
      container = false,
      containerType,
      aspectRatio,
      overflow,
      position,
      zIndex,
      transform = false,
      transition = false,
      filter = false,
      backdropFilter = false,
      mixBlendMode,
      isolation,
      willChange,
      contain,
      contentVisibility,
      scrollBehavior,
      scrollSnapType,
      scrollSnapAlign,
      scrollSnapStop,
      scrollMargin,
      scrollPadding,
      scrollbar,
      scrollbarWidth,
      scrollbarColor,
      cols,
      rows,
      gap,
      gapX,
      gapY,
      autoFlow,
      autoCols,
      autoRows,
      justifyItems,
      alignItems,
      justifyContent,
      alignContent,
      placeItems,
      placeContent,
      size,
      shape,
      shadow,
      background,
      border,
      animation,
      hover,
      focus,
      responsive,
      ...props
    },
    ref
  ) => {
    const { direction: detectedDirection } = useTextDirection();

    // Use provided direction or detected direction
    const currentDirection =
      direction === "auto" ? detectedDirection : direction;

    // Build dynamic styles
    const dynamicStyles: React.CSSProperties = {};

    // Grid item properties
    if (colSpan !== undefined) {
      dynamicStyles.gridColumn = typeof colSpan === "number" ? `span ${colSpan}` : colSpan;
    }
    if (rowSpan !== undefined) {
      dynamicStyles.gridRow = typeof rowSpan === "number" ? `span ${rowSpan}` : rowSpan;
    }
    if (colStart !== undefined) {
      dynamicStyles.gridColumnStart = typeof colStart === "number" ? colStart : colStart;
    }
    if (colEnd !== undefined) {
      dynamicStyles.gridColumnEnd = typeof colEnd === "number" ? colEnd : colEnd;
    }
    if (rowStart !== undefined) {
      dynamicStyles.gridRowStart = typeof rowStart === "number" ? rowStart : rowStart;
    }
    if (rowEnd !== undefined) {
      dynamicStyles.gridRowEnd = typeof rowEnd === "number" ? rowEnd : rowEnd;
    }
    if (placeSelf !== undefined) {
      dynamicStyles.placeSelf = placeSelf;
    }

    // Custom grid template
    if (gridTemplate !== undefined) {
      dynamicStyles.gridTemplate = gridTemplate;
    }
    if (gridTemplateColumns !== undefined) {
      dynamicStyles.gridTemplateColumns = gridTemplateColumns;
    }
    if (gridTemplateRows !== undefined) {
      dynamicStyles.gridTemplateRows = gridTemplateRows;
    }
    if (gridTemplateAreas !== undefined) {
      dynamicStyles.gridTemplateAreas = gridTemplateAreas;
    }

    // Container properties
    if (container) {
      if (containerType !== undefined) {
        (dynamicStyles as Record<string, unknown>).containerType = containerType;
      }
    }

    // Aspect ratio
    if (aspectRatio !== undefined) {
      dynamicStyles.aspectRatio =
        typeof aspectRatio === "number" ? aspectRatio.toString() : aspectRatio;
    }

    // Overflow
    if (overflow !== undefined) {
      dynamicStyles.overflow = overflow;
    }

    // Position
    if (position !== undefined) {
      dynamicStyles.position = position;
    }
    if (zIndex !== undefined) {
      dynamicStyles.zIndex = typeof zIndex === "number" ? zIndex : zIndex;
    }

    // Transform
    if (transform) {
      dynamicStyles.transform = "translateZ(0)";
    }

    // Transition
    if (transition) {
      dynamicStyles.transition = "all 0.3s ease-in-out";
    }

    // Filter
    if (filter) {
      dynamicStyles.filter = "blur(0)";
    }

    // Backdrop filter
    if (backdropFilter) {
      dynamicStyles.backdropFilter = "blur(0)";
    }

    // Mix blend mode
    if (mixBlendMode !== undefined) {
      dynamicStyles.mixBlendMode = mixBlendMode;
    }

    // Isolation
    if (isolation !== undefined) {
      dynamicStyles.isolation = isolation;
    }

    // Will change
    if (willChange !== undefined) {
      dynamicStyles.willChange = willChange;
    }

    // Contain
    if (contain !== undefined) {
      dynamicStyles.contain = contain;
    }

    // Content visibility
    if (contentVisibility !== undefined) {
      dynamicStyles.contentVisibility = contentVisibility;
    }

    // Scroll behavior
    if (scrollBehavior !== undefined) {
      dynamicStyles.scrollBehavior = scrollBehavior;
    }

    // Scroll snap
    if (scrollSnapType !== undefined) {
      dynamicStyles.scrollSnapType = scrollSnapType;
    }
    if (scrollSnapAlign !== undefined) {
      dynamicStyles.scrollSnapAlign = scrollSnapAlign;
    }
    if (scrollSnapStop !== undefined) {
      dynamicStyles.scrollSnapStop = scrollSnapStop;
    }

    // Scroll margin and padding
    if (scrollMargin !== undefined) {
      dynamicStyles.scrollMargin =
        typeof scrollMargin === "number" ? `${scrollMargin}px` : scrollMargin;
    }
    if (scrollPadding !== undefined) {
      dynamicStyles.scrollPadding =
        typeof scrollPadding === "number"
          ? `${scrollPadding}px`
          : scrollPadding;
    }

    // Scrollbar properties
    if (scrollbar !== undefined) {
      (dynamicStyles as Record<string, unknown>).scrollbarWidth = scrollbar;
    }
    if (scrollbarWidth !== undefined) {
      dynamicStyles.scrollbarWidth = scrollbarWidth;
    }
    if (scrollbarColor !== undefined) {
      dynamicStyles.scrollbarColor = scrollbarColor;
    }

    // Build class names
    const gridClasses = cn(
      gridVariants({
        direction: currentDirection,
        disabled,
        cols,
        rows,
        gap,
        // Only apply gapX and gapY if they are explicitly provided
        ...(gapX !== undefined && { gapX }),
        ...(gapY !== undefined && { gapY }),
        autoFlow,
        autoCols,
        autoRows,
        justifyItems,
        alignItems,
        justifyContent,
        alignContent,
        placeItems,
        placeContent,
        size,
        shape,
        shadow,
        background,
        border,
        animation,
        hover,
        focus,
        responsive,
        ...props,
      }),
      inline && "inline-grid",
      container && "container",
      debug && "border-2 border-red-500 border-dashed",
      className
    );

    // Debug logging
    if (debug) {
      console.log('Grid classes:', gridClasses);
      console.log('Cols value:', cols);
      console.log('Rows value:', rows);
      console.log('Gap value:', gap);
    }

    return (
      <div
        ref={ref}
        className={gridClasses}
        style={dynamicStyles}
        dir={currentDirection}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export { Grid };