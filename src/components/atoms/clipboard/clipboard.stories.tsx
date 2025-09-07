import type { Meta, StoryObj } from '@storybook/react-vite';
import { Clipboard } from './clipboard';
import React from 'react';

const meta: Meta<typeof Clipboard> = {
  title: 'Components/Atoms/Clipboard',
  component: Clipboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile clipboard component that allows users to copy text to their clipboard. Features multiple variants, colors, sizes, toast notifications, and accessibility support.',
      },
    },
  },
  argTypes: {
    text: {
      control: { type: 'text' },
      description: 'The text to be copied to clipboard',
    },
    variant: {
      control: { type: 'select' },
      options: ['contained', 'outlined', 'text'],
      description: 'The visual style variant of the clipboard button',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'error', 'warning', 'info'],
      description: 'The color theme of the clipboard button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'icon'],
      description: 'The size of the clipboard button',
    },
    rounded: {
      control: { type: 'select' },
      options: ['default', 'full', 'lg', 'xl', 'none'],
      description: 'The border radius of the clipboard button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the clipboard button',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Makes the clipboard button take full width of its container',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Renders only the icon without text',
    },
    showIcon: {
      control: { type: 'boolean' },
      description: 'Shows or hides the copy/copied icon',
    },
    showText: {
      control: { type: 'boolean' },
      description: 'Shows or hides the button text',
    },
    copyText: {
      control: { type: 'text' },
      description: 'Text shown before copying',
    },
    copiedText: {
      control: { type: 'text' },
      description: 'Text shown after copying',
    },
    showToast: {
      control: { type: 'boolean' },
      description: 'Shows toast notification after copying',
    },
    toastPosition: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of the toast notification',
    },
    toastDuration: {
      control: { type: 'number', min: 0, max: 5000, step: 100 },
      description: 'Duration of the toast notification in milliseconds',
    },
    loadingText: {
      control: { type: 'text' },
      description: 'Text shown during loading state',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the icon',
    },
    minDisplayTime: {
      control: { type: 'number', min: 0, max: 3000, step: 100 },
      description: 'Minimum time to display the copied state',
    },
    children: {
      control: { type: 'text' },
      description: 'Additional content to display in the button',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    text: 'Hello, World!',
  },
};

export const WithCustomText: Story = {
  args: {
    text: 'This is a custom text to copy',
    copyText: 'Copy Text',
    copiedText: 'Text Copied!',
  },
};

// Variant Stories
export const Contained: Story = {
  args: {
    text: 'Contained Clipboard',
    variant: 'contained',
    color: 'primary',
  },
};

export const Outlined: Story = {
  args: {
    text: 'Outlined Clipboard',
    variant: 'outlined',
    color: 'primary',
  },
};

export const Text: Story = {
  args: {
    text: 'Text Clipboard',
    variant: 'text',
    color: 'primary',
  },
};

// Color Stories
export const Primary: Story = {
  args: {
    text: 'Primary Color',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Color',
    color: 'secondary',
  },
};

export const Success: Story = {
  args: {
    text: 'Success Color',
    color: 'success',
  },
};

export const Error: Story = {
  args: {
    text: 'Error Color',
    color: 'error',
  },
};

export const Warning: Story = {
  args: {
    text: 'Warning Color',
    color: 'warning',
  },
};

export const Info: Story = {
  args: {
    text: 'Info Color',
    color: 'info',
  },
};

// Size Stories
export const Small: Story = {
  args: {
    text: 'Small Size',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    text: 'Medium Size',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    text: 'Large Size',
    size: 'lg',
  },
};

export const IconSize: Story = {
  args: {
    text: 'Icon Size',
    size: 'icon',
    iconOnly: true,
  },
};

// Rounded Stories
export const RoundedDefault: Story = {
  args: {
    text: 'Default Rounded',
    rounded: 'default',
  },
};

export const RoundedFull: Story = {
  args: {
    text: 'Fully Rounded',
    rounded: 'full',
  },
};

