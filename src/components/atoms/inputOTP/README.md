# InputOTP

A comprehensive, accessible component for entering one-time passwords and verification codes.

## Features

- **Flexible Length**: Configurable number of input fields (4, 6, 8, etc.)
- **Multiple Input Types**: Text, number, and password inputs
- **Smart Navigation**: Automatic focus movement and keyboard navigation
- **Paste Support**: Paste entire codes with automatic distribution
- **Auto-submit**: Automatically submit when all fields are filled
- **Customizable**: Custom input rendering and styling
- **Accessible**: Full keyboard navigation and screen reader support
- **Mobile Friendly**: Optimized for touch devices

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `length` | `number` | `6` | Number of OTP input fields |
| `value` | `string` | `''` | Current OTP value |
| `onChange` | `(value: string) => void` | `undefined` | Callback when OTP changes |
| `disabled` | `boolean` | `false` | Whether inputs are disabled |
| `autoFocus` | `boolean` | `false` | Auto-focus first input on mount |
| `type` | `'text' \| 'password' \| 'number'` | `'text'` | Input type for all fields |
| `mask` | `boolean` | `false` | Mask input values (for password type) |
| `maskChar` | `string` | `'•'` | Character to use for masking |
| `allowPaste` | `boolean` | `true` | Allow pasting codes |
| `autoSubmit` | `boolean` | `false` | Auto-submit when complete |
| `onAutoSubmit` | `(value: string) => void` | `undefined` | Callback for auto-submit |
| `renderInput` | `(props: InputOTPInputProps) => ReactElement` | `undefined` | Custom input renderer |

## Usage

### Basic OTP Input

```tsx
import { InputOTP } from '@/components/atoms/inputOTP'

export default function OTPForm() {
  const [otp, setOtp] = useState('')

  return (
    <div>
      <label>Enter verification code:</label>
      <InputOTP
        value={otp}
        onChange={setOtp}
        length={6}
        autoFocus
      />
    </div>
  )
}
```

### Password OTP with Auto-submit

```tsx
<InputOTP
  type="password"
  mask={true}
  autoSubmit={true}
  onAutoSubmit={(value) => {
    console.log('OTP submitted:', value)
    // Handle submission
  }}
  value={otp}
  onChange={setOtp}
/>
```

### Custom Styling

```tsx
<InputOTP
  value={otp}
  onChange={setOtp}
  renderInput={(inputProps) => (
    <input
      {...inputProps}
      className="h-12 w-12 rounded-lg border-2 border-blue-300 bg-blue-50 text-lg font-bold"
      placeholder="•"
    />
  )}
/>
```

## Keyboard Navigation

- **Arrow Keys**: Navigate between input fields
- **Backspace**: Clear current field or move to previous
- **Tab**: Move to next input field
- **Ctrl+V**: Paste entire code
- **Numbers/Text**: Direct input into focused field

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Screen Reader Support**: Announced as OTP input group

## Examples

### Different Lengths

```tsx
// 4-digit code
<InputOTP length={4} value={otp} onChange={setOtp} />

// 8-digit code
<InputOTP length={8} value={otp} onChange={setOtp} />
```

### Input Types

```tsx
// Number input (mobile-friendly)
<InputOTP type="number" value={otp} onChange={setOtp} />

// Password input with masking
<InputOTP 
  type="password" 
  mask={true} 
  value={otp} 
  onChange={setOtp} 
/>
```

### Disabled State

```tsx
<InputOTP
  disabled={true}
  value="123456"
  onChange={() => {}}
/>
```

## Best Practices

1. **Auto-focus**: Use `autoFocus={true}` for better UX
2. **Auto-submit**: Enable `autoSubmit` for seamless verification
3. **Input Type**: Use `type="number"` for numeric-only codes
4. **Masking**: Use `mask={true}` for sensitive verification codes
5. **Length**: Choose appropriate length based on your verification system
6. **Validation**: Handle empty or incomplete codes gracefully

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
<InputOTP
  className="justify-center gap-3" // Custom container styling
  renderInput={(props) => (
    <input
      {...props}
      className="h-12 w-12 rounded-xl border-2 border-purple-300" // Custom input styling
    />
  )}
/>
```

## Dependencies

- React 18+
- Tailwind CSS
- `@/lib/utils` (for `cn` utility function)

## See Also

- [InputOTP Example](./inputOTP.example.tsx) - Comprehensive usage examples
- [React Hook Form Integration](https://react-hook-form.com/) - Form library integration
- [Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/) - ARIA best practices
