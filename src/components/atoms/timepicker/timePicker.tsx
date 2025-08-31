import React, { useState, useRef, useEffect } from 'react';
import { FaChevronUp, FaChevronDown, FaClock } from 'react-icons/fa';

type Size = "sm" | "md" | "lg";
type Variant = "contained" | "outlined" | "text";
type Color = "primary" | "secondary" | "success" | "error" | "warning" | "info";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  size?: Size;
  variant?: Variant;
  color?: Color;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  showSeconds?: boolean;
  format?: "12h" | "24h";
  minTime?: string;
  maxTime?: string;
  allowTyping?: boolean;
}

interface TimeValue {
  hours: number;
  minutes: number;
  seconds?: number;
  period?: "AM" | "PM";
}

const sizeMap: Record<Size, string> = {
  sm: "h-8 px-2 text-sm",
  md: "h-10 px-3 text-base",
  lg: "h-12 px-4 text-lg",
};

const variantMap: Record<Variant, string> = {
  contained: "border-0",
  outlined: "border",
  text: "border-none",
};

const colorMap: Record<Color, Record<Variant, string>> = {
  primary: {
    contained: "bg-blue-600 text-white border-blue-600 focus:ring-2 focus:ring-blue-300",
    outlined: "border-blue-600 text-blue-600 focus:ring-2 focus:ring-blue-300",
    text: "text-blue-600 focus:ring-2 focus:ring-blue-300",
  },
  secondary: {
    contained: "bg-gray-600 text-white border-gray-600 focus:ring-2 focus:ring-gray-300",
    outlined: "border-gray-600 text-gray-600 focus:ring-gray-300",
    text: "text-gray-600 focus:ring-2 focus:ring-gray-300",
  },
  success: {
    contained: "bg-green-600 text-white border-green-600 focus:ring-2 focus:ring-green-300",
    outlined: "border-green-600 text-green-600 focus:ring-2 focus:ring-green-300",
    text: "text-green-600 focus:ring-2 focus:ring-green-300",
  },
  error: {
    contained: "bg-red-600 text-white border-red-600 focus:ring-2 focus:ring-red-300",
    outlined: "border-red-600 text-red-600 focus:ring-2 focus:ring-red-300",
    text: "text-red-600 focus:ring-2 focus:ring-red-300",
  },
  warning: {
    contained: "bg-yellow-500 text-black border-yellow-500 focus:ring-2 focus:ring-yellow-300",
    outlined: "border-yellow-500 text-yellow-600 focus:ring-2 focus:ring-yellow-300",
    text: "text-yellow-600 focus:ring-2 focus:ring-yellow-300",
  },
  info: {
    contained: "bg-sky-500 text-white border-sky-500 focus:ring-2 focus:ring-sky-300",
    outlined: "border-sky-500 text-sky-500 focus:ring-2 focus:ring-sky-300",
    text: "text-sky-500 focus:ring-2 focus:ring-sky-300",
  },
};

