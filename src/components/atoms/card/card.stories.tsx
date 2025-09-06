import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardImage, CardBadge, CardElevated, CardInteractive } from './card';
import { Button } from '../button/button';
import { FaHeart, FaShare, FaBookmark, FaStar, FaUser, FaCalendar, FaMapMarkerAlt } from 'react-icons/fa';

const meta: Meta<typeof Card> = {
  title: 'Components/Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with multiple variants, sizes, and sub-components. Supports RTL, interactive states, and various styling options.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined', 'filled', 'gradient', 'glass', 'flat'],
      description: 'The visual style variant of the card',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'The padding size of the card',
    },
    interactive: {
      control: { type: 'boolean' },
      description: 'Makes the card interactive with hover effects',
    },
    animated: {
      control: { type: 'boolean' },
      description: 'Enables animations and transitions',
    },
    dir: {
      control: { type: 'select' },
      options: ['ltr', 'rtl', 'auto'],
      description: 'Text direction for the card',
    },
    asChild: {
      control: { type: 'boolean' },
      description: 'Renders the card as a child component using Slot',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Stories
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>This is a card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the card content area where you can put any content.</p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </>
    ),
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop" alt="Sample image" />
        <CardHeader>
          <CardTitle>Card with Image</CardTitle>
          <CardDescription>This card includes an image at the top</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content goes here with the image above.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outlined">Learn More</Button>
        </CardFooter>
      </>
    ),
  },
};

// Variant Stories
export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>This card has elevated shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Elevated cards have more prominent shadows and hover effects.</p>
        </CardContent>
        <CardFooter>
          <Button>Get Started</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <CardTitle>Outlined Card</CardTitle>
          <CardDescription>This card has a thick border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Outlined cards have a prominent border instead of shadow.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outlined">View Details</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    children: (
      <>
        <CardHeader>
          <CardTitle>Filled Card</CardTitle>
          <CardDescription>This card has a filled background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Filled cards have a muted background color.</p>
        </CardContent>
        <CardFooter>
          <Button variant="text">Learn More</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    children: (
      <>
        <CardHeader>
          <CardTitle>Gradient Card</CardTitle>
          <CardDescription>This card has a gradient background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Gradient cards have a beautiful gradient background.</p>
        </CardContent>
        <CardFooter>
          <Button>Explore</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>This card has a glass morphism effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Glass cards have a translucent background with blur effect.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outlined">Discover</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Flat: Story = {
  args: {
    variant: 'flat',
    children: (
      <>
        <CardHeader>
          <CardTitle>Flat Card</CardTitle>
          <CardDescription>This card has no shadow or border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Flat cards have a minimal design without shadows.</p>
        </CardContent>
        <CardFooter>
          <Button variant="text">Read More</Button>
        </CardFooter>
      </>
    ),
  },
};

// Size Stories
export const Small: Story = {
  args: {
    size: 'sm',
    children: (
      <>
        <CardHeader>
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact card with small padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Small cards are perfect for compact layouts.</p>
        </CardContent>
      </>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Medium Card</CardTitle>
          <CardDescription>Standard card with medium padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Medium cards are the default size for most use cases.</p>
        </CardContent>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: (
      <>
        <CardHeader>
          <CardTitle>Large Card</CardTitle>
          <CardDescription>Spacious card with large padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Large cards provide more breathing room for content.</p>
        </CardContent>
      </>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: (
      <>
        <CardHeader>
          <CardTitle>Extra Large Card</CardTitle>
          <CardDescription>Very spacious card with extra large padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Extra large cards are perfect for featured content or hero sections.</p>
        </CardContent>
      </>
    ),
  },
};

// Interactive Story
export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <>
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover over this card to see the effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Interactive cards have hover animations and cursor pointer.</p>
        </CardContent>
        <CardFooter>
          <Button>Click Me</Button>
        </CardFooter>
      </>
    ),
  },
};

// Badge Stories
export const WithBadge: Story = {
  args: {
    children: (
      <>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop" alt="Sample image">
          <CardBadge variant="success">New</CardBadge>
        </CardImage>
        <CardHeader>
          <CardTitle>Card with Badge</CardTitle>
          <CardDescription>This card has a badge overlay</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Badges can be used to highlight important information.</p>
        </CardContent>
        <CardFooter>
          <Button>View Item</Button>
        </CardFooter>
      </>
    ),
  },
};

export const BadgeVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=150&fit=crop" alt="Sample">
          <CardBadge variant="default">Default</CardBadge>
        </CardImage>
        <CardContent className="pt-4">
          <CardTitle className="text-lg">Default Badge</CardTitle>
        </CardContent>
      </Card>
      
      <Card>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=150&fit=crop" alt="Sample">
          <CardBadge variant="success">Success</CardBadge>
        </CardImage>
        <CardContent className="pt-4">
          <CardTitle className="text-lg">Success Badge</CardTitle>
        </CardContent>
      </Card>
      
      <Card>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=150&fit=crop" alt="Sample">
          <CardBadge variant="warning">Warning</CardBadge>
        </CardImage>
        <CardContent className="pt-4">
          <CardTitle className="text-lg">Warning Badge</CardTitle>
        </CardContent>
      </Card>
      
      <Card>
        <CardImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=150&fit=crop" alt="Sample">
          <CardBadge variant="destructive">Error</CardBadge>
        </CardImage>
        <CardContent className="pt-4">
          <CardTitle className="text-lg">Error Badge</CardTitle>
        </CardContent>
      </Card>
    </div>
  ),
};

