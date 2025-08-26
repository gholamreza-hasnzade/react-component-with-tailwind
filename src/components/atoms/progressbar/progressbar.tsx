import React from "react";

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  value: number;
  /** Maximum value (default: 100) */
  max?: number;
  /** Progress bar variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Progress bar size */
  size?: 'sm' | 'md' | 'lg';
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Show progress value */
  showValue?: boolean;
  /** Custom CSS classes */
  className?: string;
  /** Progress bar height (in pixels) */
  height?: number;
  /** Animated progress bar */
  animated?: boolean;
  /** Striped progress bar */
  striped?: boolean;
  /** Indeterminate progress (loading state) */
  indeterminate?: boolean;
  /** Custom color (overrides variant) */
  color?: string;
  /** Background color */
  backgroundColor?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** Role for accessibility */
  role?: 'progressbar' | 'meter';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  variant = 'default',
  size = 'md',
  showLabel = false,
  label,
  showValue = false,
  className = '',
  height,
  animated = false,
  striped = false,
  indeterminate = false,
  color,
  backgroundColor,
  ariaLabel,
  role = 'progressbar',
}) => {
  // Clamp value between 0 and max
  const clampedValue = Math.max(0, Math.min(value, max));
  const percentage = max > 0 ? (clampedValue / max) * 100 : 0;

  // Get variant colors
  const getVariantColors = () => {
    if (color) {
      return { bg: color, text: 'white' };
    }

    switch (variant) {
      case 'success':
        return { bg: 'bg-green-500', text: 'text-green-700' };
      case 'warning':
        return { bg: 'bg-yellow-500', text: 'text-yellow-700' };
      case 'error':
        return { bg: 'bg-red-500', text: 'text-red-700' };
      case 'info':
        return { bg: 'bg-blue-500', text: 'text-blue-700' };
      default:
        return { bg: 'bg-gray-500', text: 'text-gray-700' };
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-2 text-xs';
      case 'lg':
        return 'h-4 text-base';
      default:
        return 'h-3 text-sm';
    }
  };

  // Get height style
  const getHeightStyle = () => {
    if (height) {
      return { height: `${height}px` };
    }
    return {};
  };

  // Get progress bar classes
  const getProgressClasses = () => {
    const baseClasses = 'transition-all duration-300 ease-out';
    const variantColors = getVariantColors();
    
    let classes = `${baseClasses} ${variantColors.bg}`;
    
    if (striped) {
      classes += ' bg-gradient-to-r from-transparent via-white/20 to-transparent';
    }
    
    if (animated) {
      classes += ' animate-pulse';
    }
    
    if (indeterminate) {
      classes += ' animate-pulse bg-gradient-to-r from-transparent via-current to-transparent';
    }
    
    return classes;
  };

  // Get container classes
  const getContainerClasses = () => {
    const baseClasses = 'w-full bg-gray-200 rounded-full overflow-hidden';
    const sizeClasses = getSizeClasses();
    
    return `${baseClasses} ${sizeClasses} ${className}`;
  };

  // Get label text
  const getLabelText = () => {
    if (label) return label;
    if (showValue) return `${clampedValue}/${max}`;
    if (showLabel) return `${Math.round(percentage)}%`;
    return '';
  };

  // Get ARIA attributes
  const getAriaAttributes = () => {
    if (indeterminate) {
      return {
        'aria-label': ariaLabel || 'Loading progress',
        'aria-valuemin': 0,
        'aria-valuemax': max,
        'aria-valuenow': undefined,
        'aria-valuetext': 'Loading...',
      };
    }

    return {
      'aria-label': ariaLabel || `Progress: ${Math.round(percentage)}%`,
      'aria-valuemin': 0,
      'aria-valuemax': max,
      'aria-valuenow': clampedValue,
      'aria-valuetext': `${Math.round(percentage)}%`,
    };
  };

  const variantColors = getVariantColors();
  const containerStyle = {
    ...getHeightStyle(),
    backgroundColor: backgroundColor || undefined,
  };

  const progressStyle = {
    width: indeterminate ? '100%' : `${percentage}%`,
    height: '100%',
  };

  return (
    <div className="w-full">
      {/* Progress Bar Container */}
      <div
        className={getContainerClasses()}
        style={containerStyle}
        role={role}
        {...getAriaAttributes()}
      >
        {/* Progress Bar */}
        <div
          className={getProgressClasses()}
          style={progressStyle}
        />
      </div>

      {/* Label */}
      {getLabelText() && (
        <div className={`mt-2 font-medium ${variantColors.text}`}>
          {getLabelText()}
        </div>
      )}
    </div>
  );
};