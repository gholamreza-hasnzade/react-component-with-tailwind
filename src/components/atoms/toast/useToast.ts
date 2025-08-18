import { useCallback } from 'react';

// Get the toast manager from the container
let toastManager: any = null;

export const setToastManager = (manager: any) => {
  toastManager = manager;
};

export const useToast = () => {
  const showToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast(options);
    }
    // Fallback to window if manager not set
    return window.showToast?.(options);
  }, []);

  const showSuccessToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast({ ...options, variant: 'success' });
    }
    return window.showSuccessToast?.(options);
  }, []);

  const showErrorToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast({ ...options, variant: 'error' });
    }
    return window.showErrorToast?.(options);
  }, []);

  const showWarningToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast({ ...options, variant: 'warning' });
    }
    return window.showWarningToast?.(options);
  }, []);

  const showInfoToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast({ ...options, variant: 'info' });
    }
    return window.showInfoToast?.(options);
  }, []);

  const showLoadingToast = useCallback((options: any) => {
    if (toastManager?.addToast) {
      return toastManager.addToast({ ...options, loading: true, persistent: true });
    }
    return window.showLoadingToast?.(options);
  }, []);

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
