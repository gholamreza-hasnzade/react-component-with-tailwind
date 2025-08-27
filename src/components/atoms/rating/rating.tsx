import React, { useState, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { HiStar } from 'react-icons/hi2';
import { HiStar as HiStarSolid } from 'react-icons/hi';

export type RatingSize = 'sm' | 'md' | 'lg';
export type RatingVariant = 'default' | 'filled' | 'outline' | 'gradient';
export type RatingReadOnly = boolean | 'hover' | 'always';

export interface RatingProps {
  /** Current rating value (0-5) */
  value?: number;
  /** Default rating value for uncontrolled mode */
  defaultValue?: number;
  /** Maximum rating value (default: 5) */
  max?: number;
  /** Size of the rating stars */
  size?: RatingSize;
  /** Visual variant/style */
  variant?: RatingVariant;
  /** Whether rating is read-only */
  readOnly?: RatingReadOnly;
  /** Whether to show rating value text */
  showValue?: boolean;
  /** Whether to show rating count */
  showCount?: boolean;
  /** Total number of ratings for count display */
  totalRatings?: number;
  /** Whether to allow half-star ratings */
  allowHalf?: boolean;
  /** Whether to allow clearing rating by clicking again */
  allowClear?: boolean;
  /** Custom icon for filled state */
  filledIcon?: React.ReactNode;
  /** Custom icon for empty state */
  emptyIcon?: React.ReactNode;
  /** Callback when rating changes */
  onChange?: (rating: number) => void;
  /** Callback when rating is hovered */
  onHover?: (rating: number) => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional HTML attributes */
  [key: string]: unknown;
}

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  size = 'md',
  variant = 'default',
  readOnly = false,
  showValue = false,
  showCount = false,
  totalRatings = 0,
  allowHalf = false,
  allowClear = true,
  filledIcon,
  emptyIcon,
  onChange,
  onHover,
  className,
  ...props
}) => {
  // State management
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);
  
  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hoverValue || currentValue;
  
  // Memoized size classes
  const sizeClasses = useMemo(() => ({
    sm: 'w-4 h-4 text-sm',
    md: 'w-5 h-5 text-base',
    lg: 'w-6 h-6 text-lg',
  }), []);
  
  // Memoized variant classes
  const variantClasses = useMemo(() => ({
    default: '',
    filled: '',
    outline: 'border-2 border-amber-300 hover:border-amber-400',
    gradient: '',
  }), []);
  
  // Handle rating change
  const handleRatingChange = useCallback((newRating: number) => {
    if (readOnly) return;
    
    // Allow clearing if clicking the same rating and allowClear is true
    const finalRating = allowClear && newRating === currentValue ? 0 : newRating;
    
    if (controlledValue === undefined) {
      setInternalValue(finalRating);
    }
    
    onChange?.(finalRating);
  }, [readOnly, currentValue, allowClear, controlledValue, onChange]);
  
  // Handle hover
  const handleHover = useCallback((rating: number) => {
    if (readOnly === 'always') return;
    
    if (readOnly === 'hover') {
      setHoverValue(rating);
    } else if (!readOnly) {
      setHoverValue(rating);
    }
    
    onHover?.(rating);
  }, [readOnly, onHover]);
  
  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    if (readOnly === 'always') return;
    setHoverValue(0);
  }, [readOnly]);
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, rating: number) => {
    if (readOnly) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleRatingChange(rating);
        break;
      case 'ArrowRight': {
        e.preventDefault();
        const nextRating = Math.min(rating + 1, max);
        handleRatingChange(nextRating);
        break;
      }
      case 'ArrowLeft': {
        e.preventDefault();
        const prevRating = Math.max(rating - 1, 0);
        handleRatingChange(prevRating);
        break;
      }
    }
  }, [readOnly, max, handleRatingChange]);
  
  // Render individual star
  const renderStar = useCallback((index: number) => {
    const starValue = index + 1;
    const isFilled = displayValue >= starValue;
    const isHalfFilled = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;
    
    // Get star color based on variant and state
    const getStarColor = () => {
      if (isFilled) {
        switch (variant) {
          case 'default':
            return 'text-amber-400 hover:text-amber-500';
          case 'filled':
            return 'text-amber-500 hover:text-amber-600';
          case 'outline':
            return 'text-amber-400 hover:text-amber-500';
          case 'gradient':
            return 'text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text hover:from-amber-500 hover:to-orange-600';
          default:
            return 'text-amber-400 hover:text-amber-500';
        }
      } else {
        switch (variant) {
          case 'default':
            return 'text-gray-300 hover:text-gray-400';
          case 'filled':
            return 'text-gray-300 hover:text-gray-400';
          case 'outline':
            return 'text-gray-300 hover:text-gray-400';
          case 'gradient':
            return 'text-gray-300 hover:text-gray-400';
          default:
            return 'text-gray-300 hover:text-gray-400';
        }
      }
    };
    
    const starClasses = clsx(
      'transition-all duration-300 ease-out cursor-pointer',
      sizeClasses[size],
      variantClasses[variant],
      getStarColor(),
      {
        'opacity-50': readOnly === 'always',
        'hover:scale-110': !readOnly || readOnly === 'hover',
        'transform': !readOnly || readOnly === 'hover',
      }
    );
    
    const icon = isFilled ? (filledIcon || <HiStarSolid />) : (emptyIcon || <HiStar />);
    
    return (
      <span
        key={index}
        className={starClasses}
        role="button"
        tabIndex={readOnly ? -1 : 0}
        aria-label={`Rate ${starValue} out of ${max} stars`}
        onClick={() => handleRatingChange(starValue)}
        onMouseEnter={() => handleHover(starValue)}
        onKeyDown={(e) => handleKeyDown(e, starValue)}
        style={{
          color: isHalfFilled ? 'var(--tw-gradient-from)' : undefined,
        }}
      >
        {icon}
      </span>
    );
  }, [
    displayValue,
    allowHalf,
    sizeClasses,
    size,
    variantClasses,
    variant,
    readOnly,
    filledIcon,
    emptyIcon,
    max,
    handleRatingChange,
    handleHover,
    handleKeyDown,
  ]);
  
  // Accessibility attributes
  const containerProps = {
    role: 'radiogroup',
    'aria-label': `Rating: ${currentValue} out of ${max} stars`,
    'aria-valuenow': currentValue,
    'aria-valuemin': 0,
    'aria-valuemax': max,
    ...props,
  };
  
  return (
    <div className={clsx('inline-flex flex-col items-start gap-2', className)}>
      <div
        className="flex items-center gap-1"
        onMouseLeave={handleMouseLeave}
        {...containerProps}
      >
        {Array.from({ length: max }, (_, index) => renderStar(index))}
      </div>
      
      {/* Rating value and count display */}
      {(showValue || showCount) && (
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {showValue && (
            <span className="font-medium">
              {currentValue.toFixed(allowHalf ? 1 : 0)} out of {max}
            </span>
          )}
          
          {showCount && totalRatings > 0 && (
            <span className="text-gray-500">
              ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