export const TimePicker: React.FC<TimePickerProps> = ({
  value = "",
  onChange,
  placeholder = "Select time",
  size = "md",
  variant = "outlined",
  color = "primary",
  disabled = false,
  required = false,
  className = "",
  label,
  error,
  helperText,
  showSeconds = false,
  format = "24h",
  minTime,
  maxTime,
  allowTyping = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState<TimeValue>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    period: "AM",
  });
  const [inputValue, setInputValue] = useState(value);
  const [isTyping, setIsTyping] = useState(false);
  const [lastValidValue, setLastValidValue] = useState(value);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      parseTimeString(value);
      setLastValidValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (isTyping) {
          handleInputBlur();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isTyping]);

  const parseTimeString = (timeStr: string): TimeValue | null => {
    // Support multiple time formats
    const patterns = [
      // 12h formats: "2:30 PM", "02:30 PM", "2:30:45 PM", "02:30:45 PM"
      /^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(AM|PM)$/i,
      // 24h formats: "14:30", "2:30", "14:30:45", "2:30:45"
      /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/,
      // 12h without AM/PM: "2:30", "02:30", "2:30:45", "02:30:45"
      /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/,
    ];

    for (const pattern of patterns) {
      const match = timeStr.match(pattern);
      if (match) {
        let hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        const seconds = match[3] ? parseInt(match[3]) : 0;
        const period = match[4]?.toUpperCase() as "AM" | "PM" | undefined;

        // Handle 12h format
        if (format === "12h" && period) {
          if (period === "PM" && hours !== 12) hours += 12;
          if (period === "AM" && hours === 12) hours = 0;
        } else if (format === "12h" && !period) {
          // If no period specified in 12h format, assume current period or AM
          if (timeValue.period === "PM" && hours !== 12) hours += 12;
          if (timeValue.period === "AM" && hours === 12) hours = 0;
        }

        // Validate hours
        if (hours < 0 || hours > 23) return null;
        if (minutes < 0 || minutes > 59) return null;
        if (seconds < 0 || seconds > 59) return null;

        return { hours, minutes, seconds, period };
      }
    }
    return null;
  };

  const formatTimeString = (time: TimeValue): string => {
    let { hours, period } = time;
    const { minutes, seconds } = time;
    
    if (format === "12h") {
      period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
    }

    const timeStr = showSeconds 
      ? `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds?.toString().padStart(2, "0")}`
      : `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    return format === "12h" ? `${timeStr} ${period}` : timeStr;
  };

  const validateTimeConstraints = (time: TimeValue): boolean => {
    if (!minTime && !maxTime) return true;
    
    const timeStr = formatTimeString(time);
    
    if (minTime && timeStr < minTime) return false;
    if (maxTime && timeStr > maxTime) return false;
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setIsTyping(true);
  };

  const handleInputBlur = () => {
    setIsTyping(false);
    const parsedTime = parseTimeString(inputValue);
    
    if (parsedTime && validateTimeConstraints(parsedTime)) {
      setTimeValue(parsedTime);
      const formattedTime = formatTimeString(parsedTime);
      setInputValue(formattedTime);
      setLastValidValue(formattedTime);
      onChange?.(formattedTime);
    } else {
      // Revert to last valid value
      setInputValue(lastValidValue);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setInputValue(lastValidValue);
      setIsTyping(false);
      inputRef.current?.blur();
    }
  };

  const handleTimeChange = (field: keyof TimeValue, value: number | string) => {
    const newTime = { ...timeValue, [field]: value };
    
    if (!validateTimeConstraints(newTime)) return;

    setTimeValue(newTime);
    const formattedTime = formatTimeString(newTime);
    setInputValue(formattedTime);
    setLastValidValue(formattedTime);
    onChange?.(formattedTime);
  };

  const generateTimeOptions = (type: "hours" | "minutes" | "seconds") => {
    const max = type === "hours" ? (format === "12h" ? 12 : 24) : 60;
    const start = type === "hours" && format === "24h" ? 0 : 1;
    
    return Array.from({ length: max - start + 1 }, (_, i) => {
      const value = start + i;
      // Fix: 24-hour format should go from 0-23, not 0-24
      if (type === "hours" && format === "24h" && value === 24) return 0;
      return value;
    });
  };

  const baseClasses = `
    relative w-full rounded-md transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeMap[size]}
    ${variantMap[variant]}
    ${colorMap[color][variant]}
    ${error ? "border-red-500 focus:ring-red-300" : ""}
    ${className}
  `.trim();

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setIsTyping(true)}
          placeholder={allowTyping ? placeholder : "Select time"}
          disabled={disabled}
          required={required}
          className={baseClasses}
          readOnly={!allowTyping}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <FaClock className="h-5 w-5 text-gray-400" />
        </div>
        
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className="absolute inset-y-0 right-8 flex items-center pr-2"
        >
          {isOpen ? (
            <FaChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <FaChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </button>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-auto"
        >
          <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
              {/* Hours */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Hours</label>
                <div className="max-h-32 overflow-y-auto">
                  {generateTimeOptions("hours").map((hour) => (
                    <button
                      key={hour}
                      type="button"
                      onClick={() => handleTimeChange("hours", hour)}
                      className={`w-full px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors ${
                        timeValue.hours === hour ? "bg-blue-100 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {hour.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-2">Minutes</label>
                <div className="max-h-32 overflow-y-auto">
                  {generateTimeOptions("minutes").map((minute) => (
                    <button
                      key={minute}
                      type="button"
                      onClick={() => handleTimeChange("minutes", minute)}
                      className={`w-full px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors ${
                        timeValue.minutes === minute ? "bg-blue-100 text-blue-700" : "text-gray-700"
                      }`}
                    >
                      {minute.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Seconds or Period */}
              <div>
                {showSeconds ? (
                  <>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Seconds</label>
                    <div className="max-h-32 overflow-y-auto">
                      {generateTimeOptions("seconds").map((second) => (
                        <button
                          key={second}
                          type="button"
                          onClick={() => handleTimeChange("seconds", second)}
                          className={`w-full px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors ${
                            timeValue.seconds === second ? "bg-blue-100 text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {second.toString().padStart(2, "0")}
                        </button>
                      ))}
                    </div>
                  </>
                ) : format === "12h" ? (
                  <>
                    <label className="block text-xs font-medium text-gray-500 mb-2">Period</label>
                    <div className="space-y-1">
                      {["AM", "PM"].map((period) => (
                        <button
                          key={period}
                          type="button"
                          onClick={() => handleTimeChange("period", period)}
                          className={`w-full px-2 py-1 text-sm rounded hover:bg-gray-100 transition-colors ${
                            timeValue.period === period ? "bg-blue-100 text-blue-700" : "text-gray-700"
                          }`}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const newTime: TimeValue = {
                      hours: now.getHours(),
                      minutes: now.getMinutes(),
                      seconds: showSeconds ? now.getSeconds() : 0,
                      period: format === "12h" ? (now.getHours() >= 12 ? "PM" : "AM") : undefined,
                    };
                    setTimeValue(newTime);
                    const formattedTime = formatTimeString(newTime);
                    setInputValue(formattedTime);
                    setLastValidValue(formattedTime);
                    onChange?.(formattedTime);
                  }}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                >
                  Now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const newTime: TimeValue = {
                      hours: 0,
                      minutes: 0,
                      seconds: 0,
                      period: "AM",
                    };
                    setTimeValue(newTime);
                    const formattedTime = formatTimeString(newTime);
                    setInputValue(formattedTime);
                    setLastValidValue(formattedTime);
                    onChange?.(formattedTime);
                  }}
                  className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error and Helper Text */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
