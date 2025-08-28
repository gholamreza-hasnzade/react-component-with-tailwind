# Enhanced Accordion Component

A flexible, accessible accordion component built with React, TypeScript, and Tailwind CSS, featuring multiple icon variants, sizes, colors, RTL/LTR support, and best practices.

## Features

- ✨ **Multiple Icon Variants**: Choose from chevron, plus/minus, or arrow icons
- 📏 **Size Variants**: 4 different sizes (sm, md, lg, xl)
- 🎨 **Color Variants**: 6 different color schemes (default, primary, secondary, success, warning, danger)
- 🔄 **Style Variants**: 4 different styles (default, bordered, card, ghost)
- 🔘 **Rounded Options**: 7 different border radius options
- 📐 **Width Control**: Auto width or full width
- 🌐 **RTL/LTR Support**: Full Right-to-Left and Left-to-Right text direction support
- ♿ **Accessible**: Built on Radix UI primitives with full accessibility support
- 📱 **Responsive**: Works seamlessly across all device sizes
- 🎭 **Smooth Animations**: CSS-based animations for opening/closing states
- 🔧 **TypeScript Support**: Full type safety with comprehensive interfaces
- 🎯 **Flexible**: Support for single and multiple accordion modes
- 🚫 **States**: Disabled and loading states
- 🎨 **Customizable Styling**: Full control over appearance with Tailwind CSS classes

## Installation

The component is already included in your project. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-accordion lucide-react
```

## Basic Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

function MyComponent() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is React?</AccordionTrigger>
        <AccordionContent>
          React is a JavaScript library for building user interfaces.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

## Props

### Accordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"single" \| "multiple"` | `"single"` | Whether only one or multiple items can be open |
| `collapsible` | `boolean` | `true` | Whether items can be collapsed |
| `defaultValue` | `string \| string[]` | `undefined` | Default open item(s) |
| `className` | `string` | `undefined` | Additional CSS classes |
| `variant` | `"default" \| "bordered" \| "card" \| "ghost"` | `"default"` | Visual style variant |
| `rounded` | `"none" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | `"md"` | Border radius variant |
| `fullWidth` | `boolean` | `false` | Whether to take full available width |
| `disabled` | `boolean` | `false` | Whether the entire accordion is disabled |
| `dir` | `"ltr" \| "rtl" \| "auto"` | `"auto"` | Text direction (auto-detects from HTML/body) |

### AccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | Unique identifier for the item |
| `className` | `string` | `undefined` | Additional CSS classes |
| `disabled` | `boolean` | `false` | Whether this item is disabled |
| `children` | `React.ReactNode` | **Required** | Accordion content |

### AccordionTrigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `iconVariant` | `"chevron" \| "plus" \| "arrow"` | `"chevron"` | Icon style to display |
| `showIcon` | `boolean` | `true` | Whether to show the icon |
| `iconClassName` | `string` | `undefined` | Additional CSS classes for the icon |
| `children` | `React.ReactNode` | **Required** | Trigger content |
| `className` | `string` | `undefined` | Additional CSS classes |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"md"` | Size variant |
| `color` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | Color variant |
| `disabled` | `boolean` | `false` | Whether this trigger is disabled |
| `loading` | `boolean` | `false` | Whether to show loading state |

### AccordionContent

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | **Required** | Content to display when open |
| `className` | `string` | `undefined` | Additional CSS classes |

## RTL/LTR Support

The accordion component automatically detects and supports both Right-to-Left (RTL) and Left-to-Right (LTR) text directions. This is especially useful for international applications supporting languages like Arabic, Hebrew, Persian, and others.

### Automatic Direction Detection

The component automatically detects text direction from:
1. **HTML tag**: `<html dir="rtl">`
2. **Body tag**: `<body dir="rtl">`
3. **Manual prop**: `<Accordion dir="rtl">`

### Direction Options

```tsx
// Auto-detect from HTML/body (default)
<Accordion>...</Accordion>

// Force LTR (Left-to-Right)
<Accordion dir="ltr">...</Accordion>

// Force RTL (Right-to-Left)
<Accordion dir="rtl">...</Accordion>

// Auto-detect with fallback
<Accordion dir="auto">...</Accordion>
```

### RTL Features

When RTL is detected, the component automatically:
- **Reverses icon positioning** (icons appear on the left)
- **Adjusts text alignment** (right-aligned text)
- **Reverses flexbox order** for proper layout
- **Rotates icons** appropriately for RTL context
- **Adjusts padding and margins** for RTL layout

### Example with Arabic Text

