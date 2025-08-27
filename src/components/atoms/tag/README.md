# Tag Component

A flexible and accessible Tag component built with React, TypeScript, and Tailwind CSS. The Tag component provides multiple variants, sizes, and interactive states while maintaining excellent accessibility standards.

## Features

- 🎨 **Multiple Variants**: 9 different color schemes (default, primary, secondary, success, warning, error, info, outline, ghost)
- 📏 **Flexible Sizing**: 3 size options (sm, md, lg) with responsive design
- 🔄 **Interactive States**: Clickable, dismissible, loading, and disabled states
- 🎯 **Icon Support**: Custom icons with configurable positioning (left/right)
- ♿ **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- 🎭 **Customization**: Rounded corners, truncation, max width, and custom styling
- 🚀 **Performance**: Built with class-variance-authority for optimal bundle size

## Installation

The Tag component is part of the component library and requires the following dependencies:

```bash
npm install class-variance-authority clsx tailwind-merge react-icons
```

## Basic Usage

```tsx
import { Tag } from './components/atoms/tag/tag';

// Simple tag
<Tag>Basic Tag</Tag>

// With variant
<Tag variant="primary">Primary Tag</Tag>

// With size
<Tag size="lg" variant="success">Large Success Tag</Tag>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | **Required.** The content to display inside the tag |
| `variant` | `TagVariant` | `"default"` | The visual style variant of the tag |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | The size of the tag |
| `rounded` | `boolean` | `false` | Whether the tag should have rounded corners |
| `clickable` | `boolean` | `false` | Whether the tag should be clickable |
| `dismissible` | `boolean` | `false` | Whether the tag should be dismissible |
| `icon` | `React.ReactNode` | - | Icon component to display |
| `iconPosition` | `"left" \| "right"` | `"left"` | Position of the icon relative to text |
| `showDefaultIcon` | `boolean` | `false` | Whether to show a default tag icon |
| `onDismiss` | `() => void` | - | Callback when tag is dismissed |
| `onClick` | `(e: React.MouseEvent) => void` | - | Click handler for clickable tags |
| `disabled` | `boolean` | `false` | Whether the tag is disabled |
| `loading` | `boolean` | `false` | Whether the tag is in loading state |
| `pressed` | `boolean` | `false` | Whether the tag is in pressed/active state |
| `maxWidth` | `string \| number` | - | Maximum width of the tag |
| `truncate` | `boolean` | `false` | Whether to truncate long text |
| `className` | `string` | - | Additional CSS classes |

## Variants

The Tag component supports 9 different visual variants:

```tsx
<Tag variant="default">Default</Tag>
<Tag variant="primary">Primary</Tag>
<Tag variant="secondary">Secondary</Tag>
<Tag variant="success">Success</Tag>
<Tag variant="warning">Warning</Tag>
<Tag variant="error">Error</Tag>
<Tag variant="info">Info</Tag>
<Tag variant="outline">Outline</Tag>
<Tag variant="ghost">Ghost</Tag>
```

## Sizes

Three size options are available:

```tsx
<Tag size="sm" variant="primary">Small</Tag>
<Tag size="md" variant="primary">Medium</Tag>
<Tag size="lg" variant="primary">Large</Tag>
```

## Interactive Features

### Clickable Tags

Make tags interactive by adding the `clickable` prop:

```tsx
<Tag 
  variant="primary" 
  clickable 
  onClick={() => console.log('Tag clicked!')}
>
  Click Me
</Tag>
```

### Dismissible Tags

Add a dismiss button with the `dismissible` prop:

```tsx
<Tag 
  variant="warning" 
  dismissible 
  onDismiss={() => console.log('Tag dismissed!')}
>
  Dismissible Tag
