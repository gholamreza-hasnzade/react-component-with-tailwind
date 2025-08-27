import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Rating } from './rating';
import { HiHeart, HiFire } from 'react-icons/hi2';
import { HiThumbUp } from 'react-icons/hi';

const meta: Meta<typeof Rating> = {
  title: 'Atoms/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible and accessible rating component with multiple variants, sizes, and interactive modes. Supports both controlled and uncontrolled usage, custom icons, half-star ratings, and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Current rating value (controlled mode)',
    },
    defaultValue: {
      control: { type: 'number', min: 0, max: 10, step: 0.5 },
      description: 'Default rating value (uncontrolled mode)',
    },
    max: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Maximum rating value',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the rating stars',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline', 'gradient'],
      description: 'Visual variant/style',
    },
    readOnly: {
      control: { type: 'select' },
      options: [false, true, 'hover', 'always'],
      description: 'Whether rating is read-only',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Whether to show rating value text',
    },
    showCount: {
      control: { type: 'boolean' },
      description: 'Whether to show rating count',
    },
    allowHalf: {
      control: { type: 'boolean' },
      description: 'Whether to allow half-star ratings',
    },
    allowClear: {
      control: { type: 'boolean' },
      description: 'Whether to allow clearing rating by clicking again',
    },
    onChange: {
      action: 'rating changed',
      description: 'Callback when rating changes',
    },
    onHover: {
      action: 'rating hovered',
      description: 'Callback when rating is hovered',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Rating Story
export const Basic: Story = {
  args: {
    defaultValue: 3,
    showValue: true,
  },
};

// Different Sizes Story
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Small Size</h3>
        <Rating size="sm" defaultValue={3} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Medium Size</h3>
        <Rating size="md" defaultValue={3} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Large Size</h3>
        <Rating size="lg" defaultValue={3} showValue={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Rating component comes in three sizes: small, medium, and large. Each size has appropriate spacing and icon dimensions.',
      },
    },
  },
};

// Visual Variants Story
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Default Variant</h3>
        <Rating variant="default" defaultValue={4} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Filled Variant</h3>
        <Rating variant="filled" defaultValue={4} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Outline Variant</h3>
        <Rating variant="outline" defaultValue={4} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Gradient Variant</h3>
        <Rating variant="gradient" defaultValue={4} showValue={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Four visual variants available: default (amber stars), filled (solid amber), outline (bordered), and gradient (amber to orange gradient).',
      },
    },
  },
};

// Half Star Ratings Story
export const HalfStarRatings: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Allow Half Stars</h3>
        <Rating 
          defaultValue={3.5} 
          allowHalf={true} 
          showValue={true}
          onChange={(rating) => console.log('Half star rating:', rating)}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Read-only Half Stars</h3>
        <Rating 
          value={4.7} 
          allowHalf={true} 
          readOnly={true} 
          showValue={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Enable half-star ratings for more precise rating values. Useful for displaying decimal ratings or allowing users to provide more nuanced feedback.',
      },
    },
  },
};

// Custom Icons Story
export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Heart Rating</h3>
        <Rating 
          defaultValue={4} 
          filledIcon={<HiHeart className="w-5 h-5 text-red-500" />}
          emptyIcon={<HiHeart className="w-5 h-5 text-gray-300" />}
          showValue={true}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Thumb Rating</h3>
        <Rating 
          defaultValue={3} 
          filledIcon={<HiThumbUp className="w-5 h-5 text-green-500" />}
          emptyIcon={<HiThumbUp className="w-5 h-5 text-gray-300" />}
          showValue={true}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Fire Rating</h3>
        <Rating 
          defaultValue={5} 
          filledIcon={<HiFire className="w-5 h-5 text-orange-500" />}
          emptyIcon={<HiFire className="w-5 h-5 text-gray-300" />}
          showValue={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize the rating icons to match your design theme. Use any React icon or custom SVG for both filled and empty states.',
      },
    },
  },
};

// Controlled Rating Story
export const Controlled: Story = {
  render: () => {
    const [rating, setRating] = useState(3);
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">External Control</h3>
          <Rating 
            value={rating} 
            onChange={setRating}
            showValue={true}
          />
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setRating(1)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set to 1
          </button>
          <button
            onClick={() => setRating(3)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set to 3
          </button>
          <button
            onClick={() => setRating(5)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set to 5
          </button>
        </div>
        
        <p className="text-sm text-gray-600">
          Current controlled rating: {rating}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Use controlled mode when you need to manage the rating state externally. The component will update based on the `value` prop and call `onChange` when the user interacts with it.',
      },
    },
  },
};

// Read-only Ratings Story
export const ReadOnly: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Always Read-only</h3>
        <Rating 
          value={4.5} 
          readOnly={true} 
          showValue={true}
          showCount={true}
          totalRatings={127}
        />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Hover Preview Only</h3>
        <Rating 
          defaultValue={2} 
          readOnly="hover"
          showValue={true}
        />
        <p className="text-sm text-gray-500 mt-2">
          Hover over stars to see preview, but cannot change rating
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three read-only modes: `true` (completely static), `"hover"` (shows preview on hover), and `"always"` (no hover effects).',
      },
    },
  },
};

// Different Max Values Story
export const MaxValues: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">3 Stars Max</h3>
        <Rating max={3} defaultValue={2} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">7 Stars Max</h3>
        <Rating max={7} defaultValue={5} showValue={true} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">10 Stars Max</h3>
        <Rating max={10} defaultValue={7} showValue={true} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customize the maximum rating value. Default is 5 stars, but you can set any positive integer value.',
      },
    },
  },
};

// Interactive Features Story
export const InteractiveFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Hover Effects</h3>
        <Rating 
          defaultValue={3} 
          onHover={(rating) => console.log('Hovering:', rating)}
          showValue={true}
        />
        <p className="text-sm text-gray-500 mt-2">
          Hover over stars to see preview and check console for hover events
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Clear Rating</h3>
        <Rating 
          defaultValue={4} 
          allowClear={true}
          showValue={true}
        />
        <p className="text-sm text-gray-500 mt-2">
          Click the same rating again to clear it (when allowClear is true)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive features include hover preview, click to clear, and smooth animations. The component provides callbacks for all user interactions.',
      },
    },
  },
};

// Accessibility Story
export const Accessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Keyboard Navigation</h3>
        <Rating 
          defaultValue={3} 
          showValue={true}
        />
        <p className="text-sm text-gray-500 mt-2">
          Use Tab to focus, Enter/Space to select, Arrow keys to navigate
        </p>
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-3">Screen Reader Support</h3>
        <Rating 
          value={4} 
          readOnly={true}
          showValue={true}
          showCount={true}
          totalRatings={89}
        />
        <p className="text-sm text-gray-500 mt-2">
          Proper ARIA labels and roles for screen readers
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full accessibility support with keyboard navigation, ARIA attributes, and screen reader compatibility. Each star has descriptive labels and the component announces current rating values.',
      },
    },
  },
};

// Playground Story
export const Playground: Story = {
  args: {
    defaultValue: 3,
    max: 5,
    size: 'md',
    variant: 'default',
    readOnly: false,
    showValue: true,
    showCount: false,
    allowHalf: false,
    allowClear: true,
    totalRatings: 50,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to test all Rating component props and see how they affect the component behavior and appearance.',
      },
    },
  },
};