export const RoundedLarge: Story = {
  args: {
    text: 'Large Rounded',
    rounded: 'lg',
  },
};

export const RoundedExtraLarge: Story = {
  args: {
    text: 'Extra Large Rounded',
    rounded: 'xl',
  },
};

export const RoundedNone: Story = {
  args: {
    text: 'No Rounded',
    rounded: 'none',
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    text: 'Disabled Clipboard',
    disabled: true,
  },
};

export const EmptyText: Story = {
  args: {
    text: '',
    copyText: 'Copy Empty',
  },
};

export const WhitespaceText: Story = {
  args: {
    text: '   ',
    copyText: 'Copy Whitespace',
  },
};

// Icon and Text Visibility Stories
export const IconOnly: Story = {
  args: {
    text: 'Icon Only',
    iconOnly: true,
    showIcon: true,
    showText: false,
  },
};

export const TextOnly: Story = {
  args: {
    text: 'Text Only',
    showIcon: false,
    showText: true,
  },
};

export const NoIconNoText: Story = {
  args: {
    text: 'No Icon No Text',
    showIcon: false,
    showText: false,
  },
};

// Toast Position Stories
export const ToastTop: Story = {
  args: {
    text: 'Toast Top',
    toastPosition: 'top',
  },
};

export const ToastBottom: Story = {
  args: {
    text: 'Toast Bottom',
    toastPosition: 'bottom',
  },
};

export const ToastLeft: Story = {
  args: {
    text: 'Toast Left',
    toastPosition: 'left',
  },
};

export const ToastRight: Story = {
  args: {
    text: 'Toast Right',
    toastPosition: 'right',
  },
};

export const ToastTopLeft: Story = {
  args: {
    text: 'Toast Top Left',
    toastPosition: 'top-left',
  },
};

export const ToastTopRight: Story = {
  args: {
    text: 'Toast Top Right',
    toastPosition: 'top-right',
  },
};

export const ToastBottomLeft: Story = {
  args: {
    text: 'Toast Bottom Left',
    toastPosition: 'bottom-left',
  },
};

export const ToastBottomRight: Story = {
  args: {
    text: 'Toast Bottom Right',
    toastPosition: 'bottom-right',
  },
};

// Toast Duration Stories
export const ShortToast: Story = {
  args: {
    text: 'Short Toast (500ms)',
    toastDuration: 500,
  },
};

export const LongToast: Story = {
  args: {
    text: 'Long Toast (5000ms)',
    toastDuration: 5000,
  },
};

// Icon Size Stories
export const SmallIcon: Story = {
  args: {
    text: 'Small Icon',
    iconSize: 'sm',
  },
};

export const MediumIcon: Story = {
  args: {
    text: 'Medium Icon',
    iconSize: 'md',
  },
};

export const LargeIcon: Story = {
  args: {
    text: 'Large Icon',
    iconSize: 'lg',
  },
};

// Full Width Story
export const FullWidth: Story = {
  args: {
    text: 'Full Width Clipboard',
    fullWidth: true,
  },
  parameters: {
    layout: 'padded',
  },
};

// No Toast Story
export const NoToast: Story = {
  args: {
    text: 'No Toast Notification',
    showToast: false,
  },
};

// Custom Loading Text Story
export const CustomLoadingText: Story = {
  args: {
    text: 'Custom Loading Text',
    loadingText: 'Copying to clipboard...',
  },
};

