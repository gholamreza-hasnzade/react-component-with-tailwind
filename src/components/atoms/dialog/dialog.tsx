import React, { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import { FaTimes, FaExclamationTriangle, FaInfoCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

type DialogSize = "sm" | "md" | "lg" | "xl" | "full";
type DialogVariant = "default" | "success" | "warning" | "error" | "info";
type DialogPosition = "center" | "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";

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
  // Dynamic content props
  icon?: React.ReactNode;
  showIcon?: boolean;
  actions?: React.ReactNode;
  // Responsive props
  mobileFullScreen?: boolean;
  tabletFullScreen?: boolean;
  // Animation props
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
  top: "items-start justify-center pt-16",
  bottom: "items-end justify-center pb-16",
  left: "items-center justify-end pl-16",
  right: "items-center justify-start pr-16",
  "top-left": "items-start justify-end pt-16 pl-16",
  "top-right": "items-start justify-start pt-16 pr-16",
  "bottom-left": "items-end justify-end pb-16 pl-16",
  "bottom-right": "items-end justify-start pb-16 pr-16",
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

  // Handle escape key
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Handle overlay click
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === overlayRef.current && closeOnOverlayClick) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  // Focus management
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

  // Effects
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }

      // Add event listeners
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("keydown", handleFocusTrap);

      // Focus first focusable element
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
      // Restore body scroll
      if (preventScroll) {
        document.body.style.overflow = "";
      }

      // Restore focus
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

  // Don't render if not open
  if (!isOpen) return null;

  const variantConfig = variantConfigs[variant];
  const displayIcon = showIcon ? (icon || variantConfig.icon) : null;

  // Responsive size classes
  const responsiveSizeClasses = clsx(
    sizeClasses[size],
    mobileFullScreen && "sm:max-w-none sm:mx-0 sm:h-full sm:max-h-full sm:w-full",
    tabletFullScreen && "md:max-w-none md:mx-0 md:h-full md:max-h-full md:w-full"
  );

  const responsiveMarginClasses = clsx(
    position === "left" && "ml-4 sm:ml-8",
    position === "right" && "mr-4 sm:mr-8",
    position === "top" && "mt-4 sm:mt-8",
    position === "bottom" && "mb-4 sm:mb-8",
    !mobileFullScreen && !tabletFullScreen && position === "top-left" && "pb-0 pl-0 mt-4 ml-4 sm:mt-8 sm:ml-8",
    !mobileFullScreen && !tabletFullScreen && position === "top-right" && "pb-0 pl-0 mt-4 mr-4 sm:mt-8 sm:mr-8",
    !mobileFullScreen && !tabletFullScreen && position === "bottom-left" && "pb-0 pl-0 mb-0 ml-0 sm:mb-0 sm:ml-0",
    !mobileFullScreen && !tabletFullScreen && position === "bottom-right" && "pb-0 pl-0 mb-4 mr-4 sm:mb-8 sm:mr-8",
    mobileFullScreen === true && (position === "top-left" || position === "top-right" || position === "bottom-left" || position === "bottom-right") && "!mt-0 !ml-0 !mr-0 !mb-0",
    tabletFullScreen === true && (position === "top-left" || position === "top-right" || position === "bottom-left" || position === "bottom-right") && "md:!mt-0 md:!ml-0 md:!mr-0 md:!mb-0"
  );

  const responsivePositionClasses = clsx(
    (position === "center" || position === "top" || position === "bottom" || position === "left" || position === "right") && positionClasses[position],
    !mobileFullScreen && !tabletFullScreen && positionClasses[position],
    position === "top" && "sm:pt-8",
    position === "bottom" && "sm:pb-8",
    !mobileFullScreen && !tabletFullScreen && position === "top-left" && "sm:pt-8 sm:pl-8",
    !mobileFullScreen && !tabletFullScreen && position === "top-right" && "sm:pt-8 sm:pr-8",
    !mobileFullScreen && !tabletFullScreen && position === "bottom-left" && "sm:pb-8 sm:pl-8",
    !mobileFullScreen && !tabletFullScreen && position === "bottom-right" && "sm:pb-8 sm:pr-8",
    // Only center corner positions when explicitly in responsive mode
    mobileFullScreen === true && (position === "top-left" || position === "top-right" || position === "bottom-left" || position === "bottom-right") && "items-center justify-center",
    tabletFullScreen === true && (position === "top-left" || position === "top-right" || position === "bottom-left" || position === "bottom-right") && "md:items-center md:justify-center"
  );

  // Animation classes
  const animationClasses = showAnimation
    ? "animate-in fade-in-0 zoom-in-95 duration-200"
    : "";

  const dialogContent = (
    <div
      ref={overlayRef}
      className={clsx(
        "fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm",
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
           "relative bg-white rounded-lg shadow-xl border flex flex-col",
           variantConfig.borderColor,
           responsiveSizeClasses,
           responsiveMarginClasses,
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
              "flex items-center justify-between p-4 border-b",
              variantConfig.borderColor,
              headerClassName
            )}
          >
            <div className="flex items-center gap-3">
              {displayIcon && <div className="flex-shrink-0">{displayIcon}</div>}
              {title && (
                <h2
                  id="dialog-title"
                  className={clsx(
                    "text-lg font-semibold",
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
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close dialog"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className={clsx("p-4 overflow-y-auto flex-1", bodyClassName)}>{children}</div>

        {/* Footer */}
        {actions && (
          <div
            className={clsx(
              "flex items-center justify-end gap-3 p-4 border-t",
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

  // Use portal for better accessibility and z-index management
  return createPortal(dialogContent, document.body);
};



// Pre-built Dialog Components
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
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-gray-600">{message}</p>
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
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          OK
        </button>
      }
    >
      <p className="text-gray-600">{message}</p>
    </Dialog>
  );
};

