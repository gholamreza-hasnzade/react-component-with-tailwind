import React, { useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
export type ModalPosition = "center" | "top" | "bottom";

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children: React.ReactNode;
  /** Size of the modal */
  size?: ModalSize;
  /** Position of the modal */
  position?: ModalPosition;
  /** Whether to show close button */
  showCloseButton?: boolean;
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Whether to prevent body scroll when open */
  preventBodyScroll?: boolean;
  /** Whether to show backdrop */
  showBackdrop?: boolean;
  /** Whether to animate the modal */
  animate?: boolean;
  /** Whether to allow content scrolling */
  scrollable?: boolean;
  /** Maximum height of modal (e.g., "80vh", "600px") */
  maxHeight?: string;
  /** Whether to make modal fullscreen on mobile */
  fullscreenOnMobile?: boolean;
  /** Additional CSS classes for the modal */
  className?: string;
  /** Additional CSS classes for the backdrop */
  backdropClassName?: string;
  /** Additional CSS classes for the content */
  contentClassName?: string;
  /** Additional CSS classes for the header */
  headerClassName?: string;
  /** Additional CSS classes for the body */
  bodyClassName?: string;
  /** Additional CSS classes for the footer */
  footerClassName?: string;
  /** Footer content */
  footer?: React.ReactNode;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  position = "center",
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  preventBodyScroll = true,
  showBackdrop = true,
  animate = true,
  scrollable = false,
  maxHeight,
  fullscreenOnMobile = false,
  className,
  backdropClassName,
  contentClassName,
  headerClassName,
  bodyClassName,
  footerClassName,
  footer,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    },
    [onClose, closeOnEscape]
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget && closeOnBackdropClick) {
        onClose();
      }
    },
    [onClose, closeOnBackdropClick]
  );

  // Handle close button click
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Focus management
  const handleFocusTrap = useCallback(
    (event: KeyboardEvent) => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length === 0) return;

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
      // Store previous active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Prevent body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = "hidden";
      }

      // Add event listeners
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("keydown", handleFocusTrap);

      // Focus first focusable element
      setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      }, 100);
    }

    return () => {
      // Restore body scroll
      if (preventBodyScroll) {
        document.body.style.overflow = "";
      }

      // Remove event listeners
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("keydown", handleFocusTrap);

      // Restore focus
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, preventBodyScroll, handleEscapeKey, handleFocusTrap]);

  // Don't render if not open
  if (!isOpen) return null;

  // Size classes with responsive design
  const sizeClasses = {
    sm: "max-w-sm w-[95vw] sm:w-auto",
    md: "max-w-md w-[95vw] sm:w-auto",
    lg: "max-w-lg w-[95vw] sm:w-auto",
    xl: "max-w-xl w-[95vw] sm:w-auto",
    full: "max-w-full w-[95vw] mx-4"
  };

  // Responsive classes
  const responsiveClasses = clsx(
    // Mobile fullscreen
    fullscreenOnMobile && "sm:max-h-none max-h-screen sm:max-h-none",
    // Responsive margins
    "mx-2 sm:mx-4",
    // Fixed height for scrollable modals to ensure header/footer visibility
    scrollable && "h-[90vh] sm:h-[85vh]",
    maxHeight && `max-h-[${maxHeight}]`
  );

  // Position classes with responsive design
  const positionClasses = {
    center: "items-center",
    top: "items-start pt-4 sm:pt-16",
    bottom: "items-end pb-4 sm:pb-16"
  };

  // Animation classes
  const animationClasses = animate
    ? "animate-in fade-in duration-200 zoom-in-95"
    : "";

  return (
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          className={clsx(
            "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 h-screen",
            fullscreenOnMobile && "sm:backdrop-blur-sm backdrop-blur-none",
            animate && "animate-in fade-in duration-200",
            backdropClassName
          )}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Modal */}
      <div
        className={clsx(
          "fixed inset-0 z-50 flex justify-center h-screen",
          positionClasses[position],
          fullscreenOnMobile && "sm:items-center items-stretch",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby="modal-content"
      >
        <div
          ref={modalRef}
          className={clsx(
            "relative bg-white rounded-lg shadow-xl border border-gray-200 w-full flex flex-col",
            sizeClasses[size],
            responsiveClasses,
            animationClasses,
            contentClassName
          )}
          style={scrollable ? { 
            height: '90vh',
            maxHeight: '90vh'
          } : undefined}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div
              className={clsx(
                "flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0 bg-blue-50",
                headerClassName
              )}
            >
              {title && (
                <h2
                  id="modal-title"
                  className="text-lg font-semibold text-gray-900"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={handleCloseClick}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div
            id="modal-content"
            className={clsx(
              "p-6 flex-1",
              scrollable && "overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100",
              bodyClassName
            )}
            style={scrollable ? { 
              maxHeight: 'calc(90vh - 120px)', // Subtract header + footer height
              minHeight: 0 
            } : undefined}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={clsx(
                "flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0",
                footerClassName
              )}
            >
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};