// Comprehensive Examples
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Contained Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard text="Primary" variant="contained" color="primary" />
          <Clipboard text="Secondary" variant="contained" color="secondary" />
          <Clipboard text="Success" variant="contained" color="success" />
          <Clipboard text="Error" variant="contained" color="error" />
          <Clipboard text="Warning" variant="contained" color="warning" />
          <Clipboard text="Info" variant="contained" color="info" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Outlined Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard text="Primary" variant="outlined" color="primary" />
          <Clipboard text="Secondary" variant="outlined" color="secondary" />
          <Clipboard text="Success" variant="outlined" color="success" />
          <Clipboard text="Error" variant="outlined" color="error" />
          <Clipboard text="Warning" variant="outlined" color="warning" />
          <Clipboard text="Info" variant="outlined" color="info" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Text Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard text="Primary" variant="text" color="primary" />
          <Clipboard text="Secondary" variant="text" color="secondary" />
          <Clipboard text="Success" variant="text" color="success" />
          <Clipboard text="Error" variant="text" color="error" />
          <Clipboard text="Warning" variant="text" color="warning" />
          <Clipboard text="Info" variant="text" color="info" />
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
          <Clipboard text="Small" size="sm" />
          <Clipboard text="Medium" size="md" />
          <Clipboard text="Large" size="lg" />
          <Clipboard text="Icon" size="icon" iconOnly />
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
          <Clipboard text="None" rounded="none" />
          <Clipboard text="Default" rounded="default" />
          <Clipboard text="Large" rounded="lg" />
          <Clipboard text="Extra Large" rounded="xl" />
          <Clipboard text="Full" rounded="full" />
        </div>
      </div>
    </div>
  ),
};

export const AllToastPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Toast Positions</h3>
        <div className="grid grid-cols-2 gap-4">
          <Clipboard text="Top" toastPosition="top" />
          <Clipboard text="Bottom" toastPosition="bottom" />
          <Clipboard text="Left" toastPosition="left" />
          <Clipboard text="Right" toastPosition="right" />
          <Clipboard text="Top Left" toastPosition="top-left" />
          <Clipboard text="Top Right" toastPosition="top-right" />
          <Clipboard text="Bottom Left" toastPosition="bottom-left" />
          <Clipboard text="Bottom Right" toastPosition="bottom-right" />
        </div>
      </div>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Icon Sizes</h3>
        <div className="flex items-center gap-4">
          <Clipboard text="Small Icon" iconSize="sm" />
          <Clipboard text="Medium Icon" iconSize="md" />
          <Clipboard text="Large Icon" iconSize="lg" />
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
          <Clipboard text="Disabled" disabled />
          <Clipboard text="Disabled Outlined" variant="outlined" disabled />
          <Clipboard text="Disabled Text" variant="text" disabled />
          <Clipboard text="Disabled Icon" iconOnly disabled />
        </div>
      </div>
    </div>
  ),
};

export const IconOnlyButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Icon Only Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard text="Copy" iconOnly />
          <Clipboard text="Copy" iconOnly size="sm" />
          <Clipboard text="Copy" iconOnly size="lg" />
          <Clipboard text="Copy" iconOnly rounded="full" />
        </div>
      </div>
    </div>
  ),
};

export const TextOnlyButtons: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Text Only Buttons</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard text="Copy Text" showIcon={false} />
          <Clipboard text="Copy Text" showIcon={false} variant="outlined" />
          <Clipboard text="Copy Text" showIcon={false} variant="text" />
        </div>
      </div>
    </div>
  ),
};

export const CustomTexts: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Custom Texts</h3>
        <div className="flex flex-wrap gap-2">
          <Clipboard 
            text="Custom Copy Text" 
            copyText="Click to Copy" 
            copiedText="Copied Successfully!" 
          />
          <Clipboard 
            text="Custom Loading" 
            loadingText="Please wait..." 
          />
          <Clipboard 
            text="Custom Copy Text" 
            copyText="📋 Copy" 
            copiedText="✅ Copied!" 
          />
        </div>
      </div>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    text: 'This is a very long text that should be copied to the clipboard. It contains multiple sentences and should demonstrate how the clipboard component handles longer content. The text should wrap properly and the button should remain functional.',
    copyText: 'Copy Long Text',
    copiedText: 'Long Text Copied!',
  },
  parameters: {
    layout: 'padded',
  },
};

export const SpecialCharacters: Story = {
  args: {
    text: 'Special chars: !@#$%^&*()_+-=[]{}|;:,.<>?/~`',
    copyText: 'Copy Special Chars',
    copiedText: 'Special Chars Copied!',
  },
};

