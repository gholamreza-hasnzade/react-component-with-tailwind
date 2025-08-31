import React, { useState, useEffect, useCallback } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

type Size = "sm" | "md" | "lg";

type Variant = "contained" | "outlined" | "text";

type Color = "primary" | "secondary" | "success" | "error" | "warning" | "info";

export type FormatPattern =
  | "bank-account"
  | "credit-card"
  | "national-id"
  | "postal-code"
  | "custom";

interface FormatConfig {
  pattern: string;
  separator: string;
  groupSize: number | number[];
  maxLength: number;
  placeholder: string;
  description: string;
}

const formatConfigs: Record<FormatPattern, FormatConfig> = {
  "bank-account": {
    pattern: "####-####-####-####",
    separator: "-",
    groupSize: 4,
    maxLength: 19,
    placeholder: "0000-0000-0000-0000",
    description: "Bank account number format",
  },
  "credit-card": {
    pattern: "#### #### #### ####",
    separator: " ",
    groupSize: 4,
    maxLength: 19,
    placeholder: "0000 0000 0000 0000",
    description: "Credit card format",
  },
  "national-id": {
    pattern: "###-###-###-#",
    separator: "-",
    groupSize: 3,
    maxLength: 13,
    placeholder: "000-000-000-0",
    description: "National ID format",
  },
  "postal-code": {
    pattern: "#####-#####",
    separator: "-",
    groupSize: 5,
    maxLength: 11,
    placeholder: "00000-00000",
    description: "Postal code format",
  },
  custom: {
    pattern: "",
    separator: "",
    groupSize: 0,
    maxLength: 0,
    placeholder: "Enter custom format",
    description: "Custom format",
  },
};

const colorMap: Record<Color, Record<Variant, string>> = {
  primary: {
    contained:
      "bg-blue-50 text-blue-900 border-blue-300 placeholder:text-blue-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500",
  },
  secondary: {
    contained:
      "bg-gray-50 text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-gray-500 focus:ring-1 focus:ring-gray-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-gray-500",
  },
  success: {
    contained:
      "bg-green-50 text-green-900 border-green-300 placeholder:text-green-400 focus:border-green-500 focus:ring-1 focus:ring-green-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-green-500",
  },
  error: {
    contained:
      "bg-red-50 text-red-900 border-red-300 placeholder:text-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-red-500",
  },
  warning: {
    contained:
      "bg-yellow-50 text-yellow-900 border-yellow-300 placeholder:text-yellow-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-yellow-500",
  },
  info: {
    contained:
      "bg-sky-50 text-sky-900 border-sky-300 placeholder:text-sky-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    outlined:
      "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-sky-500 focus:ring-1 focus:ring-sky-500",
    text: "bg-transparent text-gray-900 border-none placeholder:text-gray-400 focus:ring-1 focus:ring-sky-500",
  },
};

type InputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  onIconLeftClick?: () => void;
  onIconRightClick?: () => void;
  readOnly?: boolean;
  size?: Size;
  fullWidth?: boolean;
  color?: Color;
  variant?: Variant;
  // New numeric formatting props
  formatPattern?: FormatPattern;
  customFormat?: string;
  // Regex pattern validation
  patternRgx?: string;
  patternErrorMessage?: string;
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "value"
  | "onChange"
  | "id"
  | "type"
  | "required"
  | "readOnly"
  | "placeholder"
  | "className"
  | "size"
  | "color"
  | "variant"
