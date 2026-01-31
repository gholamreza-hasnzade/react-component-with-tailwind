import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { FaHome, FaDownload, FaHeart, FaStar, FaTrash, FaEdit, FaSave, FaPlus, FaMinus, FaSearch, FaUser, FaCog } from 'react-icons/fa';
import React from 'react';

const meta: Meta<typeof Button> = {
  title: 'Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, colors, sizes, and states. Supports loading states, icons, debouncing, and accessibility features.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
      description: 'The visual style variant of the button',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'The color theme of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the button',
    },
    rounded: {
      control: { type: 'select' },
      options: ['default', 'full', 'lg', 'xl', 'none'],
      description: 'The border radius of the button',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Shows a loading spinner and disables the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the button take full width of its container',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Renders only the icon without text',
    },
    
    tooltip: {
      control: { type: 'text' },
      description: 'Tooltip text shown on hover',
    },
    children: {
      control: { type: 'text' },
      description: 'Button text content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const WithText: Story = {
  args: {
    children: 'Click me',
    variant: 'contained',
    color: 'primary',
  },
};

// Variant Stories
export const Contained: Story = {
  args: {
    children: 'Contained Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    children: 'Text Button',
    variant: 'text',
    color: 'primary',
  },
};

// Color Stories
export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    color: 'info',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

// Rounded Stories
export const RoundedDefault: Story = {
  args: {
    children: 'Default Rounded',
    rounded: 'default',
  },
};

export const RoundedFull: Story = {
  args: {
    children: 'Fully Rounded',
    rounded: 'full',
  },
};

export const RoundedLarge: Story = {
  args: {
    children: 'Large Rounded',
    rounded: 'lg',
  },
};

export const RoundedExtraLarge: Story = {
  args: {
    children: 'Extra Large Rounded',
    rounded: 'xl',
  },
};

export const RoundedNone: Story = {
  args: {
    children: 'No Rounded',
    rounded: 'none',
  },
};

// State Stories
export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const LoadingDisabled: Story = {
  args: {
    children: 'Loading & Disabled',
    loading: true,
    disabled: true,
  },
};

// Icon Stories
export const WithStartIcon: Story = {
  args: {
    children: 'Download',
    startIcon: <FaDownload />,
  },
};

export const WithEndIcon: Story = {
  args: {
    children: 'Save',
    endIcon: <FaSave />,
  },
};

export const WithBothIcons: Story = {
  args: {
    children: 'Edit',
    startIcon: <FaEdit />,
    endIcon: <FaStar />,
  },
};

export const IconOnly: Story = {
  args: {
    startIcon: <FaHome />,
    iconOnly: true,
    tooltip: 'Go to Home',
  },
};

export const IconOnlyLarge: Story = {
  args: {
    startIcon: <FaCog />,
    iconOnly: true,
    size: 'lg',
    tooltip: 'Settings',
  },
};

// Full Width Story
export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// Debounce Story
// (debounce story removed)

// Tooltip Story
export const WithTooltip: Story = {
  args: {
    children: 'Hover for tooltip',
    tooltip: 'This is a helpful tooltip',
  },
};

// Comprehensive Examples
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Contained Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="contained" color="primary">Primary</Button>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="contained" color="success">Success</Button>
          <Button variant="contained" color="error">Error</Button>
          <Button variant="contained" color="warning">Warning</Button>
          <Button variant="contained" color="info">Info</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Outlined Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outlined" color="primary">Primary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="outlined" color="success">Success</Button>
          <Button variant="outlined" color="error">Error</Button>
          <Button variant="outlined" color="warning">Warning</Button>
          <Button variant="outlined" color="info">Info</Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Text Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="text" color="primary">Primary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
          <Button variant="text" color="success">Success</Button>
          <Button variant="text" color="error">Error</Button>
          <Button variant="text" color="warning">Warning</Button>
          <Button variant="text" color="info">Info</Button>
        </div>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Sizes</h3>
        <div className="flex items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" iconOnly startIcon={<FaUser />} />
        </div>
      </div>
    </div>
  ),
};

export const AllRounded: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Rounded Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Button rounded="none">None</Button>
          <Button rounded="default">Default</Button>
          <Button rounded="lg">Large</Button>
          <Button rounded="xl">Extra Large</Button>
          <Button rounded="full">Full</Button>
        </div>
      </div>
    </div>
  ),
};

export const IconButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Icon Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Button iconOnly startIcon={<FaHome />} tooltip="Home" />
          <Button iconOnly startIcon={<FaSearch />} tooltip="Search" />
          <Button iconOnly startIcon={<FaUser />} tooltip="Profile" />
          <Button iconOnly startIcon={<FaCog />} tooltip="Settings" />
          <Button iconOnly startIcon={<FaHeart />} tooltip="Like" />
          <Button iconOnly startIcon={<FaTrash />} color="error" tooltip="Delete" />
        </div>
      </div>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Loading States</h3>
        <div className="flex flex-wrap gap-2">
          <Button loading>Loading...</Button>
          <Button loading variant="outlined">Loading...</Button>
          <Button loading variant="text">Loading...</Button>
          <Button loading iconOnly startIcon={<FaSave />} />
        </div>
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Disabled States</h3>
        <div className="flex flex-wrap gap-2">
          <Button disabled>Disabled</Button>
          <Button disabled variant="outlined">Disabled</Button>
          <Button disabled variant="text">Disabled</Button>
          <Button disabled iconOnly startIcon={<FaHome />} />
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Buttons with Icons</h3>
        <div className="flex flex-wrap gap-2">
          <Button startIcon={<FaDownload />}>Download</Button>
          <Button endIcon={<FaStar />}>Favorite</Button>
          <Button startIcon={<FaEdit />} endIcon={<FaSave />}>Edit & Save</Button>
          <Button startIcon={<FaPlus />}>Add New</Button>
          <Button startIcon={<FaMinus />} color="error">Remove</Button>
        </div>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    
    const handleClick = () => {
      setLoading(true);
      setTimeout(() => {
        setCount(prev => prev + 1);
        setLoading(false);
      }, 1000);
    };
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-4">Count: {count}</p>
          <Button 
            onClick={handleClick} 
            loading={loading}
            startIcon={<FaPlus />}
          >
            {loading ? 'Loading...' : 'Increment'}
          </Button>
        </div>
      </div>
    );
  },
};

// Accessibility Story
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accessibility Features</h3>
        <div className="flex flex-wrap gap-2">
          <Button aria-label="Close dialog">×</Button>
          <Button tooltip="This button has a tooltip">Hover me</Button>
          <Button disabled aria-describedby="disabled-reason">Disabled Button</Button>
          <p id="disabled-reason" className="text-sm text-gray-500">This button is disabled for a reason</p>
        </div>
      </div>
    </div>
  ),
};
