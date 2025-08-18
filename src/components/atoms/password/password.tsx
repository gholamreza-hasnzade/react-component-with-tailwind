import React, { useState, useCallback } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Size = "sm" | "md" | "lg";
type Variant = "contained" | "outlined" | "text";
type Color = "primary" | "secondary" | "success" | "error" | "warning" | "info";

type PasswordStrength = "weak" | "medium" | "strong" | "very-strong";

interface PasswordStrengthConfig {
  label: string;
  color: string;
  bgColor: string;
  progressColor: string;
}

const strengthConfigs: Record<PasswordStrength, PasswordStrengthConfig> = {
  weak: {
    label: "Weak",
    color: "text-red-600",
    bgColor: "bg-red-50",
    progressColor: "bg-red-500",
  },
  medium: {
    label: "Medium",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    progressColor: "bg-yellow-500",
  },
  strong: {
    label: "Strong",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    progressColor: "bg-blue-500",
  },
  "very-strong": {
    label: "Very Strong",
    color: "text-green-600",
    bgColor: "bg-green-50",
    progressColor: "bg-green-500",
  },
};

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

type PasswordProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  size?: Size;
  fullWidth?: boolean;
  color?: Color;
  variant?: Variant;
  minLength?: number;
  maxLength?: number;
  showToggle?: boolean;
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

export const Password = React.forwardRef<HTMLInputElement, PasswordProps>(
  (
    {
      id,
      label,
      value,
      onChange,
      error,
      helperText,
      required = false,
      placeholder = "Enter your password",
      readOnly = false,
      size = "md",
      fullWidth = false,
      className,
      color = "primary",
      variant = "outlined",
      minLength = 8,
      maxLength = 128,
      showToggle = true,
      ...rest
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const calculatePasswordStrength = useCallback(
      (password: string): PasswordStrength => {
        if (!password) return "weak";

        let score = 0;

        if (password.length >= minLength) score += 1;
        if (password.length >= 12) score += 1;

        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[^A-Za-z0-9]/.test(password)) score += 1;

        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password) && /[a-zA-Z]/.test(password)) score += 1;

        if (score <= 2) return "weak";
        if (score <= 4) return "medium";
        if (score <= 6) return "strong";
        return "very-strong";
      },
      [minLength]
    );

    const getStrengthPercentage = useCallback(
      (strength: PasswordStrength): number => {
        switch (strength) {
          case "weak":
            return 25;
          case "medium":
            return 50;
          case "strong":
            return 75;
          case "very-strong":
            return 100;
          default:
            return 0;
        }
      },
      []
    );

    const currentStrength = calculatePasswordStrength(value);
    const strengthPercentage = getStrengthPercentage(currentStrength);
    const strengthConfig = strengthConfigs[currentStrength];

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const errorClasses = error ? "border-red-500 text-red-500" : "";
    const focusClasses = isFocused
      ? "border-blue-500 ring-1 ring-blue-200"
      : "border-gray-300";

    const sizeClasses = {
      sm: "text-sm px-2 py-1",
      md: "text-base px-3 py-2",
      lg: "text-lg px-4 py-3",
    };

    const widthClass = fullWidth ? "w-full" : "";

    const inputPaddingClasses = [
      "pl-3",
      showToggle ? "pr-12" : "pr-3",
      sizeClasses[size],
    ].join(" ");

    const readOnlyClasses = readOnly
      ? "bg-gray-200 cursor-not-allowed text-gray-500"
      : "";

    const colorClasses = colorMap[color][variant];

    return (
      <div className={clsx("relative", widthClass)}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>

        <div className={clsx("relative", widthClass)}>
          <input
            ref={ref}
            type={isVisible ? "text" : "password"}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            readOnly={readOnly}
            minLength={minLength}
            maxLength={maxLength}
            className={clsx(
              "mt-1 block w-full rounded-md focus:outline-none placeholder:text-gray-400",
              inputPaddingClasses,
              colorClasses,
              focusClasses,
              errorClasses,
              readOnlyClasses,
              className
            )}
            {...rest}
          />

          {showToggle && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              tabIndex={-1}
            >
              {isVisible ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          )}
        </div>

        {value && (
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={clsx(
                  "h-2 rounded-full transition-all duration-300 ease-in-out",
                  strengthConfig.progressColor
                )}
                style={{ width: `${strengthPercentage}%` }}
              />
            </div>
            <div
              className={clsx(
                "mt-1 p-2 rounded text-xs",
                strengthConfig.bgColor
              )}
            >
              <span className={clsx("font-medium", strengthConfig.color)}>
                {currentStrength === "weak" &&
                  "Add more characters and variety"}
                {currentStrength === "medium" &&
                  "Good start, add more complexity"}
                {currentStrength === "strong" && "Strong password, well done!"}
                {currentStrength === "very-strong" &&
                  "Excellent password strength!"}
              </span>
            </div>
          </div>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-500 flex items-center">{error}</p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);
