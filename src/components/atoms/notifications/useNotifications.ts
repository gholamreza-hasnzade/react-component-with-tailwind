import { useState, useCallback } from "react";
import type { Notification } from "./notifications";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newNotification: Notification = {
      id,
      ...notification,
    };
    setNotifications(prev => [...prev, newNotification]);
    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const addSuccess = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: "success", title, message, ...options });
  }, [addNotification]);

  const addError = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: "error", title, message, ...options });
  }, [addNotification]);

  const addWarning = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: "warning", title, message, ...options });
  }, [addNotification]);

  const addInfo = useCallback((title: string, message?: string, options?: Partial<Notification>) => {
    return addNotification({ type: "info", title, message, ...options });
  }, [addNotification]);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    addSuccess,
    addError,
    addWarning,
    addInfo,
  };
};
