import React from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Ensure the creation log prints only once per toast id (avoids StrictMode double-invoke noise)
const loggedToastIds = new Set<string>();

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  onClose: (id: string) => void;
  autoClose?: boolean;
  autoCloseDelay?: number;
  showCloseButton?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  persistent?: boolean;
  action?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  variant = 'default',
  size = 'md',
  onClose,
  autoClose = true,
  autoCloseDelay = 5000,
  showCloseButton = true,
  icon,
  loading = false,
  persistent = false,
  action,
}) => {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    // Log only once when toast is created (even under StrictMode in dev)
    if (!loggedToastIds.has(id)) {
      loggedToastIds.add(id);
    }
    
    let rafId: number | null = null;
    if (autoClose && !persistent && !loading) {
      const startTime = Date.now();
      const endTime = startTime + autoCloseDelay;
      
      const updateProgress = () => {
        const now = Date.now();
        const remaining = Math.max(0, endTime - now);
        const newProgress = (remaining / autoCloseDelay) * 100;
        setProgress(newProgress);
        
        if (remaining > 0) {
          rafId = requestAnimationFrame(updateProgress);
        } else {
          onClose(id);
        }
      };
      
      rafId = requestAnimationFrame(updateProgress);
    }
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [id, autoClose, autoCloseDelay, persistent, loading, onClose, variant, size]);

  const getDefaultIcon = () => {
    if (loading) return <Loader2 className="animate-spin" />;
    
    switch (variant) {
      case 'success': return <CheckCircle />;
      case 'error': return <AlertCircle />;
      case 'warning': return <AlertTriangle />;
      case 'info': return <Info />;
      default: return null;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'success': return 'border-green-200 bg-green-50 text-green-900';
      case 'error': return 'border-red-200 bg-red-50 text-red-900';
      case 'warning': return 'border-yellow-200 bg-yellow-50 text-yellow-900';
      case 'info': return 'border-blue-200 bg-blue-50 text-blue-900';
      default: return 'border-gray-200 bg-white text-gray-900';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'p-3 pr-6';
      case 'lg': return 'p-6 pr-8';
      default: return 'p-4 pr-6';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-6 w-6';
      default: return 'h-5 w-5';
    }
  };

  return (
    <div
      className={cn(
        'group relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border shadow-lg transition-all animate-in slide-in-from-top-full',
        getVariantClasses(),
        getSizeClasses()
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {/* Progress Bar */}
      {autoClose && !persistent && !loading && (
        <div className="absolute bottom-0 left-0 h-2 bg-current opacity-30 rounded-full">
          <div 
            className="h-full bg-current transition-all duration-100 ease-linear rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      <div className="flex items-start gap-3">
        {(icon || getDefaultIcon()) && (
          <div className={cn('flex-shrink-0', getIconSize())}>
            {icon || getDefaultIcon()}
          </div>
        )}
        
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-sm font-semibold leading-none tracking-tight">
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm leading-normal text-muted-foreground">
              {description}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {action && (
          <div className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            {action}
          </div>
        )}
        
        {showCloseButton && (
          <button
            onClick={() => onClose(id)}
            className="rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
            aria-label="Close toast"
          >
            <X className={getIconSize()} />
          </button>
        )}
      </div>
    </div>
  );
};

export { Toast }; 