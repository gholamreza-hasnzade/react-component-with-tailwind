# Badge Component

A flexible and accessible Badge component built with React, TypeScript, and Tailwind CSS. The Badge component provides various visual styles, sizes, and interactive features for displaying status indicators, labels, and notifications.

## Features

- **Multiple Variants**: 7 color variants (primary, secondary, success, error, warning, info, outline)
- **Size Options**: 3 sizes (sm, md, lg) with appropriate spacing and typography
- **Interactive States**: Clickable badges with hover and focus states
- **Status Indicators**: Optional status dots for visual feedback
- **Dismissible**: Built-in dismiss functionality with keyboard support
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Customizable**: Extensible with custom CSS classes and additional props
- **TypeScript**: Full type safety with comprehensive interfaces

## API Reference

### BadgeProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Content to display inside the badge |
| `variant` | `BadgeVariant` | `"primary"` | Visual style variant |
| `size` | `BadgeSize` | `"md"` | Size of the badge |
| `rounded` | `boolean` | `false` | Whether to use rounded corners |
| `clickable` | `boolean` | `false` | Whether the badge is clickable |
| `showDot` | `boolean` | `false` | Whether to show a status dot |
| `dismissible` | `boolean` | `false` | Whether the badge can be dismissed |
| `onDismiss` | `() => void` | `undefined` | Callback when badge is dismissed |
| `className` | `string` | `undefined` | Additional CSS classes |
| `onClick` | `(e: React.MouseEvent) => void` | `undefined` | Click handler for clickable badges |

### BadgeVariant

```typescript
type BadgeVariant = 
  | "primary"    // Blue theme
  | "secondary"  // Gray theme
  | "success"    // Green theme
  | "error"      // Red theme
  | "warning"    // Yellow theme
  | "info"       // Cyan theme
  | "outline"    // Bordered theme
```

### BadgeSize

```typescript
type BadgeSize = "sm" | "md" | "lg";
```

## Usage Examples

### Basic Badge

```tsx
import { Badge } from "@/components/atoms/badge";

<Badge>Default Badge</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
```

### Size Variants

```tsx
<Badge size="sm" variant="primary">Small</Badge>
<Badge size="md" variant="primary">Medium</Badge>
<Badge size="lg" variant="primary">Large</Badge>
```

### Rounded Badges

```tsx
<Badge variant="primary" rounded>Rounded</Badge>
<Badge variant="success" rounded>Success</Badge>
```

### Status Indicators

```tsx
<Badge variant="success" showDot>Online</Badge>
<Badge variant="error" showDot>Offline</Badge>
<Badge variant="warning" showDot>Away</Badge>
```

### Clickable Badges

```tsx
<Badge 
  variant="primary" 
  clickable 
  onClick={() => console.log('Badge clicked!')}
>
  Click Me
</Badge>
```

### Dismissible Badges

```tsx
const [showBadge, setShowBadge] = useState(true);

{showBadge && (
  <Badge 
    variant="warning" 
    dismissible 
    onDismiss={() => setShowBadge(false)}
  >
    Dismissible Warning
  </Badge>
)}
```

### Custom Styling

```tsx
<Badge 
  variant="primary" 
  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
>
  Custom Styled
</Badge>
```

## Real-world Use Cases

### User Status Indicators

```tsx
<div className="flex items-center gap-2">
  <Badge variant="success" showDot size="sm">Active</Badge>
  <span>User is currently online</span>
</div>
```

### Task Priority Labels

```tsx
<div className="flex gap-2">
  <Badge variant="error" size="sm">High Priority</Badge>
  <Badge variant="warning" size="sm">Medium Priority</Badge>
  <Badge variant="success" size="sm">Low Priority</Badge>
</div>
```

### Category Tags

```tsx
<div className="flex flex-wrap gap-2">
  <Badge variant="primary" size="sm">Frontend</Badge>
  <Badge variant="info" size="sm">Backend</Badge>
  <Badge variant="secondary" size="sm">DevOps</Badge>
</div>
```

### Notification Counters

```tsx
<div className="flex items-center gap-2">
  <span>Messages</span>
  <Badge variant="error" size="sm">5</Badge>
</div>
```

## Accessibility Features

- **ARIA Roles**: Proper role attributes for interactive badges
- **Keyboard Navigation**: Tab index support for clickable badges
- **Screen Reader Support**: Descriptive labels and status information
- **Focus Management**: Visible focus indicators with ring styles
- **Semantic HTML**: Proper HTML structure and attributes

## Styling and Customization

The Badge component uses Tailwind CSS classes and can be customized through:

1. **Variant Props**: Pre-defined color schemes
2. **Size Props**: Consistent sizing options
3. **Custom Classes**: Additional CSS classes via `className` prop
4. **CSS Variables**: Override default colors if needed

### Custom Color Schemes

```tsx
// Using custom classes
<Badge 
  className="bg-custom-blue text-white border-custom-blue-dark"
  variant="primary"
>
  Custom Blue
</Badge>
```

## Best Practices

1. **Use Appropriate Variants**: Choose colors that match your design system
2. **Consistent Sizing**: Stick to one size within the same context
3. **Accessible Text**: Ensure sufficient contrast between text and background
4. **Meaningful Labels**: Use descriptive text that conveys the badge's purpose
5. **Interactive Feedback**: Provide visual feedback for clickable badges
6. **Dismissible Logic**: Handle dismissible badge state properly

## Performance Considerations

- The component is lightweight and optimized for performance
- Conditional rendering for optional features (dots, dismiss buttons)
- Efficient CSS class generation with clsx
- Minimal re-renders with proper prop handling

## Browser Support

- Modern browsers with ES6+ support
- Tailwind CSS compatibility
- Responsive design for mobile and desktop

## Dependencies

- React 16.8+
- TypeScript 4.0+
- Tailwind CSS 2.0+
- clsx for conditional class names
