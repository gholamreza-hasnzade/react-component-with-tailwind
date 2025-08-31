import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type DrawerPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "bottom-center"
  | "center";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  position?: DrawerPosition;
  size?: string | number;
  mobileSize?: string | number;
  showBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  children: React.ReactNode;
  animate?: boolean;
  animationDuration?: number;
  lockBodyScroll?: boolean;
  mobileOptimized?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = "right",
  size = "400px",
  mobileSize,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  children,
  animate = true,
  animationDuration = 500,
  lockBodyScroll = true,
  mobileOptimized = true,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeOnEscape, open, onClose]);

  useEffect(() => {
    if (!lockBodyScroll) return;

    if (open) {
      document.body.style.overflow = "hidden";
      if (mobileOptimized && isMobile) {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      }
    } else {
      document.body.style.overflow = "";
      if (mobileOptimized && isMobile) {
        document.body.style.position = "";
        document.body.style.width = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (mobileOptimized && isMobile) {
        document.body.style.position = "";
        document.body.style.width = "";
      }
    };
  }, [open, lockBodyScroll, mobileOptimized, isMobile]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === backdropRef.current) {
      onClose();
    }
  };

  const handleDrawerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const getPositionStyles = (): React.CSSProperties => {
    const actualSize = isMobile && mobileSize ? mobileSize : size;

    const baseStyles: React.CSSProperties = {
      position: "fixed",
      zIndex: 1000,
      transition: animate
        ? `all ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        : "none",
      minWidth:
        position === "left" ||
        position === "right" ||
        position === "top-left" ||
        position === "top-right" ||
        position === "bottom-left" ||
        position === "bottom-right"
          ? isMobile
            ? "85vw"
            : "280px"
          : "auto",
      minHeight:
        position === "top" ||
        position === "bottom" ||
        position === "top-left" ||
        position === "top-right" ||
        position === "bottom-left" ||
        position === "bottom-right"
          ? isMobile
            ? "50vh"
            : "200px"
          : "auto",
      maxWidth:
        position === "left" ||
        position === "right" ||
        position === "top-left" ||
        position === "top-right" ||
        position === "bottom-left" ||
        position === "bottom-right"
          ? isMobile
            ? "95vw"
            : "90vw"
          : "auto",
      maxHeight:
        position === "top" ||
        position === "bottom" ||
        position === "top-left" ||
        position === "top-right" ||
        position === "bottom-left" ||
        position === "bottom-right"
          ? isMobile
            ? "90vh"
            : "90vh"
          : "auto",
    };

    switch (position) {
      case "top":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open ? "translateY(0)" : "translateY(-100%)",
          opacity: open ? 1 : 0,
        };
      case "bottom":
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open ? "translateY(0)" : "translateY(100%)",
          opacity: open ? 1 : 0,
        };
      case "left":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          bottom: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          opacity: open ? 1 : 0,
        };
      case "right":
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          bottom: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open ? "translateX(0)" : "translateX(100%)",
          opacity: open ? 1 : 0,
        };
      case "top-left":
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open
            ? "translate(0, 0) scale(1)"
            : "translate(-100%, -100%) scale(0.8)",
          opacity: open ? 1 : 0,
          borderRadius: "0 0 100% 0",
          overflow: "hidden",
        };
      case "top-right":
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open
            ? "translate(0, 0) scale(1)"
            : "translate(100%, -100%) scale(0.8)",
          opacity: open ? 1 : 0,
          borderRadius: "0 0 0 100%",
          overflow: "hidden",
        };
      case "bottom-left":
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open
            ? "translate(0, 0) scale(1)"
            : "translate(-100%, 100%) scale(0.8)",
          opacity: open ? 1 : 0,
          borderRadius: "0 100% 0 0",
          overflow: "hidden",
        };
      case "bottom-right":
        return {
          ...baseStyles,
          bottom: 0,
          right: 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          transform: open
            ? "translate(0, 0) scale(1)"
            : "translate(100%, 100%) scale(0.8)",
          opacity: open ? 1 : 0,
          borderRadius: "100% 0 0 0",
          overflow: "hidden",
        };
      case "top-center":
        return {
          ...baseStyles,
          top: 0,
          left: "50%",
          transform: open
            ? "translateX(-50%) translateY(0) scale(1)"
            : "translateX(-50%) translateY(-100%) scale(0.9)",
          opacity: open ? 1 : 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          borderRadius: "0 0 20px 20px",
        };
      case "bottom-center":
        return {
          ...baseStyles,
          bottom: 0,
          left: "50%",
          transform: open
            ? "translateX(-50%) translateY(0) scale(1)"
            : "translateX(-50%) translateY(100%) scale(0.9)",
          opacity: open ? 1 : 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          borderRadius: "20px 20px 0 0",
        };
      case "center":
        return {
          ...baseStyles,
          top: "50%",
          left: "50%",
          transform: open
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0.5)",
          opacity: open ? 1 : 0,
          width:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          height:
            typeof actualSize === "number" ? `${actualSize}px` : actualSize,
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        };
      default:
        return baseStyles;
    }
  };

  const getBackdropStyles = (): React.CSSProperties => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isMobile ? "rgba(0, 0, 0, 0.7)" : "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: open ? 1 : 0,
    visibility: open ? "visible" : "hidden",
    transition: animate
      ? `opacity ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), visibility ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
      : "none",
    backdropFilter: open ? (isMobile ? "blur(1px)" : "blur(2px)") : "blur(0px)",
  });

  return createPortal(
    <>
      {showBackdrop && (
        <div
          ref={backdropRef}
          style={getBackdropStyles()}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      <div
        ref={drawerRef}
        style={getPositionStyles()}
        className={cn("bg-white shadow-lg", "focus:outline-none", className)}
        onClick={handleDrawerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
      >
        {children}
      </div>
    </>,
    document.body
  );
};

export interface DrawerHeaderProps {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  onClose,
  showCloseButton = true,
}) => (
  <div
    className={cn("flex items-center justify-between p-4 border-b", className)}
  >
    <div className="flex-1">{children}</div>
    {showCloseButton && onClose && (
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close drawer"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    )}
  </div>
);

export interface DrawerBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({
  children,
  className,
}) => (
  <div className={cn("flex-1 p-4 overflow-y-auto", className)}>{children}</div>
);

export interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({
  children,
  className,
}) => (
  <div className={cn("p-4 border-t bg-gray-50", className)}>{children}</div>
);
