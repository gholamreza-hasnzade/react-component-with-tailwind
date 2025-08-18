import React from 'react';
import { cn } from '@/lib/utils';

export interface MeterSegment {
  value: number;
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  label?: string;
}

export interface MeterProps {
  segments: MeterSegment[];
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  showLabel?: boolean;
  label?: string;
  className?: string;
  onSegmentClick?: (segment: MeterSegment, index: number) => void;
}

export interface MeterGroupProps {
  meters: MeterProps[];
  layout?: 'horizontal' | 'vertical';
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  onSegmentClick?: (meterIndex: number, segment: MeterSegment, segmentIndex: number) => void;
}

const Meter: React.FC<MeterProps> = ({
  segments,
  size = 'md',
  showValue = true,
  showLabel = true,
  label,
  className,
  onSegmentClick,
}) => {
  const totalValue = segments.reduce((sum, segment) => sum + segment.value, 0);
  const remainingValue = Math.max(0, 100 - totalValue);
  
  const getVariantClasses = (variant: MeterSegment['variant']) => {
    switch (variant) {
      case 'success': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'h-2';
      case 'lg': return 'h-4';
      default: return 'h-3';
    }
  };

  const getGapClasses = () => {
    switch (size) {
      case 'sm': return 'gap-2';
      case 'lg': return 'gap-4';
      default: return 'gap-3';
    }
  };

  const handleSegmentClick = (segment: MeterSegment, index: number) => {
    if (onSegmentClick) {
      onSegmentClick(segment, index);
    }
  };

  return (
    <div className={cn('w-full min-w-0', className)}>
      {(showLabel || label) && (
        <div className={cn('flex items-center justify-between mb-2', getGapClasses())}>
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
              {totalValue}% {remainingValue > 0 && `(${remainingValue}% remaining)`}
            </span>
          )}
        </div>
      )}
      
      <div className="w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 flex min-w-0">
        {segments.map((segment, index) => {
          const percentage = (segment.value / 100) * 100;
          return (
            <div
              key={index}
              className={cn(
                'transition-all duration-300 ease-out cursor-pointer hover:opacity-80 active:scale-95 flex-shrink-0',
                getVariantClasses(segment.variant),
                getSizeClasses(),
                onSegmentClick ? 'hover:brightness-110' : ''
              )}
              style={{ width: `${percentage}%` }}
              title={`${segment.label || segment.variant}: ${segment.value}%`}
              onClick={() => handleSegmentClick(segment, index)}
              {...(onSegmentClick && { role: 'button' })}
              tabIndex={onSegmentClick ? 0 : undefined}
              onKeyDown={(e) => {
                if (onSegmentClick && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSegmentClick(segment, index);
                }
              }}
            />
          );
        })}
        
        {/* Default color for remaining space */}
        {remainingValue > 0 && (
          <div
            className={cn(
              'transition-all duration-300 ease-out flex-shrink-0',
              'bg-gray-300 dark:bg-gray-600',
              getSizeClasses()
            )}
            style={{ width: `${remainingValue}%` }}
            title={`Remaining: ${remainingValue}%`}
          />
        )}
      </div>
      
      {/* Segment Legend */}
      <div className="flex flex-wrap gap-2 mt-2">
        {segments.map((segment, index) => (
          <div 
            key={index} 
            className={cn(
              'flex items-center gap-1 cursor-pointer transition-all duration-200',
              onSegmentClick ? 'hover:opacity-80 hover:scale-105' : ''
            )}
            onClick={() => handleSegmentClick(segment, index)}
            {...(onSegmentClick && { role: 'button' })}
            tabIndex={onSegmentClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onSegmentClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleSegmentClick(segment, index);
              }
            }}
          >
            <div className={cn('w-3 h-3 rounded-full flex-shrink-0', getVariantClasses(segment.variant))} />
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {segment.label || segment.variant}: {segment.value}%
            </span>
          </div>
        ))}
        
        {/* Legend for remaining space */}
        {remainingValue > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Remaining: {remainingValue}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const MeterGroup: React.FC<MeterGroupProps> = ({
  meters,
  layout = 'horizontal',
  gap = 'md',
  className,
  onSegmentClick,
}) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'vertical': return 'flex flex-col w-full';
      default: return 'flex flex-row';
    }
  };

  const getGapClasses = () => {
    switch (gap) {
      case 'sm': return 'gap-2';
      case 'lg': return 'gap-6';
      default: return 'gap-4';
    }
  };

  const handleMeterSegmentClick = (meterIndex: number, segment: MeterSegment, segmentIndex: number) => {
    if (onSegmentClick) {
      onSegmentClick(meterIndex, segment, segmentIndex);
    }
  };

  return (
    <div className={cn(getLayoutClasses(), getGapClasses(), className)}>
      {meters.map((meter, index) => (
        <Meter
          key={index}
          {...meter}
          className={layout === 'vertical' ? 'w-full' : 'flex-1'}
          onSegmentClick={onSegmentClick ? (segment, segmentIndex) => handleMeterSegmentClick(index, segment, segmentIndex) : undefined}
        />
      ))}
    </div>
  );
};

export { Meter };