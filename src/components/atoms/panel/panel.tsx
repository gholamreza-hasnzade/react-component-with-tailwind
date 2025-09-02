import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { panelVariants } from './panel-variants';

export interface PanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  loadingText?: string;
  loadingSpinner?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  success?: boolean;
  successMessage?: string;
  warning?: boolean;
  warningMessage?: string;
  info?: boolean;
  infoMessage?: string;
  collapsible?: boolean;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  draggable?: boolean;
  onDrag?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onResize?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      title,
      description,
      icon,
      actions,
      header,
      footer,
      loading = false,
      loadingText = "Loading...",
      loadingSpinner,
      error = false,
      errorMessage,
      success = false,
      successMessage,
      warning = false,
      warningMessage,
      info = false,
      infoMessage,
      collapsible = false,
      collapsed = false,
      onCollapse,
      draggable = false,
      onDrag,
      onDrop,
      onResize,
      className,
      variant,
      size,
      shape,
      shadow,
      animation,
      hover,
      focus,
      disabled,
      loading: loadingVariant,
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const [, setIsDragging] = React.useState(false);
    const [, setIsResizing] = React.useState(false);

    // Handle collapse
    const handleCollapse = React.useCallback(() => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    }, [isCollapsed, onCollapse]);

    // Handle drag
    const handleDragStart = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        if (draggable) {
          setIsDragging(true);
          onDrag?.(event);
        }
      },
      [draggable, onDrag]
    );

    const handleDragEnd = React.useCallback(
      (event: React.DragEvent<HTMLDivElement>) => {
        if (draggable) {
          setIsDragging(false);
          onDrop?.(event);
        }
      },
      [draggable, onDrop]
    );

    // Handle resize
    const handleResizeStart = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        setIsResizing(true);
        onResize?.(event);
      },
      [onResize]
    );

    const handleResizeEnd = React.useCallback(() => {
      setIsResizing(false);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (collapsible && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleCollapse();
        }
      },
      [collapsible, handleCollapse]
    );

    // Determine panel state
    const panelState = React.useMemo(() => {
      if (error) return "error";
      if (success) return "success";
      if (warning) return "warning";
      if (info) return "info";
      if (loading) return "loading";
      return "default";
    }, [error, success, warning, info, loading]);

    // Get state message
    const stateMessage = React.useMemo(() => {
      if (error && errorMessage) return errorMessage;
      if (success && successMessage) return successMessage;
      if (warning && warningMessage) return warningMessage;
      if (info && infoMessage) return infoMessage;
      return null;
    }, [error, errorMessage, success, successMessage, warning, warningMessage, info, infoMessage]);

    // Get state icon
    const stateIcon = React.useMemo(() => {
      if (error) return "⚠️";
      if (success) return "✅";
      if (warning) return "⚠️";
      if (info) return "ℹ️";
      return null;
    }, [error, success, warning, info]);

    return (
      <div
        ref={ref}
        className={cn(
          panelVariants({
            variant: panelState === "error" ? "destructive" : 
                   panelState === "success" ? "success" :
                   panelState === "warning" ? "warning" :
                   panelState === "info" ? "info" : variant,
            size,
            shape,
            shadow,
            animation,
            hover,
            focus,
            disabled,
            loading: loadingVariant,
          }),
          className
        )}
        role="region"
        aria-label={title || "Panel"}
        tabIndex={collapsible ? 0 : undefined}
        draggable={draggable}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseDown={handleResizeStart}
        onMouseUp={handleResizeEnd}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              {loadingSpinner || (
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              )}
              <span className="text-sm text-muted-foreground">{loadingText}</span>
            </div>
          </div>
        )}

        {/* State message */}
        {stateMessage && (
          <div className="mb-4 p-3 rounded-md bg-muted border border-border">
            <div className="flex items-center gap-2">
              {stateIcon && <span className="text-lg">{stateIcon}</span>}
              <span className="text-sm font-medium">{stateMessage}</span>
            </div>
          </div>
        )}

        {/* Header */}
        {(title || description || icon || actions || header || collapsible) && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {icon && <div className="flex-shrink-0">{icon}</div>}
              <div className="flex-1">
                {title && (
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                )}
                {description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {actions && <div className="flex-shrink-0">{actions}</div>}
              {collapsible && (
                <button
                  type="button"
                  onClick={handleCollapse}
                  className="flex-shrink-0 p-1 rounded-md hover:bg-muted transition-colors"
                  aria-label={isCollapsed ? "Expand panel" : "Collapse panel"}
                >
                  <svg
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isCollapsed ? "rotate-180" : ""
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              )}
            </div>
            {header && <div className="flex-shrink-0">{header}</div>}
          </div>
        )}

        {/* Content */}
        <div
          className={cn(
            "transition-all duration-300 ease-in-out",
            isCollapsed ? "max-h-0 overflow-hidden opacity-0" : "max-h-none opacity-100"
          )}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 pt-4 border-t border-border">
            {footer}
          </div>
        )}

        {/* Resize handle */}
        {onResize && (
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize opacity-0 hover:opacity-100 transition-opacity"
            onMouseDown={handleResizeStart}
          >
            <div className="w-full h-full bg-border rounded-tl-md"></div>
          </div>
        )}
      </div>
    );
  }
);

Panel.displayName = "Panel";

export { Panel };