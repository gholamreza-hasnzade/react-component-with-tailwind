import type { Meta, StoryObj } from '@storybook/react-vite';
import { TimePicker } from './timePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Atoms/TimePicker',
  component: TimePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive time picker component with support for 12/24-hour formats, seconds, typing support, optional popover, and consistent color palette system.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'date' },
      description: 'The current time value (controlled)',
    },
    defaultValue: {
      control: { type: 'date' },
      description: 'Default time value (uncontrolled)',
    },
    label: {
      control: { type: 'text' },
      description: 'Label for the time picker',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the picker is disabled',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: 'Whether the picker is read-only',
    },
    showSeconds: {
      control: { type: 'boolean' },
      description: 'Whether to show seconds',
    },
    use12Hour: {
      control: { type: 'boolean' },
      description: 'Whether to use 12-hour format',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the component',
    },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
      description: 'Visual variant',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color theme',
    },
    showPopover: {
      control: { type: 'boolean' },
      description: 'Whether to show the popover picker interface',
    },
    error: {
      control: { type: 'boolean' },
      description: 'Error state',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when time changes',
    },
    onOpenChange: {
      action: 'open changed',
      description: 'Callback when open state changes',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select Time',
    placeholder: 'Type time (e.g., 2:30 PM) or click icon to pick',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Meeting Time',
    placeholder: 'Select meeting time',
  },
};

export const TwentyFourHour: Story = {
  args: {
    label: '24-Hour Time',
    use12Hour: false,
    placeholder: 'Type time in 24-hour format (e.g., 14:30)',
  },
};

export const WithSeconds: Story = {
  args: {
    label: 'Time with Seconds',
    showSeconds: true,
    placeholder: 'Include seconds (e.g., 2:30:45 PM)',
  },
};

export const TypeOnly: Story = {
  args: {
    label: 'Type Only - No Popover',
    showPopover: false,
    placeholder: 'Type time only (e.g., 2:30 PM)',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Time Picker',
    disabled: true,
    placeholder: 'This picker is disabled',
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Read-Only Time Picker',
    readOnly: true,
    value: new Date(),
    placeholder: 'This picker is read-only',
  },
};

export const WithError: Story = {
  args: {
    label: 'Time with Error',
    error: true,
    errorMessage: 'Please select a valid time',
    placeholder: 'This has an error',
  },
};

export const Controlled: Story = {
  args: {
    label: 'Controlled Time Picker',
    value: new Date('2024-01-01T14:30:00'),
    placeholder: 'Controlled value',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    label: 'Custom Placeholder',
    placeholder: 'Enter your preferred time here',
  },
};

export const NoLabel: Story = {
  args: {
    placeholder: 'Time picker without label',
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Default Time',
    defaultValue: new Date('2024-01-01T09:00:00'),
    placeholder: 'Has default value',
  },
};

export const CompactPopover: Story = {
  args: {
    label: 'Compact Popover',
    placeholder: 'Click icon for compact picker interface',
  },
  parameters: {
    docs: {
      description: {
        story: 'This demonstrates the new compact popover design that only appears when clicking the clock icon.',
      },
    },
  },
};

// Color Palette Stories
export const PrimaryColor: Story = {
  args: {
    label: 'Primary Color',
    color: 'primary',
    placeholder: 'Primary color theme',
  },
};

export const SecondaryColor: Story = {
  args: {
    label: 'Secondary Color',
    color: 'secondary',
    placeholder: 'Secondary color theme',
  },
};

export const SuccessColor: Story = {
  args: {
    label: 'Success Color',
    color: 'success',
    placeholder: 'Success color theme',
  },
};

export const ErrorColor: Story = {
  args: {
    label: 'Error Color',
    color: 'error',
    placeholder: 'Error color theme',
  },
};

export const WarningColor: Story = {
  args: {
    label: 'Warning Color',
    color: 'warning',
    placeholder: 'Warning color theme',
  },
};

export const InfoColor: Story = {
  args: {
    label: 'Info Color',
    color: 'info',
    placeholder: 'Info color theme',
  },
};

// Variant Stories
export const OutlinedVariant: Story = {
  args: {
    label: 'Outlined Variant',
    variant: 'outlined',
    placeholder: 'Outlined style (default)',
  },
};

export const ContainedVariant: Story = {
  args: {
    label: 'Contained Variant',
    variant: 'contained',
    placeholder: 'Contained style',
  },
};

export const TextVariant: Story = {
  args: {
    label: 'Text Variant',
    variant: 'text',
    placeholder: 'Text style',
  },
};

// Size Stories
export const SmallSize: Story = {
  args: {
    label: 'Small Size',
    size: 'sm',
    placeholder: 'Small size',
  },
};

export const MediumSize: Story = {
  args: {
    label: 'Medium Size',
    size: 'md',
    placeholder: 'Medium size (default)',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Size',
    size: 'lg',
    placeholder: 'Large size',
  },
};
