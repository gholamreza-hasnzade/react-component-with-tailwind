# Modal Component

A comprehensive, accessible modal component with full event handling, focus management, and customization options.

## Features

- 🎯 **Full Event Handling**: Escape key, backdrop click, close button
- ♿ **Accessibility**: ARIA attributes, focus trapping, keyboard navigation
- 🎨 **Customizable**: Multiple sizes, positions, styling options
- 📱 **Responsive**: Works on all screen sizes
- 🎭 **Flexible**: Header, body, footer sections with custom content
- 🔒 **Focus Management**: Prevents body scroll, manages focus states
- ✨ **Animations**: Smooth enter/exit animations (optional)

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **required** | Whether the modal is open |
| `onClose` | `() => void` | **required** | Callback when modal should close |
| `title` | `string` | `undefined` | Modal title (optional) |
| `children` | `React.ReactNode` | **required** | Modal content |
| `size` | `ModalSize` | `"md"` | Size of the modal |
| `position` | `ModalPosition` | `"center"` | Position of the modal |
| `showCloseButton` | `boolean` | `true` | Whether to show close button |
| `closeOnBackdropClick` | `boolean` | `true` | Whether to close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Whether to close on escape key |
| `preventBodyScroll` | `boolean` | `true` | Whether to prevent body scroll |
| `showBackdrop` | `boolean` | `true` | Whether to show backdrop |
| `animate` | `boolean` | `true` | Whether to animate the modal |
| `scrollable` | `boolean` | `false` | Whether to allow content scrolling |
| `maxHeight` | `string` | `undefined` | Maximum height of modal (e.g., "80vh", "600px") |
| `fullscreenOnMobile` | `boolean` | `false` | Whether to make modal fullscreen on mobile |
| `openFromButton` | `boolean` | `false` | Whether to open modal from button position on mobile |
| `buttonRef` | `React.RefObject<HTMLElement>` | `undefined` | Button element reference for positioning (optional) |
| `footer` | `React.ReactNode` | `undefined` | Footer content |
| `className` | `string` | `undefined` | Additional CSS classes for modal |
| `backdropClassName` | `string` | `undefined` | Additional CSS classes for backdrop |
| `contentClassName` | `string` | `undefined` | Additional CSS classes for content |
| `headerClassName` | `string` | `undefined` | Additional CSS classes for header |
| `bodyClassName` | `string` | `undefined` | Additional CSS classes for body |
| `footerClassName` | `string` | `undefined` | Additional CSS classes for footer |

### Types

```typescript
type ModalSize = "sm" | "md" | "lg" | "xl" | "full";
type ModalPosition = "center" | "top" | "bottom";

interface ModalProps {
  // ... all props listed above
}
```

## Usage Examples

### Basic Modal (No Footer)

```tsx
import { Modal } from "@/components/molecules/modal";

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Basic Modal"
>
  <p>This is a simple modal with basic content.</p>
</Modal>
```

**Note**: No footer is rendered when the `footer` prop is not provided.

### Form Modal with Footer

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="User Registration"
  size="lg"
  footer={
    <div className="flex gap-3">
      <Button variant="text" onClick={() => setIsOpen(false)}>
        Cancel
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  }
>
  <form className="space-y-4">
    <Input label="Name" placeholder="Enter your name" />
    <Input label="Email" type="email" placeholder="Enter your email" />
  </form>
</Modal>
```

### Large Modal with Custom Position

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Feature Overview"
  size="xl"
  position="top"
  showBackdrop={false}
>
  <div className="grid grid-cols-2 gap-4">
    <div>Feature 1 content</div>
    <div>Feature 2 content</div>
  </div>
</Modal>
```

### Modal Without Backdrop

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Quick Info"
  showBackdrop={false}
  closeOnBackdropClick={false}
>
  <p>This modal has no backdrop and won't close on backdrop click.</p>
</Modal>
```

### Scrollable Modal with Responsive Design

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Long Content"
  size="lg"
  scrollable={true}
  maxHeight="80vh"
  fullscreenOnMobile={true}
>
  <div className="space-y-4">
    {/* Long content that will scroll */}
    {Array.from({ length: 50 }, (_, i) => (
      <div key={i} className="p-4 bg-gray-50 rounded">
        Section {i + 1} content
      </div>
    ))}
  </div>
</Modal>
```

### Modal with Button Positioning on Mobile

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Button Position Modal"
  size="md"
  openFromButton={true}
  fullscreenOnMobile={false}
>
  <p>This modal opens from the button position on mobile devices.</p>
</Modal>
```

### Full-Size Modal (Entire Viewport)

```tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Full-Size Modal"
  size="full"
>
  <div className="h-full flex flex-col">
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold mb-4">Full Viewport Content</h2>
      <p>This modal takes the entire screen space for maximum content display.</p>
    </div>
  </div>
