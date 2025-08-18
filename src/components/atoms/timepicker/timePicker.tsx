import React, { useState } from "react";
import { Input } from "../input/input";
import { FiClock } from "react-icons/fi";

interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  disabled = false,
  placeholder,
  required,
  error,
}) => {
  const [inputValue, setInputValue] = useState(value ?? "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Allow up to 5 chars if colon is present, or up to 4 digits if not
    if (/^\d{0,2}:?\d{0,2}$/.test(val)) {
      if (val.length > 5) val = val.slice(0, 5);
      setInputValue(val);
      onChange?.(val);
    } else {
      // Ignore input that doesn't match pattern
      // Optionally, you could allow and just not update
    }
  };

  const handleFocus = () => {
    if (!inputValue) {
      setInputValue("00:00");
      onChange?.("00:00");
      // Select hour part
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 2);
      }, 0);
    } else {
      // If already has value, select all
      setTimeout(() => {
        inputRef.current?.setSelectionRange(0, 2);
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab" && inputRef.current) {
      const pos = inputRef.current.selectionStart ?? 0;
      // If Shift+Tab in minute part, move to hour part
      if (e.shiftKey && pos >= 3) {
        e.preventDefault();
        inputRef.current.setSelectionRange(0, 2);
      }
      // If Tab in hour part, move to minute part
      else if (!e.shiftKey && pos <= 2) {
        e.preventDefault();
        inputRef.current.setSelectionRange(3, 5);
      }
    }
  };

  const handleBlur = () => {
    if (!inputValue) return;
    // On blur, format as HH:mm if possible
    const digits = inputValue.replace(/[^0-9]/g, "");
    if (digits.length === 4) {
      let hour = digits.slice(0, 2);
      let minute = digits.slice(2, 4);
      if (parseInt(hour, 10) > 23) hour = "23";
      if (parseInt(minute, 10) > 59) minute = "59";
      const formatted = `${hour}:${minute}`;
      setInputValue(formatted);
      onChange?.(formatted);
      return;
    }
    // If already in HH:mm format, keep as is if valid
    const match = inputValue.match(/^(\d{1,2}):(\d{1,2})$/);
    if (match) {
      let hour = match[1];
      let minute = match[2];
      if (parseInt(hour, 10) > 23 || parseInt(minute, 10) > 59) {
        setInputValue("");
        onChange?.("");
        return;
      }
      hour = hour.padStart(2, "0");
      minute = minute.padStart(2, "0");
      const formatted = `${hour}:${minute}`;
      setInputValue(formatted);
      onChange?.(formatted);
      return;
    }
    // Otherwise, clear the input
    setInputValue("");
    onChange?.("");
  };

  const handleClear = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setInputValue("");
      onChange?.("");
    } else {
      handleInputChange(e);
    }
  };

  const iconLeft = <FiClock />;

  return (
    <div className="relative">
      <Input
        id="time-picker-input"
        label="Time"
        value={inputValue}
        onChange={handleClear}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder ?? "HH:mm"}
        className={className}
        type="text"
        iconLeft={iconLeft}
        required={required}
        error={error}
        ref={inputRef}
      />
    </div>
  );
};
