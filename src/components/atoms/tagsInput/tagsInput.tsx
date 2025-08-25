import React, { useState, useCallback, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { HiX, HiPlus } from "react-icons/hi";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";
type Variant = "contained" | "outlined" | "text";
type Color = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export interface Tag {
  id: string;
  label: string;
  color?: string;
}

export interface TagsInputProps {
  id: string;
  label: string;
  value: Tag[];
  onChange: (tags: Tag[]) => void;
  placeholder?: string;
  className?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  size?: Size;
  fullWidth?: boolean;
  color?: Color;
  variant?: Variant;
  maxTags?: number;
  minTags?: number;
  allowDuplicates?: boolean;
  validateTag?: (tag: string) => string | null; // Return error message or null if valid
  tagColors?: string[]; // Array of color classes for tags
  onTagAdd?: (tag: Tag) => void;
  onTagRemove?: (tag: Tag) => void;
  onTagUpdate?: (oldTag: Tag, newTag: Tag) => void;
  allowEdit?: boolean;
  allowDelete?: boolean;
  separator?: string; // Character to separate tags (default: comma)
  trimWhitespace?: boolean; // Whether to trim whitespace from tags
  caseSensitive?: boolean; // Whether tag comparison is case sensitive
}

const colorMap: Record<Color, Record<Variant, string>> = {
  primary: {
    contained:
      "bg-blue-600 text-white border-blue-600 placeholder:text-blue-100 focus:ring-2 focus:ring-blue-300",
    outlined:
      "border border-blue-600 text-blue-600 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-300",
    text: "text-blue-600 border-none placeholder:text-blue-300 focus:ring-2 focus:ring-blue-300",
  },
  secondary: {
    contained:
      "bg-gray-600 text-white border-gray-600 placeholder:text-gray-100 focus:ring-2 focus:ring-gray-300",
    outlined:
      "border border-gray-600 text-gray-600 placeholder:text-gray-300 focus:ring-2 focus:ring-gray-300",
    text: "text-gray-600 border-none placeholder:text-gray-300 focus:ring-2 focus:ring-gray-300",
  },
  success: {
    contained:
      "bg-green-600 text-white border-green-600 placeholder:text-green-100 focus:ring-2 focus:ring-green-300",
    outlined:
      "border border-green-600 text-green-600 placeholder:text-green-300 focus:ring-2 focus:ring-green-300",
    text: "text-green-600 border-none placeholder:text-green-300 focus:ring-2 focus:ring-green-300",
  },
  error: {
    contained:
      "bg-red-600 text-white border-red-600 placeholder:text-red-100 focus:ring-2 focus:ring-red-300",
    outlined:
      "border border-red-600 text-red-600 placeholder:text-red-300 focus:ring-2 focus:ring-red-300",
    text: "text-red-600 border-none placeholder:text-red-300 focus:ring-2 focus:ring-red-300",
  },
  warning: {
    contained:
      "bg-yellow-500 text-black border-yellow-500 placeholder:text-yellow-100 focus:ring-2 focus:ring-yellow-300",
    outlined:
      "border border-yellow-500 text-yellow-600 placeholder:text-yellow-300 focus:ring-2 focus:ring-yellow-300",
    text: "text-yellow-600 border-none placeholder:text-yellow-300 focus:ring-2 focus:ring-yellow-300",
  },
  info: {
    contained:
      "bg-sky-500 text-white border-sky-500 placeholder:text-sky-100 focus:ring-2 focus:ring-sky-300",
    outlined:
      "border border-sky-500 text-sky-500 placeholder:text-sky-300 focus:ring-2 focus:ring-sky-300",
    text: "text-sky-500 border-none placeholder:text-sky-300 focus:ring-2 focus:ring-sky-300",
  },
};

const defaultTagColors = [
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-yellow-100 text-yellow-800 border-yellow-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-indigo-100 text-indigo-800 border-indigo-200",
  "bg-red-100 text-red-800 border-red-200",
  "bg-gray-100 text-gray-800 border-gray-200",
];

export const TagsInput: React.FC<TagsInputProps> = ({
  id,
  label,
  value = [],
  onChange,
  placeholder = "Type and press Enter to add tags...",
  className,
  helperText,
  error,
  required = false,
  readOnly = false,
  disabled = false,
  size = "md",
  fullWidth = false,
  color = "primary",
  variant = "outlined",
  maxTags,
  minTags,
  allowDuplicates = false,
  validateTag,
  tagColors = defaultTagColors,
  onTagAdd,
  onTagRemove,
  onTagUpdate,
  allowEdit = false,
  allowDelete = true,
  separator = ",",
  trimWhitespace = true,
  caseSensitive = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editingTag, setEditingTag] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-2",
    lg: "text-lg px-4 py-3",
  };

  const widthClass = fullWidth ? "w-full" : "";
  const colorClasses = colorMap[color][variant];
  const errorClasses = error ? "border-red-500 text-red-500" : "";
  const focusClasses = isFocused
    ? "border-blue-500 ring-1 ring-blue-200"
    : "border-gray-300";
  const readOnlyClasses = readOnly
    ? "bg-gray-200 cursor-not-allowed text-gray-500"
    : "";
  const disabledClasses = disabled
    ? "bg-gray-100 cursor-not-allowed text-gray-400"
    : "";

  const isDisabled = disabled || readOnly;

  // Generate unique ID for tags
  const generateId = useCallback(() => {
    return `tag-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Check if tag already exists
  const tagExists = useCallback(
    (tagLabel: string) => {
      const normalizedInput = caseSensitive ? tagLabel : tagLabel.toLowerCase();
      return value.some((tag) => {
        const normalizedTag = caseSensitive ? tag.label : tag.label.toLowerCase();
        return normalizedTag === normalizedInput;
      });
    },
    [value, caseSensitive]
  );

  // Add new tag
  const addTag = useCallback(
    (tagLabel: string) => {
      if (isDisabled) return;

      let processedLabel = tagLabel;
      if (trimWhitespace) {
        processedLabel = tagLabel.trim();
      }

      if (!processedLabel) return;

      // Check max tags limit
      if (maxTags && value.length >= maxTags) {
        return;
      }

      // Check for duplicates
      if (!allowDuplicates && tagExists(processedLabel)) {
        return;
      }

      // Validate tag if validator provided
      if (validateTag) {
        const validationError = validateTag(processedLabel);
        if (validationError) {
          return;
        }
      }

      const newTag: Tag = {
        id: generateId(),
        label: processedLabel,
        color: tagColors[value.length % tagColors.length],
      };

      const newTags = [...value, newTag];
      onChange(newTags);
      onTagAdd?.(newTag);
      setInputValue("");
    },
    [
      isDisabled,
      trimWhitespace,
      maxTags,
      value,
      allowDuplicates,
      tagExists,
      validateTag,
      generateId,
      tagColors,
      onChange,
      onTagAdd,
    ]
  );

  // Remove tag
  const removeTag = useCallback(
    (tagId: string) => {
      if (isDisabled) return;

      const tagToRemove = value.find((tag) => tag.id === tagId);
      if (!tagToRemove) return;

      // Check min tags limit
      if (minTags && value.length <= minTags) {
        return;
      }

      const newTags = value.filter((tag) => tag.id !== tagId);
      onChange(newTags);
      onTagRemove?.(tagToRemove);
    },
    [isDisabled, value, minTags, onChange, onTagRemove]
  );

  // Start editing tag
  const startEditTag = useCallback(
    (tag: Tag) => {
      if (!allowEdit || isDisabled) return;
      setEditingTag(tag.id);
      setEditValue(tag.label);
    },
    [allowEdit, isDisabled]
  );

  // Save edited tag
  const saveEditTag = useCallback(
    (tagId: string) => {
      if (!editingTag || editingTag !== tagId) return;

      let processedLabel = editValue;
      if (trimWhitespace) {
        processedLabel = editValue.trim();
      }

      if (!processedLabel) return;

      const oldTag = value.find((tag) => tag.id === tagId);
      if (!oldTag) return;

      // Check for duplicates (excluding current tag)
      if (!allowDuplicates && tagExists(processedLabel)) {
        const otherTag = value.find(
          (tag) =>
            tag.id !== tagId &&
            (caseSensitive
              ? tag.label === processedLabel
              : tag.label.toLowerCase() === processedLabel.toLowerCase())
        );
        if (otherTag) return;
      }

      // Validate tag if validator provided
      if (validateTag) {
        const validationError = validateTag(processedLabel);
        if (validationError) {
          return;
        }
      }

      const newTag: Tag = { ...oldTag, label: processedLabel };
      const newTags = value.map((tag) =>
        tag.id === tagId ? newTag : tag
      );

      onChange(newTags);
      onTagUpdate?.(oldTag, newTag);
      setEditingTag(null);
      setEditValue("");
    },
    [
      editingTag,
      editValue,
      trimWhitespace,
      allowDuplicates,
      tagExists,
      caseSensitive,
      validateTag,
      value,
      onChange,
      onTagUpdate,
    ]
  );

  // Cancel editing
  const cancelEdit = useCallback(() => {
    setEditingTag(null);
    setEditValue("");
  }, []);

  // Handle input key events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (isDisabled) return;

      if (e.key === "Enter") {
        e.preventDefault();
        if (inputValue.trim()) {
          addTag(inputValue);
        }
      } else if (e.key === separator && inputValue.trim()) {
        e.preventDefault();
        addTag(inputValue);
      } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
        // Remove last tag on backspace if input is empty
        const lastTag = value[value.length - 1];
        removeTag(lastTag.id);
      }
    },
    [isDisabled, inputValue, separator, addTag, value, removeTag]
  );

  // Handle edit input key events
  const handleEditKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>, tagId: string) => {
      if (e.key === "Enter") {
        e.preventDefault();
        saveEditTag(tagId);
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancelEdit();
      }
    },
    [saveEditTag, cancelEdit]
  );

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) return;
      setInputValue(e.target.value);
    },
    [isDisabled]
  );

  // Handle edit input change
  const handleEditChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(e.target.value);
    },
    []
  );

  // Handle input blur
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // Add tag if there's input value
    if (inputValue.trim()) {
      addTag(inputValue);
    }
  }, [inputValue, addTag]);

  // Handle edit input blur
  const handleEditBlur = useCallback(
    (tagId: string) => {
      saveEditTag(tagId);
    },
    [saveEditTag]
  );

  // Focus edit input when editing starts
  useEffect(() => {
    if (editingTag && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingTag]);

  // Focus main input when editing ends
  useEffect(() => {
    if (!editingTag && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTag]);

  return (
    <div className={clsx("relative", widthClass)}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <div className={clsx("relative", widthClass)}>
        <div
          className={clsx(
            "mt-1 block w-full rounded-md focus:outline-none placeholder:text-gray-400",
            sizeClasses[size],
            colorClasses,
            focusClasses,
            errorClasses,
            readOnlyClasses,
            disabledClasses,
            "min-h-[42px] flex flex-wrap items-center gap-2",
            className
          )}
          onClick={() => !isDisabled && inputRef.current?.focus()}
        >
          {/* Existing Tags */}
          {value.map((tag) => (
            <div
              key={tag.id}
              className={clsx(
                "inline-flex items-center gap-1 px-2 py-1 rounded-md text-sm font-medium border transition-all duration-200",
                tag.color || "bg-gray-100 text-gray-800 border-gray-200",
                allowEdit && !isDisabled && "cursor-pointer hover:scale-105",
                isDisabled && "opacity-60"
              )}
              onClick={() => allowEdit && !isDisabled && startEditTag(tag)}
            >
              {editingTag === tag.id ? (
                                 <input
                   ref={editInputRef}
                   type="text"
                   value={editValue}
                   onChange={handleEditChange}
                   onKeyDown={(e) => handleEditKeyDown(e, tag.id)}
                   onBlur={() => handleEditBlur(tag.id)}
                   className="bg-transparent border-none outline-none text-inherit min-w-[60px] max-w-[200px]"
                   autoComplete="off"
                   aria-label={`Edit tag ${tag.label}`}
                   title={`Edit tag ${tag.label}`}
                 />
              ) : (
                <>
                  <span className="truncate">{tag.label}</span>
                  {allowDelete && !isDisabled && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeTag(tag.id);
                      }}
                      className="ml-1 hover:bg-black/10 rounded-full p-0.5 transition-colors"
                      aria-label={`Remove tag ${tag.label}`}
                    >
                      <HiX className="w-3 h-3" />
                    </button>
                  )}
                </>
              )}
            </div>
          ))}

          {/* Input Field */}
          {(!maxTags || value.length < maxTags) && (
            <input
              ref={inputRef}
              type="text"
              id={id}
              name={id}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={handleInputBlur}
              placeholder={value.length === 0 ? placeholder : "Add more tags..."}
              disabled={isDisabled}
              className="flex-1 min-w-[120px] bg-transparent border-none outline-none placeholder:text-gray-400"
              autoComplete="off"
            />
          )}

          {/* Add Button (optional) */}
          {inputValue.trim() && (
            <button
              type="button"
              onClick={() => addTag(inputValue)}
              disabled={isDisabled}
              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Add tag"
            >
              <HiPlus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center">
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">{helperText}</p>
      )}

      {/* Tags Count */}
      {(maxTags || minTags) && (
        <p className="mt-1 text-xs text-gray-400">
          {value.length}
          {maxTags && ` / ${maxTags}`} tags
          {minTags && value.length < minTags && (
            <span className="text-red-500 ml-1">
              (minimum {minTags} required)
            </span>
          )}
        </p>
      )}
    </div>
  );
};