# SpeedDial Component

A modern, accessible SpeedDial component built with React, TypeScript, and Tailwind CSS. Perfect for providing quick access to common actions in a floating action button pattern.

## Features

- 🎯 **Multiple Positions**: Top-left, top-right, bottom-left, bottom-right, and center
- 📐 **Flexible Directions**: Actions expand up, down, left, or right
- 🎨 **6 Color Schemes**: Primary, secondary, success, error, warning, and info
- 📏 **3 Sizes**: Small, medium, and large
- 🔄 **Controlled & Uncontrolled**: Both modes supported
- ♿ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- 🎭 **Custom Icons**: Customizable main button and action icons
- 🏷️ **Labels & Tooltips**: Optional labels and tooltips for actions
- 🚫 **Disabled Actions**: Support for disabled action states
- 📱 **Responsive**: Works on all screen sizes
- 🧭 **Smart Direction**: Auto-adjusts direction based on position to prevent viewport cutoff

## Smart Direction Adjustment

The SpeedDial component automatically adjusts the expansion direction based on its position to prevent actions from being cut off by the browser viewport:

- **Left positions** (`top-left`, `bottom-left`): Actions automatically expand to the right (ignores `direction` prop)
- **Right positions** (`top-right`, `bottom-right`): Actions automatically expand to the left (ignores `direction` prop)  
- **Center position**: Uses the specified `direction` prop as-is

**Note**: When using left or right positions, the `direction` prop is overridden to ensure actions remain visible. For center positioning, you have full control over the expansion direction.

## Installation

The component is already included in your project. Import it from:

```tsx
import { SpeedDial, SpeedDialAction } from "@/components/atoms/speedDial";
```

## Basic Usage

```tsx
import { SpeedDial, SpeedDialAction } from "@/components/atoms/speedDial";
import { FaEdit, FaTrash, FaShare } from "react-icons/fa";

const actions: SpeedDialAction[] = [
  {
    id: "edit",
    icon: <FaEdit />,
    label: "Edit",
    tooltip: "Edit item",
    onClick: () => console.log("Edit clicked"),
  },
  {
    id: "delete",
    icon: <FaTrash />,
    label: "Delete",
    tooltip: "Delete item",
    onClick: () => console.log("Delete clicked"),
  },
  {
    id: "share",
    icon: <FaShare />,
    label: "Share",
    tooltip: "Share item",
    onClick: () => console.log("Share clicked"),
  },
];

function MyComponent() {
  return (
    <SpeedDial
      actions={actions}
      position="bottom-right"
      direction="up"
      colorScheme="primary"
    />
  );
}
```

## Props

### SpeedDialProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `actions` | `SpeedDialAction[]` | **Required** | Array of actions to display |
| `mainIcon` | `React.ReactNode` | `<FaPlus />` | Main button icon |
| `position` | `"top-left" \| "top-right" \| "bottom-left" \| "bottom-right" \| "center"` | `"bottom-right"` | Position on screen |
| `direction` | `"up" \| "down" \| "left" \| "right"` | `"up"` | Direction of action expansion |
| `defaultOpen` | `boolean` | `false` | Whether open by default |
| `controlled` | `boolean` | `false` | Whether controlled externally |
| `open` | `boolean` | `undefined` | Open state when controlled |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback when open state changes |
| `showLabels` | `boolean` | `true` | Whether to show action labels |
| `showTooltips` | `boolean` | `true` | Whether to show action tooltips |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size of the SpeedDial |
| `colorScheme` | `"primary" \| "secondary" \| "success" \| "error" \| "warning" \| "info"` | `"primary"` | Color scheme |
| `closeOnActionClick` | `boolean` | `true` | Whether to close after action click |
| `closeOnOutsideClick` | `boolean` | `true` | Whether to close on outside click |
| `className` | `string` | `undefined` | Additional CSS classes |

### SpeedDialAction

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | **Required** | Unique identifier |
| `icon` | `React.ReactNode` | **Required** | Action icon |
| `label` | `string` | **Required** | Action label text |
| `tooltip` | `string` | `undefined` | Tooltip content |
| `disabled` | `boolean` | `false` | Whether action is disabled |
| `onClick` | `() => void` | **Required** | Click handler |
| `className` | `string` | `undefined` | Additional CSS classes |

## Examples

### Basic SpeedDial

```tsx
const actions: SpeedDialAction[] = [
  {
    id: "edit",
    icon: <FaEdit />,
    label: "Edit",
    onClick: () => handleEdit(),
  },
  {
    id: "delete",
    icon: <FaTrash />,
    label: "Delete",
    onClick: () => handleDelete(),
  },
];

<SpeedDial
  actions={actions}
  position="bottom-right"
  direction="up"
/>
```

### Different Positions

