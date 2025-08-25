import { useCallback } from "react";
import type { ToastOptions } from "./types";

interface ToastManager {
  addToast: (options: ToastOptions) => string;
  clearToasts: () => void;
}

let toastManager: ToastManager | null = null;

export const setToastManager = (manager: ToastManager | null) => {
  toastManager = manager;
};

export const useToast = () => {
  const showToast = useCallback((options: ToastOptions) => {
    if (toastManager?.addToast) {
      return toastManager.addToast(options);
    }
    return window.showToast?.(options);
  }, []);

  const showSuccessToast = useCallback(
    (options: Omit<ToastOptions, "variant">) => {
      if (toastManager?.addToast) {
        return toastManager.addToast({ ...options, variant: "success" });
      }
      return window.showSuccessToast?.(options);
    },
    []
  );

  const showErrorToast = useCallback(
    (options: Omit<ToastOptions, "variant">) => {
      if (toastManager?.addToast) {
        return toastManager.addToast({ ...options, variant: "error" });
      }
      return window.showErrorToast?.(options);
    },
    []
  );

  const showWarningToast = useCallback(
    (options: Omit<ToastOptions, "variant">) => {
      if (toastManager?.addToast) {
        return toastManager.addToast({ ...options, variant: "warning" });
      }
      return window.showWarningToast?.(options);
    },
    []
  );

  const showInfoToast = useCallback(
    (options: Omit<ToastOptions, "variant">) => {
      if (toastManager?.addToast) {
        return toastManager.addToast({ ...options, variant: "info" });
      }
      return window.showInfoToast?.(options);
    },
    []
  );

  const showLoadingToast = useCallback(
    (options: Omit<ToastOptions, "loading" | "persistent">) => {
      if (toastManager?.addToast) {
        return toastManager.addToast({
          ...options,
          loading: true,
          persistent: true,
        });
      }
      return window.showLoadingToast?.(options);
    },
    []
  );

  const clearToasts = useCallback(() => {
    if (toastManager?.clearToasts) {
      return toastManager.clearToasts();
    }
    return window.clearToasts?.();
  }, []);

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
    showLoadingToast,
    clearToasts,
  };
};
