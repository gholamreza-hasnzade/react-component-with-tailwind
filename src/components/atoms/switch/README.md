# Switch Component

A modern, accessible Switch component built with React, TypeScript, and Tailwind CSS. The Switch component provides multiple variants, sizes, and interactive states while maintaining excellent accessibility standards and smooth animations.

## Features

- 🎨 **Multiple Variants**: 7 different color schemes (default, primary, secondary, success, warning, error, info)
- 📏 **Flexible Sizing**: 3 size options (sm, md, lg) with responsive design
- 🔄 **Interactive States**: Loading, disabled, and animated transitions
- 🎯 **Icon Support**: Built-in and custom icons for both states
- ♿ **Accessibility**: Full keyboard navigation, ARIA attributes, and screen reader support
- 🎭 **Customization**: Form layouts, custom styling, and flexible positioning
- 🚀 **Performance**: Built with class-variance-authority for optimal bundle size
- ✨ **Animations**: Smooth transitions and loading states

## Installation

The Switch component is part of the component library and requires the following dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge react-icons
```

## Basic Usage

```tsx
import { Switch } from './components/atoms/switch/switch';

// Basic switch
<Switch checked={isEnabled} onChange={setIsEnabled} />

// With label
<Switch 
  checked={darkMode} 
  onChange={setDarkMode}
  label="Dark Mode"
/>

// With description
<Switch 
  checked={notifications} 
  onChange={setNotifications}
  label="Notifications"
  description="Receive push notifications"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | `false` | Whether the switch is checked |
| `onChange` | `(checked: boolean) => void` | - | Callback when switch state changes |
| `variant` | `SwitchVariant` | `"default"` | The visual style variant of the switch |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the switch |
| `label` | `string` | - | Label text for the switch |
| `description` | `string` | - | Description text below the switch |
| `showIcons` | `boolean` | `false` | Whether to show icons on the switch |
| `checkedIcon` | `React.ReactNode` | - | Custom icon for checked state |
| `uncheckedIcon` | `React.ReactNode` | - | Custom icon for unchecked state |
| `loading` | `boolean` | `false` | Whether the switch is in loading state |
| `formLayout` | `boolean` | `false` | Whether to show the switch in a form layout |
| `disabled` | `boolean` | `false` | Whether the switch is disabled |
| `containerClassName` | `string` | - | Additional CSS classes for the container |
| `labelClassName` | `string` | - | Additional CSS classes for the label |
| `descriptionClassName` | `string` | - | Additional CSS classes for the description |
| `className` | `string` | - | Additional CSS classes for the switch |

## Variants

The Switch component supports 7 different visual variants:

```tsx
<Switch variant="default" checked={checked} onChange={setChecked} />
<Switch variant="primary" checked={checked} onChange={setChecked} />
<Switch variant="secondary" checked={checked} onChange={setChecked} />
<Switch variant="success" checked={checked} onChange={setChecked} />
<Switch variant="warning" checked={checked} onChange={setChecked} />
<Switch variant="error" checked={checked} onChange={setChecked} />
<Switch variant="info" checked={checked} onChange={setChecked} />
```

## Sizes

Three size options are available:

```tsx
<Switch size="sm" variant="primary" checked={checked} onChange={setChecked} />
<Switch size="md" variant="primary" checked={checked} onChange={setChecked} />
<Switch size="lg" variant="primary" checked={checked} onChange={setChecked} />
```

## Interactive Features

### Basic Switch

```tsx
const [isEnabled, setIsEnabled] = useState(false);

<Switch 
  checked={isEnabled} 
  onChange={setIsEnabled}
/>
```

### Switch with Label

```tsx
<Switch 
  variant="primary"
  checked={darkMode} 
  onChange={setDarkMode}
  label="Dark Mode"
/>
```

### Switch with Description

```tsx
<Switch 
  variant="success"
  checked={autoSave} 
  onChange={setAutoSave}
  label="Auto Save"
  description="Automatically save your work every 5 minutes"
/>
```

### Switch with Icons

```tsx
<Switch 
  variant="warning"
  showIcons
  checked={notifications} 
  onChange={setNotifications}
  label="Notifications"
/>
```

### Custom Icons

```tsx
import { FaBell, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

<Switch 
  variant="info"
  showIcons
  checkedIcon={<FaVolumeUp />}
  uncheckedIcon={<FaVolumeMute />}
  checked={sound} 
  onChange={setSound}
  label="Sound"
/>
```

## Advanced Features

