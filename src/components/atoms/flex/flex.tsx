import React from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { flexVariants } from "./flex-variants";
import { useTextDirection } from "@/hooks/useTextDirection";

export interface FlexProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "dir">,
    Omit<VariantProps<typeof flexVariants>, "direction"> {
  children?: React.ReactNode;

  direction?: "ltr" | "rtl" | "auto";
  disabled?: boolean;
  className?: string;
  debug?: boolean;
  inline?: boolean;
  flex?: boolean | string;
  grow?: boolean | number;
  shrink?: boolean | number;
  basis?: string | number;
  order?: number;
  alignSelf?: "auto" | "start" | "end" | "center" | "baseline" | "stretch";
  grid?: boolean;
  gridCols?: string | number;
  gridRows?: string | number;
  colSpan?: string | number;
  rowSpan?: string | number;
  autoFlow?: "row" | "col" | "dense" | "row-dense" | "col-dense";
  container?: boolean;
  containerType?: "inline-size" | "block-size" | "size";
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

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      children,
      className,
      direction = "auto",
      disabled = false,
      debug = false,
      inline = false,
      flex,
      grow,
      shrink,
      basis,
      order,
      alignSelf,
      grid = false,
      gridCols,
      gridRows,
      colSpan,
      rowSpan,
      autoFlow,
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
      flexDirection,
      wrap,
      justify,
      align,
      alignContent,
      gap,
      gapX,
      gapY,
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

    // Flex properties
    if (flex !== undefined) {
      dynamicStyles.flex =
        typeof flex === "boolean" ? (flex ? "1" : "none") : flex;
    }
    if (grow !== undefined) {
      dynamicStyles.flexGrow =
        typeof grow === "boolean" ? (grow ? 1 : 0) : grow;
    }
    if (shrink !== undefined) {
      dynamicStyles.flexShrink =
        typeof shrink === "boolean" ? (shrink ? 1 : 0) : shrink;
    }
    if (basis !== undefined) {
      dynamicStyles.flexBasis =
        typeof basis === "number" ? `${basis}px` : basis;
    }
    if (order !== undefined) {
      dynamicStyles.order = order;
    }
    if (alignSelf !== undefined) {
      dynamicStyles.alignSelf = alignSelf;
    }

    // Grid properties
    if (grid) {
      if (gridCols !== undefined) {
        dynamicStyles.gridTemplateColumns =
          typeof gridCols === "number" ? `repeat(${gridCols}, 1fr)` : gridCols;
      }
      if (gridRows !== undefined) {
        dynamicStyles.gridTemplateRows =
          typeof gridRows === "number" ? `repeat(${gridRows}, 1fr)` : gridRows;
      }
      if (colSpan !== undefined) {
        dynamicStyles.gridColumn =
          typeof colSpan === "number" ? `span ${colSpan}` : colSpan;
      }
      if (rowSpan !== undefined) {
        dynamicStyles.gridRow =
          typeof rowSpan === "number" ? `span ${rowSpan}` : rowSpan;
      }
      if (autoFlow !== undefined) {
        dynamicStyles.gridAutoFlow = autoFlow;
      }
    }

    // Container properties
    if (container) {
      if (containerType !== undefined) {
        (dynamicStyles as Record<string, unknown>).containerType =
          containerType;
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
    const flexClasses = cn(
      flexVariants({
        direction: currentDirection,
        disabled,
        flexDirection,
        wrap,
        justify,
        align,
        alignContent,
        gap,
        // Only apply gapX and gapY if they are explicitly provided
        ...(gapX !== undefined && { gapX }),
        ...(gapY !== undefined && { gapY }),
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
      inline && "inline-flex",
      grid && "grid",
      container && "container",
      debug && "border-2 border-red-500 border-dashed",
      className
    );

    // Debug logging
    if (debug) {
      console.log('Flex classes:', flexClasses);
      console.log('Gap value:', gap);
      console.log('FlexDirection value:', flexDirection);
    }

    return (
      <div
        ref={ref}
        className={flexClasses}
        style={dynamicStyles}
        dir={currentDirection}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export { Flex };
