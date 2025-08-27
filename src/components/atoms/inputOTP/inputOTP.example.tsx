import React, { useState } from 'react'
import { InputOTP } from './inputOTP'

export const InputOTPExample: React.FC = () => {
  const [otp1, setOtp1] = useState('')
  const [otp2, setOtp2] = useState('')
  const [otp3, setOtp3] = useState('')
  const [otp4, setOtp4] = useState('')
  const [otp5, setOtp5] = useState('')
  const [otp6, setOtp6] = useState('')
  const [otp7, setOtp7] = useState('')
  const [otp8, setOtp8] = useState('')

  const handleAutoSubmit = (value: string) => {
    console.log('Auto-submitted OTP:', value)
/*     alert(`Auto-submitted OTP: ${value}`)
 */  }

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          InputOTP
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          A component for entering one-time passwords and verification codes.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Basic Usage
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Standard 6-digit OTP input
          </p>
          <InputOTP
            value={otp1}
            onChange={setOtp1}
            className="justify-center"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Value: {otp1 || 'Empty'}
          </p>
        </div>
      </div>

      {/* Different Lengths */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Different Lengths
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              4-digit OTP
            </p>
            <InputOTP
              length={4}
              value={otp2}
              onChange={setOtp2}
              className="justify-center"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Value: {otp2 || 'Empty'}
            </p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              8-digit OTP
            </p>
            <InputOTP
              length={8}
              value={otp3}
              onChange={setOtp3}
              className="justify-center"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Value: {otp3 || 'Empty'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Input Types
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Number input (mobile-friendly)
            </p>
            <InputOTP
              type="number"
              value={otp4}
              onChange={setOtp4}
              className="justify-center"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Value: {otp4 || 'Empty'}
            </p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Password input (masked)
            </p>
            <InputOTP
              type="password"
              mask={true}
              value={otp5}
              onChange={setOtp5}
              className="justify-center"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Value: {otp5 || 'Empty'}
            </p>
          </div>
        </div>
      </div>

      {/* Auto-focus and Auto-submit */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Auto-focus and Auto-submit
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Auto-focuses first input and auto-submits when complete
          </p>
          <InputOTP
            autoFocus={true}
            autoSubmit={true}
            onAutoSubmit={handleAutoSubmit}
            value={otp6}
            onChange={setOtp6}
            className="justify-center"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Value: {otp6 || 'Empty'}
          </p>
        </div>
      </div>

      {/* Disabled State */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Disabled State
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Disabled OTP input
          </p>
          <InputOTP
            disabled={true}
            value="123456"
            onChange={() => {}}
            className="justify-center"
          />
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Custom Styling
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Custom styled OTP input with larger inputs
          </p>
          <InputOTP
            value={otp7}
            onChange={setOtp7}
            className="justify-center"
            renderInput={(inputProps) => (
              <input
                type="text"
                value={inputProps.value}
                disabled={inputProps.disabled}
                onChange={(e) => inputProps.onChange(e.target.value)}
                onFocus={inputProps.onFocus}
                onBlur={inputProps.onBlur}
                onKeyDown={inputProps.onKeyDown}
                onPaste={inputProps.onPaste}
                className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-blue-300 bg-blue-50 text-center text-lg font-bold text-blue-900 transition-all focus:border-blue-500 focus:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                placeholder="•"
                maxLength={1}
              />
            )}
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Value: {otp7 || 'Empty'}
          </p>
        </div>
      </div>

      {/* Paste Functionality */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Paste Functionality
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Try pasting a 6-digit code (e.g., 123456)
          </p>
          <InputOTP
            value={otp8}
            onChange={setOtp8}
            allowPaste={true}
            className="justify-center"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Value: {otp8 || 'Empty'}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Tip: Copy a 6-digit number and paste it into any input field
          </p>
        </div>
      </div>

      {/* Keyboard Navigation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Keyboard Navigation
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
            Use arrow keys, backspace, and tab for navigation
          </p>
          <InputOTP
            value={otp1}
            onChange={setOtp1}
            className="justify-center"
          />
          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">←</kbd> <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">→</kbd> Navigate between inputs</p>
            <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Backspace</kbd> Clear current or previous input</p>
            <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Tab</kbd> Move to next input</p>
            <p>• <kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">Ctrl+V</kbd> Paste code</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputOTPExample
