import  { useState } from 'react';
import { TimePicker } from './timePicker';

export const TimePickerExample = () => {
  const [times, setTimes] = useState({
    basic: '',
    withValue: '09:30',
    disabled: '14:15',
    required: '',
    withError: '25:70',
    customPlaceholder: '',
    controlled: '16:45',
  });

  const handleTimeChange = (key: string, value: string) => {
    setTimes(prev => ({
      ...prev,
      [key]: value
    }));
    console.log(`${key} time changed to:`, value);
  };

  const validateTime = (time: string): string | null => {
    if (!time) return null;
    
    const match = time.match(/^(\d{1,2}):(\d{1,2})$/);
    if (!match) return 'Invalid time format. Use HH:MM';
    
    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);
    
    if (hour > 23) return 'Hour must be between 0-23';
    if (minute > 59) return 'Minute must be between 0-59';
    
    return null;
  };

  const getTimeError = (key: string) => {
    const time = times[key];
    if (key === 'withError') {
      return validateTime(time);
    }
    return null;
  };

  const handleSetCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
    
    setTimes(prev => ({
      ...prev,
      controlled: currentTime
    }));
  };

  const handleClearAll = () => {
    setTimes(prev => Object.keys(prev).reduce((acc, key) => ({
      ...acc,
      [key]: ''
    }), {}));
  };

  const handleSetSampleTimes = () => {
    setTimes({
      basic: '08:00',
      withValue: '12:30',
      disabled: '18:45',
      required: '15:20',
      withError: '22:15',
      customPlaceholder: '10:00',
      controlled: '20:30',
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">TimePicker Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the TimePicker component with different validation, error handling, and interactive features.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Usage</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <TimePicker
            value={times.basic}
            onChange={(value) => handleTimeChange('basic', value)}
            placeholder="Enter time"
          />
        </div>
        <p className="text-xs text-gray-500">
          Selected time: {times.basic || 'None'}
        </p>
      </div>

      {/* Pre-filled Value */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Pre-filled Value</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <TimePicker
            value={times.withValue}
            onChange={(value) => handleTimeChange('withValue', value)}
            placeholder="Enter time"
          />
        </div>
        <p className="text-xs text-blue-700">
          Pre-filled with: {times.withValue}
        </p>
      </div>

      {/* Different States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Disabled State</h4>
            <TimePicker
              value={times.disabled}
              onChange={(value) => handleTimeChange('disabled', value)}
              disabled
              placeholder="Disabled time picker"
            />
            <p className="text-xs text-gray-500 mt-1">
              This time picker is disabled
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Required Field</h4>
            <TimePicker
              value={times.required}
              onChange={(value) => handleTimeChange('required', value)}
              required
              placeholder="Required time"
            />
            <p className="text-xs text-gray-500 mt-1">
              This field is required
            </p>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Error Handling</h3>
        <div className="p-4 bg-red-50 rounded-lg">
          <TimePicker
            value={times.withError}
            onChange={(value) => handleTimeChange('withError', value)}
            error={getTimeError('withError')}
            placeholder="Enter valid time"
          />
        </div>
        <p className="text-xs text-red-700">
          Demonstrates validation error display
        </p>
      </div>

      {/* Custom Placeholder */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Placeholder</h3>
        <div className="p-4 bg-green-50 rounded-lg">
          <TimePicker
            value={times.customPlaceholder}
            onChange={(value) => handleTimeChange('customPlaceholder', value)}
            placeholder="Select appointment time"
          />
        </div>
        <p className="text-xs text-green-700">
          Custom placeholder text for specific use cases
        </p>
      </div>

      {/* Controlled Component */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Controlled Component</h3>
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-purple-700 mb-2">
              Current time: {times.controlled}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSetCurrentTime}
                className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Set Current Time
              </button>
              <button
                onClick={() => handleTimeChange('controlled', '')}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear
              </button>
            </div>
          </div>
          
          <TimePicker
            value={times.controlled}
            onChange={(value) => handleTimeChange('controlled', value)}
            placeholder="Controlled time picker"
          />
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-indigo-700 mb-2">
              All time pickers: {Object.entries(times).filter(([_, value]) => value).map(([key, value]) => `${key}: ${value}`).join(', ') || 'None selected'}
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleSetSampleTimes}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Set Sample Times
              </button>
              <button
                onClick={handleClearAll}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TimePicker
              value={times.basic}
              onChange={(value) => handleTimeChange('basic', value)}
              placeholder="Basic"
            />
            <TimePicker
              value={times.withValue}
              onChange={(value) => handleTimeChange('withValue', value)}
              placeholder="With Value"
            />
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Appointment Booking</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Time picker for scheduling appointments
            </p>
            <TimePicker
              value=""
              onChange={() => {}}
              placeholder="Select appointment time"
              required
            />
          </div>
          
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium text-teal-900 mb-2">Work Schedule</h4>
            <p className="text-sm text-teal-700 mb-3">
              Time picker for work hours
            </p>
            <TimePicker
              value=""
              onChange={() => {}}
              placeholder="Enter start time"
            />
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Keyboard Navigation</h4>
            <p className="text-xs text-pink-700 mb-2">
              Use Tab to navigate between hour and minute parts
            </p>
            <TimePicker
              value=""
              onChange={() => {}}
              placeholder="Try Tab navigation"
            />
          </div>
          
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h4 className="font-medium text-cyan-900 mb-2">Auto-formatting</h4>
            <p className="text-xs text-cyan-700 mb-2">
              Automatically formats time on blur
            </p>
            <TimePicker
              value=""
              onChange={() => {}}
              placeholder="Type 1430 then blur"
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
            <li>• HH:MM time format with validation</li>
            <li>• Auto-formatting on blur</li>
            <li>• Keyboard navigation (Tab between hour/minute)</li>
            <li>• Input validation and error display</li>
            <li>• Disabled and required states</li>
            <li>• Custom placeholder support</li>
            <li>• Controlled and uncontrolled modes</li>
            <li>• Clock icon for visual clarity</li>
            <li>• Built-in time validation (0-23 hours, 0-59 minutes)</li>
            <li>• Auto-selection of time parts on focus</li>
            <li>• Responsive design with Tailwind CSS</li>
            <li>• TypeScript support with comprehensive interfaces</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
