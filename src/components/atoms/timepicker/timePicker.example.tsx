import  { useState } from 'react';
import { TimePicker } from './timePicker';

export const TimePickerExample = () => {
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [time4, setTime4] = useState('');
  const [time5, setTime5] = useState('');
  const [time6, setTime6] = useState('');

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Time Picker Examples</h1>
        
        {/* Typing Functionality */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Typing Functionality</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type Anywhere (Default)</label>
              <TimePicker
                value={time6}
                onChange={setTime6}
                placeholder="Type: 2:30 PM, 14:30, 2:30:45 PM"
                label="Flexible Input"
                helperText="Type times in various formats or use dropdown"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dropdown Only (No Typing)</label>
              <TimePicker
                value={time6}
                onChange={setTime6}
                allowTyping={false}
                placeholder="Click to select time"
                label="Dropdown Only"
                helperText="Only dropdown selection available"
              />
            </div>
          </div>
          
          {/* Typing Examples */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Supported Typing Formats:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-medium mb-1">12-Hour Format:</h4>
                <ul className="space-y-1">
                  <li>• 2:30 PM</li>
                  <li>• 02:30 PM</li>
                  <li>• 2:30:45 PM</li>
                  <li>• 2:30 (preserves AM/PM)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-1">24-Hour Format:</h4>
                <ul className="space-y-1">
                  <li>• 14:30</li>
                  <li>• 2:30</li>
                  <li>• 14:30:45</li>
                  <li>• 2:30:45</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">
              💡 <strong>Pro tip:</strong> Press Enter to validate or Escape to cancel typing
            </p>
          </div>
        </div>

        {/* Basic Time Picker */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Time Picker</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default (24h)</label>
              <TimePicker
                value={time1}
                onChange={setTime1}
                placeholder="Type: 14:30 or use dropdown"
                label="Meeting Time"
                helperText="Choose a time for your meeting"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">12-hour Format</label>
              <TimePicker
                value={time2}
                onChange={setTime2}
                format="12h"
                placeholder="Type: 2:30 PM or use dropdown"
                label="Appointment Time"
                helperText="Choose your preferred appointment time"
              />
            </div>
          </div>
        </div>

        {/* Time Picker with Seconds */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Picker with Seconds</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">24h with Seconds</label>
              <TimePicker
                value={time3}
                onChange={setTime3}
                showSeconds={true}
                placeholder="Type: 14:30:45 or use dropdown"
                label="Precise Time"
                helperText="Select time including seconds for precise scheduling"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">12h with Seconds</label>
              <TimePicker
                value={time4}
                onChange={setTime4}
                format="12h"
                showSeconds={true}
                placeholder="Type: 2:30:45 PM or use dropdown"
                label="Precise Appointment"
                helperText="Select appointment time with seconds precision"
              />
            </div>
          </div>
        </div>

        {/* Time Picker Variants */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Picker Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contained Primary</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                variant="contained"
                color="primary"
                placeholder="Type or select time"
                label="Primary Style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Outlined Success</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                variant="outlined"
                color="success"
                placeholder="Type or select time"
                label="Success Style"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text Warning</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                variant="text"
                color="warning"
                placeholder="Type or select time"
                label="Warning Style"
              />
            </div>
          </div>
        </div>

        {/* Time Picker Sizes */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Picker Sizes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Small</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                size="sm"
                placeholder="Small time picker"
                label="Small Size"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medium (Default)</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                size="md"
                placeholder="Medium time picker"
                label="Medium Size"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Large</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                size="lg"
                placeholder="Large time picker"
                label="Large Size"
              />
            </div>
          </div>
        </div>

        {/* Time Picker States */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Picker States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disabled</label>
              <TimePicker
                value="09:00"
                onChange={() => {}}
                disabled={true}
                placeholder="Disabled time picker"
                label="Disabled State"
                helperText="This time picker is disabled"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">With Error</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                error="Please select a valid time"
                placeholder="Time picker with error"
                label="Error State"
              />
            </div>
          </div>
        </div>

        {/* Time Constraints */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Time Constraints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Hours (9 AM - 5 PM)</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                minTime="09:00"
                maxTime="17:00"
                format="12h"
                placeholder="Type: 10:30 AM or use dropdown"
                label="Business Hours"
                helperText="Only business hours are allowed (type or select)"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Night Shift (6 PM - 6 AM)</label>
              <TimePicker
                value={time5}
                onChange={setTime5}
                minTime="18:00"
                maxTime="06:00"
                format="24h"
                placeholder="Type: 22:30 or use dropdown"
                label="Night Shift"
                helperText="Only night shift hours are allowed (type or select)"
              />
            </div>
          </div>
        </div>

        {/* Selected Values Display */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Selected Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Current Selections:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Typing Example:</span> {time6 || 'Not selected'}</p>
                <p><span className="font-medium">Basic 24h:</span> {time1 || 'Not selected'}</p>
                <p><span className="font-medium">12h Format:</span> {time2 || 'Not selected'}</p>
                <p><span className="font-medium">With Seconds:</span> {time3 || 'Not selected'}</p>
                <p><span className="font-medium">12h with Seconds:</span> {time4 || 'Not selected'}</p>
                <p><span className="font-medium">Variant Examples:</span> {time5 || 'Not selected'}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Features:</h3>
              <ul className="text-sm space-y-1 text-gray-600">
                <li>• <strong>Typing Support:</strong> Type times in various formats</li>
                <li>• 12h and 24h format support</li>
                <li>• Optional seconds display</li>
                <li>• Multiple color variants</li>
                <li>• Three size options</li>
                <li>• Time constraints (min/max)</li>
                <li>• Quick actions (Now, Clear)</li>
                <li>• Keyboard accessible</li>
                <li>• Responsive design</li>
                <li>• <strong>Smart Parsing:</strong> Handles multiple input formats</li>
                <li>• <strong>Validation:</strong> Reverts invalid input</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