```tsx
<Accordion dir="rtl" className="border rounded-lg">
  <AccordionItem value="arabic">
    <AccordionTrigger>ما هو React؟</AccordionTrigger>
    <AccordionContent>
      React هي مكتبة JavaScript لبناء واجهات المستخدم.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Global Direction Setting

You can also set the direction globally on your HTML or body:

```html
<!-- Set RTL globally -->
<html dir="rtl">
<body dir="rtl">
  <!-- All accordions will automatically use RTL -->
</body>
</html>
```

## Variants

### Size Variants

```tsx
<AccordionTrigger size="sm">Small</AccordionTrigger>
<AccordionTrigger size="md">Medium (Default)</AccordionTrigger>
<AccordionTrigger size="lg">Large</AccordionTrigger>
<AccordionTrigger size="xl">Extra Large</AccordionTrigger>
```

### Color Variants

```tsx
<AccordionTrigger color="default">Default</AccordionTrigger>
<AccordionTrigger color="primary">Primary</AccordionTrigger>
<AccordionTrigger color="secondary">Secondary</AccordionTrigger>
<AccordionTrigger color="success">Success</AccordionTrigger>
<AccordionTrigger color="warning">Warning</AccordionTrigger>
<AccordionTrigger color="danger">Danger</AccordionTrigger>
```

### Style Variants

```tsx
<Accordion variant="default">Default Style</Accordion>
<Accordion variant="bordered">Bordered Style</Accordion>
<Accordion variant="card">Card Style</Accordion>
<Accordion variant="ghost">Ghost Style</Accordion>
```

### Rounded Variants

```tsx
<Accordion rounded="none">No Rounded</Accordion>
<Accordion rounded="sm">Small Rounded</Accordion>
<Accordion rounded="md">Medium Rounded (Default)</Accordion>
<Accordion rounded="lg">Large Rounded</Accordion>
<Accordion rounded="xl">Extra Large Rounded</Accordion>
<Accordion rounded="2xl">2XL Rounded</Accordion>
<Accordion rounded="full">Full Rounded</Accordion>
```

## Icon Variants

### 1. Chevron (Default)
```tsx
<AccordionTrigger iconVariant="chevron">
  Chevron Icons
</AccordionTrigger>
```
Uses chevron icons that change direction based on state and text direction.

### 2. Plus/Minus
```tsx
<AccordionTrigger iconVariant="plus">
  Plus/Minus Icons
</AccordionTrigger>
```
Uses plus icon when closed, minus icon when open.

### 3. Arrow
```tsx
<AccordionTrigger iconVariant="arrow">
  Arrow Icons
</AccordionTrigger>
```
Uses arrow icons pointing in different directions, automatically adjusted for RTL/LTR.

## Examples

### RTL/LTR with Different Languages

```tsx
{/* Arabic (RTL) */}
<Accordion dir="rtl" className="border rounded-lg">
  <AccordionItem value="arabic">
    <AccordionTrigger size="lg" color="primary">
      ما هو React؟
    </AccordionTrigger>
    <AccordionContent>
      React هي مكتبة JavaScript لبناء واجهات المستخدم.
    </AccordionContent>
  </AccordionItem>
</Accordion>

{/* English (LTR) */}
<Accordion dir="ltr" className="border rounded-lg">
  <AccordionItem value="english">
    <AccordionTrigger size="lg" color="secondary">
      What is React?
    </AccordionTrigger>
    <AccordionContent>
      React is a JavaScript library for building user interfaces.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Mixed Content (Bilingual)

```tsx
<Accordion dir="auto" className="border rounded-lg">
  <AccordionItem value="bilingual">
    <AccordionTrigger>
      React - React
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2">
        <p>English: React is a JavaScript library.</p>
        <p dir="rtl">العربية: React هي مكتبة JavaScript.</p>
      </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Size and Color Combination with RTL

```tsx
<Accordion dir="rtl" className="border rounded-lg">
  <AccordionItem value="custom">
    <AccordionTrigger size="lg" color="primary">
      Large Primary Accordion
    </AccordionTrigger>
    <AccordionContent>
      This accordion combines large size with primary colors in RTL layout.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Style Variants with RTL

```tsx
<Accordion 
  dir="rtl" 
  variant="card" 
  rounded="xl" 
  className="shadow-lg"
>
  <AccordionItem value="card-style">
    <AccordionTrigger>Card Style with Extra Rounded</AccordionTrigger>
    <AccordionContent>
      This accordion uses card variant with extra rounded corners in RTL.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Width Control with RTL

```tsx
<Accordion dir="rtl" fullWidth={false} className="inline-block border rounded-lg">
  <AccordionItem value="auto-width">
    <AccordionTrigger>Auto Width</AccordionTrigger>
    <AccordionContent>Adjusts to content width in RTL.</AccordionContent>
  </AccordionItem>
</Accordion>