</Modal>
```

## Responsive Design & Scrolling

The Modal component is built with a mobile-first approach and handles content overflow gracefully.

## Button Positioning on Mobile

The Modal component can open from the button position on mobile devices, creating a more intuitive user experience.

### How It Works

- **Mobile Devices**: Modal opens from the top (button position) with `items-start`
- **Desktop Devices**: Modal centers normally with `items-center`
- **Automatic Detection**: Uses responsive breakpoints to switch behavior

### Usage

```tsx
// Basic button positioning
<Modal
  isOpen={isOpen}
  onClose={onClose}
  openFromButton={true}
>
  <p>Modal content</p>
</Modal>

// With button reference (optional)
const buttonRef = useRef<HTMLButtonElement>(null);

<Modal
  isOpen={isOpen}
  onClose={onClose}
  openFromButton={true}
  buttonRef={buttonRef}
>
  <p>Modal content</p>
</Modal>
```

### Benefits

- **Better UX**: Modal appears to "grow" from the button that triggered it
- **Natural Flow**: Follows user's mental model of where the modal should appear
- **Touch Friendly**: Optimized for mobile touch interactions
- **Responsive**: Automatically adapts to different screen sizes

### Responsive Features

- **Mobile-First Design**: Optimized for small screens with responsive breakpoints
- **Fullscreen Mobile**: Optional fullscreen mode on mobile devices
- **Adaptive Sizing**: Automatically adjusts width and height based on screen size
- **Touch-Friendly**: Optimized for touch interactions on mobile devices

### Content Scrolling

- **Overflow Handling**: Automatically handles content that exceeds modal height
- **Scrollable Content**: Enable scrolling with the `scrollable` prop
- **Height Control**: Set maximum height with `maxHeight` prop
- **Smooth Scrolling**: Native scrolling with proper focus management

### Responsive Breakpoints

- **Mobile (< 640px)**: 
  - Button positioning: Opens from top with `w-[85vw]` and `max-h-[80vh]`
  - Standard positioning: Full-width with minimal margins
  - Optional fullscreen mode
- **Tablet (640px - 1024px)**: Adaptive sizing with medium margins
- **Desktop (> 1024px)**: Standard sizing with full margins and backdrop blur

### Responsive Features

- **Button Positioning**: Modal opens from button position on mobile, centers on desktop
- **Adaptive Sizing**: Automatically adjusts width and height based on screen size
- **Header Visibility**: Ensures header is always visible on all screen sizes
- **Touch Optimization**: Optimized for mobile touch interactions
- **Automatic Breakpoints**: No manual breakpoint handling required

## Footer Control

The Modal component provides flexible footer control with automatic visibility management.

### Footer Visibility Rules

- **No `footer` prop** → Footer section is completely hidden
- **`footer` prop with content** → Footer section is rendered and visible
- **`footer={undefined}` or `footer={null}`** → Footer section is hidden

### Hide Footer (Default Behavior)

```tsx
// Footer is automatically hidden
<Modal isOpen={isOpen} onClose={onClose}>
  <p>Content without footer</p>
</Modal>

// Explicitly hide footer
<Modal isOpen={isOpen} onClose={onClose} footer={undefined}>
  <p>Content without footer</p>
</Modal>
```

### Show Footer with Content

```tsx
// Simple footer
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={<Button onClick={onClose}>Close</Button>}
>
  <p>Content with simple footer</p>
</Modal>

// Complex footer with multiple actions
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </div>
      <div className="flex gap-2">
        <Button variant="text" onClick={onClose}>Cancel</Button>
        <Button variant="outlined" onClick={handleReset}>Reset</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </div>
    </div>
  }
>
  <p>Content with complex footer</p>
</Modal>
```

### Conditional Footer Rendering

```tsx
const [showFooter, setShowFooter] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={showFooter ? (
    <div className="flex gap-3">
      <Button variant="text" onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  ) : undefined}
>
  <p>Content with conditional footer</p>
</Modal>
```

### Dynamic Footer Based on State

```tsx
const [isEditing, setIsEditing] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  title="User Profile"
  footer={isEditing ? (
    <div className="flex gap-3">
      <Button variant="text" onClick={() => setIsEditing(false)}>Cancel</Button>
      <Button variant="contained" onClick={handleSave}>Save Changes</Button>
    </div>
  ) : (
    <div className="flex gap-3">
      <Button variant="outlined" onClick={() => setIsEditing(true)}>Edit</Button>
      <Button variant="contained" onClick={onClose}>Close</Button>
    </div>
  )}
>
  <UserProfileContent isEditing={isEditing} />
</Modal>
```

### Footer Styling Customization

```tsx
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={<ActionButtons />}
  footerClassName="bg-blue-50 border-blue-200 text-blue-900" // Custom footer styling
>
  <p>Content with styled footer</p>
