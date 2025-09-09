import React, { useState, useEffect, useRef } from 'react';
import { CellContext, Column } from '@tanstack/react-table';
import { CheckIcon, XIcon, EditIcon } from 'lucide-react';

export interface InlineEditConfig {
  enabled: boolean;
  onSave: (rowId: string, columnId: string, value: any) => Promise<void> | void;
  onCancel?: (rowId: string, columnId: string) => void;
  validation?: (value: any) => string | null;
  inputType?: 'text' | 'number' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  selectOptions?: { label: string; value: any }[];
  placeholder?: string;
}

export interface EditableCellProps<TData> {
  cell: CellContext<TData, unknown>;
  column: Column<TData, unknown>;
  config: InlineEditConfig;
  className?: string;
}

export function EditableCell<TData>({
  cell,
  column,
  config,
  className = '',
}: EditableCellProps<TData>) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(cell.getValue());
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.select();
      }
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!config.enabled) return;
    setIsEditing(true);
    setValue(cell.getValue());
    setError(null);
  };

  const handleSave = async () => {
    if (!config.enabled) return;

    // Validate value
    if (config.validation) {
      const validationError = config.validation(value);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setIsSaving(true);
    try {
      await config.onSave(cell.row.id, column.id, value);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (!config.enabled) return;
    setValue(cell.getValue());
    setIsEditing(false);
    setError(null);
    config.onCancel?.(cell.row.id, column.id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const renderInput = () => {
    const inputProps = {
      ref: inputRef as any,
      value: value ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setValue(e.target.value);
        setError(null);
      },
      onKeyDown: handleKeyDown,
      className: `w-full px-2 py-1 text-sm border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
        error ? 'border-red-300' : 'border-gray-300'
      }`,
      placeholder: config.placeholder,
      disabled: isSaving,
    };

    switch (config.inputType) {
      case 'textarea':
        return (
          <textarea
            {...inputProps}
            rows={3}
            className={`${inputProps.className} resize-none`}
          />
        );
      
      case 'select':
        return (
          <select {...inputProps}>
            <option value="">Select an option</option>
            {config.selectOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'number':
        return (
          <input
            {...inputProps}
            type="number"
            step="any"
          />
        );
      
      case 'email':
        return (
          <input
            {...inputProps}
            type="email"
          />
        );
      
      case 'tel':
        return (
          <input
            {...inputProps}
            type="tel"
          />
        );
      
      case 'url':
        return (
          <input
            {...inputProps}
            type="url"
          />
        );
      
      default:
        return (
          <input
            {...inputProps}
            type="text"
          />
        );
    }
  };

  if (!isEditing) {
    return (
      <div
        className={`group relative ${className} ${config.enabled ? 'cursor-pointer hover:bg-gray-50' : ''}`}
        onClick={handleStartEdit}
      >
        <div className="flex items-center justify-between">
          <span className="truncate">{cell.getValue() as React.ReactNode}</span>
          {config.enabled && (
            <EditIcon className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {renderInput()}
      
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200 z-10">
          {error}
        </div>
      )}
      
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex space-x-1">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors disabled:opacity-50"
          title="Save"
        >
          {isSaving ? (
            <div className="w-3 h-3 border border-green-600 border-t-transparent rounded-full animate-spin" />
          ) : (
            <CheckIcon className="w-3 h-3" />
          )}
        </button>
        
        <button
          onClick={handleCancel}
          disabled={isSaving}
          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors disabled:opacity-50"
          title="Cancel"
        >
          <XIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

export function createEditableColumn<TData>(
  column: Column<TData, unknown>,
  config: InlineEditConfig
) {
  return {
    ...column,
    cell: (cell: CellContext<TData, unknown>) => (
      <EditableCell
        cell={cell}
        column={column}
        config={config}
      />
    ),
  };
}
