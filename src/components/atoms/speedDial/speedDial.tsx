import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { FaPlus, FaTimes } from "react-icons/fa";

export interface SpeedDialAction {
  id: string;
  icon: React.ReactNode;
  label: string;
  tooltip?: string;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
}

export interface SpeedDialProps {
  actions: SpeedDialAction[];
  mainIcon?: React.ReactNode;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center";
  direction?: "up" | "down" | "left" | "right";
  defaultOpen?: boolean;
  controlled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showLabels?: boolean;
  showTooltips?: boolean;
  size?: "sm" | "md" | "lg";
  colorScheme?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  closeOnActionClick?: boolean;
  closeOnOutsideClick?: boolean;
  className?: string;
  [key: string]: unknown;
}

const positions = {
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "center": "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
};

const directions = {
  up: "bottom-full mb-3",
  down: "top-full mt-3",
  left: "right-full mr-3",
  right: "left-full ml-3",
};

const sizes = {
  sm: {
    main: "w-12 h-12",
    action: "w-10 h-10",
    icon: "text-lg",
    label: "text-sm",
  },
  md: {
    main: "w-14 h-14",
    action: "w-12 h-12",
    icon: "text-xl",
    label: "text-base",
  },
  lg: {
    main: "w-16 h-16",
    action: "w-14 h-14",
    icon: "text-2xl",
    label: "text-lg",
  },
};

const colorSchemes = {
  primary: {
    main: "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-300 shadow-lg",
    action: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300 shadow-lg",
    text: "text-white",
  },
  secondary: {
    main: "bg-gray-600 hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-300 shadow-lg",
    action: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300 shadow-lg",
    text: "text-white",
  },
  success: {
    main: "bg-green-600 hover:bg-green-700 active:bg-green-800 focus:ring-green-300 shadow-lg",
    action: "bg-green-500 hover:bg-green-600 active:bg-green-700 focus:ring-green-300 shadow-lg",
    text: "text-white",
  },
  error: {
    main: "bg-red-600 hover:bg-red-700 active:bg-red-800 focus:ring-red-300 shadow-lg",
    action: "bg-red-500 hover:bg-red-600 active:bg-red-700 focus:ring-red-300 shadow-lg",
    text: "text-white",
  },
  warning: {
    main: "bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 focus:ring-yellow-300 shadow-lg",
    action: "bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 focus:ring-yellow-300 shadow-lg",
    text: "text-black",
  },
  info: {
    main: "bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:ring-sky-300 shadow-lg",
    action: "bg-sky-400 hover:bg-sky-500 active:bg-sky-600 focus:ring-sky-300 shadow-lg",
    text: "text-white",
  },
};

export const SpeedDial: React.FC<SpeedDialProps> = ({
  actions,
  mainIcon = <FaPlus />,
  position = "bottom-right",
  direction = "up",
  defaultOpen = false,
  controlled = false,
  open: controlledOpen,
  onOpenChange,
  showLabels = true,
  showTooltips = true,
  size = "md",
  colorScheme = "primary",
  closeOnActionClick = true,
  closeOnOutsideClick = true,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  const isOpenState = controlled ? controlledOpen : isOpen;

  useEffect(() => {
    if (!closeOnOutsideClick || !isOpenState) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        console.log("Outside click detected, closing SpeedDial");
        const newOpenState = false;
        if (!controlled) {
          setIsOpen(newOpenState);
        }
        onOpenChange?.(newOpenState);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenState, closeOnOutsideClick, controlled, onOpenChange]);

  const handleToggle = () => {
    const newOpenState = !isOpenState;
    if (!controlled) {
      setIsOpen(newOpenState);
    }
    onOpenChange?.(newOpenState);
  };

  const handleActionClick = (action: SpeedDialAction) => {
    if (!action.disabled) {
      action.onClick();
      if (closeOnActionClick) {
        const newOpenState = false;
        if (!controlled) {
          setIsOpen(newOpenState);
        }
        onOpenChange?.(newOpenState);
      }
    }
  };

  const currentSize = sizes[size];
  const currentColors = colorSchemes[colorScheme];

  return (
    <div
      ref={containerRef}
      className={cn(
        "fixed z-50",
        positions[position],
        className
      )}
      {...props}
    >
      {/* Actions Container */}
      {isOpenState && (
        <div
          className={cn(
            "absolute flex flex-col gap-2 transition-all duration-300 ease-out",
            directions[direction],
            direction === "left" && "items-end",
            direction === "right" && "items-start",
            direction === "up" && "items-center",
            direction === "down" && "items-center"
          )}
          style={{
            minWidth: direction === "left" ? "200px" : "auto",
            minHeight: direction === "up" || direction === "down" ? "200px" : "auto",
            ...(position === "bottom-left" && direction === "up" && {
              left: "0",
              right: "auto"
            }),
            ...(position === "bottom-right" && direction === "up" && {
              left: "auto",
              right: "0"
            }),
            ...(position === "top-left" && direction === "down" && {
              left: "0",
              right: "auto"
            }),
            ...(position === "top-right" && direction === "down" && {
              left: "auto",
              right: "0"
            })
          }}
        >
          {actions.map((action) => (
            <div
              key={action.id}
              className={cn(
                "group relative flex items-center gap-2 transition-all duration-200",
                action.disabled && "opacity-50 cursor-not-allowed",
                direction === "left" && "flex-row-reverse",
                direction === "right" && "flex-row"
              )}
            >
              {showLabels && (
                <span
                  className={cn(
                    "whitespace-nowrap rounded-lg bg-gray-800 px-3 py-2 text-white shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100",
                    currentSize.label,
                    "font-medium"
                  )}
                >
                  {action.label}
                </span>
              )}

              <button
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",
                  currentSize.action,
                  currentColors.action,
                  currentColors.text,
                  "hover:scale-110 active:scale-95 transform-gpu",
                  action.className
                )}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                title={showTooltips ? action.tooltip || action.label : undefined}
                aria-label={action.label}
              >
                <span className={cn("transition-transform", currentSize.icon)}>
                  {action.icon}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className={cn(
          "flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform-gpu",
          currentSize.main,
          currentColors.main,
          currentColors.text,
          "hover:scale-110 active:scale-95",
          isOpenState && "rotate-45"
        )}
        onClick={handleToggle}
        aria-label={isOpenState ? "Close speed dial" : "Open speed dial"}
        aria-expanded={isOpenState}
        aria-haspopup="true"
      >
        <span className={cn("transition-transform duration-200", currentSize.icon)}>
          {isOpenState ? <FaTimes /> : mainIcon}
        </span>
      </button>
    </div>
  );
};

