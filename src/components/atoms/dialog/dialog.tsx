import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FaTimes, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogVariant = "default" | "success" | "warning" | "error" | "info";
type DialogPosition = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: DialogSize;
  variant?: DialogVariant;
  position?: DialogPosition;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventScroll?: boolean;
  className?: string;
  overlayClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  actions?: React.ReactNode;
  mobileFullScreen?: boolean;
  tabletFullScreen?: boolean;
  animationDuration?: number;
  showAnimation?: boolean;
}

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-sm w-[90vw] max-h-[80vh]",
  md: "max-w-md w-[90vw] max-h-[80vh]",
  lg: "max-w-lg w-[90vw] max-h-[85vh]",
  xl: "max-w-xl w-[90vw] max-h-[85vh]",
  full: "max-w-full w-[95vw] h-[90vh] mx-4",
};

const positionClasses: Record<DialogPosition, string> = {
  center: "items-center justify-center",
  top: "items-start justify-center pt-8 sm:pt-16",
  bottom: "items-end justify-center pb-8 sm:pb-16",
  left: "items-center justify-start pl-4 sm:pl-16",
  right: "items-center justify-end pr-4 sm:pr-16",
  "top-left": "items-start justify-start pt-8 pl-4 sm:pt-16 sm:pl-16",
  "top-right": "items-start justify-end pt-8 pr-4 sm:pt-16 sm:pr-16",
  "bottom-left": "items-end justify-start pb-8 pl-4 sm:pb-16 sm:pl-16",
  "bottom-right": "items-end justify-end pb-8 pr-4 sm:pb-16 sm:pr-16",
  "center-left": "items-center justify-start pl-4 sm:pl-16",
  "center-right": "items-center justify-end pr-4 sm:pr-16",
};

const variantConfigs = {
  default: {
    icon: <FaInfoCircle className="w-6 h-6 text-blue-500" />,
    headerColor: "text-gray-900",
    borderColor: "border-gray-200",
  },
  success: {
    icon: <FaCheckCircle className="w-6 h-6 text-green-500" />,
    headerColor: "text-green-900",
    borderColor: "border-green-200",
  },
  warning: {
    icon: <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />,
    headerColor: "text-yellow-900",
    borderColor: "border-yellow-200",
  },
  error: {
    icon: <FaExclamationCircle className="w-6 h-6 text-red-500" />,
    headerColor: "text-red-900",
    borderColor: "border-red-200",
  },
  info: {
    icon: <FaInfoCircle className="w-6 h-6 text-blue-500" />,
    headerColor: "text-blue-900",
    borderColor: "border-blue-200",
  },
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  variant = "default",
  position = "center",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  preventScroll = true,
  className,
  overlayClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  icon,
  showIcon = false,
  actions,
  mobileFullScreen = false,
  tabletFullScreen = false,
  animationDuration = 200,
  showAnimation = true,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === overlayRef.current && closeOnOverlayClick) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  const handleFocusTrap = useCallback(
    (event: KeyboardEvent) => {
      if (!dialogRef.current) return;

      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.key === "Tab") {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    },
    []
  );

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }

      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("keydown", handleFocusTrap);

      setTimeout(() => {
        if (dialogRef.current) {
          const firstFocusable = dialogRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }, 100);
    } else {
      if (preventScroll) {
        document.body.style.overflow = "";
      }

      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleFocusTrap);
      if (preventScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, preventScroll, handleEscapeKey, handleFocusTrap]);

  if (!isOpen) return null;

  const variantConfig = variantConfigs[variant];
  const displayIcon = showIcon ? (icon || variantConfig.icon) : null;

  const responsiveSizeClasses = clsx(
    sizeClasses[size],
    mobileFullScreen && "sm:max-w-none sm:mx-0 sm:h-full sm:max-h-full sm:w-full",
    tabletFullScreen && "md:max-w-none md:mx-0 md:h-full md:max-h-full md:w-full"
  );

  const responsivePositionClasses = clsx(
    positionClasses[position],
    // Override positioning for full-screen modes
    mobileFullScreen && "sm:items-center sm:justify-center sm:pt-0 sm:pb-0 sm:pl-0 sm:pr-0",
    tabletFullScreen && "md:items-center md:justify-center md:pt-0 md:pb-0 md:pl-0 md:pr-0"
  );

  const animationClasses = showAnimation
    ? "animate-in fade-in-0 zoom-in-95 duration-200"
    : "";

  const dialogContent = (
    <div
      ref={overlayRef}
      className={clsx(
        "fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm transition-all duration-200",
        responsivePositionClasses,
        overlayClassName
      )}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "dialog-title" : undefined}
    >
      <div
        ref={dialogRef}
        className={clsx(
          "relative bg-white rounded-lg shadow-xl border flex flex-col max-h-[90vh] overflow-hidden",
          variantConfig.borderColor,
          responsiveSizeClasses,
          animationClasses,
          className
        )}
        style={{
          animationDuration: `${animationDuration}ms`,
        }}
      >
        {/* Header */}
        {(title || showIcon || showCloseButton) && (
          <div
            className={clsx(
              "flex items-center justify-between p-4 border-b bg-gray-50/50",
              variantConfig.borderColor,
              headerClassName
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {displayIcon && <div className="flex-shrink-0">{displayIcon}</div>}
              {title && (
                <h2
                  id="dialog-title"
                  className={clsx(
                    "text-lg font-semibold truncate",
                    variantConfig.headerColor
                  )}
                >
                  {title}
                </h2>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                aria-label="Close dialog"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={clsx("p-4 overflow-y-auto flex-1", bodyClassName)}>
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div
            className={clsx(
              "flex items-center justify-end gap-3 p-4 border-t bg-gray-50/30",
              variantConfig.borderColor,
              footerClassName
            )}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(dialogContent, document.body);
};

export const ConfirmDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: DialogVariant;
  size?: DialogSize;
}> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "warning",
  size = "md",
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      variant={variant}
      showIcon
      actions={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-gray-600 leading-relaxed">{message}</p>
    </Dialog>
  );
};

export const AlertDialog: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  variant?: DialogVariant;
  size?: DialogSize;
}> = ({
  isOpen,
  onClose,
  title = "Alert",
  message,
  variant = "info",
  size = "md",
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      variant={variant}
      showIcon
      actions={
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          OK
        </button>
      }
    >
      <p className="text-gray-600 leading-relaxed">{message}</p>
    </Dialog>
  );
};