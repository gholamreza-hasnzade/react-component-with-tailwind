# Notification System

A comprehensive, accessible notification system built with React and TypeScript, following best practices for user experience and accessibility.

## Features

- 🎨 **4 Notification Types**: Success, Error, Warning, Info
- ⏰ **Auto-dismiss**: Configurable duration with visual progress bar
- 🔒 **Persistent**: Notifications that don't auto-dismiss
- 🎯 **Actions**: Clickable buttons within notifications
- 🎭 **Animations**: Smooth entrance/exit effects with staggered timing
- 📱 **Responsive**: Works on all screen sizes
- ♿ **Accessible**: Full ARIA support and keyboard navigation
- 🎨 **Customizable**: Colors, icons, and positioning
- 📍 **Multiple Positions**: Top, bottom, left, right, center

## Usage

### Basic Setup

```tsx
import { useNotifications, NotificationSystem } from './notifications';

function MyComponent() {
  const { addSuccess, addError, addWarning, addInfo } = useNotifications();

  return (
    <div>
      <button onClick={() => addSuccess("Success!", "Operation completed")}>
        Show Success
      </button>
      
      <NotificationSystem 
        notifications={notifications} 
        onDismiss={removeNotification} 
      />
    </div>
  );
}
```

### Hook Methods

```tsx
const {
  notifications,        // Array of current notifications
  addNotification,      // Add custom notification
  addSuccess,          // Add success notification
  addError,            // Add error notification
  addWarning,          // Add warning notification
  addInfo,             // Add info notification
  removeNotification,   // Remove specific notification
  clearAll,            // Clear all notifications
} = useNotifications();
```

### Notification Types

```tsx
// Success notification
addSuccess("Success!", "Operation completed successfully");

// Error notification
addError("Error!", "Something went wrong");

// Warning notification
addWarning("Warning!", "Please check your input");

// Info notification
addInfo("Information", "Here's some helpful info");
```

### Advanced Options

```tsx
// Persistent notification (won't auto-dismiss)
addInfo("Important", "This stays until dismissed", {
  persistent: true
});

// Custom duration
addWarning("Custom", "Dismisses in 2 seconds", {
  duration: 2000
});

// With action button
addSuccess("Action Required", "Please confirm", {
  action: {
    label: "Confirm",
    onClick: () => console.log("Confirmed!")
  }
});
```

## Props

### NotificationSystem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `notifications` | `Notification[]` | `[]` | Array of notifications to display |
| `onDismiss` | `(id: string) => void` | - | Callback when notification is dismissed |
| `position` | `Position` | `"top-right"` | Position on screen |
| `maxNotifications` | `number` | `5` | Maximum notifications to show |
| `className` | `string` | - | Additional CSS classes |

### Position Options

- `"top-right"` - Top right corner
- `"top-left"` - Top left corner  
- `"bottom-right"` - Bottom right corner
- `"bottom-left"` - Bottom left corner
- `"top-center"` - Top center
- `"bottom-center"` - Bottom center

## Styling

The component uses Tailwind CSS classes and can be customized through:

- CSS custom properties for colors
- Tailwind utility classes
- Custom CSS for animations
- Theme-aware color schemes

## Accessibility

- **ARIA Live Regions**: Notifications announce to screen readers
- **Focus Management**: Proper focus handling for dismiss buttons
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Descriptive labels and announcements
- **High Contrast**: Accessible color combinations

## Best Practices

1. **Don't Overwhelm**: Limit to 5 notifications maximum
2. **Clear Messages**: Use concise, actionable text
3. **Appropriate Duration**: Success/Info: 3-5s, Warning: 5-8s, Error: 8-10s
4. **Consistent Positioning**: Stick to one position per app
5. **Action Buttons**: Use for important confirmations only
6. **Persistent Notifications**: Reserve for critical information

## Examples

See `notifications.example.tsx` for comprehensive usage examples including:

- Basic notification types
- Advanced features (persistent, actions, custom duration)
- Different positioning
- Integration patterns

## Dependencies

- React 18+
- TypeScript 4.5+
- Tailwind CSS
- React Icons (FaCheck, FaExclamationTriangle, etc.)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use in your projects!
