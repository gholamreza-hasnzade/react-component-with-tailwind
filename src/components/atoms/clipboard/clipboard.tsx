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
      onCopy,
      ...props
    },
    ref
  ) => {
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleCopy = useCallback(async () => {
      if (!text.trim()) return;

      setIsLoading(true);
      
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        onCopy?.(text);
        
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      } finally {
        setIsLoading(false);
      }
    }, [text, onCopy]);

    return (
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
    );
  }
);

Clipboard.displayName = "Clipboard";