### Form Layout

Display switches in a vertical form layout:

```tsx
<Switch 
  variant="primary"
  formLayout
  checked={darkMode} 
  onChange={setDarkMode}
  label="Dark Mode"
  description="Enable dark theme for better viewing in low light"
/>
```

### Loading States

Show loading indicators:

```tsx
<Switch 
  variant="primary"
  loading={isLoading}
  checked={isEnabled} 
  onChange={setIsEnabled}
  label="Loading Switch"
/>
```

### Disabled State

```tsx
<Switch 
  variant="primary"
  disabled
  checked={isEnabled} 
  onChange={setIsEnabled}
  label="Disabled Switch"
/>
```

## Accessibility

The Switch component follows WCAG guidelines and includes:

- **ARIA Attributes**: Proper `role="switch"` and `aria-checked` values
- **Keyboard Navigation**: Full support for Tab, Enter, and Space keys
- **Focus Management**: Visible focus rings and proper focus order
- **Screen Reader Support**: Semantic HTML and proper labeling
- **High Contrast**: Color schemes that meet accessibility standards

### Keyboard Usage

- **Tab**: Navigate to the switch
- **Enter/Space**: Toggle the switch state
- **Arrow Keys**: Navigate between form elements

## Styling

The component uses Tailwind CSS classes and can be customized through:

- **CSS Variables**: Override default colors and spacing
- **Tailwind Classes**: Use the `className` prop for custom styling
- **Container Classes**: Customize the overall layout with `containerClassName`
- **Label Classes**: Style labels with `labelClassName`
- **Description Classes**: Style descriptions with `descriptionClassName`

### Custom Styling Example

```tsx
<Switch 
  variant="primary"
  checked={checked} 
  onChange={setChecked}
  label="Custom Switch"
  className="ring-4 ring-purple-200"
  containerClassName="bg-gray-50 p-4 rounded-lg"
  labelClassName="text-lg font-bold text-purple-800"
/>
```

## Examples

### Basic Switch Collection

```tsx
<div className="space-y-4">
  <Switch 
    variant="primary"
    checked={darkMode} 
    onChange={setDarkMode}
    label="Dark Mode"
  />
  <Switch 
    variant="success"
    checked={notifications} 
    onChange={setNotifications}
    label="Notifications"
  />
  <Switch 
    variant="warning"
    checked={location} 
    onChange={setLocation}
    label="Location Services"
  />
</div>
```

### Form Settings

```tsx
const [settings, setSettings] = useState({
  darkMode: false,
  notifications: true,
  autoSave: true,
  location: false,
});

<div className="space-y-4">
  <Switch 
    variant="primary"
    formLayout
    checked={settings.darkMode} 
    onChange={(checked) => setSettings(prev => ({ ...prev, darkMode: checked }))}
    label="Dark Mode"
    description="Enable dark theme for better viewing in low light"
  />
  <Switch 
    variant="success"
    formLayout
    checked={settings.autoSave} 
    onChange={(checked) => setSettings(prev => ({ ...prev, autoSave: checked }))}
    label="Auto Save"
    description="Automatically save your work every 5 minutes"
  />
</div>
```

### Switch with Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

<Switch 
  variant="info"
  loading={isLoading}
  checked={isEnabled} 
  onChange={async (checked) => {
    setIsLoading(true);
    try {
      await updateSetting(checked);
      setIsEnabled(checked);
    } finally {
      setIsLoading(false);
    }
  }}
  label="Async Switch"
/>
```

## Best Practices

1. **Use Semantic Variants**: Choose variants that match the context (success for enabled features, warning for caution)
2. **Provide Clear Labels**: Make switch purposes obvious with descriptive labels
3. **Add Descriptions**: Use descriptions to explain what the switch does
4. **Handle Loading States**: Show loading indicators for async operations
5. **Accessibility First**: Ensure switches are keyboard navigable and screen reader friendly
6. **Consistent Sizing**: Use consistent sizes within the same interface section

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

The component is optimized for performance with:

- **Tree Shaking**: Only used variants are included in the bundle
- **Efficient Animations**: CSS transitions for smooth performance
- **Minimal Re-renders**: Optimized state management
- **Bundle Size**: Small footprint with class-variance-authority

## Contributing

When contributing to the Switch component:

1. Maintain accessibility standards
2. Add comprehensive tests for new features
3. Update documentation and examples
4. Follow the existing code style and patterns
5. Test across different browsers and devices

## License

This component is part of the component library and follows the same license terms.
