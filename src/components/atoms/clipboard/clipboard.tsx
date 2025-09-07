import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaCopy, FaCheck, FaSpinner } from "react-icons/fa";
import {
  clipboardVariants,
  type ClipboardVariants,
} from "./clipboard-variants";

export interface ClipboardProps
  extends Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "color" | "onCopy" | "onError"
    >,
    ClipboardVariants {
  text: string;
  children?: React.ReactNode;
  showIcon?: boolean;
  showText?: boolean;
  copyText?: string;
  copiedText?: string;
  showToast?: boolean;
  toastPosition?:
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right";
  toastDuration?: number;
  onCopy?: (text: string) => void;
  onError?: (error: Error) => void;
  loadingText?: string;
  iconSize?: "sm" | "md" | "lg";
  minDisplayTime?: number;
}

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export const Clipboard = React.forwardRef<HTMLButtonElement, ClipboardProps>(
  (
    {
      text,
      children,
      variant = "contained",
      color = "primary",
      size = "md",
      rounded = "default",
      fullWidth = false,
      iconOnly = false,
      disabled = false,
      className,
      showIcon = true,
      showText = true,
      copyText = "Copy",
      copiedText = "Copied!",
      showToast = true,
      toastPosition = "top",
      toastDuration = 2000,
      onCopy,
      onError,
      loadingText = "Copying...",
      iconSize = "md",
      minDisplayTime = 1000,
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showToastNotification, setShowToastNotification] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    const handleCopy = useCallback(async () => {
      if (!text.trim() || disabled || isLoading) return;

      setIsLoading(true);
      setError(null);

      try {
        // Check if clipboard API is available
        if (!navigator.clipboard) {
          throw new Error("Clipboard API not supported in this browser");
        }

        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setShowToastNotification(true);
        onCopy?.(text);

        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set new timeout with minimum display time
        const actualDuration = Math.max(toastDuration, minDisplayTime);

        timeoutRef.current = setTimeout(() => {
          setIsCopied(false);
          setShowToastNotification(false);
        }, actualDuration);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to copy text";
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
        console.error("Failed to copy:", err);
      } finally {
        setIsLoading(false);
      }
    }, [
      text,
      disabled,
      isLoading,
      onCopy,
      onError,
      toastDuration,
      minDisplayTime,
    ]);

    // Toast position classes
    const getToastPositionClasses = () => {
      switch (toastPosition) {
        case "top":
          return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
        case "bottom":
          return "top-full left-1/2 transform -translate-x-1/2 mt-2";
        case "left":
          return "right-full top-1/2 transform -translate-y-1/2 mr-2";
        case "right":
          return "left-full top-1/2 transform -translate-y-1/2 ml-2";
        case "top-left":
          return "bottom-full left-0 mb-2";
        case "top-right":
          return "bottom-full right-0 mb-2";
        case "bottom-left":
          return "top-full left-0 mt-2";
        case "bottom-right":
          return "top-full right-0 mt-2";
        default:
          return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      }
    };

    const isDisabled = disabled || !text.trim() || isLoading;
    const displayText = isLoading
      ? loadingText
      : isCopied
      ? copiedText
      : copyText;

    return (
      <div className={cn("relative", fullWidth ? "w-full" : "inline-block")}>
        <button
          ref={ref}
          type="button"
          onClick={handleCopy}
          disabled={isDisabled}
          className={cn(
            clipboardVariants({
              variant,
              color,
              size,
              rounded,
              fullWidth,
              iconOnly,
            }),
            className
          )}
          title={displayText}
          aria-label={displayText}
          aria-describedby={error ? "clipboard-error" : undefined}
          {...props}
        >
          {/* Loading spinner */}
          {isLoading ? (
            <FaSpinner
              className={cn("animate-spin", iconSizeClasses[iconSize])}
            />
          ) : showIcon ? (
            isCopied ? (
              <FaCheck className={iconSizeClasses[iconSize]} />
            ) : (
              <FaCopy className={iconSizeClasses[iconSize]} />
            )
          ) : null}
          {showText && <span className="font-medium">{displayText}</span>}
          {children}
        </button>

        {error && (
          <div
            id="clipboard-error"
            className="absolute top-full left-0 mt-1 text-xs text-red-600 whitespace-nowrap"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
        {showToast && showToastNotification && (
          <div
            className={cn(
              "absolute z-50 px-3 py-2 text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ease-in-out",
              "bg-gray-900 text-white border border-gray-700",
              getToastPositionClasses()
            )}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <FaCheck className="h-3 w-3 text-green-400 flex-shrink-0" />
              <span className="font-medium">{copiedText}</span>
            </div>
            <div
              className={cn(
                "absolute w-2 h-2 bg-gray-900 border border-gray-700 transform rotate-45",
                toastPosition === "top" &&
                  "top-full left-1/2 -translate-x-1/2 -translate-y-1/2",
                toastPosition === "bottom" &&
                  "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2",
                toastPosition === "left" &&
                  "left-full top-1/2 -translate-y-1/2 -translate-x-1/2",
                toastPosition === "right" &&
                  "right-full top-1/2 -translate-y-1/2 translate-x-1/2",
                toastPosition === "top-left" &&
                  "top-full left-3 -translate-y-1/2",
                toastPosition === "top-right" &&
                  "top-full right-3 -translate-y-1/2",
                toastPosition === "bottom-left" &&
                  "bottom-full left-3 translate-y-1/2",
                toastPosition === "bottom-right" &&
                  "bottom-full right-3 translate-y-1/2"
              )}
            />
          </div>
        )}
      </div>
    );
  }
);

Clipboard.displayName = "Clipboard";
