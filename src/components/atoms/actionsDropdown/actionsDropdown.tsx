import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";

interface Action<T> {
  label: string;
  onClick: (row?: T) => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  danger?: boolean;
}

interface ActionSeparator {
  separator: true;
  label?: never;
  onClick?: never;
  icon?: never;
  disabled?: never;
  loading?: never;
  danger?: never;
}

type ActionItem<T> = Action<T> | ActionSeparator;

type DropdownPosition =
  | "top-left"
  | "top-right"
  | "top-center"
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "top"
  | "bottom"
  | "left"
  | "right";

interface ActionsDropdownProps<T> {
  actions: ActionItem<T>[];
  row?: T;
  trigger?: React.ReactNode;
  triggerClassName?: string;
  position?: DropdownPosition;
}

export function ActionsDropdown<T>({
  actions,
  row,
  trigger,
  triggerClassName,
  position = "bottom-right",
}: ActionsDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleActionClick = (action: Action<T>) => {
    if (action.disabled || action.loading) return;

    action.onClick(row);
    setOpen(false);
  };

  const isSeparator = (item: ActionItem<T>): item is ActionSeparator => {
    return "separator" in item && item.separator === true;
  };

  const isAction = (item: ActionItem<T>): item is Action<T> => {
    return !isSeparator(item);
  };

  const getPositionClasses = (): string => {
    const baseClasses =
      "absolute bg-white border border-gray-200 rounded-lg shadow-lg z-30";

    switch (position) {
      case "top-left":
        return clsx(baseClasses, "bottom-full right-0 mb-1");
      case "top-right":
        return clsx(baseClasses, "bottom-full left-0 mb-1");
      case "top-center":
        return clsx(
          baseClasses,
          "bottom-full left-1/2 transform -translate-x-1/2 mb-1"
        );
      case "bottom-left":
        return clsx(baseClasses, "top-full right-0 mt-1");
      case "bottom-right":
        return clsx(baseClasses, "top-full left-0 mt-1");
      case "bottom-center":
        return clsx(
          baseClasses,
          "top-full left-1/2 transform -translate-x-1/2 mt-1"
        );
      case "top":
        return clsx(
          baseClasses,
          "bottom-full left-1/2 transform -translate-x-1/2 mb-1"
        );
      case "bottom":
        return clsx(
          baseClasses,
          "top-full left-1/2 transform -translate-x-1/2 mt-1"
        );
      case "left":
        return clsx(
          baseClasses,
          "right-full top-1/2 transform -translate-y-1/2 mr-1"
        );
      case "right":
        return clsx(
          baseClasses,
          "left-full top-1/2 transform -translate-y-1/2 ml-1"
        );
      default:
        return clsx(
          baseClasses,
          "top-full left-1/2 transform -translate-x-1/2 mt-1"
        );
    }
  };

  const getDropdownWidth = (): string => {
    // Adjust width based on position to prevent overflow
    if (position === "left" || position === "right") {
      return "w-36 sm:w-40";
    }
    return "w-36 sm:w-40";
  };

  return (
    <div className="flex justify-end items-center" ref={ref}>
      <div className="relative">
        {trigger ? (
          <div
            className={clsx("cursor-pointer", triggerClassName)}
            onClick={() => setOpen((o) => !o)}
          >
            {trigger}
          </div>
        ) : (
          <button
            className={clsx(
              "p-1.5 sm:p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1",
              open ? "bg-gray-100" : "hover:bg-gray-100"
            )}
            onClick={() => setOpen((o) => !o)}
            type="button"
            aria-label="Actions"
          >
            <BsThreeDotsVertical className="sm:w-5 sm:h-5 text-gray-600" />
          </button>
        )}

        {open && (
          <div className={clsx(getPositionClasses(), getDropdownWidth())}>
            <div className="sr-only">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close actions menu"
                tabIndex={0}
              >
                <FaTimes />
              </button>
            </div>

            {actions.map((item, idx) => {
              if (isSeparator(item)) {
                return (
                  <div
                    key={`separator-${idx}`}
                    className="h-px bg-gray-200 my-1"
                    role="separator"
                  />
                );
              }

              if (isAction(item)) {
                return (
                  <button
                    key={item.label + idx}
                    className={clsx(
                      "w-full flex items-center gap-2 px-3 py-2 text-sm text-right transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg",
                      "hover:bg-gray-50 focus:bg-gray-50 focus:outline-none",
                      item.disabled &&
                        "opacity-50 cursor-not-allowed hover:bg-transparent",
                      item.loading && "cursor-wait",
                      item.danger &&
                        "text-red-600 hover:bg-red-50 focus:bg-red-50",
                      !item.disabled && !item.danger && "text-gray-700"
                    )}
                    onClick={() => handleActionClick(item)}
                    disabled={item.disabled || item.loading}
                    type="button"
                    title={item.disabled ? "Action unavailable" : item.label}
                  >
                    {item.loading && (
                      <span className="flex-shrink-0">
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                      </span>
                    )}
                    {!item.loading && item.icon && (
                      <span className="flex-shrink-0">{item.icon}</span>
                    )}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              }

              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