<Accordion dir="rtl" fullWidth={true} className="border rounded-lg">
  <AccordionItem value="full-width">
    <AccordionTrigger>Full Width</AccordionTrigger>
    <AccordionContent>Takes full available width in RTL.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### States with RTL

```tsx
{/* Disabled State in RTL */}
<Accordion dir="rtl" disabled className="border rounded-lg opacity-50">
  <AccordionItem value="disabled" disabled>
    <AccordionTrigger disabled>Disabled Accordion</AccordionTrigger>
    <AccordionContent>Cannot be interacted with in RTL.</AccordionContent>
  </AccordionItem>
</Accordion>

{/* Loading State in RTL */}
<Accordion dir="rtl" className="border rounded-lg">
  <AccordionItem value="loading">
    <AccordionTrigger loading>Loading Accordion</AccordionTrigger>
    <AccordionContent>Shows loading spinner in RTL.</AccordionContent>
  </AccordionItem>
</Accordion>
```

### Multiple Accordion with Custom Styling and RTL

```tsx
<Accordion 
  dir="rtl"
  type="multiple" 
  variant="bordered" 
  rounded="lg" 
  fullWidth={true}
  className="border-primary/20"
>
  <AccordionItem value="tech-1">
    <AccordionTrigger 
      size="lg" 
      color="primary" 
      iconVariant="plus"
    >
      Frontend Technologies
    </AccordionTrigger>
    <AccordionContent>
      <ul className="space-y-2">
        <li>• React - UI library</li>
        <li>• Vue.js - Progressive framework</li>
        <li>• Angular - Full-featured framework</li>
      </ul>
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="tech-2">
    <AccordionTrigger 
      size="lg" 
      color="secondary" 
      iconVariant="arrow"
    >
      Backend Technologies
    </AccordionTrigger>
    <AccordionContent>
      <ul className="space-y-2">
        <li>• Node.js - JavaScript runtime</li>
        <li>• Python - Django, Flask</li>
        <li>• Java - Spring Boot</li>
      </ul>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Tailwind CSS Best Practices

The component follows Tailwind CSS best practices:

- **Consistent Spacing**: Uses Tailwind's spacing scale (`space-y-4`, `p-6`, etc.)
- **Semantic Colors**: Leverages CSS custom properties for theming
- **Responsive Design**: Mobile-first approach with responsive utilities
- **Accessibility**: Proper focus states and hover effects
- **Performance**: Minimal CSS with utility-first approach
- **RTL Support**: Automatic layout adjustments for different text directions

### Key Utility Classes Used

- **Layout**: `flex`, `grid`, `space-y-*`, `gap-*`
- **Spacing**: `p-*`, `m-*`, `px-*`, `py-*`
- **Colors**: `text-*`, `bg-*`, `border-*`
- **Typography**: `text-*`, `font-*`
- **Effects**: `shadow-*`, `rounded-*`, `transition-*`
- **States**: `hover:`, `focus:`, `data-[state=*]:`
- **Sizes**: `size-*`, `w-*`, `h-*`
- **RTL**: `rtl`, `text-right`, `flex-row-reverse`, `order-first`

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support (Tab, Enter, Space, Arrow keys)
- **Screen Reader Support**: Proper ARIA attributes and roles
- **Focus Management**: Visible focus indicators and proper focus order
- **Semantic HTML**: Uses appropriate HTML elements and attributes
- **Disabled States**: Proper handling of disabled accordions and items
- **Loading States**: Visual feedback for loading states
- **RTL Support**: Proper text direction handling for international users
- **Language Support**: Automatic direction detection and layout adjustment

## CSS Animations

The component includes smooth CSS animations for opening/closing states:

```css
@keyframes accordion-down {
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
}

@keyframes accordion-up {
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
}
```

### RTL-Specific CSS

```css
/* RTL Support for Accordion */
[dir="rtl"] .accordion-trigger {
  text-align: right;
}

[dir="rtl"] .accordion-content {
  text-align: right;
}

/* RTL Icon positioning */
[dir="rtl"] .accordion-trigger .accordion-icon {
  order: -1;
}

/* RTL Animation adjustments */
[dir="rtl"] .accordion-trigger[data-state="open"] .accordion-icon {
  transform: rotate(180deg);
}
```

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- IE11+ with appropriate polyfills
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)
- Full RTL language support (Arabic, Hebrew, Persian, etc.)

## Contributing

When contributing to this component:

1. Follow the existing code style and patterns
2. Ensure all new features are accessible
3. Add appropriate TypeScript types
4. Include examples in the documentation
5. Test across different browsers and devices
6. Test with both LTR and RTL text directions
7. Ensure proper internationalization support

## License

This component is part of your project and follows the same license terms. 