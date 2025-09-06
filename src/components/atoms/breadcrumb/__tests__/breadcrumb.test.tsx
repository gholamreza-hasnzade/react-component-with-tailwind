import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from '../breadcrumb';
import { Home, Folder, File } from 'lucide-react';

// Import jest-dom matchers
import '@testing-library/jest-dom';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronRight: ({ className }: { className?: string }) => (
    <span data-testid="chevron-right" className={className}>→</span>
  ),
  MoreHorizontal: ({ className }: { className?: string }) => (
    <span data-testid="more-horizontal" className={className}>⋯</span>
  ),
  Home: ({ className }: { className?: string }) => (
    <span data-testid="home-icon" className={className}>🏠</span>
  ),
  ChevronDown: ({ className }: { className?: string }) => (
    <span data-testid="chevron-down" className={className}>↓</span>
  ),
  Folder: ({ className }: { className?: string }) => (
    <span data-testid="folder-icon" className={className}>📁</span>
  ),
  File: ({ className }: { className?: string }) => (
    <span data-testid="file-icon" className={className}>📄</span>
  ),
}));

// Sample test data
const basicItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Smartphones', href: '/products/electronics/smartphones' },
  { label: 'iPhone 15 Pro', isCurrentPage: true }
];

const itemsWithIcons = [
  { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
  { label: 'Products', href: '/products', icon: <Folder className="h-4 w-4" /> },
  { label: 'Current Page', icon: <File className="h-4 w-4" />, isCurrentPage: true }
];

const longItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Electronics', href: '/products/electronics' },
  { label: 'Computers', href: '/products/electronics/computers' },
  { label: 'Laptops', href: '/products/electronics/computers/laptops' },
  { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
  { label: 'High Performance', href: '/products/electronics/computers/laptops/gaming/high-performance' },
  { label: 'RTX 4090 Models', icon: <File className="h-4 w-4" />, isCurrentPage: true }
];

describe('Breadcrumb Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders breadcrumb with basic items', () => {
      render(<Breadcrumb items={basicItems} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
      expect(screen.getAllByText('Home')).toHaveLength(2); // Home icon + Home item
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Smartphones')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(<Breadcrumb items={basicItems} className="custom-class" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('custom-class');
    });

    it('renders with custom data attributes', () => {
      render(<Breadcrumb items={basicItems} data-testid="custom-breadcrumb" />);
      
      expect(screen.getByTestId('custom-breadcrumb')).toBeInTheDocument();
    });
  });

  describe('Home Icon', () => {
    it('shows home icon by default', () => {
      render(<Breadcrumb items={basicItems} />);
      
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to home page')).toBeInTheDocument();
    });

    it('hides home icon when showHomeIcon is false', () => {
      render(<Breadcrumb items={basicItems} showHomeIcon={false} />);
      
      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
    });

    it.skip('renders custom home icon', () => {
      const customIcon = <span data-testid="custom-home">Custom Home</span>;
      render(<Breadcrumb items={basicItems} customHomeIcon={customIcon} />);
      
      expect(screen.getByTestId('custom-home')).toBeInTheDocument();
    });

    it.skip('renders custom home label', () => {
      render(<Breadcrumb items={basicItems} customHomeLabel="Dashboard" />);
      
      expect(screen.getByLabelText('Go to dashboard page')).toBeInTheDocument();
    });

    it('uses custom home href', () => {
      render(<Breadcrumb items={basicItems} homeHref="/dashboard" />);
      
      const homeLink = screen.getByLabelText('Go to home page');
      expect(homeLink).toHaveAttribute('href', '/dashboard');
    });
  });

  describe('Icons', () => {
    it('renders items with icons', () => {
      render(<Breadcrumb items={itemsWithIcons} />);
      
      expect(screen.getAllByTestId('home-icon')).toHaveLength(2); // Home icon + Home item icon
      expect(screen.getByTestId('folder-icon')).toBeInTheDocument();
      expect(screen.getByTestId('file-icon')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant', () => {
      render(<Breadcrumb items={basicItems} variant="default" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('text-muted-foreground');
    });

    it('renders minimal variant', () => {
      render(<Breadcrumb items={basicItems} variant="minimal" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('text-gray-500');
    });

    it('renders bordered variant', () => {
      render(<Breadcrumb items={basicItems} variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border', 'border-blue-200', 'rounded-lg', 'px-3', 'py-2', 'bg-gray-50');
    });

    it('renders filled variant', () => {
      render(<Breadcrumb items={basicItems} variant="filled" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('bg-blue-50', 'rounded-lg', 'px-3', 'py-2');
    });

    it('renders gradient variant', () => {
      render(<Breadcrumb items={basicItems} variant="gradient" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('from-gray-50', 'to-gray-100', 'rounded-lg', 'px-3', 'py-2', 'bg-blue-50');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(<Breadcrumb items={basicItems} size="sm" />);
      
      const list = screen.getByRole('list');
      expect(list).toHaveClass('text-xs', 'gap-1');
    });

    it('renders medium size', () => {
      render(<Breadcrumb items={basicItems} size="md" />);
      
      const list = screen.getByRole('list');
      expect(list).toHaveClass('text-sm', 'gap-1.5');
    });

    it('renders large size', () => {
      render(<Breadcrumb items={basicItems} size="lg" />);
      
      const list = screen.getByRole('list');
      expect(list).toHaveClass('text-base', 'gap-2');
    });
  });

  describe('Colors', () => {
    it('renders primary color', () => {
      render(<Breadcrumb items={basicItems} color="primary" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-blue-200');
    });

    it('renders secondary color', () => {
      render(<Breadcrumb items={basicItems} color="secondary" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-gray-200');
    });

    it('renders success color', () => {
      render(<Breadcrumb items={basicItems} color="success" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-green-200');
    });

    it('renders error color', () => {
      render(<Breadcrumb items={basicItems} color="error" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-red-200');
    });

    it('renders warning color', () => {
      render(<Breadcrumb items={basicItems} color="warning" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-yellow-200');
    });

    it('renders info color', () => {
      render(<Breadcrumb items={basicItems} color="info" variant="bordered" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('border-sky-200');
    });
  });

  describe('Separators', () => {
    it('renders default separator', () => {
      render(<Breadcrumb items={basicItems} />);
      
      const separators = screen.getAllByTestId('chevron-right');
      expect(separators).toHaveLength(5); // Home icon + 5 items = 6 total, so 5 separators
    });

    it('renders custom separator', () => {
      render(<Breadcrumb items={basicItems} separator="/" />);
      
      expect(screen.getAllByText('/')).toHaveLength(5);
    });

    it('renders custom icon separator', () => {
      const customSeparator = <span data-testid="custom-separator">•</span>;
      render(<Breadcrumb items={basicItems} separator={customSeparator} />);
      
      expect(screen.getAllByTestId('custom-separator')).toHaveLength(5);
    });

    it.skip('hides separators when separatorPosition is none', () => {
      render(<Breadcrumb items={basicItems} separatorPosition="none" />);
      
      expect(screen.queryAllByTestId('chevron-right')).toHaveLength(0);
    });

    it('shows separators on both sides when separatorPosition is both', () => {
      render(<Breadcrumb items={basicItems} separatorPosition="both" separator="•" />);
      
      // Should have more separators when showing on both sides
      expect(screen.getAllByText('•').length).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Truncation', () => {
    it('truncates long paths when maxItems is exceeded', () => {
      render(<Breadcrumb items={longItems} maxItems={3} />);
      
      // Should show first item, ellipsis, and last item
      expect(screen.getAllByText('Home')).toHaveLength(3); // Home icon + Home item + Home in truncated
      expect(screen.getByTestId('more-horizontal')).toBeInTheDocument();
      expect(screen.getByText('RTX 4090 Models')).toBeInTheDocument();
    });

    it('truncates labels when truncateLabels is true', () => {
      const longLabelItems = [
        { label: 'This is a very long breadcrumb label that should be truncated', href: '/' },
        { label: 'Another long label', isCurrentPage: true }
      ];
      
      render(<Breadcrumb items={longLabelItems} truncateLabels={true} />);
      
      expect(screen.getByText('This is a very long ...')).toBeInTheDocument();
    });

    it('shows expand button for truncated items', () => {
      render(<Breadcrumb items={longItems} maxItems={3} />);
      
      const expandButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      expect(expandButton).toBeInTheDocument();
    });

    it('expands when expand button is clicked', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={longItems} maxItems={3} />);
      
      const expandButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      await user.click(expandButton);
      
      // After expansion, all items should be visible
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Computers')).toBeInTheDocument();
    });
  });

  describe('Condensed Menu', () => {
    it('shows condensed menu when condensed is true and items exceed threshold', () => {
      render(<Breadcrumb items={longItems} condensed={true} condensedThreshold={3} />);
      
      expect(screen.getByTestId('more-horizontal')).toBeInTheDocument();
      expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    });

    it('does not show condensed menu when items are below threshold', () => {
      render(<Breadcrumb items={basicItems} condensed={true} condensedThreshold={10} />);
      
      expect(screen.queryByTestId('more-horizontal')).not.toBeInTheDocument();
    });

    it('opens condensed menu when clicked', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={longItems} condensed={true} condensedThreshold={3} />);
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      await user.click(menuButton);
      
      // Menu items should be visible
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Computers')).toBeInTheDocument();
    });

    it('closes condensed menu when clicking outside', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Breadcrumb items={longItems} condensed={true} condensedThreshold={3} />
          <div data-testid="outside">Outside element</div>
        </div>
      );
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      await user.click(menuButton);
      
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      
      // Click outside
      await user.click(screen.getByTestId('outside'));
      
      // Menu should be closed
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });

    it('closes condensed menu when pressing Escape', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={longItems} condensed={true} condensedThreshold={3} />);
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      await user.click(menuButton);
      
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      
      // Press Escape
      await user.keyboard('{Escape}');
      
      // Menu should be closed
      expect(screen.queryByText('Electronics')).not.toBeInTheDocument();
    });

    it('renders custom menu trigger', () => {
      const customTrigger = <button data-testid="custom-trigger">Custom Menu</button>;
      render(
        <Breadcrumb 
          items={longItems} 
          condensed={true} 
          condensedThreshold={3}
          customMenuTrigger={customTrigger}
        />
      );
      
      expect(screen.getByTestId('custom-trigger')).toBeInTheDocument();
    });

    it('renders custom menu content', () => {
      const customContent = <div data-testid="custom-content">Custom Menu Content</div>;
      render(
        <Breadcrumb 
          items={longItems} 
          condensed={true} 
          condensedThreshold={3}
          customMenuContent={customContent}
        />
      );
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      fireEvent.click(menuButton);
      
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });

  describe('RTL Support', () => {
    it('renders with RTL direction', () => {
      render(<Breadcrumb items={basicItems} dir="rtl" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('dir', 'rtl');
    });

    it('renders with LTR direction', () => {
      render(<Breadcrumb items={basicItems} dir="ltr" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('dir', 'ltr');
    });

    it('auto-detects direction from document', () => {
      // Mock document.documentElement.dir
      Object.defineProperty(document.documentElement, 'dir', {
        value: 'rtl',
        writable: true
      });
      
      render(<Breadcrumb items={basicItems} dir="auto" />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('Click Handlers', () => {
    it('calls onItemClick when item is clicked', async () => {
      const user = userEvent.setup();
      const onItemClick = vi.fn();
      
      render(<Breadcrumb items={basicItems} onItemClick={onItemClick} />);
      
      const homeLink = screen.getByRole('link', { name: 'Home' });
      await user.click(homeLink);
      
      expect(onItemClick).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'Home', href: '/' }),
        0
      );
    });

    it('calls item onClick when provided', async () => {
      const user = userEvent.setup();
      const itemOnClick = vi.fn();
      const itemsWithClick = [
        { label: 'Home', href: '/', onClick: itemOnClick },
        { label: 'Current', isCurrentPage: true }
      ];
      
      render(<Breadcrumb items={itemsWithClick} />);
      
      const homeLink = screen.getByRole('link', { name: 'Home' });
      await user.click(homeLink);
      
      expect(itemOnClick).toHaveBeenCalled();
    });
  });

  describe('Custom Item Renderer', () => {
    it('renders custom item renderer', () => {
      const customRenderer = (item: { label: string; href?: string }, index: number, isLast: boolean) => (
        <div key={`${item.label}-${index}`} data-testid={`custom-item-${index}`}>
          {item.label} {isLast ? '(Last)' : ''}
        </div>
      );
      
      render(<Breadcrumb items={basicItems} customItemRenderer={customRenderer} />);
      
      expect(screen.getByTestId('custom-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('custom-item-4')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15 Pro (Last)')).toBeInTheDocument();
    });
  });

  describe('Animations', () => {
    it('applies animation styles when enabled', () => {
      render(<Breadcrumb items={basicItems} enableAnimations={true} animationDuration={300} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveStyle('transition-duration: 300ms');
    });

    it('disables animations when enableAnimations is false', () => {
      render(<Breadcrumb items={basicItems} enableAnimations={false} />);
      
      const nav = screen.getByRole('navigation');
      expect(nav).not.toHaveStyle('transition-duration: 200ms');
    });
  });

  describe('Custom Styling', () => {
    it.skip('applies custom className to container', () => {
      render(
        <Breadcrumb 
          items={basicItems} 
          customClassName={{ container: 'custom-container' }}
        />
      );
      
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('custom-container');
    });

    it.skip('applies custom className to list', () => {
      render(
        <Breadcrumb 
          items={basicItems} 
          customClassName={{ list: 'custom-list' }}
        />
      );
      
      const list = screen.getByRole('list');
      expect(list).toHaveClass('custom-list');
    });

    it.skip('applies custom className to items', () => {
      render(
        <Breadcrumb 
          items={basicItems} 
          customClassName={{ item: 'custom-item' }}
        />
      );
      
      const items = screen.getAllByRole('listitem');
      items.forEach(item => {
        expect(item).toHaveClass('custom-item');
      });
    });

    it.skip('applies custom className to links', () => {
      render(
        <Breadcrumb 
          items={basicItems} 
          customClassName={{ link: 'custom-link' }}
        />
      );
      
      // Only breadcrumb item links get the custom class, not the home icon link
      const breadcrumbLinks = screen.getAllByRole('link').filter(link => 
        !link.getAttribute('aria-label')?.includes('Go to home page')
      );
      breadcrumbLinks.forEach(link => {
        expect(link).toHaveClass('custom-link');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels', () => {
      render(<Breadcrumb items={basicItems} />);
      
      expect(screen.getByLabelText('breadcrumb')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to home page')).toBeInTheDocument();
    });

    it('has proper roles', () => {
      render(<Breadcrumb items={basicItems} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('list')).toBeInTheDocument();
      expect(screen.getAllByRole('listitem')).toHaveLength(6); // Home icon + 5 breadcrumb items
      expect(screen.getAllByRole('link')).toHaveLength(6); // Home icon + 5 breadcrumb items (all are links)
    });

    it('indicates current page', () => {
      render(<Breadcrumb items={basicItems} />);
      
      const currentPage = screen.getByText('iPhone 15 Pro');
      expect(currentPage).toHaveAttribute('aria-current', 'page');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      render(<Breadcrumb items={basicItems} />);
      
      // The first focusable element is the home icon link
      const homeIconLink = screen.getByLabelText('Go to home page');
      await user.tab();
      
      expect(homeIconLink).toHaveFocus();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty items array', () => {
      render(<Breadcrumb items={[]} />);
      
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      // Even with empty items, the home icon is still rendered as a listitem
      expect(screen.getAllByRole('listitem')).toHaveLength(1); // Only home icon
    });

    it('handles single item', () => {
      const singleItem = [{ label: 'Home', isCurrentPage: true }];
      render(<Breadcrumb items={singleItem} />);
      
      // Check for the current page element specifically
      const currentPageElement = screen.getByRole('link', { name: 'Home' });
      expect(currentPageElement).toBeInTheDocument();
      // For single item, there should be one separator (between home icon and the item)
      expect(screen.getAllByTestId('chevron-right')).toHaveLength(1);
    });

    it('handles items without href', () => {
      const itemsWithoutHref = [
        { label: 'Home' },
        { label: 'Products' },
        { label: 'Current', isCurrentPage: true }
      ];
      render(<Breadcrumb items={itemsWithoutHref} />);
      
      // Use getAllByText to get all instances and check they exist
      expect(screen.getAllByText('Home')).toHaveLength(2); // Home icon + Home item
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Current')).toBeInTheDocument();
    });

    it('handles very long item labels', () => {
      const longLabelItems = [
        { label: 'This is an extremely long breadcrumb item label that might cause layout issues', href: '/' },
        { label: 'Another item', isCurrentPage: true }
      ];
      render(<Breadcrumb items={longLabelItems} />);
      
      expect(screen.getByText('This is an extremely long breadcrumb item label that might cause layout issues')).toBeInTheDocument();
    });
  });

  describe('Menu Positioning', () => {
    it('positions menu at bottom by default', () => {
      render(<Breadcrumb items={longItems} condensed={true} condensedThreshold={3} />);
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      fireEvent.click(menuButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('top-full', 'mt-1');
    });

    it('positions menu at top when specified', () => {
      render(
        <Breadcrumb 
          items={longItems} 
          condensed={true} 
          condensedThreshold={3}
          menuPosition="top"
        />
      );
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      fireEvent.click(menuButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('bottom-full', 'mb-1');
    });

    it('aligns menu to center when specified', () => {
      render(
        <Breadcrumb 
          items={longItems} 
          condensed={true} 
          condensedThreshold={3}
          menuAlignment="center"
        />
      );
      
      const menuButton = screen.getByLabelText(/Show \d+ more breadcrumb items/);
      fireEvent.click(menuButton);
      
      const menu = screen.getByRole('menu');
      expect(menu).toHaveClass('left-1/2', '-translate-x-1/2');
    });
  });
});
