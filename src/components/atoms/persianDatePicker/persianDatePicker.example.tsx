import React, { useState } from 'react';
import { PersianDateInput } from './persianDatePicker';

export const PersianDatePickerExample = () => {
  const [dates, setDates] = useState({
    basic: null as Date | null,
    primary: null as Date | null,
    secondary: null as Date | null,
    success: null as Date | null,
    error: null as Date | null,
    warning: null as Date | null,
    info: null as Date | null,
    contained: null as Date | null,
    text: null as Date | null,
    withError: null as Date | null,
    required: null as Date | null,
    disabled: null as Date | null,
    yyyyMMdd: null as Date | null,
    ddMMyyyy: null as Date | null,
    yyyyMMddDash: null as Date | null,
    ddMMyyyyDash: null as Date | null,
    minMax: null as Date | null,
    customPlaceholder: null as Date | null,
  });

  const handleDateChange = (key: string, value: Date | null) => {
    setDates(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Helper function to format date for display
  const formatDateForDisplay = (date: Date | null) => {
    if (!date) return 'None selected';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Set min and max dates for demonstration
  const minDate = new Date(2020, 0, 1); // January 1, 2020
  const maxDate = new Date(2030, 11, 31); // December 31, 2030

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Persian Date Picker Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Persian Date Picker component with Jalali calendar support.
        </p>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> This component uses the Jalali (Persian) calendar. Dates are displayed in Persian format but stored as Gregorian Date objects.
          </p>
        </div>
      </div>

      {/* Basic Date Picker */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Date Picker</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PersianDateInput
              id="basic"
              label="Basic date picker"
              value={dates.basic}
              onChange={(value) => handleDateChange('basic', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.basic)}
            </p>
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Variants (Outlined)</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PersianDateInput
              id="primary"
              label="Primary color"
              color="primary"
              value={dates.primary}
              onChange={(value) => handleDateChange('primary', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.primary)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="secondary"
              label="Secondary color"
              color="secondary"
              value={dates.secondary}
              onChange={(value) => handleDateChange('secondary', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.secondary)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="success"
              label="Success color"
              color="success"
              value={dates.success}
              onChange={(value) => handleDateChange('success', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.success)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="error"
              label="Error color"
              color="error"
              value={dates.error}
              onChange={(value) => handleDateChange('error', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.error)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="warning"
              label="Warning color"
              color="warning"
              value={dates.warning}
              onChange={(value) => handleDateChange('warning', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.warning)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="info"
              label="Info color"
              color="info"
              value={dates.info}
              onChange={(value) => handleDateChange('info', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.info)}
            </p>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Variants</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <PersianDateInput
              id="contained"
              label="Contained variant"
              variant="contained"
              color="primary"
              value={dates.contained}
              onChange={(value) => handleDateChange('contained', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.contained)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="outlined"
              label="Outlined variant (default)"
              variant="outlined"
              color="primary"
              value={dates.primary}
              onChange={(value) => handleDateChange('primary', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.primary)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="text"
              label="Text variant"
              variant="text"
              color="primary"
              value={dates.text}
              onChange={(value) => handleDateChange('text', value)}
              placeholder="انتخاب تاریخ"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.text)}
            </p>
          </div>
        </div>
      </div>

      {/* Date Formats */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Date Formats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PersianDateInput
              id="yyyyMMdd"
              label="YYYY/MM/DD format (default)"
              format="YYYY/MM/DD"
              value={dates.yyyyMMdd}
              onChange={(value) => handleDateChange('yyyyMMdd', value)}
              placeholder="1402/12/25"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.yyyyMMdd)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="ddMMyyyy"
              label="DD/MM/YYYY format"
              format="DD/MM/YYYY"
              value={dates.ddMMyyyy}
              onChange={(value) => handleDateChange('ddMMyyyy', value)}
              placeholder="25/12/1402"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.ddMMyyyy)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="yyyyMMddDash"
              label="YYYY-MM-DD format"
              format="YYYY-MM-DD"
              value={dates.yyyyMMddDash}
              onChange={(value) => handleDateChange('yyyyMMddDash', value)}
              placeholder="1402-12-25"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.yyyyMMddDash)}
            </p>
          </div>
          <div>
            <PersianDateInput
              id="ddMMyyyyDash"
              label="DD-MM-YYYY format"
              format="DD-MM-YYYY"
              value={dates.ddMMyyyyDash}
              onChange={(value) => handleDateChange('ddMMyyyyDash', value)}
              placeholder="25-12-1402"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.ddMMyyyyDash)}
            </p>
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different States</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <PersianDateInput
              id="withError"
              label="Date picker with error"
              value={dates.withError}
              onChange={(value) => handleDateChange('withError', value)}
              error="Please select a valid date"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.withError)}
            </p>
          </div>
          
          <div>
            <PersianDateInput
              id="required"
              label="Required date picker"
              value={dates.required}
              onChange={(value) => handleDateChange('required', value)}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.required)}
            </p>
          </div>
          
          <div>
            <PersianDateInput
              id="disabled"
              label="Disabled date picker"
              value={dates.disabled}
              onChange={(value) => handleDateChange('disabled', value)}
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.disabled)}
            </p>
          </div>

          <div>
            <PersianDateInput
              id="customPlaceholder"
              label="Custom placeholder"
              value={dates.customPlaceholder}
              onChange={(value) => handleDateChange('customPlaceholder', value)}
              placeholder="تاریخ تولد خود را وارد کنید"
            />
            <p className="text-xs text-gray-500 mt-1">
              Selected: {formatDateForDisplay(dates.customPlaceholder)}
            </p>
          </div>
        </div>
      </div>

      {/* Min/Max Date Constraints */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Date Range Constraints</h3>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-700 mb-3">
            This date picker only allows dates between {minDate.toLocaleDateString()} and {maxDate.toLocaleDateString()}
          </p>
          <PersianDateInput
            id="minMax"
            label="Date with range constraints"
            value={dates.minMax}
            onChange={(value) => handleDateChange('minMax', value)}
            minDate={minDate}
            maxDate={maxDate}
            placeholder="انتخاب تاریخ"
          />
          <p className="text-xs text-gray-500 mt-1">
            Selected: {formatDateForDisplay(dates.minMax)}
          </p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Current selections: {Object.entries(dates).filter(([_, value]) => value).map(([key]) => key).join(', ') || 'None selected'}
          </p>
          <button
            onClick={() => {
              const today = new Date();
              setDates(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: today }), {}));
            }}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Set All to Today
          </button>
          <button
            onClick={() => setDates(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: null }), {}))}
            className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">User Registration Form</h4>
            <PersianDateInput
              id="birthDate"
              label="تاریخ تولد"
              placeholder="تاریخ تولد خود را وارد کنید"
              required
              format="YYYY/MM/DD"
            />
            <p className="text-xs text-blue-700 mt-1">
              Collect user birth date in Persian calendar format
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Appointment Booking</h4>
            <PersianDateInput
              id="appointmentDate"
              label="تاریخ ویزیت"
              placeholder="تاریخ مورد نظر را انتخاب کنید"
              required
              minDate={new Date()}
              format="DD/MM/YYYY"
            />
            <p className="text-xs text-green-700 mt-1">
              Book appointments with Persian date format and future date validation
            </p>
          </div>
          
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Event Planning</h4>
            <PersianDateInput
              id="eventDate"
              label="تاریخ رویداد"
              placeholder="تاریخ برگزاری رویداد"
              color="warning"
              format="YYYY-MM-DD"
            />
            <p className="text-xs text-purple-700 mt-1">
              Plan events with custom date format and warning color theme
            </p>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-indigo-900 mb-2">Calendar Integration</h4>
            <p className="text-xs text-indigo-700 mb-2">
              Click the calendar icon to open the Persian calendar picker
            </p>
            <PersianDateInput
              id="calendarDemo"
              label="Calendar Demo"
              value={dates.basic}
              onChange={(value) => handleDateChange('basic', value)}
              placeholder="کلیک کنید"
            />
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Input Validation</h4>
            <p className="text-xs text-pink-700 mb-2">
              Try typing invalid dates to see validation in action
            </p>
            <PersianDateInput
              id="validationDemo"
              label="Validation Demo"
              value={dates.withError}
              onChange={(value) => handleDateChange('withError', value)}
              placeholder="مثال: 1402/13/32"
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Component Features:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• Jalali (Persian) calendar support with react-multi-date-picker</li>
            <li>• Automatic conversion between Persian and Gregorian dates</li>
            <li>• Input validation with Persian number support (۰-۹)</li>
            <li>• Multiple date formats: YYYY/MM/DD, DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY</li>
            <li>• Color variants: primary, secondary, success, error, warning, info</li>
            <li>• Style variants: contained, outlined, text</li>
            <li>• Date range constraints with minDate and maxDate</li>
            <li>• Error handling and validation messages</li>
            <li>• Keyboard navigation and accessibility support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
