# Separator

Visually or semantically separates content.

## Features

- **Accessible**: Proper ARIA attributes and semantic HTML
- **Flexible**: Horizontal and vertical orientations
- **Customizable**: Easy to style with CSS classes
- **Semantic**: Can render as decorative div or semantic hr element

## Installation

```bash
npm install @radix-ui/react-separator
```

## Usage

```tsx
import { Separator } from '@/components/atoms/separator'

export default function SeparatorDemo() {
  return (
    <div>
      <p>Content above separator</p>
      <Separator className="my-4" />
      <p>Content below separator</p>
    </div>
  )
}
```

## API Reference

### Separator

A component that visually or semantically separates content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | The orientation of the separator |
| `decorative` | `boolean` | `true` | Whether the separator is decorative or semantic |

#### CSS Classes

The component uses the following CSS classes by default:

- `shrink-0` - Prevents shrinking
- `bg-border` - Background color using CSS custom property
- `h-[1px] w-full` - Horizontal orientation dimensions
- `h-full w-[1px]` - Vertical orientation dimensions

## Examples

### Basic Usage

```tsx
<Separator className="my-4" />
```

### Vertical Orientation

```tsx
<div className="flex items-center space-x-4">
  <span>Left content</span>
  <Separator orientation="vertical" className="h-8" />
  <span>Right content</span>
</div>
```

### Semantic Separator

```tsx
<Separator decorative={false} className="my-4" />
```

### Custom Styling

```tsx
<Separator 
  className="my-4 bg-gradient-to-r from-blue-500 to-purple-500 h-0.5" 
/>
```

## Accessibility

- **ARIA Role**: Uses `role="separator"` for semantic separators
- **ARIA Orientation**: Includes `aria-orientation` attribute
- **Semantic HTML**: Renders as `<hr>` element when `decorative={false}`

## Styling

The component uses CSS custom properties for theming:

```css
:root {
  --separator-color: hsl(240 5.9% 10%);
}

.dark {
  --separator-color: hsl(240 3.7% 15.9%);
}
```

## Dependencies

- React 18+
- Tailwind CSS
- `@/lib/utils` (for `cn` utility function)

## See Also

- [Radix UI Separator](https://www.radix-ui.com/primitives/docs/components/separator)
- [Accessibility Guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/separator/)
