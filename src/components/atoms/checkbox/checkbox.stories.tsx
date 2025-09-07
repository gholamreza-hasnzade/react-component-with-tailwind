import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with multiple color variants, error states, and accessibility features.',
      },
    },
  },
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
    onCheckedChange: {
      action: 'checked change',
      description: 'Callback when checkbox state changes',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the checkbox',
    },
    required: {
      control: 'boolean',
      description: 'Whether the checkbox is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'Color variant of the checkbox',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    dir: {
      control: 'select',
      options: ['ltr', 'rtl', 'auto'],
      description: 'Text direction for the checkbox',
    },
  },
  args: {
    id: 'checkbox-1',
    label: 'Accept terms and conditions',
    checked: false,
    required: false,
    disabled: false,
    color: 'primary',
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Stories
export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
    label: 'I agree to the terms *',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'This option is disabled',
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
    label: 'This option is disabled and checked',
  },
};

// Color Variants
export const Primary: Story = {
  args: {
    color: 'primary',
    label: 'Primary checkbox',
    checked: true,
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    label: 'Secondary checkbox',
    checked: true,
  },
};

export const Success: Story = {
  args: {
    color: 'success',
    label: 'Success checkbox',
    checked: true,
  },
};

export const Error: Story = {
  args: {
    color: 'error',
    label: 'Error checkbox',
    checked: true,
  },
};

export const Warning: Story = {
  args: {
    color: 'warning',
    label: 'Warning checkbox',
    checked: true,
  },
};

export const Info: Story = {
  args: {
    color: 'info',
    label: 'Info checkbox',
    checked: true,
  },
};

// States
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You will receive updates about new features and products',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
    required: true,
  },
};

export const WithErrorChecked: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
    required: true,
    checked: true,
  },
};

// Interactive Examples
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        id="interactive-checkbox"
        label="Click me to toggle"
        checked={checked}
        onCheckedChange={setChecked}
        helperText={checked ? 'Checkbox is checked!' : 'Checkbox is unchecked'}
      />
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [checkboxes, setCheckboxes] = useState({
      terms: false,
      newsletter: false,
      notifications: true,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setCheckboxes(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">Preferences</h3>
        <Checkbox
          id="terms"
          label="Accept terms and conditions"
          checked={checkboxes.terms}
          onCheckedChange={handleChange('terms')}
          required
        />
        <Checkbox
          id="newsletter"
          label="Subscribe to newsletter"
          checked={checkboxes.newsletter}
          onCheckedChange={handleChange('newsletter')}
          helperText="Get weekly updates about new features"
        />
        <Checkbox
          id="notifications"
          label="Enable push notifications"
          checked={checkboxes.notifications}
          onCheckedChange={handleChange('notifications')}
          helperText="Receive instant notifications"
        />
      </div>
    );
  },
};

// Form Examples
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      terms: false,
      newsletter: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: Record<string, string> = {};
      
      if (!formData.name) newErrors.name = 'Name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.terms) newErrors.terms = 'You must accept the terms';
      
      setErrors(newErrors);
      
      if (Object.keys(newErrors).length === 0) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <h3 className="text-lg font-semibold mb-4">Contact Form</h3>
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <Checkbox
          id="terms"
          label="I accept the terms and conditions"
          checked={formData.terms}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, terms: checked }))}
          error={errors.terms}
          required
        />

        <Checkbox
          id="newsletter"
          label="Subscribe to newsletter"
          checked={formData.newsletter}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, newsletter: checked }))}
          helperText="Get updates about new features and products"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    );
  },
};

// Accessibility Examples
export const AccessibilityExample: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Accessibility Features</h3>
      
      <Checkbox
        id="keyboard-nav"
        label="Keyboard navigable checkbox"
        helperText="This checkbox can be focused and activated with keyboard"
      />
      
      <Checkbox
        id="screen-reader"
        label="Screen reader friendly"
        helperText="Properly labeled for screen readers"
        checked={true}
      />
      
      <Checkbox
        id="error-state"
        label="Error state with ARIA"
        error="This field has an error"
        required
      />
    </div>
  ),
};

// RTL/LTR Support
export const RTLSupport: Story = {
  args: {
    label: 'موافق على الشروط والأحكام',
    dir: 'rtl',
    helperText: 'يجب الموافقة على الشروط للمتابعة',
  },
};

export const LTRSupport: Story = {
  args: {
    label: 'Accept terms and conditions',
    dir: 'ltr',
    helperText: 'You must accept the terms to continue',
  },
};

export const RTLWithError: Story = {
  args: {
    label: 'موافق على الشروط والأحكام',
    dir: 'rtl',
    error: 'يجب الموافقة على الشروط للمتابعة',
    required: true,
  },
};

export const RTLMultiple: Story = {
  render: () => {
    const [checkboxes, setCheckboxes] = useState({
      terms: false,
      newsletter: false,
      notifications: true,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setCheckboxes(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div className="space-y-4" dir="rtl">
        <h3 className="text-lg font-semibold mb-4 text-right">التفضيلات</h3>
        <Checkbox
          id="terms-rtl"
          label="موافق على الشروط والأحكام"
          checked={checkboxes.terms}
          onCheckedChange={handleChange('terms')}
          required
          dir="rtl"
        />
        <Checkbox
          id="newsletter-rtl"
          label="الاشتراك في النشرة الإخبارية"
          checked={checkboxes.newsletter}
          onCheckedChange={handleChange('newsletter')}
          helperText="ستتلقى تحديثات أسبوعية حول الميزات الجديدة"
          dir="rtl"
        />
        <Checkbox
          id="notifications-rtl"
          label="تفعيل الإشعارات الفورية"
          checked={checkboxes.notifications}
          onCheckedChange={handleChange('notifications')}
          helperText="تلقي الإشعارات الفورية"
          dir="rtl"
        />
      </div>
    );
  },
};

export const DirectionComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">LTR (Left to Right)</h3>
        <div className="space-y-4">
          <Checkbox
            id="ltr-1"
            label="Accept terms and conditions"
            checked={true}
            dir="ltr"
            helperText="You must accept the terms to continue"
          />
          <Checkbox
            id="ltr-2"
            label="Subscribe to newsletter"
            checked={false}
            dir="ltr"
            helperText="Get weekly updates about new features"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">RTL (Right to Left)</h3>
        <div className="space-y-4">
          <Checkbox
            id="rtl-1"
            label="موافق على الشروط والأحكام"
            checked={true}
            dir="rtl"
            helperText="يجب الموافقة على الشروط للمتابعة"
          />
          <Checkbox
            id="rtl-2"
            label="الاشتراك في النشرة الإخبارية"
            checked={false}
            dir="rtl"
            helperText="ستتلقى تحديثات أسبوعية حول الميزات الجديدة"
          />
        </div>
      </div>
    </div>
  ),
};

// All Colors
export const AllColors: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">All Color Variants</h3>
      {(['primary', 'secondary', 'success', 'error', 'warning', 'info'] as const).map((color) => (
        <Checkbox
          key={color}
          id={`${color}-checkbox`}
          label={`${color.charAt(0).toUpperCase() + color.slice(1)} checkbox`}
          color={color}
          checked={true}
        />
      ))}
    </div>
  ),
};
