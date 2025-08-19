import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface TooltipProps {
  /** The content to be displayed in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger element */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing the tooltip (in milliseconds) */
  delay?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Custom CSS classes for the tooltip */
  className?: string;
  /** Maximum width of the tooltip */
  maxWidth?: number | string;
  /** Whether to show the tooltip arrow */
  showArrow?: boolean;
  /** Custom offset from the trigger element */
  offset?: number;
}

interface Position {
  top: number;
  left: number;
}

const ARROW_SIZE = 6;
const DEFAULT_OFFSET = 8;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 300,
  disabled = false,
  className,
  maxWidth = 200,
  showArrow = true,
  offset = DEFAULT_OFFSET,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<Position>({ top: 100, left: 100 });
  
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const portalRef = useRef<HTMLDivElement | null>(null);

  // Create portal container
  useEffect(() => {
    if (!portalRef.current) {
      portalRef.current = document.createElement('div');
      portalRef.current.setAttribute('data-tooltip-portal', '');
      document.body.appendChild(portalRef.current);
    }

    return () => {
      if (portalRef.current && document.body.contains(portalRef.current)) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  // Calculate tooltip position
  const calculatePosition = useCallback((): Position => {
    if (!triggerRef.current) {
      return { top: 100, left: 100 };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top - 40 - offset; // Estimate tooltip height as 40px
        left = triggerRect.left + (triggerRect.width / 2) - 100; // Center with estimated width
        break;
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width / 2) - 100;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - 15; // Better vertical centering
        left = triggerRect.left - 130 - offset; // Increased to 130px for more distance
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - 15; // Better vertical centering
        left = triggerRect.right + offset;
        break;
    }

    // Prevent overflow
    if (left < 8) left = 8;
    if (left + 130 > viewportWidth - 8) {
      left = viewportWidth - 130 - 8;
    }
    if (top < 8) top = 8;
    if (top + 40 > viewportHeight - 8) {
      top = viewportHeight - 40 - 8;
    }

    return { top, left };
  }, [position, offset]);

  // Show tooltip
  const showTooltip = useCallback(() => {
    if (disabled) return;
    console.log('Show tooltip called');

    timeoutRef.current = setTimeout(() => {
      console.log('Setting tooltip visible');
      setIsVisible(true);
      // Calculate position after tooltip is visible
      setTimeout(() => {
        const pos = calculatePosition();
        console.log('Calculated position:', pos);
        console.log('Trigger rect:', triggerRef.current?.getBoundingClientRect());
        setTooltipPosition(pos);
      }, 50);
    }, delay);
  }, [disabled, delay, calculatePosition]);

  // Hide tooltip
  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  }, []);

  // Handle escape key
  useEffect(() => {
    if (!isVisible) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideTooltip();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isVisible, hideTooltip]);

  // Update position on scroll/resize
  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      setTooltipPosition(calculatePosition());
    };

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, calculatePosition]);

  // Clone children and add event handlers
  const triggerElement = React.cloneElement(children, {
    ref: triggerRef,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    'aria-describedby': isVisible ? 'tooltip-content' : undefined,
  } as React.HTMLAttributes<HTMLElement>);

  // Render tooltip content
  const tooltipContent = (
    <div
      ref={tooltipRef}
      id="tooltip-content"
      role="tooltip"
      aria-hidden={!isVisible}
      className={cn(
        'fixed z-[9999] pointer-events-none select-none',
        'transition-all duration-200 ease-out',
        className
      )}
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.95)',
        visibility: isVisible ? 'visible' : 'hidden',
      }}
    >
      <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-md shadow-lg border border-gray-700">
        {content}
        {showArrow && (
          <div
            className="absolute w-0 h-0"
            style={{
              [position === 'top' || position === 'bottom' ? 'left' : 'top']: '50%',
              [position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right']: `-${ARROW_SIZE}px`,
              transform: position === 'top' || position === 'bottom' ? 'translateX(-50%)' : 'translateY(-50%)',
              borderStyle: 'solid',
              borderWidth: `${ARROW_SIZE}px`,
              borderColor: position === 'top' 
                ? 'transparent transparent #1f2937 transparent'
                : position === 'bottom'
                ? '#1f2937 transparent transparent transparent'
                : position === 'left'
                ? 'transparent #1f2937 transparent transparent'
                : 'transparent transparent transparent #1f2937',
            }}
          />
        )}
      </div>
    </div>
  );

  return (
    <>
      {triggerElement}
      {isVisible && portalRef.current && createPortal(tooltipContent, portalRef.current)}
    </>
  );
};

