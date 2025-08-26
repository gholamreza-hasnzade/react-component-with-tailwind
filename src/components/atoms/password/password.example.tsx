import React, { useState } from 'react';
import { Password } from './password';

export const PasswordExample = () => {
  const [passwords, setPasswords] = useState({
    basic: '',
    primary: '',
    secondary: '',
    success: '',
    error: '',
    warning: '',
    info: '',
    small: '',
    large: '',
    withError: '',
    withHelper: '',
    required: '',
    disabled: '',
    contained: '',
    text: '',
    fullWidth: '',
    customLength: '',
  });

  const handlePasswordChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Password Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Password component with password strength indicators.
        </p>
      </div>

      {/* Basic Password */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Password</h3>
        <Password
          id="basic"
          label="Basic password"
          value={passwords.basic}
          onChange={(e) => handlePasswordChange('basic', e)}
        />
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Color Variants (Outlined)</h3>
        <div className="grid grid-cols-2 gap-4">
          <Password
            id="primary"
            label="Primary color"
            color="primary"
            value={passwords.primary}
            onChange={(e) => handlePasswordChange('primary', e)}
          />
          <Password
            id="secondary"
            label="Secondary color"
            color="secondary"
            value={passwords.secondary}
            onChange={(e) => handlePasswordChange('secondary', e)}
          />
          <Password
            id="success"
            label="Success color"
            color="success"
            value={passwords.success}
            onChange={(e) => handlePasswordChange('success', e)}
          />
          <Password
            id="error"
            label="Error color"
            color="error"
            value={passwords.error}
            onChange={(e) => handlePasswordChange('error', e)}
          />
          <Password
            id="warning"
            label="Warning color"
            color="warning"
            value={passwords.warning}
            onChange={(e) => handlePasswordChange('warning', e)}
          />
          <Password
            id="info"
            label="Info color"
            color="info"
            value={passwords.info}
            onChange={(e) => handlePasswordChange('info', e)}
          />
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Variants</h3>
        <div className="grid grid-cols-3 gap-4">
          <Password
            id="contained"
            label="Contained variant"
            variant="contained"
            color="primary"
            value={passwords.contained}
            onChange={(e) => handlePasswordChange('contained', e)}
          />
          <Password
            id="outlined"
            label="Outlined variant (default)"
            variant="outlined"
            color="primary"
            value={passwords.primary}
            onChange={(e) => handlePasswordChange('primary', e)}
          />
          <Password
            id="text"
            label="Text variant"
            variant="text"
            color="primary"
            value={passwords.text}
            onChange={(e) => handlePasswordChange('text', e)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="grid grid-cols-3 gap-4">
          <Password
            id="small"
            label="Small size"
            size="sm"
            value={passwords.small}
            onChange={(e) => handlePasswordChange('small', e)}
          />
          <Password
            id="medium"
            label="Medium size (default)"
            size="md"
            value={passwords.basic}
            onChange={(e) => handlePasswordChange('basic', e)}
          />
          <Password
            id="large"
            label="Large size"
            size="lg"
            value={passwords.large}
            onChange={(e) => handlePasswordChange('large', e)}
          />
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different States</h3>
        <div className="space-y-4">
          <Password
            id="withError"
            label="Password with error"
            value={passwords.withError}
            onChange={(e) => handlePasswordChange('withError', e)}
            error="Password must be at least 8 characters long"
          />
          
          <Password
            id="withHelper"
            label="Password with helper text"
            value={passwords.withHelper}
            onChange={(e) => handlePasswordChange('withHelper', e)}
            helperText="Use a combination of letters, numbers, and special characters"
          />
          
          <Password
            id="required"
            label="Required password"
            value={passwords.required}
            onChange={(e) => handlePasswordChange('required', e)}
            required
          />
          
          <Password
            id="disabled"
            label="Disabled password"
            value={passwords.disabled}
            onChange={(e) => handlePasswordChange('disabled', e)}
            disabled
          />
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Full Width</h3>
        <Password
          id="fullWidth"
          label="Full width password"
          value={passwords.fullWidth}
          onChange={(e) => handlePasswordChange('fullWidth', e)}
          fullWidth
          helperText="This password field spans the full width of its container"
        />
      </div>

      {/* Custom Length */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Length Requirements</h3>
        <Password
          id="customLength"
          label="Custom length password"
          value={passwords.customLength}
          onChange={(e) => handlePasswordChange('customLength', e)}
          minLength={12}
          maxLength={50}
          helperText="Password must be between 12 and 50 characters"
        />
      </div>

      {/* Password Strength Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Password Strength Demonstration</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 mb-3">
            Try typing different passwords to see the strength indicator in action:
          </p>
          <ul className="text-xs text-blue-700 space-y-1 ml-4">
            <li>• Weak: "123" (too short, no variety)</li>
            <li>• Medium: "password123" (length OK, limited variety)</li>
            <li>• Strong: "MyPass123!" (length, case, numbers, symbols)</li>
            <li>• Very Strong: "MySecurePass123!@#" (excellent variety and length)</li>
          </ul>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-3">
            Current password values: {Object.entries(passwords).filter(([_, value]) => value).map(([key]) => key).join(', ') || 'None entered'}
          </p>
          <button
            onClick={() => setPasswords(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: 'TestPassword123!' }), {}))}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
          >
            Fill All with Test Password
          </button>
          <button
            onClick={() => setPasswords(prev => Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: '' }), {}))}
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
            <h4 className="font-medium text-blue-900 mb-2">Login Form</h4>
            <Password
              id="login"
              label="Password"
              placeholder="Enter your password"
              required
              helperText="Enter the password for your account"
            />
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Registration Form</h4>
            <Password
              id="register"
              label="Create Password"
              placeholder="Create a strong password"
              required
              minLength={8}
              helperText="Minimum 8 characters with letters, numbers, and symbols"
            />
          </div>
          
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Settings Panel</h4>
            <Password
              id="settings"
              label="Current Password"
              placeholder="Enter current password to confirm changes"
              color="warning"
              helperText="Required to save any changes to your account"
            />
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">Toggle Visibility</h4>
            <p className="text-xs text-purple-700 mb-2">Click the eye icon to show/hide password</p>
            <Password
              id="toggleDemo"
              label="Toggle Demo"
              value="HiddenPassword123!"
              onChange={() => {}}
              showToggle={true}
            />
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-medium text-indigo-900 mb-2">Read Only</h4>
            <p className="text-xs text-indigo-700 mb-2">Password field that cannot be edited</p>
            <Password
              id="readonlyDemo"
              label="Read Only Demo"
              value="CannotEditThis123!"
              onChange={() => {}}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};
