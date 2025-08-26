import type { FC } from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";
import clsx from "clsx";
import { FiCalendar } from "react-icons/fi";

export type PersianDateFormat =
  | "YYYY/MM/DD"
  | "YYYY-MM-DD"
  | "DD/MM/YYYY"
  | "DD-MM-YYYY";

export type PersianDateInputProps = {
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  id?: string;
  name?: string;
  format?: PersianDateFormat;
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
  variant?: "contained" | "outlined" | "text";
};

const colorMap = {
  primary: {
    contained: "bg-blue-50 border-blue-600 text-blue-700",
    outlined: "border border-blue-600 text-blue-600 bg-white",
    text: "text-blue-600 bg-transparent border-none",
  },
  secondary: {
    contained: "bg-gray-50 border-gray-600 text-gray-700",
    outlined: "border border-gray-600 text-gray-600 bg-white",
    text: "text-gray-600 bg-transparent border-none",
  },
  success: {
    contained: "bg-green-50 border-green-600 text-green-700",
    outlined: "border border-green-600 text-green-600 bg-white",
    text: "text-green-600 bg-transparent border-none",
  },
  error: {
    contained: "bg-red-50 border-red-600 text-red-700",
    outlined: "border border-red-600 text-red-600 bg-white",
    text: "text-red-600 bg-transparent border-none",
  },
  warning: {
    contained: "bg-yellow-50 border-yellow-500 text-yellow-700",
    outlined: "border border-yellow-500 text-yellow-600 bg-white",
    text: "text-yellow-600 bg-transparent border-none",
  },
  info: {
    contained: "bg-sky-50 border-sky-500 text-sky-700",
    outlined: "border border-sky-500 text-sky-500 bg-white",
    text: "text-sky-500 bg-transparent border-none",
  },
};

export const PersianDateInput: FC<PersianDateInputProps> = ({
  value,
  onChange,
  label,
  placeholder = "",
  required,
  error,
  disabled = false,
  minDate,
  maxDate,
  id,
  name,
  format = "YYYY/MM/DD",
  color = "primary",
  variant = "outlined",
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string | null>(null);

  useEffect(() => {
    if (value) {
      const jalali = new DateObject({
        date: value,
        calendar: persian,
        locale: persian_fa,
      });
      setInputValue(jalali.format(format));
    } else {
      setInputValue("");
    }
  }, [value, format]);

  const jalaliValue = value
    ? new DateObject({
        date: value,
        calendar: persian,
        locale: persian_fa,
      })
    : null;

  const handleChange = (dateObj: DateObject | null) => {
    setInputError(null);
    if (onChange) {
      if (dateObj) {
        const gregorianDate = dateObj.convert(gregorian).toDate();
        onChange(gregorianDate);
      } else {
        onChange(null);
      }
    }
  };

  const getRegexForFormat = (format: string) => {
    switch (format) {
      case "YYYY/MM/DD":
      case "YYYY-MM-DD":
        return /^\d{4}([-/])\d{2}\1\d{2}$/;
      case "DD/MM/YYYY":
      case "DD-MM-YYYY":
        return /^\d{2}([-/])\d{2}\1\d{4}$/;
      default:
        return null;
    }
  };

  const regex = getRegexForFormat(format);

  const toEnglishDigits = (str: string) =>
    str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalVal = e.target.value;
    const val = toEnglishDigits(originalVal);
    setInputValue(originalVal);
    if (val === "") {
      handleChange(null);
      setInputError(null);
      return;
    }
    setInputError(null);
    if (regex && regex.test(val)) {
      try {
        let sepIdx =
          format.indexOf("/") > -1 ? format.indexOf("/") : format.indexOf("-");
        if (sepIdx === -1) sepIdx = 4;
        const sep = val[sepIdx];
        const dynamicFormat = format.replace(/[/-]/g, sep);
        const dateObj = new DateObject({
          date: val,
          format: dynamicFormat,
          calendar: persian,
          locale: persian_fa,
        });
        if (!dateObj.isValid) throw new Error();
        handleChange(dateObj);
      } catch {
        setInputError("فرمت تاریخ معتبر نیست");
      }
    } else {
      setInputError(
        `فرمت تاریخ باید ${format
          .replace(/Y/g, "Y")
          .replace(/M/g, "M")
          .replace(/D/g, "D")} باشد`
      );
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = /[0-9/-]/;
    if (
      e.ctrlKey ||
      e.metaKey ||
      e.altKey ||
      ["Backspace", "ArrowLeft", "ArrowRight", "Delete", "Tab"].includes(e.key)
    ) {
      return;
    }
    if (!allowed.test(e.key)) {
      e.preventDefault();
    }
  };

  const colorClass = colorMap[color][variant];

  return (
    <div
      className={clsx(
        "relative flex flex-col w-full",
        disabled && "pointer-events-none"
      )}
    >
      {label && (
        <label htmlFor={id} className="text-gray-600 font-normal text-xs mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={jalaliValue}
        onChange={handleChange}
        render={(_, openCalendar) => (
          <div className="relative" onClick={openCalendar}>
            <input
              id={id}
              name={name}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder}
              className={clsx(
                "w-full px-2 py-2 text-xs rounded-sm outline-none transition duration-200",
                colorClass,
                error || inputError ? "border-red-500" : "border-gray-200",
                "h-[38px] hover:border-primary-200 focus:border-primary-700"
              )}
              style={{
                border: disabled ? "1px solid #E7E7E7" : undefined,
                cursor: disabled ? "not-allowed" : "pointer",
                backgroundColor: disabled ? "#F6F6F6" : undefined,
              }}
              disabled={disabled}
              inputMode="numeric"
            />
            <FiCalendar className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
          </div>
        )}
        format={format}
        minDate={
          minDate &&
          new DateObject({
            date: minDate,
            calendar: persian,
            locale: persian_fa,
          })
        }
        maxDate={
          maxDate &&
          new DateObject({
            date: maxDate,
            calendar: persian,
            locale: persian_fa,
          })
        }
        disabled={disabled}
      />

      {(error || inputError) && (
        <div className="text-xs text-red-400 mt-1 h-[15px]">
          {inputError || (typeof error === "string" && error)}
        </div>
      )}
    </div>
  );
};