>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      error,
      helperText,
      required = false,
      type = "text",
      placeholder,
      iconLeft,
      iconRight,
      onIconLeftClick,
      onIconRightClick,
      readOnly = false,
      size = "md",
      fullWidth = false,
      className,
      color = "primary",
      variant = "outlined",
      formatPattern,
      customFormat,
      patternRgx,
      patternErrorMessage,
      ...rest
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = useState(value);
    const [validationError, setValidationError] = useState<string>("");

    // Regex pattern validation
    const validatePattern = useCallback(
      (value: string): string => {
        if (!patternRgx || !value) return "";

        try {
          const regex = new RegExp(patternRgx);
          const isValid = regex.test(value);
          console.log(
            `Validating "${value}" against pattern "${patternRgx}": ${isValid}`
          );

          if (!isValid) {
            // Use custom error message if provided, otherwise use default
            return (
              patternErrorMessage ||
              `Value does not match the required pattern: ${patternRgx}`
            );
          }
        } catch {
          console.warn("Invalid regex pattern:", patternRgx);
        }

        return "";
      },
      [patternRgx, patternErrorMessage]
    );

    // Get format configuration for numeric inputs
    const getFormatConfig = useCallback((): FormatConfig | null => {
      if (!formatPattern || type !== "number") return null;

      if (formatPattern === "custom" && customFormat) {
        // Parse custom format like "####-####" or "##-###-###-####"
        const separator = customFormat.match(/[^#]/)?.[0] || "";
        const groups = customFormat
          .split(separator)
          .map((group) => group.length);
        const maxLength = customFormat.length;

        return {
          pattern: customFormat,
          separator,
          groupSize: groups, // Now it's an array of group sizes
          maxLength,
          placeholder: customFormat.replace(/#/g, "0"),
          description: "Custom format",
        };
      }

      return formatConfigs[formatPattern];
    }, [formatPattern, customFormat, type]);

    const formatConfig = getFormatConfig();

    const formatValue = useCallback(
      (rawValue: string): string => {
        if (!rawValue || !formatConfig) return rawValue;

        const numbers = rawValue.replace(/[^0-9]/g, "");

        const { separator, groupSize } = formatConfig;

        if (Array.isArray(groupSize)) {
          const groups = [];
          let currentIndex = 0;

          for (const size of groupSize) {
            if (currentIndex >= numbers.length) break;
            groups.push(numbers.slice(currentIndex, currentIndex + size));
            currentIndex += size;
          }

          return groups.join(separator);
        } else if (groupSize > 0) {
          const groups = [];
          for (let i = 0; i < numbers.length; i += groupSize) {
            groups.push(numbers.slice(i, i + groupSize));
          }
          return groups.join(separator);
        }

        return numbers;
      },
      [formatConfig]
    );

    const parseValue = useCallback(
      (formattedValue: string): string => {
        if (!formatConfig) return formattedValue;
        return formattedValue.replace(/[^0-9]/g, "");
      },
      [formatConfig]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (patternRgx) {
          const patternError = validatePattern(e.target.value);
          setValidationError(patternError);
        }

        if (type === "number" && formatConfig) {
          const inputValue = e.target.value;

          if (inputValue.length < displayValue.length) {
            setDisplayValue(inputValue);
            const syntheticEvent = {
              ...e,
              target: { ...e.target, value: parseValue(inputValue) },
            };
            onChange(syntheticEvent);
            return;
          }

          if (formatPattern === "custom") {
            const numbers = inputValue.replace(/[^0-9]/g, "");

            let formattedValue = "";
            if (formatConfig && numbers.length > 0) {
              formattedValue = formatValue(numbers);
            } else {
              formattedValue = numbers;
            }

            setDisplayValue(formattedValue);

            const syntheticEvent = {
              ...e,
              target: { ...e.target, value: formattedValue },
            };
            onChange(syntheticEvent);
            return;
          }

          const filteredValue = inputValue.replace(/[^0-9\-\s+]/g, "");

          const formattedValue = formatValue(filteredValue);

          if (formattedValue.length <= formatConfig.maxLength) {
            setDisplayValue(formattedValue);
            const syntheticEvent = {
              ...e,
              target: { ...e.target, value: parseValue(formattedValue) },
            };
            onChange(syntheticEvent);
          }
        } else {
          onChange(e);
        }
      },
      [
        type,
        formatConfig,
        displayValue,
        formatValue,
        parseValue,
        onChange,
        formatPattern,
        customFormat,
        validatePattern,
        patternRgx,
      ]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === "number" && formatConfig) {
          const allowedKeys = [
            "Backspace",
            "Delete",
            "Tab",
            "Enter",
            "Escape",
            "ArrowLeft",
            "ArrowRight",
            "ArrowUp",
            "ArrowDown",
            "Home",
            "End",
          ];

          if (allowedKeys.includes(e.key)) return;

          if (e.ctrlKey || e.metaKey) return;

          if (/[0-9]/.test(e.key)) return;

          if (formatPattern === "custom" && customFormat) {
            const separator = customFormat.match(/[^#]/)?.[0] || "";
            if (separator && e.key === separator) return;
          }

          if (formatConfig.separator && e.key === formatConfig.separator)
            return;

          if (formatPattern === "credit-card" && e.key === " ") return;

          e.preventDefault();
        }
      },
      [type, formatConfig, formatPattern, customFormat]
    );

    useEffect(() => {
      if (
        type === "number" &&
        formatConfig &&
        value !== parseValue(displayValue)
      ) {
        const formatted = formatValue(value);
        setDisplayValue(formatted);
      } else if (type !== "number") {
        setDisplayValue(value);
      }
    }, [
      value,
      displayValue,
      formatValue,
      parseValue,
      type,
      formatConfig,
      formatPattern,
    ]);

    useEffect(() => {
      if (type === "number" && formatPattern === "custom") {
        if (!value) {
          setDisplayValue("");
        } else {
          const numbers = value.replace(/[^0-9]/g, "");
          if (formatConfig && numbers.length > 0) {
            const formatted = formatValue(numbers);
            setDisplayValue(formatted);
          } else {
            setDisplayValue(numbers);
          }
        }
      }
    }, [type, formatPattern, value, formatConfig, formatValue]);

    const errorClasses = error ? "border-red-500" : "";

    const sizeClasses = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-3 text-base",
      lg: "h-12 px-4 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const inputPaddingClasses = [
      iconLeft ? "pl-10" : "pl-3",
      iconRight ? "pr-10" : "pr-3",
      sizeClasses[size],
    ].join(" ");

    const readOnlyClasses = readOnly
      ? "bg-gray-50 cursor-not-allowed text-gray-500"
      : "";

    const colorClasses = colorMap[color][variant];

    const inputType = type === "number" && formatConfig ? "text" : type;
    const inputValue = type === "number" && formatConfig ? displayValue : value;
    const inputPlaceholder =
      type === "number" && formatConfig && !placeholder
        ? formatConfig.placeholder
        : placeholder;

    return (
      <div className={clsx("relative", widthClass)}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <div className={clsx("relative", widthClass)}>
          {iconLeft && (
            <span
              onClick={onIconLeftClick}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-gray-400"
            >
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            type={inputType}
            id={id}
            name={id}
            value={inputValue}
            onChange={handleChange}
            onBlur={(e) => {
              const patternError = validatePattern(e.target.value);
              setValidationError(patternError);
            }}
            placeholder={inputPlaceholder}
            readOnly={readOnly}
            inputMode={type === "number" ? "numeric" : undefined}
            autoComplete={type === "number" ? "off" : undefined}
            className={clsx(
              "block w-full rounded-md border transition-all duration-200 ease-in-out",
              "focus:outline-none",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              inputPaddingClasses,
              colorClasses,
              errorClasses,
              readOnlyClasses,
              className
            )}
            style={{
              ...(type === "number" && {
                WebkitAppearance: "none",
                MozAppearance: "textfield",
              }),
            }}
            onKeyDown={(e) => {
              handleKeyDown(e);

              if (
                type === "number" &&
                e.key === "e" &&
                !e.ctrlKey &&
                !e.metaKey
              ) {
                e.preventDefault();
                return;
              }
            }}
            {...rest}
          />

          {iconRight && (
            <span
              onClick={onIconRightClick}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-gray-400"
            >
              {iconRight}
            </span>
          )}
        </div>

        {(error || validationError) && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            {error || validationError}
          </p>
        )}

        {helperText && !error && !validationError && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}

        {type === "number" && formatConfig && (
          <p className="mt-1 text-xs text-gray-400">
            {formatConfig.description}
          </p>
        )}
      </div>
    );
  }
);