export const MultilineText: Story = {
  args: {
    text: 'Line 1\nLine 2\nLine 3\nLine 4',
    copyText: 'Copy Multiline',
    copiedText: 'Multiline Copied!',
  },
};

export const JSONData: Story = {
  args: {
    text: JSON.stringify({ name: 'John Doe', age: 30, city: 'New York' }, null, 2),
    copyText: 'Copy JSON',
    copiedText: 'JSON Copied!',
  },
  parameters: {
    layout: 'padded',
  },
};

export const URL: Story = {
  args: {
    text: 'https://www.example.com/very/long/url/with/parameters?param1=value1&param2=value2',
    copyText: 'Copy URL',
    copiedText: 'URL Copied!',
  },
  parameters: {
    layout: 'padded',
  },
};

export const Email: Story = {
  args: {
    text: 'user@example.com',
    copyText: 'Copy Email',
    copiedText: 'Email Copied!',
  },
};

export const PhoneNumber: Story = {
  args: {
    text: '+1 (555) 123-4567',
    copyText: 'Copy Phone',
    copiedText: 'Phone Copied!',
  },
};

export const CodeSnippet: Story = {
  args: {
    text: 'const greeting = "Hello, World!";\nconsole.log(greeting);',
    copyText: 'Copy Code',
    copiedText: 'Code Copied!',
  },
  parameters: {
    layout: 'padded',
  },
};

// Interactive Story
export const Interactive: Story = {
  render: () => {
    const [copiedCount, setCopiedCount] = React.useState(0);
    const [lastCopiedText, setLastCopiedText] = React.useState('');
    
    const handleCopy = (text: string) => {
      setCopiedCount(prev => prev + 1);
      setLastCopiedText(text);
    };
    
    const handleError = (error: Error) => {
      console.error('Copy failed:', error);
    };
    
    return (
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg mb-2">Copied Count: {copiedCount}</p>
          <p className="text-sm text-gray-600 mb-4">Last Copied: {lastCopiedText || 'None'}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Clipboard 
            text="Interactive Copy 1" 
            onCopy={handleCopy}
            onError={handleError}
          />
          <Clipboard 
            text="Interactive Copy 2" 
            onCopy={handleCopy}
            onError={handleError}
            variant="outlined"
          />
          <Clipboard 
            text="Interactive Copy 3" 
            onCopy={handleCopy}
            onError={handleError}
            variant="text"
          />
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
          <Clipboard 
            text="Accessible Clipboard" 
            aria-label="Copy accessible text to clipboard"
          />
          <Clipboard 
            text="Disabled with reason" 
            disabled 
            aria-describedby="disabled-reason"
          />
          <p id="disabled-reason" className="text-sm text-gray-500">
            This clipboard is disabled for a reason
          </p>
        </div>
      </div>
    </div>
  ),
};

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">API Key</h3>
        <div className="flex items-center gap-2">
          <code className="px-2 py-1 bg-gray-100 rounded text-sm">
            sk-1234567890abcdef
          </code>
          <Clipboard 
            text="sk-1234567890abcdef" 
            copyText="Copy API Key"
            copiedText="API Key Copied!"
            size="sm"
            variant="outlined"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Share Link</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 truncate max-w-xs">
            https://example.com/share/abc123
          </span>
          <Clipboard 
            text="https://example.com/share/abc123" 
            copyText="Copy Link"
            copiedText="Link Copied!"
            size="sm"
            iconOnly
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Code Block</h3>
        <div className="relative">
          <pre className="bg-gray-900 text-white p-4 rounded-lg text-sm overflow-x-auto">
            <code>npm install react-clipboard</code>
          </pre>
          <Clipboard 
            text="npm install react-clipboard" 
            copyText="Copy Command"
            copiedText="Command Copied!"
            size="sm"
            className="absolute top-2 right-2"
          />
        </div>
      </div>
    </div>
  ),
};
