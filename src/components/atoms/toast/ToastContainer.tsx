import React, { useState, useCallback, useEffect } from 'react';
import { Toast } from './toast';
import type { ToastOptions } from './types';
import { setToastManager } from './useToast';

interface ToastInstance extends ToastOptions {
  id: string;
  createdAt: number;
}

export interface ToastContainerProps {
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  maxToasts?: number;
  className?: string;
}

const positionClasses = {
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  position = 'top-right',
  maxToasts = 5,
  className,
}) => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const [nextId, setNextId] = useState(1);

  const addToast = useCallback((options: ToastOptions) => {
    const id = `toast-${nextId}`;
    const toast: ToastInstance = {
      ...options,
      id,
      createdAt: Date.now(),
    };

    setToasts(prev => {
      const newToasts = [...prev, toast];
      return newToasts.slice(-maxToasts); // Keep only the latest toasts
    });
    setNextId(prev => prev + 1);
    return id;
  }, [maxToasts, nextId]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Connect to the hook system
  useEffect(() => {
    setToastManager({ addToast, clearToasts });
    
    // Keep window methods as fallback
    window.showToast = addToast;
    window.showSuccessToast = (options: Omit<ToastOptions, 'variant'>) => 
      addToast({ ...options, variant: 'success' });
    window.showErrorToast = (options: Omit<ToastOptions, 'variant'>) => 
      addToast({ ...options, variant: 'error' });
    window.showWarningToast = (options: Omit<ToastOptions, 'variant'>) => 
      addToast({ ...options, variant: 'warning' });
    window.showInfoToast = (options: Omit<ToastOptions, 'variant'>) => 
      addToast({ ...options, variant: 'info' });
    window.showLoadingToast = (options: Omit<ToastOptions, 'variant'>) => 
      addToast({ ...options, loading: true, persistent: true });
    window.clearToasts = clearToasts;

    return () => {
      setToastManager(null);
    };
  }, [addToast, clearToasts]);

  return (
    <div
      className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]} ${className || ''}`}
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          variant={toast.variant}
          size={toast.size}
          title={toast.title}
          description={toast.description}
          action={toast.action}
          onClose={removeToast}
          autoClose={toast.autoClose}
          autoCloseDelay={toast.autoCloseDelay}
          showCloseButton={toast.showCloseButton}
          icon={toast.icon}
          loading={toast.loading}
          persistent={toast.persistent}
        />
      ))}
    </div>
  );
};
