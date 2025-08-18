import { useState } from "react";
import { PersianDateInput } from "./persianDatePicker";

export default {
  title: "Atoms/PersianDateInput",
  component: PersianDateInput,
};

export const Default = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <PersianDateInput
      label="تاریخ"
      placeholder="تاریخ را انتخاب کنید"
      value={value}
      onChange={setValue}
    />
  );
};

export const WithError = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <PersianDateInput
      label="تاریخ"
      placeholder="تاریخ را انتخاب کنید"
      value={value}
      onChange={setValue}
      error="فرمت تاریخ صحیح نیست"
      required
    />
  );
};

export const WithDefaultValue = () => {
  const [value, setValue] = useState<Date | null>(new Date("2025-07-22"));
  return (
    <PersianDateInput
      label="تاریخ"
      placeholder="تاریخ را انتخاب کنید"
      value={value}
      onChange={setValue}
    />
  );
};

export const WithDifferentFormat = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <PersianDateInput
      label="تاریخ (فرمت DD-MM-YYYY)"
      placeholder="مثال: 03-05-1404"
      value={value}
      onChange={setValue}
      format="DD-MM-YYYY"
    />
  );
};

export const ColorsAndVariants = () => {
  const [value, setValue] = useState<Date | null>(null);
  const colors: Array<"primary" | "secondary" | "success" | "error" | "warning" | "info"> = [
    "primary",
    "secondary",
    "success",
    "error",
    "warning",
    "info",
  ];
  const variants: Array<"contained" | "outlined" | "text"> = [
    "contained",
    "outlined",
    "text",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {colors.map((color) => (
        <div key={color} style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          {variants.map((variant) => (
            <div key={variant} style={{ minWidth: 260 }}>
              <PersianDateInput
                label={`${color} - ${variant}`}
                placeholder="تاریخ را انتخاب کنید"
                value={value}
                onChange={setValue}
                color={color}
                variant={variant}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
