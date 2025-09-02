import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  HexColorPicker,
  RgbStringColorPicker,
  HslStringColorPicker,
} from "react-colorful";
import "./colorpicker.css";

export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv";

export type ColorPickerSize = "sm" | "md" | "lg";

export type ColorPickerVariant = "contained" | "outlined" | "text";

export type ColorPickerColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info";

export interface ColorPickerProps {
  id: string;
  label?: string;
  value?: string;
  onChange?: (color: string) => void;
  onFormatChange?: (format: ColorFormat) => void;
  format?: ColorFormat;
  size?: ColorPickerSize;
  variant?: ColorPickerVariant;
  color?: ColorPickerColor;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  placeholder?: string;
  className?: string;
  fullWidth?: boolean;
  showPreview?: boolean;
  showInput?: boolean;
  allowAlpha?: boolean;
  showFormatSelector?: boolean;
  debounce?: number;
  pickerType?: "hex" | "rgb" | "hsl";
}

// Color conversion utilities
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

const hslToRgb = (
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

const formatColor = (color: string, format: ColorFormat): string => {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  switch (format) {
    case "hex":
      return color;
    case "rgb":
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case "hsl": {
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(
        hsl.l
      )}%)`;
    }
    default:
      return color;
  }
};

const parseColor = (color: string): string => {
  if (color.startsWith("#")) return color;
  if (color.startsWith("rgb")) {
    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match;
      return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
    }
  }
  if (color.startsWith("hsl")) {
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      const [, h, s, l] = match;
      const rgb = hslToRgb(parseInt(h), parseInt(s), parseInt(l));
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }
  }
  return color;
};

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
};

const variantClasses = {
  contained: "border-2 border-gray-200 bg-white shadow-sm hover:shadow-md",
  outlined: "border-2 border-gray-200 bg-transparent hover:border-gray-300",
  text: "border-none bg-transparent hover:bg-gray-50",
};

const colorClasses = {
  primary:
    "focus:border-blue-500 focus:ring-blue-500/20 focus:shadow-blue-500/20",
  secondary:
    "focus:border-gray-500 focus:ring-gray-500/20 focus:shadow-gray-500/20",
  success:
    "focus:border-green-500 focus:ring-green-500/20 focus:shadow-green-500/20",
  error: "focus:border-red-500 focus:ring-red-500/20 focus:shadow-red-500/20",
  warning:
    "focus:border-yellow-500 focus:ring-yellow-500/20 focus:shadow-yellow-500/20",
  info: "focus:border-sky-500 focus:ring-sky-500/20 focus:shadow-sky-500/20",
};

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      id,
      label,
      value = "#000000",
      onChange,
      onFormatChange,
      format = "hex",
      size = "md",
      variant = "outlined",
      color = "primary",
      disabled = false,
      readOnly = false,
      required = false,
      error,
      helperText,
      placeholder = "Select a color",
      className,
      fullWidth = false,
      showPreview = true,
      showInput = true,
      showFormatSelector = true,
      debounce = 0,
      pickerType = "hex",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState(value);
    const [currentFormat, setCurrentFormat] = useState<ColorFormat>(format);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const isDisabled = disabled || readOnly;

    const handleColorChange = useCallback(
      (newColor: string) => {
        const parsedColor = parseColor(newColor);
        setCurrentColor(parsedColor);

        if (debounce > 0) {
          if (debounceRef.current) {
            clearTimeout(debounceRef.current);
          }
          debounceRef.current = setTimeout(() => {
            onChange?.(parsedColor);
          }, debounce);
        } else {
          onChange?.(parsedColor);
        }
      },
      [onChange, debounce]
    );

    const handleFormatChange = useCallback(
      (newFormat: ColorFormat) => {
        setCurrentFormat(newFormat);
        onFormatChange?.(newFormat);
      },
      [onFormatChange]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Always try to parse and update color
        const parsedColor = parseColor(newValue);
        if (parsedColor && parsedColor !== currentColor) {
          handleColorChange(parsedColor);
        }
      },
      [handleColorChange, currentColor]
    );

    const renderColorPicker = () => {
      const commonProps = {
        color: currentColor,
        onChange: handleColorChange,
        style: {
          width: "100%",
          height: "200px",
        },
      };

      switch (pickerType) {
        case "rgb":
          return <RgbStringColorPicker {...commonProps} />;
        case "hsl":
          return <HslStringColorPicker {...commonProps} />;
        default:
          return <HexColorPicker {...commonProps} />;
      }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Update internal state when value prop changes
    useEffect(() => {
      if (value !== currentColor) {
        setCurrentColor(value);
      }
    }, [value, currentColor]);

    // Cleanup debounce timeout
    useEffect(() => {
      return () => {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
      };
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "colorpicker-container relative",
          fullWidth ? "w-full" : "w-fit",
          className
        )}
        {...props}
      >
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-semibold text-gray-800 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div ref={containerRef} className="relative">
          <div className="flex items-center gap-2">
            {showPreview && (
              <button
                type="button"
                onClick={() => !isDisabled && setIsOpen(!isOpen)}
                disabled={isDisabled}
                className={cn(
                  "colorpicker-animate relative rounded-lg transition-all duration-300 ease-in-out",
                  "colorpicker-focus focus:outline-none focus:ring-2 focus:ring-offset-2",
                  "colorpicker-border border-white shadow-lg hover:shadow-xl",
                  "transform hover:scale-105 active:scale-95",
                  sizeClasses[size],
                  colorClasses[color],
                  isDisabled && "opacity-50 cursor-not-allowed transform-none",
                  !isDisabled && "cursor-pointer"
                )}
                style={{
                  backgroundColor: currentColor,
                  boxShadow: `0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.1)`,
                }}
                aria-label={`Current color: ${currentColor}`}
              >
                <div className="colorpicker-gradient absolute inset-0 rounded-lg" />
                {isOpen && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </button>
            )}

            {showInput && (
              <input
                type="text"
                id={id}
                value={formatColor(currentColor, currentFormat)}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={isDisabled}
                readOnly={readOnly}
                className={cn(
                  "colorpicker-input px-4 py-2 rounded-lg border-2 transition-all duration-300 ease-in-out",
                  "colorpicker-focus focus:outline-none focus:ring-2 focus:ring-offset-2",
                  "colorpicker-text font-mono text-sm font-medium",
                  size === "sm" && "h-8 text-xs",
                  size === "md" && "h-10 text-sm",
                  size === "lg" && "h-12 text-base",
                  variantClasses[variant],
                  colorClasses[color],
                  error &&
                    "border-red-400 focus:border-red-500 focus:ring-red-500/20",
                  isDisabled && "opacity-50 cursor-not-allowed bg-gray-100",
                  fullWidth ? "w-full" : "w-36"
                )}
              />
            )}

            {showFormatSelector && (
              <select
                value={currentFormat}
                onChange={(e) =>
                  handleFormatChange(e.target.value as ColorFormat)
                }
                disabled={isDisabled}
                title="Color format selector"
                aria-label="Color format selector"
                className={cn(
                  "colorpicker-select px-3 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium",
                  "colorpicker-focus focus:outline-none focus:ring-2 focus:ring-offset-2",
                  "colorpicker-text transition-all duration-300",
                  "hover:border-gray-300 hover:shadow-sm",
                  colorClasses[color],
                  isDisabled && "opacity-50 cursor-not-allowed bg-gray-100"
                )}
              >
                <option value="hex">HEX</option>
                <option value="rgb">RGB</option>
                <option value="hsl">HSL</option>
              </select>
            )}
          </div>

          {isOpen && (
            <div className="absolute top-full left-0 mt-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 min-w-80 transform transition-all duration-300 ease-out">
              <div className="space-y-6">
                {/* Color picker */}
                <div className="relative">
                  <div className="p-2 bg-gray-50 rounded-xl">
                    {renderColorPicker()}
                  </div>
                </div>

                {/* Format display */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                  <h5 className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Color Values
                  </h5>
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between items-center py-1 px-2 bg-white/60 rounded-lg">
                      <span className="text-gray-500">HEX:</span>
                      <span className="font-semibold text-gray-800">
                        {currentColor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-2 bg-white/60 rounded-lg">
                      <span className="text-gray-500">RGB:</span>
                      <span className="font-semibold text-gray-800">
                        {formatColor(currentColor, "rgb")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-1 px-2 bg-white/60 rounded-lg">
                      <span className="text-gray-500">HSL:</span>
                      <span className="font-semibold text-gray-800">
                        {formatColor(currentColor, "hsl")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mt-2 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        {helperText && !error && (
          <div className="mt-2 flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <p className="text-sm text-blue-700">{helperText}</p>
          </div>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
