/**
 * Shared validation utilities
 * Consolidates duplicate validation functions across components
 */

export type ValidatorFunction = (value: unknown) => string | null;

/**
 * Email validation
 */
export const validateEmail: ValidatorFunction = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

/**
 * Phone number validation (supports multiple formats)
 */
export const validatePhone: ValidatorFunction = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'Phone number is required';
  }
  
  // Remove all non-digit characters
  const digitsOnly = value.replace(/\D/g, '');
  
  // Check if it's a valid phone number (10-15 digits)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

/**
 * Required field validation
 */
export const validateRequired = (message: string = 'This field is required'): ValidatorFunction => {
  return (value: unknown): string | null => {
    if (value === null || value === undefined || value === '') {
      return message;
    }
    
    if (typeof value === 'string' && !value.trim()) {
      return message;
    }
    
    return null;
  };
};

/**
 * Minimum length validation
 */
export const validateMinLength = (minLength: number): ValidatorFunction => {
  return (value: unknown): string | null => {
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    
    if (value.length < minLength) {
      return `Minimum length is ${minLength} characters`;
    }
    
    return null;
  };
};

/**
 * Maximum length validation
 */
export const validateMaxLength = (maxLength: number): ValidatorFunction => {
  return (value: unknown): string | null => {
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    
    if (value.length > maxLength) {
      return `Maximum length is ${maxLength} characters`;
    }
    
    return null;
  };
};

/**
 * Numeric validation
 */
export const validateNumeric: ValidatorFunction = (value: unknown): string | null => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return 'Value must be numeric';
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return 'Please enter a valid number';
  }
  
  return null;
};

/**
 * Range validation (for numbers)
 */
export const validateRange = (min: number, max: number): ValidatorFunction => {
  return (value: unknown): string | null => {
    const numValue = typeof value === 'string' ? parseFloat(value) : value as number;
    
    if (isNaN(numValue)) {
      return 'Please enter a valid number';
    }
    
    if (numValue < min || numValue > max) {
      return `Value must be between ${min} and ${max}`;
    }
    
    return null;
  };
};

/**
 * Pattern validation (regex)
 */
export const validatePattern = (pattern: RegExp, message: string): ValidatorFunction => {
  return (value: unknown): string | null => {
    if (typeof value !== 'string') {
      return 'Value must be a string';
    }
    
    if (!pattern.test(value)) {
      return message;
    }
    
    return null;
  };
};

/**
 * URL validation
 */
export const validateUrl: ValidatorFunction = (value: unknown): string | null => {
  if (typeof value !== 'string' || !value.trim()) {
    return 'URL is required';
  }
  
  try {
    new URL(value.trim());
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

/**
 * Date validation
 */
export const validateDate: ValidatorFunction = (value: unknown): string | null => {
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? 'Please enter a valid date' : null;
  }
  
  if (typeof value === 'string') {
    const date = new Date(value);
    return isNaN(date.getTime()) ? 'Please enter a valid date' : null;
  }
  
  return 'Please enter a valid date';
};

/**
 * Compose multiple validators
 */
export function validateWithMultiple(
  value: unknown,
  validators: ValidatorFunction[]
): string | null {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  
  return null;
}
