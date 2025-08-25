import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  disabled?: boolean;
  className?: string;
  maxWidth?: number | string;
  showArrow?: boolean;
  offset?: number;
  tooltipStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  contentClassName?: string;
  allowHtml?: boolean;
  arrowStyle?: React.CSSProperties;
  arrowClassName?: string;
}

interface Position {
  top: number;
  left: number;
}

const ARROW_SIZE = 6;
const DEFAULT_OFFSET = 8;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 300,
  disabled = false,
  className,
  maxWidth = 200,
  showArrow = true,
  offset = DEFAULT_OFFSET,
  tooltipStyle,
  contentStyle,
  contentClassName,
  allowHtml = false,
  arrowStyle,
  arrowClassName,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({
    top: 0,
    left: 0,
  });

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const calculatePosition = useCallback((): Position => {
    if (!triggerRef.current) {
      return { top: 0, left: 0 };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const tooltipWidth =
      typeof maxWidth === "number"
        ? maxWidth
        : typeof maxWidth === "string" && maxWidth.includes("px")
        ? parseInt(maxWidth)
        : 200;
    const halfTooltipWidth = tooltipWidth / 2;

    let top = 0;
    let left = 0;

    switch (position) {
      case "top":
        top = triggerRect.top - 40 - offset;
        left = triggerRect.left + triggerRect.width / 2 - halfTooltipWidth;
        break;
      case "bottom":
        top = triggerRect.bottom + offset;
        left = triggerRect.left + triggerRect.width / 2 - halfTooltipWidth;
        break;
      case "left":
        top = triggerRect.top + triggerRect.height / 2 - 15;
        left = triggerRect.left - tooltipWidth - offset;
        break;
      case "right":
        top = triggerRect.top + triggerRect.height / 2 - 15;
        left = triggerRect.right + offset;
        break;
    }

    if (left < 8) left = 8;
    if (left + tooltipWidth > viewportWidth - 8) {
      left = viewportWidth - tooltipWidth - 8;
    }
    if (top < 8) top = 8;
    if (top + 40 > viewportHeight - 8) {
      top = viewportHeight - 40 - 8;
    }

    return { top, left };
  }, [position, offset, maxWidth]);

  const showTooltip = useCallback(() => {
    if (disabled) return;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(() => {
        const pos = calculatePosition();
        setTooltipPosition(pos);
      });
    }, delay);
  }, [disabled, delay, calculatePosition]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        hideTooltip();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isVisible, hideTooltip]);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      setTooltipPosition(calculatePosition());
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isVisible, calculatePosition]);

  const triggerElement = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    "aria-describedby": isVisible ? "tooltip-content" : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  const tooltipContent = (
    <div
      ref={tooltipRef}
      id="tooltip-content"
      role="tooltip"
      aria-hidden={!isVisible}
      className={cn(
        "fixed z-[9999] pointer-events-none select-none",
        "transition-all duration-200 ease-out",
        className
      )}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        ...(maxWidth && {
          width: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }),
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        visibility: isVisible ? "visible" : "hidden",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        color: "white",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "14px",
        lineHeight: "1.4",
        whiteSpace: maxWidth ? "normal" : "nowrap",
        wordWrap: "break-word",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid rgba(55, 65, 81, 1)",
        ...tooltipStyle,
      }}
    >
      <div
        className={cn("tooltip-content", contentClassName)}
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowWrap: "break-word",
          ...contentStyle,
        }}
        {...(allowHtml && typeof content === "string"
          ? { dangerouslySetInnerHTML: { __html: content } }
          : {})}
      >
        {!allowHtml || typeof content !== "string" ? content : null}
      </div>
      {showArrow && (
        <div
          className={cn("absolute w-0 h-0", arrowClassName)}
          style={{
            [position === "top" || position === "bottom" ? "left" : "top"]:
              "50%",
            [position === "top"
              ? "top"
              : position === "bottom"
              ? "bottom"
              : position === "left"
              ? "left"
              : "right"]: `-${ARROW_SIZE}px`,
            transform:
              position === "top" || position === "bottom"
                ? "translateX(-50%)"
                : "translateY(-50%)",
            borderStyle: "solid",
            borderWidth: `${ARROW_SIZE}px`,
            borderColor:
              position === "top"
                ? "transparent transparent rgba(0, 0, 0, 0.9) transparent"
                : position === "bottom"
                ? "rgba(0, 0, 0, 0.9) transparent transparent transparent"
                : position === "left"
                ? "transparent rgba(0, 0, 0, 0.9) transparent transparent"
                : "transparent transparent transparent rgba(0, 0, 0, 0.9)",
            ...arrowStyle,
          }}
        />
      )}
    </div>
  );

  return (
    <>
      {triggerElement}
      {isVisible && createPortal(tooltipContent, document.body)}
    </>
  );
};
