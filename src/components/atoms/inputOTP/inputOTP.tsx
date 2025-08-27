import * as React from 'react'
import { cn } from '../../../lib/utils'

export interface InputOTPProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** The number of OTP digits */
  length?: number
  /** The value of the OTP */
  value?: string
  /** Callback when the OTP value changes */
  onChange?: (value: string) => void
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether to auto-focus the first input */
  autoFocus?: boolean
  /** The type of input (text, password, number) */
  type?: 'text' | 'password' | 'number'
  /** Whether to show the OTP value as masked */
  mask?: boolean
  /** Custom mask character */
  maskChar?: string
  /** Whether to allow paste functionality */
  allowPaste?: boolean
  /** Whether to auto-submit when all digits are filled */
  autoSubmit?: boolean
  /** Callback when auto-submit is triggered */
  onAutoSubmit?: (value: string) => void
  /** Custom input renderer */
  renderInput?: (props: InputOTPInputProps) => React.ReactElement
}

export interface InputOTPInputProps {
  /** The input index */
  index: number
  /** The input value */
  value: string
  /** Whether the input is focused */
  focused: boolean
  /** Whether the input is disabled */
  disabled: boolean
  /** Input change handler */
  onChange: (value: string) => void
  /** Input focus handler */
  onFocus: () => void
  /** Input blur handler */
  onBlur: () => void
  /** Input key down handler */
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  /** Input paste handler */
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void
}

export const InputOTP = React.forwardRef<HTMLDivElement, InputOTPProps>(({
  className,
  length = 6,
  value = '',
  onChange,
  disabled = false,
  autoFocus = false,
  type = 'text',
  mask = false,
  maskChar = '•',
  allowPaste = true,
  autoSubmit = false,
  onAutoSubmit,
  renderInput,
  ...props
}, ref) => {
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  // Initialize input refs array
  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  // Auto-focus first input
  React.useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [autoFocus])

  // Auto-submit when all digits are filled
  React.useEffect(() => {
    if (autoSubmit && value.length === length && onAutoSubmit) {
      onAutoSubmit(value)
    }
  }, [autoSubmit, value, length, onAutoSubmit])

  const handleInputChange = React.useCallback((index: number, inputValue: string) => {
    if (disabled) return

    const newValue = value.split('')
    
    // Handle single character input
    if (inputValue.length === 1) {
      newValue[index] = inputValue
      
      // Move to next input if available
      if (index < length - 1 && inputValue) {
        inputRefs.current[index + 1]?.focus()
      }
    }
    // Handle paste or multiple characters
    else if (inputValue.length > 1) {
      const chars = inputValue.slice(0, length).split('')
      chars.forEach((char, charIndex) => {
        if (index + charIndex < length) {
          newValue[index + charIndex] = char
        }
      })
      
      // Focus the next available input
      const nextIndex = Math.min(index + inputValue.length, length - 1)
      inputRefs.current[nextIndex]?.focus()
    }

    const result = newValue.join('').slice(0, length)
    onChange?.(result)
  }, [value, length, onChange, disabled])

  const handleKeyDown = React.useCallback((index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    const currentValue = value[index] || ''
    
    switch (e.key) {
      case 'Backspace':
        e.preventDefault()
        if (currentValue) {
          // Clear current input
          const newValue = value.split('')
          newValue[index] = ''
          onChange?.(newValue.join(''))
        } else if (index > 0) {
          // Move to previous input and clear it
          const newValue = value.split('')
          newValue[index - 1] = ''
          onChange?.(newValue.join(''))
          inputRefs.current[index - 1]?.focus()
        }
        break
        
      case 'ArrowLeft':
        e.preventDefault()
        if (index > 0) {
          inputRefs.current[index - 1]?.focus()
        }
        break
        
      case 'ArrowRight':
        e.preventDefault()
        if (index < length - 1) {
          inputRefs.current[index + 1]?.focus()
        }
        break
        
      case 'Tab':
        // Let default tab behavior work
        break
        
      default:
        // Allow only single characters for non-control keys
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault()
          handleInputChange(index, e.key)
        }
    }
  }, [value, length, onChange, disabled, handleInputChange])

  const handlePaste = React.useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    if (!allowPaste || disabled) return

    e.preventDefault()
    const pastedText = e.clipboardData.getData('text/plain').replace(/\D/g, '')
    
    if (pastedText.length > 0) {
      // Find the first empty input or current focused input
      const startIndex = focusedIndex >= 0 ? focusedIndex : value.length
      handleInputChange(startIndex, pastedText)
    }
  }, [allowPaste, disabled, focusedIndex, value.length, handleInputChange])

  const handleFocus = React.useCallback((index: number) => {
    setFocusedIndex(index)
  }, [])

  const handleBlur = React.useCallback(() => {
    setFocusedIndex(-1)
  }, [])

  const defaultRenderInput = React.useCallback((inputProps: InputOTPInputProps) => (
    <input
      ref={(el) => {
        inputRefs.current[inputProps.index] = el
      }}
      type={type === 'password' ? 'password' : 'text'}
      inputMode={type === 'number' ? 'numeric' : 'text'}
      pattern={type === 'number' ? '[0-9]*' : undefined}
      value={inputProps.value}
      disabled={inputProps.disabled}
      onChange={(e) => inputProps.onChange(e.target.value)}
      onFocus={inputProps.onFocus}
      onBlur={inputProps.onBlur}
      onKeyDown={inputProps.onKeyDown}
      onPaste={inputProps.onPaste}
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background text-center text-sm font-mono transition-colors',
        'placeholder:text-muted-foreground',
        'focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        inputProps.focused && 'border-ring ring-2 ring-ring ring-offset-2',
        inputProps.value && 'border-ring'
      )}
      placeholder="0"
      maxLength={1}
    />
  ), [type])

  const renderInputComponent = renderInput || defaultRenderInput

  return (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => {
        const inputValue = value[index] || ''
        const displayValue = mask && inputValue ? maskChar : inputValue
        const isFocused = focusedIndex === index

        return (
          <div key={index} className="relative">
            {renderInputComponent({
              index,
              value: displayValue,
              focused: isFocused,
              disabled,
              onChange: (val) => handleInputChange(index, val),
              onFocus: () => handleFocus(index),
              onBlur: handleBlur,
              onKeyDown: (e) => handleKeyDown(index, e),
              onPaste: handlePaste,
            })}
          </div>
        )
      })}
    </div>
  )
})

InputOTP.displayName = 'InputOTP'

