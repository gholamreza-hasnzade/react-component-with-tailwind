import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { fieldsetVariants, legendVariants } from './fieldset-variants';
import { useTextDirection } from '@/hooks/useTextDirection';

export interface FieldsetProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'disabled'>,
    Omit<VariantProps<typeof fieldsetVariants>, 'disabled'> {
  /**
   * Fieldset disabled state
   */
  disabled?: boolean;
  /**
   * Text direction for the fieldset
   */
  direction?: 'ltr' | 'rtl' | 'auto';
  /**
   * Fieldset content
   */
  children?: React.ReactNode;
  /**
   * Fieldset legend (title)
   */
  legend?: string;
  /**
   * Fieldset description
   */
  description?: string;
  /**
   * Fieldset icon
   */
  icon?: React.ReactNode;
  /**
   * Fieldset actions (buttons, etc.)
   */
  actions?: React.ReactNode;
  /**
   * Fieldset header content
   */
  header?: React.ReactNode;
  /**
   * Fieldset footer content
   */
  footer?: React.ReactNode;
  /**
   * Fieldset loading state
   */
  loading?: boolean;
  /**
   * Fieldset loading text
   */
  loadingText?: string;
  /**
   * Fieldset loading spinner
   */
  loadingSpinner?: React.ReactNode;
  /**
   * Fieldset error state
   */
  error?: boolean;
  /**
   * Fieldset error message
   */
  errorMessage?: string;
  /**
   * Fieldset success state
   */
  success?: boolean;
  /**
   * Fieldset success message
   */
  successMessage?: string;
  /**
   * Fieldset warning state
   */
  warning?: boolean;
  /**
   * Fieldset warning message
   */
  warningMessage?: string;
  /**
   * Fieldset info state
   */
  info?: boolean;
  /**
   * Fieldset info message
   */
  infoMessage?: string;
  /**
   * Fieldset collapsible
   */
  collapsible?: boolean;
  /**
   * Fieldset collapsed state
   */
  collapsed?: boolean;
  /**
   * Fieldset collapse callback
   */
  onCollapse?: (collapsed: boolean) => void;
  /**
   * Fieldset required state
   */
  required?: boolean;
  /**
   * Fieldset help text
   */
  helpText?: string;
  /**
   * Fieldset validation state
   */
  validation?: 'valid' | 'invalid' | 'warning' | 'info';
  /**
   * Fieldset validation message
   */
  validationMessage?: string;
  /**
   * Legend variant
   */
  legendVariant?: VariantProps<typeof legendVariants>['variant'];
  /**
   * Legend size
   */
  legendSize?: VariantProps<typeof legendVariants>['size'];
  /**
   * Legend weight
   */
  legendWeight?: VariantProps<typeof legendVariants>['weight'];
  /**
   * Show required indicator
   */
  showRequired?: boolean;
  /**
   * Custom required indicator
   */
  requiredIndicator?: React.ReactNode;
  /**
   * Custom error indicator
   */
  errorIndicator?: React.ReactNode;
  /**
   * Custom success indicator
   */
  successIndicator?: React.ReactNode;
  /**
   * Custom warning indicator
   */
  warningIndicator?: React.ReactNode;
  /**
   * Custom info indicator
   */
  infoIndicator?: React.ReactNode;
}

