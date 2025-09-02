import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { FaCopy, FaCheck } from "react-icons/fa";

export interface ClipboardProps {
  text: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outlined" | "filled" | "ghost";
  color?: "primary" | "secondary" | "success" | "error";
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  showIcon?: boolean;
  showText?: boolean;
  copyText?: string;
  copiedText?: string;
  showToast?: boolean;
  toastPosition?: "top" | "bottom" | "left" | "right" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  toastDuration?: number;
  onCopy?: (text: string) => void;
}

const sizeClasses = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base", 
  lg: "h-12 px-6 text-lg",
};

const variantClasses = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outlined: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  filled: "bg-blue-50 text-blue-600 hover:bg-blue-100",
  ghost: "bg-transparent text-blue-600 hover:bg-blue-50",
};

const colorClasses = {
  primary: "focus:ring-blue-500/20",
  secondary: "focus:ring-gray-500/20", 
  success: "focus:ring-green-500/20",
  error: "focus:ring-red-500/20",
};

const toastPositionClasses = {
  top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
  left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
  "top-left": "bottom-full right-0 mb-2",
  "top-right": "bottom-full left-0 mb-2",
  "bottom-left": "top-full right-0 mt-2",
  "bottom-right": "top-full left-0 mt-2",
};

export const Clipboard = React.forwardRef<HTMLButtonElement, ClipboardProps>(
  (
    {
      text,
      children,
      size = "md",
      variant = "default",
      color = "primary",
      disabled = false,
      className,
      fullWidth = false,
      showIcon = true,
      showText = true,
      copyText = "Copy",
      copiedText = "Copied!",
      showToast = true,
      toastPosition = "top",
      toastDuration = 2000,
      onCopy,
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToastNotification, setShowToastNotification] = useState(false);

    const handleCopy = useCallback(async () => {
      if (!text.trim()) return;

      setIsLoading(true);
      
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setShowToastNotification(true);
        onCopy?.(text);
        
        setTimeout(() => {
          setIsCopied(false);
          setShowToastNotification(false);
        }, toastDuration);
      } catch (err) {
        console.error("Failed to copy:", err);
      } finally {
        setIsLoading(false);
      }
    }, [text, onCopy, toastDuration]);

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          type="button"
          onClick={handleCopy}
          disabled={disabled || !text.trim() || isLoading}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1",
            sizeClasses[size],
            variantClasses[variant],
            colorClasses[color],
            disabled && "opacity-50 cursor-not-allowed",
            fullWidth && "w-full",
            className
          )}
          title={isCopied ? copiedText : copyText}
          aria-label={isCopied ? copiedText : copyText}
          {...props}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          ) : showIcon ? (
            isCopied ? (
              <FaCheck className="h-4 w-4" />
            ) : (
              <FaCopy className="h-4 w-4" />
            )
          ) : null}
          
          {showText && (
            <span>
              {isCopied ? copiedText : copyText}
            </span>
          )}
          
          {children}
        </button>

        {/* Toast Notification */}
        {showToast && showToastNotification && (
          <div
            className={cn(
              "absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ease-in-out",
              toastPositionClasses[toastPosition],
              "animate-in fade-in-0 zoom-in-95"
            )}
          >
            <div className="flex items-center gap-2">
              <FaCheck className="h-3 w-3 text-green-400" />
              <span>{copiedText}</span>
            </div>
            {/* Arrow pointing to button */}
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-900 transform rotate-45",
                toastPosition === "top" && "top-full left-1/2 -translate-x-1/2 -mt-1",
                toastPosition === "bottom" && "bottom-full left-1/2 -translate-x-1/2 -mb-1",
                toastPosition === "left" && "left-full top-1/2 -translate-y-1/2 -ml-1",
                toastPosition === "right" && "right-full top-1/2 -translate-y-1/2 -mr-1",
                toastPosition === "top-left" && "top-full right-2 -mt-1",
                toastPosition === "top-right" && "top-full left-2 -mt-1",
                toastPosition === "bottom-left" && "bottom-full right-2 -mb-1",
                toastPosition === "bottom-right" && "bottom-full left-2 -mb-1"
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

Clipboard.displayName = "Clipboard";