</Modal>
```

## Event Handling

### Keyboard Events

- **Escape Key**: Closes modal (configurable via `closeOnEscape`)
- **Tab Key**: Focus trapping within modal content
- **Shift + Tab**: Reverse focus trapping

### Mouse Events

- **Backdrop Click**: Closes modal (configurable via `closeOnBackdropClick`)
- **Close Button**: Closes modal (configurable via `showCloseButton`)

### Focus Management

- **Auto-focus**: First focusable element receives focus when modal opens
- **Focus Trap**: Tab navigation is trapped within modal content
- **Focus Restoration**: Previous active element regains focus when modal closes

## Accessibility Features

- **ARIA Attributes**: `role="dialog"`, `aria-modal="true"`
- **Labels**: `aria-labelledby` for title, `aria-describedby` for content
- **Focus Management**: Prevents focus from leaving modal
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper semantic structure

## Styling Customization

### Size Variants

- `sm`: `max-w-sm` (384px)
- `md`: `max-w-md` (448px) - Default
- `lg`: `max-w-lg` (512px)
- `xl`: `max-w-xl` (576px)
- `full`: `max-w-full w-full h-full max-h-full` - Takes entire viewport

### Position Variants

- `center`: Centered vertically (default)
- `top`: Aligned to top with padding
- `bottom`: Aligned to bottom with padding

### Custom Classes

All major sections support custom CSS classes:

```tsx
<Modal
  className="custom-modal"
  backdropClassName="custom-backdrop"
  contentClassName="custom-content"
  headerClassName="custom-header"
  bodyClassName="custom-body"
  footerClassName="custom-footer"
>
  {/* content */}
</Modal>
```

## Best Practices

### 1. State Management

```tsx
// Use local state for simple modals
const [isOpen, setIsOpen] = useState(false);

// Use global state for complex modals
const { openModal, closeModal, isModalOpen } = useModalStore();
```

### 2. Form Handling

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Process form data
  onClose(); // Close modal after submission
};

<Modal isOpen={isOpen} onClose={onClose}>
  <form onSubmit={handleSubmit}>
    {/* form fields */}
  </form>
</Modal>
```

### 3. Conditional Rendering

```tsx
// Only render modal when needed
{isOpen && (
  <Modal isOpen={isOpen} onClose={onClose}>
    {/* content */}
  </Modal>
)}
```

### 4. Custom Close Logic

```tsx
const handleClose = () => {
  // Custom validation or cleanup
  if (hasUnsavedChanges) {
    if (confirm("Discard changes?")) {
      setIsOpen(false);
    }
  } else {
    setIsOpen(false);
  }
};
```

### 5. Footer Management

```tsx
// Show footer only when needed
const [hasChanges, setHasChanges] = useState(false);

<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={hasChanges ? (
    <div className="flex gap-3">
      <Button variant="text" onClick={onClose}>Discard</Button>
      <Button variant="contained" onClick={handleSave}>Save Changes</Button>
    </div>
  ) : undefined}
>
  <Content onChange={() => setHasChanges(true)} />
</Modal>

// Use footer for primary actions, content for secondary actions
<Modal 
  isOpen={isOpen} 
  onClose={onClose}
  footer={
    <div className="flex gap-3">
      <Button variant="text" onClick={onClose}>Cancel</Button>
      <Button variant="contained" onClick={handleSubmit}>Submit</Button>
    </div>
  }
>
  <div className="space-y-4">
    <p>Primary content here</p>
    <Button variant="outlined" onClick={handleSecondaryAction}>
      Secondary Action
    </Button>
  </div>
</Modal>
```

## Performance Considerations

- **Conditional Rendering**: Modal only renders when `isOpen` is true
- **Event Cleanup**: All event listeners are properly cleaned up
- **Focus Management**: Efficient focus trapping without unnecessary re-renders
- **Animation**: CSS-based animations for smooth performance

## Browser Support

- **Modern Browsers**: Full support
- **IE11+**: Basic functionality (some CSS features may not work)
- **Mobile**: Touch-friendly with proper event handling

## Troubleshooting

### Modal Not Closing

- Check `onClose` callback is properly defined
- Verify `closeOnBackdropClick` and `closeOnEscape` settings
- Ensure no event propagation issues

### Focus Issues

- Check for conflicting focus management libraries
- Verify `preventBodyScroll` setting
- Ensure proper cleanup in component unmount

### Styling Conflicts

- Use `!important` sparingly
- Check z-index conflicts with other components
- Verify Tailwind CSS classes are available

### Footer Issues

- **Footer not showing**: Ensure `footer` prop has content (not `null`, `undefined`, or empty string)
- **Footer always visible**: Check if `footer` prop is accidentally set to a truthy value
- **Footer styling conflicts**: Use `footerClassName` for custom styling instead of global CSS
- **Footer content overflow**: Ensure footer content fits within modal width

## Related Components

- **Dialog**: For simpler confirmation dialogs
- **Drawer**: For side panel modals
- **Toast**: For non-blocking notifications
- **Tooltip**: For hover-based information display