const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  (
    {
      children,
      legend,
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
      required = false,
      helpText,
      validation,
      validationMessage,
      legendVariant,
      legendSize,
      legendWeight,
      showRequired = true,
      requiredIndicator,
      errorIndicator,
      successIndicator,
      warningIndicator,
      infoIndicator,
      className,
      variant,
      size,
      shape,
      shadow,
      animation,
      hover,
      focus,
      disabled,
      direction = 'auto',
      ...props
    },
    ref
  ) => {
    const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
    const { direction: detectedDirection } = useTextDirection();
    
    // Use provided direction or detected direction
    const currentDirection = direction === 'auto' ? detectedDirection : direction;

    // Handle collapse
    const handleCollapse = React.useCallback(() => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapse?.(newCollapsed);
    }, [isCollapsed, onCollapse]);

    // Handle keyboard navigation
    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLLegendElement>) => {
        if (collapsible && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          handleCollapse();
        }
      },
      [collapsible, handleCollapse]
    );

    // Determine fieldset state
    const fieldsetState = React.useMemo(() => {
      if (error || validation === 'invalid') return "error";
      if (success || validation === 'valid') return "success";
      if (warning || validation === 'warning') return "warning";
      if (info || validation === 'info') return "info";
      return "default";
    }, [error, success, warning, info, validation]);

    // Get state message
    const stateMessage = React.useMemo(() => {
      if (error && errorMessage) return errorMessage;
      if (success && successMessage) return successMessage;
      if (warning && warningMessage) return warningMessage;
      if (info && infoMessage) return infoMessage;
      if (validation && validationMessage) return validationMessage;
      return null;
    }, [error, errorMessage, success, successMessage, warning, warningMessage, info, infoMessage, validation, validationMessage]);

    // Get state icon
    const stateIcon = React.useMemo(() => {
      if (error || validation === 'invalid') return errorIndicator || "⚠️";
      if (success || validation === 'valid') return successIndicator || "✅";
      if (warning || validation === 'warning') return warningIndicator || "⚠️";
      if (info || validation === 'info') return infoIndicator || "ℹ️";
      return null;
    }, [error, success, warning, info, validation, errorIndicator, successIndicator, warningIndicator, infoIndicator]);

    // Get legend variant based on state
    const computedLegendVariant = React.useMemo(() => {
      if (legendVariant) return legendVariant;
      if (error || validation === 'invalid') return "destructive";
      if (success || validation === 'valid') return "success";
      if (warning || validation === 'warning') return "warning";
      if (info || validation === 'info') return "info";
      return "default";
    }, [legendVariant, error, success, warning, info, validation]);

    return (
      <fieldset
        ref={ref}
        className={cn(
          fieldsetVariants({
            variant: fieldsetState === "error" ? "destructive" : 
                   fieldsetState === "success" ? "success" :
                   fieldsetState === "warning" ? "warning" :
                   fieldsetState === "info" ? "info" : variant,
            size,
            shape,
            shadow,
            animation,
            hover,
            focus,
            disabled,
            required,
            error: error || validation === 'invalid',
            success: success || validation === 'valid',
            warning: warning || validation === 'warning',
            info: info || validation === 'info',
            direction: currentDirection,
          }),
          className
        )}
        disabled={disabled}
        dir={currentDirection}
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

        {/* Legend */}
        {(legend || collapsible) && (
          <legend
            className={cn(
              legendVariants({
                variant: computedLegendVariant,
                size: legendSize,
                weight: legendWeight,
                direction: currentDirection,
              }),
              "flex items-center gap-3 mb-4 px-1",
              collapsible && "cursor-pointer select-none hover:opacity-80 transition-opacity duration-200"
            )}
            onClick={collapsible ? handleCollapse : undefined}
            onKeyDown={handleKeyDown}
            tabIndex={collapsible ? 0 : undefined}
          >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="flex-1">
              {legend}
              {required && showRequired && (
                <span className={cn(
                  "text-destructive",
                  currentDirection === 'rtl' ? "mr-1" : "ml-1"
                )}>
                  {requiredIndicator || "*"}
                </span>
              )}
            </span>
            {collapsible && (
              <svg
                className={cn(
                  "h-4 w-4 transition-transform duration-200 flex-shrink-0",
                  isCollapsed ? "rotate-180" : "",
                  currentDirection === 'rtl' ? "scale-x-[-1]" : ""
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
            )}
            {actions && (
              <div className={cn(
                "flex-shrink-0",
                currentDirection === 'rtl' ? "mr-2" : "ml-2"
              )}>
                {actions}
              </div>
            )}
          </legend>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-muted-foreground/80 mb-5 leading-relaxed">
            {description}
          </p>
        )}

        {/* Header */}
        {header && (
          <div className="mb-4">
            {header}
          </div>
        )}

        {/* State message */}
        {stateMessage && (
          <div className="mb-5 p-4 rounded-xl bg-muted/50 border border-border/50 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              {stateIcon && <span className="text-xl flex-shrink-0">{stateIcon}</span>}
              <span className="text-sm font-medium leading-relaxed">{stateMessage}</span>
            </div>
          </div>
        )}

        {/* Help text */}
        {helpText && !stateMessage && (
          <div className="mb-5 p-4 rounded-xl bg-muted/30 border border-border/30 backdrop-blur-sm">
            <span className="text-sm text-muted-foreground/80 leading-relaxed">{helpText}</span>
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
          <div className="mt-6 pt-5 border-t border-border/50">
            {footer}
          </div>
        )}
      </fieldset>
    );
  }
);

Fieldset.displayName = "Fieldset";

export { Fieldset };