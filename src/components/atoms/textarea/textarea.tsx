import React, { forwardRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  variant?: 'default' | 'filled' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
  onValueChange?: (value: string) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      required = false,
      disabled = false,
      readOnly = false,
      placeholder,
      rows = 3,
      maxLength,
      showCharacterCount = false,
      resize = 'vertical',
      variant = 'default',
      size = 'md',
      className,
      labelClassName,
      errorClassName,
      hintClassName,
      onValueChange,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const [isFocused, setIsFocused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const currentValue = value !== undefined ? value : internalValue;
    const characterCount = String(currentValue).length;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        
        if (value === undefined) {
          setInternalValue(newValue);
        }
        
        onValueChange?.(newValue);
        onChange?.(e);
      },
      [value, onValueChange, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(true);
        props.onFocus?.(e);
      },
      [props.onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setIsFocused(false);
        props.onBlur?.(e);
      },
      [props.onBlur]
    );

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const baseClasses = cn(
      'w-full font-normal transition-all duration-200 ease-in-out',
      'border border-gray-300 rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
      'placeholder:text-gray-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'read-only:bg-gray-50 read-only:cursor-default',
      {
        // Size variants
        'px-3 py-2 text-sm': size === 'sm',
        'px-4 py-3 text-base': size === 'md',
        'px-5 py-4 text-lg': size === 'lg',
        
        // Variant styles
        'bg-white': variant === 'default',
        'bg-gray-50 hover:bg-gray-100': variant === 'filled',
        'bg-transparent': variant === 'outlined',
        
        // State styles
        'border-red-500 focus:ring-red-500 focus:border-red-500': error,
        'border-gray-300': !error,
        'hover:border-gray-400': !error && !disabled && !readOnly,
        'shadow-sm': isFocused || isHovered,
        'shadow-md': isFocused,
      },
      className
    );

    const resizeClasses = {
      'none': 'resize-none',
      'vertical': 'resize-y',
      'horizontal': 'resize-x',
      'both': 'resize',
    };

    const labelClasses = cn(
      'block font-medium text-gray-700 mb-2 transition-colors duration-200',
      {
        'text-sm': size === 'sm',
        'text-base': size === 'md',
        'text-lg': size === 'lg',
        'text-red-600': error,
        'text-gray-500': disabled,
      },
      labelClassName
    );

    const errorClasses = cn(
      'mt-2 text-sm font-medium transition-colors duration-200',
      'text-red-600',
      errorClassName
    );

    const hintClasses = cn(
      'mt-2 text-sm transition-colors duration-200',
      'text-gray-500',
      hintClassName
    );

    const characterCountClasses = cn(
      'mt-2 text-xs text-right transition-colors duration-200',
      {
        'text-gray-400': maxLength ? characterCount < maxLength * 0.8 : false,
        'text-yellow-600': maxLength ? characterCount >= maxLength * 0.8 && characterCount < maxLength : false,
        'text-red-600': maxLength ? characterCount === maxLength : false,
      }
    );

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={props.id}
            className={labelClasses}
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        {/* Textarea Container */}
        <div className="relative">
          <textarea
            ref={ref}
            className={cn(baseClasses, resizeClasses[resize])}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              cn(
                error && 'textarea-error',
                hint && 'textarea-hint',
                showCharacterCount && maxLength && 'textarea-character-count'
              ).replace(/\s+/g, ' ').trim() || undefined
            }
            value={currentValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          />

          {/* Character Count */}
          {showCharacterCount && maxLength && (
            <div
              id="textarea-character-count"
              className={characterCountClasses}
              aria-live="polite"
            >
              {characterCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div
            id="textarea-error"
            className={errorClasses}
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}

        {/* Hint Text */}
        {hint && !error && (
          <div
            id="textarea-hint"
            className={hintClasses}
          >
            {hint}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';