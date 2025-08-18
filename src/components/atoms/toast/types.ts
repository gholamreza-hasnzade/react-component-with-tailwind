export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  autoClose?: boolean;
  autoCloseDelay?: number;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  persistent?: boolean;
  action?: React.ReactNode;
}

declare global {
  interface Window {
    showToast: (options: ToastOptions) => string;
    showSuccessToast: (options: Omit<ToastOptions, 'variant'>) => string;
    showErrorToast: (options: Omit<ToastOptions, 'variant'>) => string;
    showWarningToast: (options: Omit<ToastOptions, 'variant'>) => string;
    showInfoToast: (options: Omit<ToastOptions, 'variant'>) => string;
    showLoadingToast: (options: Omit<ToastOptions, 'loading'>) => string;
    clearToasts: () => void;
  }
}