</Tag>
```

### Loading States

Show loading indicators:

```tsx
<Tag variant="info" loading>Processing...</Tag>
```

### Pressed State

Control the pressed/active state of tags:

```tsx
<Tag variant="primary" pressed>Pressed Tag</Tag>
```

The pressed state makes tags appear bolder with deeper shadows and slightly larger size.

## Icon Support

### Custom Icons

```tsx
import { FaUser, FaCheck } from 'react-icons/fa';

<Tag variant="primary" icon={<FaUser />}>User</Tag>
<Tag variant="success" icon={<FaCheck />} iconPosition="right">Verified</Tag>
```

### Default Icon

Show a default tag icon when no custom icon is provided:

```tsx
<Tag variant="secondary" showDefaultIcon>Default Icon</Tag>
```

## Advanced Features

### Rounded Corners

```tsx
<Tag variant="success" rounded>Rounded Tag</Tag>
```

### Truncation

Handle long text with truncation:

```tsx
<Tag variant="primary" maxWidth={120} truncate>
  Very Long Tag Text That Will Be Truncated
</Tag>
```

### Disabled State

```tsx
<Tag variant="primary" disabled>Disabled Tag</Tag>
```

## Accessibility

The Tag component follows WCAG guidelines and includes:

- **Keyboard Navigation**: Full support for Tab, Enter, and Space keys
- **ARIA Labels**: Proper labeling for dismissible tags
- **Focus Management**: Visible focus rings and proper focus order
- **Screen Reader Support**: Semantic HTML and proper roles
- **High Contrast**: Color schemes that meet accessibility standards

### Keyboard Usage

- **Tab**: Navigate between interactive tags
- **Enter/Space**: Activate clickable tags or dismiss dismissible tags
- **Escape**: Close dismissible tags (if implemented in parent component)

## Styling

The component uses Tailwind CSS classes and can be customized through:

- **CSS Variables**: Override default colors and spacing
- **Tailwind Classes**: Use the `className` prop for custom styling
- **CSS Modules**: Import and override component styles

### Custom Styling Example

```tsx
<Tag 
  variant="primary" 
  className="bg-purple-100 text-purple-800 border-purple-300"
>
  Custom Styled Tag
</Tag>
```

## Examples

### Basic Tag Collection

```tsx
<div className="flex flex-wrap gap-2">
  <Tag variant="primary">React</Tag>
  <Tag variant="secondary">TypeScript</Tag>
  <Tag variant="success">Tailwind CSS</Tag>
  <Tag variant="warning">JavaScript</Tag>
</div>
```

### Interactive Tag List

```tsx
const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);

<div className="flex flex-wrap gap-2">
  {tags.map((tag, index) => (
    <Tag
      key={index}
      variant="primary"
      dismissible
      onDismiss={() => setTags(tags.filter((_, i) => i !== index))}
    >
      {tag}
    </Tag>
  ))}
</div>
```

### Tag with Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

<Tag 
  variant="info" 
  loading={isLoading}
  clickable
  onClick={() => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => setIsLoading(false), 2000);
  }}
>
  {isLoading ? 'Processing...' : 'Click to Process'}
</Tag>
```

## Best Practices

1. **Use Semantic Variants**: Choose variants that match the content meaning
2. **Limit Tag Count**: Avoid overwhelming users with too many tags
3. **Provide Clear Actions**: Make clickable tags' purpose obvious
4. **Handle Dismissal**: Always provide a way to remove dismissible tags
5. **Accessibility First**: Ensure tags are keyboard navigable and screen reader friendly

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

The component is optimized for performance with:

- **Tree Shaking**: Only used variants are included in the bundle
- **Memoization**: Efficient re-renders with React.memo
- **CSS-in-JS**: Minimal runtime overhead
- **Bundle Size**: Small footprint with class-variance-authority

## Contributing

When contributing to the Tag component:

1. Maintain accessibility standards
2. Add comprehensive tests for new features
3. Update documentation and examples
4. Follow the existing code style and patterns
5. Test across different browsers and devices

## License

This component is part of the component library and follows the same license terms.
