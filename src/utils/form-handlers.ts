/**
 * Shared form handling utilities
 * Consolidates duplicate input change handlers across components
 */

export type FormState = Record<string, unknown>;

/**
 * Generic input change handler for forms
 * Updates form state by targeting input name
 */
export function handleInputChange<T extends FormState>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  fieldName?: string
) {
  return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = fieldName || e.target.name;
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };
}

/**
 * Generic select change handler
 */
export function handleSelectChange<T extends FormState>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  fieldName?: string
) {
  return (value: string | number | undefined) => {
    const name = fieldName || 'value';
    setState(prev => ({
      ...prev,
      [name]: value
    }));
  };
}

/**
 * Multi-field update handler
 */
export function handleMultiFieldChange<T extends FormState>(
  setState: React.Dispatch<React.SetStateAction<T>>
) {
  return (updates: Partial<T>) => {
    setState(prev => ({
      ...prev,
      ...updates
    }));
  };
}

/**
 * Reset form to initial values
 */
export function handleFormReset<T extends FormState>(
  setState: React.Dispatch<React.SetStateAction<T>>,
  initialValues: T
) {
  return () => {
    setState(initialValues);
  };
}

/**
 * Validate form fields
 */
export function validateForm<T extends FormState>(
  formData: T,
  validators: Partial<Record<keyof T, (value: unknown) => string | null>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
  const errors = {} as Partial<Record<keyof T, string>>;
  let isValid = true;

  for (const [field, validator] of Object.entries(validators)) {
    if (validator) {
      const error = validator(formData[field as keyof T]);
      if (error) {
        errors[field as keyof T] = error;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
}
