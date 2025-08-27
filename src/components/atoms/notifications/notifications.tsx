import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { 
  FaCheck, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaTimes, 
  FaExclamationCircle
} from "react-icons/fa";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  persistent?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const notificationTypes = {
  success: {
    icon: FaCheck,
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-800",
    iconColor: "text-green-500",
    titleColor: "text-green-900",
  },
  error: {
    icon: FaExclamationCircle,
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    textColor: "text-red-800",
    iconColor: "text-red-500",
    titleColor: "text-red-900",
  },
  warning: {
    icon: FaExclamationTriangle,
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    iconColor: "text-yellow-500",
    titleColor: "text-yellow-900",
  },
  info: {
    icon: FaInfoCircle,
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    iconColor: "text-blue-500",
    titleColor: "text-blue-900",
  },
};

const positionClasses = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 transform -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
};

const NotificationItem: React.FC<{
  notification: Notification;
  onDismiss: (id: string) => void;
  position: string;
  index: number;
}> = ({ notification, onDismiss, position, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const typeConfig = notificationTypes[notification.type];
  const IconComponent = typeConfig.icon;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (!notification.persistent && notification.duration !== 0) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, notification.duration || 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onDismiss(notification.id);
    }, 300);
  }, [notification.id, onDismiss]);

  const handleActionClick = () => {
    notification.action?.onClick();
    handleDismiss();
  };

  return (
    <div
      className={cn(
        "relative w-full max-w-sm bg-white rounded-lg shadow-lg border transition-all duration-300 ease-out",
        typeConfig.bgColor,
        typeConfig.borderColor,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
        isExiting ? "opacity-0 translate-y-2 scale-95" : "",
        position.includes("center") ? "mx-auto" : ""
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-t-lg overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-linear",
            typeConfig.iconColor.replace("text-", "bg-")
          )}
          style={{
            animation: `progress ${notification.duration || 5000}ms linear forwards`,
          }}
        />
      </div>

      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          <IconComponent
            className={cn("w-5 h-5", typeConfig.iconColor)}
            aria-hidden="true"
          />
        </div>

        <div className="ml-3 flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className={cn("text-sm font-medium", typeConfig.titleColor)}>
                {notification.title}
              </p>
              {notification.message && (
                <p className={cn("mt-1 text-sm", typeConfig.textColor)}>
                  {notification.message}
                </p>
              )}
            </div>
            
            <button
              onClick={handleDismiss}
              className={cn(
                "ml-4 flex-shrink-0 rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500 transition-colors",
                typeConfig.bgColor
              )}
              aria-label="Dismiss notification"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {notification.action && (
            <div className="mt-3">
              <button
                onClick={handleActionClick}
                className={cn(
                  "text-sm font-medium rounded-md px-3 py-2 transition-colors",
                  typeConfig.textColor,
                  typeConfig.bgColor,
                  "hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-gray-500"
                )}
              >
                {notification.action.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const NotificationSystem: React.FC<{
  notifications: Notification[];
  onDismiss: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
  maxNotifications?: number;
  className?: string;
}> = ({
  notifications,
  onDismiss,
  position = "top-right",
  maxNotifications = 5,
  className,
}) => {
  const visibleNotifications = notifications.slice(0, maxNotifications);

  if (visibleNotifications.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed z-50 flex flex-col gap-3",
        positionClasses[position],
        className
      )}
      role="region"
      aria-label="Notifications"
    >
      {visibleNotifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
          position={position}
          index={index}
        />
      ))}
    </div>
  );
};