// RTL Support
export const RTLSupport: Story = {
  args: {
    dir: 'rtl',
    children: (
      <>
        <CardHeader>
          <CardTitle>بطاقة باللغة العربية</CardTitle>
          <CardDescription>هذه بطاقة تدعم النص من اليمين إلى اليسار</CardDescription>
        </CardHeader>
        <CardContent>
          <p>هذا النص يظهر بشكل صحيح في وضع RTL.</p>
        </CardContent>
        <CardFooter>
          <Button>إجراء</Button>
        </CardFooter>
      </>
    ),
  },
};

// AsChild Story
export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <article>
        <CardHeader>
          <CardTitle>Article Card</CardTitle>
          <CardDescription>This card is rendered as an article element</CardDescription>
        </CardHeader>
        <CardContent>
          <p>When asChild is true, the card renders as a Fragment and applies styles to its child.</p>
        </CardContent>
        <CardFooter>
          <Button>Read Article</Button>
        </CardFooter>
      </article>
    ),
  },
};

// Comprehensive Examples
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card variant="default">
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Default card with standard styling.</p>
        </CardContent>
      </Card>
      
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Card with shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Elevated card with prominent shadow.</p>
        </CardContent>
      </Card>
      
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Outlined</CardTitle>
          <CardDescription>Card with border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Outlined card with thick border.</p>
        </CardContent>
      </Card>
      
      <Card variant="filled">
        <CardHeader>
          <CardTitle>Filled</CardTitle>
          <CardDescription>Card with background</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Filled card with muted background.</p>
        </CardContent>
      </Card>
      
      <Card variant="gradient">
        <CardHeader>
          <CardTitle>Gradient</CardTitle>
          <CardDescription>Card with gradient</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Gradient card with beautiful background.</p>
        </CardContent>
      </Card>
      
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Glass</CardTitle>
          <CardDescription>Card with glass effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Glass card with translucent background.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Card size="sm">
        <CardHeader>
          <CardTitle>Small</CardTitle>
          <CardDescription>Compact padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Small card content.</p>
        </CardContent>
      </Card>
      
      <Card size="md">
        <CardHeader>
          <CardTitle>Medium</CardTitle>
          <CardDescription>Standard padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Medium card content.</p>
        </CardContent>
      </Card>
      
      <Card size="lg">
        <CardHeader>
          <CardTitle>Large</CardTitle>
          <CardDescription>Spacious padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Large card content.</p>
        </CardContent>
      </Card>
      
      <Card size="xl">
        <CardHeader>
          <CardTitle>Extra Large</CardTitle>
          <CardDescription>Very spacious padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Extra large card content.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Product Card Example
export const ProductCard: Story = {
  render: () => (
    <Card className="w-80" interactive>
      <CardImage src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=250&fit=crop" alt="Product">
        <CardBadge variant="success">Sale</CardBadge>
      </CardImage>
      <CardHeader>
        <CardTitle>Wireless Headphones</CardTitle>
        <CardDescription>Premium quality wireless headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex text-yellow-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
          <span className="text-sm text-muted-foreground">(4.8)</span>
        </div>
        <p className="text-2xl font-bold">$299.99</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outlined" size="sm">
          <FaHeart className="mr-2" />
          Wishlist
        </Button>
        <Button size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Blog Post Card Example
export const BlogPostCard: Story = {
  render: () => (
    <Card className="w-96" interactive>
      <CardImage src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&h=200&fit=crop" alt="Blog post" />
      <CardHeader>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
          <FaUser className="h-4 w-4" />
          <span>John Doe</span>
          <FaCalendar className="h-4 w-4 ml-4" />
          <span>Dec 15, 2023</span>
        </div>
        <CardTitle>How to Build Better React Components</CardTitle>
        <CardDescription>Learn the best practices for creating reusable and maintainable React components</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          In this comprehensive guide, we'll explore the key principles and patterns that make React components more effective...
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="text" size="sm">
          Read More
        </Button>
        <div className="flex space-x-2">
          <Button variant="text" size="sm">
            <FaShare className="h-4 w-4" />
          </Button>
          <Button variant="text" size="sm">
            <FaBookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  ),
};

// Event Card Example
export const EventCard: Story = {
  render: () => (
    <Card className="w-80" interactive>
      <CardImage src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=200&fit=crop" alt="Event" />
      <CardHeader>
        <CardBadge variant="warning">Upcoming</CardBadge>
        <CardTitle>Tech Conference 2024</CardTitle>
        <CardDescription>Join us for the biggest tech conference of the year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <FaCalendar className="h-4 w-4 text-muted-foreground" />
            <span>March 15-17, 2024</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FaMapMarkerAlt className="h-4 w-4 text-muted-foreground" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          Register Now
        </Button>
      </CardFooter>
    </Card>
  ),
};

// Convenience Component Stories
export const CardElevatedExample: Story = {
  render: () => (
    <CardElevated>
      <CardHeader>
        <CardTitle>Elevated Card Component</CardTitle>
        <CardDescription>Using the CardElevated convenience component</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the same as using Card with variant="elevated".</p>
      </CardContent>
    </CardElevated>
  ),
};

export const CardInteractiveExample: Story = {
  render: () => (
    <CardInteractive>
      <CardHeader>
        <CardTitle>Interactive Card Component</CardTitle>
        <CardDescription>Using the CardInteractive convenience component</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card has interactive hover effects enabled.</p>
      </CardContent>
    </CardInteractive>
  ),
};

// Animation Control
export const AnimationControl: Story = {
  render: () => (
    <div className="space-y-4">
      <Card animated={true}>
        <CardHeader>
          <CardTitle>Animated Card</CardTitle>
          <CardDescription>This card has animations enabled</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Hover over this card to see smooth transitions.</p>
        </CardContent>
      </Card>
      
      <Card animated={false}>
        <CardHeader>
          <CardTitle>Non-Animated Card</CardTitle>
          <CardDescription>This card has animations disabled</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card has no transition animations.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