```tsx
// Top-left corner
<SpeedDial
  actions={actions}
  position="top-left"
  direction="down"
  colorScheme="success"
/>

// Center of screen
<SpeedDial
  actions={actions}
  position="center"
  direction="right"
  colorScheme="info"
/>
```

### Controlled SpeedDial

```tsx
const [isOpen, setIsOpen] = useState(false);

<SpeedDial
  actions={actions}
  controlled={true}
  open={isOpen}
  onOpenChange={setIsOpen}
  closeOnActionClick={false}
/>
```

### Outside Click Control

```tsx
// Enable outside click to close (default)
<SpeedDial
  actions={actions}
  closeOnOutsideClick={true}
/>

// Disable outside click to close
<SpeedDial
  actions={actions}
  closeOnOutsideClick={false}
/>
```

### Custom Main Icon

```tsx
<SpeedDial
  actions={actions}
  mainIcon={<FaHeart className="text-white" />}
  colorScheme="error"
  size="lg"
/>
```

### Different Sizes

```tsx
// Small
<SpeedDial actions={actions} size="sm" />

// Medium (default)
<SpeedDial actions={actions} size="md" />

// Large
<SpeedDial actions={actions} size="lg" />
```

### Color Schemes

```tsx
// Primary (blue)
<SpeedDial actions={actions} colorScheme="primary" />

// Success (green)
<SpeedDial actions={actions} colorScheme="success" />

// Error (red)
<SpeedDial actions={actions} colorScheme="error" />

// Warning (yellow)
<SpeedDial actions={actions} colorScheme="warning" />

// Info (sky blue)
<SpeedDial actions={actions} colorScheme="info" />

// Secondary (gray)
<SpeedDial actions={actions} colorScheme="secondary" />
```

### Disabled Actions

```tsx
const actions: SpeedDialAction[] = [
  {
    id: "edit",
    icon: <FaEdit />,
    label: "Edit",
    onClick: () => handleEdit(),
  },
  {
    id: "delete",
    icon: <FaTrash />,
    label: "Delete",
    disabled: true,
    onClick: () => handleDelete(),
  },
];
```

### No Labels (Tooltips Only)

```tsx
<SpeedDial
  actions={actions}
  showLabels={false}
  showTooltips={true}
  size="sm"
/>
```

## Use Cases

### File Management
```tsx
const fileActions: SpeedDialAction[] = [
  {
    id: "upload",
    icon: <FaUpload />,
    label: "Upload",
    onClick: () => handleUpload(),
  },
  {
    id: "download",
    icon: <FaDownload />,
    label: "Download",
    onClick: () => handleDownload(),
  },
  {
    id: "share",
    icon: <FaShare />,
    label: "Share",
    onClick: () => handleShare(),
  },
];
```

### Social Interactions
```tsx
const socialActions: SpeedDialAction[] = [
  {
    id: "like",
    icon: <FaHeart />,
    label: "Like",
    onClick: () => handleLike(),
  },
  {
    id: "favorite",
    icon: <FaStar />,
    label: "Favorite",
    onClick: () => handleFavorite(),
  },
  {
    id: "bookmark",
    icon: <FaBookmark />,
    label: "Bookmark",
    onClick: () => handleBookmark(),
  },
];
```

### Content Management
```tsx
const contentActions: SpeedDialAction[] = [
  {
    id: "create",
    icon: <FaPlus />,
    label: "Create",
    onClick: () => handleCreate(),
  },
  {
    id: "edit",
    icon: <FaEdit />,
    label: "Edit",
    onClick: () => handleEdit(),
  },
  {
    id: "delete",
    icon: <FaTrash />,
    label: "Delete",
    onClick: () => handleDelete(),
  },
];
```

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Proper focus handling
- **Screen Reader Support**: Descriptive labels and states
- **Semantic Markup**: Uses appropriate HTML elements

## Customization

### Custom Styling

```tsx
<SpeedDial
  actions={actions}
  className="border-2 border-blue-300 rounded-xl"
/>
```

### Custom Action Styling

```tsx
const actions: SpeedDialAction[] = [
  {
    id: "custom",
    icon: <FaEdit />,
    label: "Custom",
    onClick: () => handleCustom(),
    className: "bg-purple-500 hover:bg-purple-600",
  },
];
```

## Best Practices

1. **Action Count**: Keep actions to 3-5 for optimal UX
2. **Icon Choice**: Use clear, recognizable icons
3. **Label Clarity**: Write concise, action-oriented labels
4. **Positioning**: Choose position that doesn't interfere with content
5. **Accessibility**: Always provide meaningful labels and tooltips
6. **Performance**: Avoid complex animations for large action lists

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Testing

The component includes comprehensive tests covering:

- Rendering and display
- User interactions
- Accessibility features
- Different configurations
- Edge cases

Run tests with:

```bash
npm test
```

## Contributing

When contributing to this component:

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation for API changes
4. Ensure accessibility compliance
5. Test across different browsers and devices
