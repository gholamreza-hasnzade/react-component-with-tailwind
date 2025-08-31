# Time Picker Component

A comprehensive, accessible, and customizable time picker component built with React and Tailwind CSS. This component follows best practices and provides a rich set of features for time selection.

## Features

- 🕐 **Multiple Formats**: Support for both 12-hour and 24-hour time formats
- ⚡ **Seconds Support**: Optional seconds display for precise time selection
- 🎨 **Color Variants**: Six color schemes (primary, secondary, success, error, warning, info)
- 📏 **Size Options**: Three sizes (sm, md, lg) for different use cases
- 🔧 **Style Variants**: Three visual styles (contained, outlined, text)
- ⏰ **Time Constraints**: Set minimum and maximum time limits
- 🚀 **Quick Actions**: "Now" and "Clear" buttons for convenience
- ♿ **Accessibility**: Full keyboard navigation and screen reader support
- 📱 **Responsive**: Mobile-friendly design with touch support
- 🎯 **Validation**: Built-in error handling and validation
- 🔒 **Controlled**: Fully controlled component with onChange callbacks

## Installation

The component is part of the atoms package and uses the following dependencies:

```bash
npm install react-icons
```

## Basic Usage

```tsx
import { TimePicker } from './components/atoms/timepicker';

function App() {
  const [time, setTime] = useState('');

  return (
    <TimePicker
      value={time}
      onChange={setTime}
      label="Meeting Time"
      placeholder="Select time"
    />
  );
}
```

## Props

### Core Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `""` | Current time value |
| `onChange` | `(time: string) => void` | - | Callback when time changes |
| `placeholder` | `string` | `"Select time"` | Placeholder text |

### Appearance Props

| Prop | Type | Default | Options | Description |
|------|------|---------|---------|-------------|
| `size` | `Size` | `"md"` | `"sm" \| "md" \| "lg"` | Component size |
| `variant` | `Variant` | `"outlined"` | `"contained" \| "outlined" \| "text"` | Visual style |
| `color` | `Color` | `"primary"` | `"primary" \| "secondary" \| "success" \| "error" \| "warning" \| "info"` | Color scheme |

### Format Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `format` | `"12h" \| "24h"` | `"24h"` | Time format display |
| `showSeconds` | `boolean` | `false` | Whether to show seconds |

### Validation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `minTime` | `string` | - | Minimum allowed time (HH:MM or HH:MM:SS) |
| `maxTime` | `string` | - | Maximum allowed time (HH:MM or HH:MM:SS) |
| `required` | `boolean` | `false` | Whether the field is required |
| `error` | `string` | - | Error message to display |

### UI Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label text above the input |
| `helperText` | `string` | - | Helper text below the input |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `className` | `string` | `""` | Additional CSS classes |

## Examples

### Basic Time Picker

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  label="Meeting Time"
  placeholder="Select time"
/>
```

### 12-Hour Format with Seconds

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
  showSeconds={true}
  label="Precise Time"
  placeholder="Select time with seconds"
/>
```

### Custom Styling

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  variant="contained"
  color="success"
  size="lg"
  label="Success Style"
/>
```

### Time Constraints

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  minTime="09:00"
  maxTime="17:00"
  format="12h"
  label="Business Hours"
  helperText="Only business hours are allowed"
/>
```

### With Error State

```tsx
<TimePicker
  value={time}
  onChange={setTime}
  error="Please select a valid time"
  label="Time Selection"
/>
```

## Color Palette

The component uses a consistent color system that matches your design tokens:

### Primary (Blue)
- **Contained**: Blue background with white text
- **Outlined**: Blue border with blue text
- **Text**: Blue text only

### Secondary (Gray)
- **Contained**: Gray background with white text
- **Outlined**: Gray border with gray text
- **Text**: Gray text only

### Success (Green)
- **Contained**: Green background with white text
- **Outlined**: Green border with green text
- **Text**: Green text only

### Error (Red)
- **Contained**: Red background with white text
- **Outlined**: Red border with red text
- **Text**: Red text only

### Warning (Yellow)
- **Contained**: Yellow background with black text
- **Outlined**: Yellow border with yellow text
- **Text**: Yellow text only

### Info (Sky)
- **Contained**: Sky blue background with white text
- **Outlined**: Sky blue border with sky blue text
- **Text**: Sky blue text only

## Size Variants

### Small (`sm`)
- Height: 32px (h-8)
- Padding: 8px horizontal (px-2)
- Font size: 14px (text-sm)

### Medium (`md`) - Default
- Height: 40px (h-10)
- Padding: 12px horizontal (px-3)
- Font size: 16px (text-base)

### Large (`lg`)
- Height: 48px (h-12)
- Padding: 16px horizontal (px-4)
- Font size: 18px (text-lg)

## Time Format Support

### 24-Hour Format
- Hours: 00-23
- Minutes: 00-59
- Seconds: 00-59 (optional)
- Example: "14:30" or "14:30:45"

### 12-Hour Format
- Hours: 1-12
- Minutes: 00-59
- Seconds: 00-59 (optional)
- Period: AM/PM
- Example: "2:30 PM" or "2:30:45 PM"

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and focus trapping
- **Click Outside**: Closes dropdown when clicking outside
- **Escape Key**: Closes dropdown with Escape key
- **Tab Navigation**: Proper tab order and focus management

## Best Practices

### 1. Always Provide Labels
```tsx
// ✅ Good
<TimePicker label="Meeting Time" />

// ❌ Avoid
<TimePicker />
```

### 2. Use Appropriate Placeholders
```tsx
// ✅ Good
<TimePicker placeholder="Select meeting time" />

// ❌ Avoid
<TimePicker placeholder="Time" />
```

### 3. Handle Validation
```tsx
// ✅ Good
<TimePicker
  error={errors.time}
  helperText="Choose a time between 9 AM and 5 PM"
/>

// ❌ Avoid
<TimePicker />
```

### 4. Choose Appropriate Format
```tsx
// ✅ Good - Business applications
<TimePicker format="12h" />

// ✅ Good - Technical applications
<TimePicker format="24h" />
```

### 5. Use Time Constraints When Appropriate
```tsx
// ✅ Good - Business hours
<TimePicker
  minTime="09:00"
  maxTime="17:00"
  format="12h"
/>

// ✅ Good - Night shift
<TimePicker
  minTime="18:00"
  maxTime="06:00"
  format="24h"
/>
```

## Performance Considerations

- The component uses `useCallback` for event handlers to prevent unnecessary re-renders
- Time options are generated on-demand to avoid memory issues
- Click outside detection uses event delegation for better performance
- State updates are batched to minimize re-renders

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Accessibility**: Screen readers, keyboard navigation, high contrast mode

## Troubleshooting

### Common Issues

1. **Icons not displaying**: Ensure `react-icons` is installed
2. **Styling conflicts**: Check for conflicting CSS classes
3. **Time format issues**: Verify the `format` prop matches your requirements
4. **Validation errors**: Check `minTime` and `maxTime` format (HH:MM or HH:MM:SS)

### Debug Mode

For development, you can add console logs to track state changes:

```tsx
<TimePicker
  value={time}
  onChange={(newTime) => {
    console.log('Time changed:', newTime);
    setTime(newTime);
  }}
/>
```

## Contributing

When contributing to this component:

1. Follow the existing code style and patterns
2. Add comprehensive tests for new features
3. Update the README for any new props or features
4. Ensure accessibility standards are maintained
5. Test across different browsers and devices

## License

This component is part of the atoms package and follows the same licensing terms.
