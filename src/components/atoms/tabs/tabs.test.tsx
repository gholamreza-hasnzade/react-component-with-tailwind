import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { TabItem } from './tabs'
import { Tabs } from './tabs'

// Mock tab items for testing
const mockTabItems: TabItem[] = [
  {
    id: 'tab1',
    label: 'Tab 1',
    content: <div data-testid="tab1-content">Content for Tab 1</div>
  },
  {
    id: 'tab2',
    label: 'Tab 2',
    content: <div data-testid="tab2-content">Content for Tab 2</div>
  },
  {
    id: 'tab3',
    label: 'Tab 3',
    content: <div data-testid="tab3-content">Content for Tab 3</div>
  },
  {
    id: 'disabled-tab',
    label: 'Disabled Tab',
    disabled: true,
    content: <div data-testid="disabled-content">Disabled content</div>
  }
]

const mockTabItemsWithIcons: TabItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: '🏠',
    content: <div data-testid="home-content">Home content</div>
  },
  {
    id: 'search',
    label: 'Search',
    icon: '🔍',
    content: <div data-testid="search-content">Search content</div>
  }
]

describe('Tabs Component', () => {
  describe('Rendering', () => {
    it('renders all tabs with correct labels', () => {
      render(<Tabs items={mockTabItems} />)
      
      expect(screen.getByText('Tab 1')).toBeInTheDocument()
      expect(screen.getByText('Tab 2')).toBeInTheDocument()
      expect(screen.getByText('Tab 3')).toBeInTheDocument()
      expect(screen.getByText('Disabled Tab')).toBeInTheDocument()
    })

    it('renders tab content for the first tab by default', () => {
      render(<Tabs items={mockTabItems} />)
      
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
      expect(screen.queryByTestId('tab2-content')).not.toBeInTheDocument()
    })

    it('renders icons when provided', () => {
      render(<Tabs items={mockTabItemsWithIcons} />)
      
      expect(screen.getByText('🏠')).toBeInTheDocument()
      expect(screen.getByText('🔍')).toBeInTheDocument()
    })

    it('renders nothing when no items are provided', () => {
      const { container } = render(<Tabs items={[]} />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe('Tab Switching', () => {
    it('switches to a different tab when clicked', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} />)
      
      // Initially shows first tab
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
      
      // Click on second tab
      await user.click(screen.getByText('Tab 2'))
      
      // Should now show second tab content
      expect(screen.getByTestId('tab2-content')).toBeInTheDocument()
      expect(screen.queryByTestId('tab1-content')).not.toBeInTheDocument()
    })

    it('calls onChange callback when tab is switched', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()
      render(<Tabs items={mockTabItems} onChange={mockOnChange} />)
      
      await user.click(screen.getByText('Tab 2'))
      
      expect(mockOnChange).toHaveBeenCalledWith('tab2')
    })

    it('does not switch to disabled tabs', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()
      render(<Tabs items={mockTabItems} onChange={mockOnChange} />)
      
      await user.click(screen.getByText('Disabled Tab'))
      
      expect(mockOnChange).not.toHaveBeenCalled()
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
    })
  })

  describe('Default Active Tab', () => {
    it('shows the specified default active tab', () => {
      render(<Tabs items={mockTabItems} defaultActiveTab="tab2" />)
      
      expect(screen.getByTestId('tab2-content')).toBeInTheDocument()
      expect(screen.queryByTestId('tab1-content')).not.toBeInTheDocument()
    })

    it('falls back to first tab if defaultActiveTab is invalid', () => {
      render(<Tabs items={mockTabItems} defaultActiveTab="invalid-tab" />)
      
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates to next tab with ArrowRight', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} />)
      
      // Focus on first tab
      const firstTab = screen.getByText('Tab 1').closest('button')
      firstTab?.focus()
      
      // Press ArrowRight
      await user.keyboard('{ArrowRight}')
      
      // Should now show second tab content
      expect(screen.getByTestId('tab2-content')).toBeInTheDocument()
    })

    it('navigates to previous tab with ArrowLeft', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} defaultActiveTab="tab2" />)
      
      // Focus on second tab
      const secondTab = screen.getByText('Tab 2').closest('button')
      secondTab?.focus()
      
      // Press ArrowLeft
      await user.keyboard('{ArrowLeft}')
      
      // Should now show first tab content
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
    })

    it('navigates to first tab with Home key', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} defaultActiveTab="tab3" />)
      
      // Focus on third tab
      const thirdTab = screen.getByText('Tab 3').closest('button')
      thirdTab?.focus()
      
      // Press Home
      await user.keyboard('{Home}')
      
      // Should now show first tab content
      expect(screen.getByTestId('tab1-content')).toBeInTheDocument()
    })

    it('navigates to last tab with End key', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} />)
      
      // Focus on first tab
      const firstTab = screen.getByText('Tab 1').closest('button')
      firstTab?.focus()
      
      // Press End
      await user.keyboard('{End}')
      
      // Should now show third tab content
      expect(screen.getByTestId('tab3-content')).toBeInTheDocument()
    })

    it('wraps around when navigating past boundaries', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} />)
      
      // Focus on first tab
      const firstTab = screen.getByText('Tab 1').closest('button')
      firstTab?.focus()
      
      // Press ArrowLeft (should wrap to last tab)
      await user.keyboard('{ArrowLeft}')
      
      // Should now show third tab content
      expect(screen.getByTestId('tab3-content')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies correct classes for default variant', () => {
      render(<Tabs items={mockTabItems} variant="default" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).not.toHaveClass('bg-gray-100', 'rounded-lg', 'p-1')
      expect(tabList).not.toHaveClass('border-b', 'border-gray-200')
    })

    it('applies correct classes for pills variant', () => {
      render(<Tabs items={mockTabItems} variant="pills" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('bg-gray-100', 'rounded-lg', 'p-1')
    })

    it('applies correct classes for underline variant', () => {
      render(<Tabs items={mockTabItems} variant="underline" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('border-b', 'border-gray-200')
    })
  })

  describe('Sizes', () => {
    it('applies correct classes for small size', () => {
      render(<Tabs items={mockTabItems} size="sm" />)
      
      const firstTab = screen.getByText('Tab 1').closest('button')
      expect(firstTab).toHaveClass('text-sm', 'px-3', 'py-2')
    })

    it('applies correct classes for medium size', () => {
      render(<Tabs items={mockTabItems} size="md" />)
      
      const firstTab = screen.getByText('Tab 1').closest('button')
      expect(firstTab).toHaveClass('text-base', 'px-4', 'py-3')
    })

    it('applies correct classes for large size', () => {
      render(<Tabs items={mockTabItems} size="lg" />)
      
      const firstTab = screen.getByText('Tab 1').closest('button')
      expect(firstTab).toHaveClass('text-lg', 'px-6', 'py-4')
    })
  })

  describe('Full Width', () => {
    it('applies full width classes when enabled', () => {
      render(<Tabs items={mockTabItems} fullWidth={true} />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('w-full')
    })

    it('does not apply full width classes when disabled', () => {
      render(<Tabs items={mockTabItems} fullWidth={false} />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).not.toHaveClass('w-full')
    })
  })

  describe('Position', () => {
    it('applies correct classes for top position (default)', () => {
      render(<Tabs items={mockTabItems} position="top" />)
      
      const container = screen.getByText('Tab 1').closest('.tab-container')
      expect(container).toHaveClass('flex-col')
    })

    it('applies correct classes for bottom position', () => {
      render(<Tabs items={mockTabItems} position="bottom" />)
      
      const container = screen.getByText('Tab 1').closest('.tab-container')
      expect(container).toHaveClass('flex-col-reverse')
    })

    it('applies correct classes for left position', () => {
      render(<Tabs items={mockTabItems} position="left" />)
      
      const container = screen.getByText('Tab 1').closest('.tab-container')
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(container).toHaveClass('flex-row')
      expect(tabList).toHaveClass('flex-col', 'min-w-32')
    })

    it('applies correct classes for right position', () => {
      render(<Tabs items={mockTabItems} position="right" />)
      
      const container = screen.getByText('Tab 1').closest('.tab-container')
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(container).toHaveClass('flex-row-reverse')
      expect(tabList).toHaveClass('flex-col', 'min-w-32')
    })

    it('applies correct border classes for left/right positions with underline variant', () => {
      render(<Tabs items={mockTabItems} variant="underline" position="left" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('border-r', 'border-gray-200')
    })

    it('applies correct border classes for top/bottom positions with underline variant', () => {
      render(<Tabs items={mockTabItems} variant="underline" position="top" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('border-b', 'border-gray-200')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className to main container', () => {
      render(<Tabs items={mockTabItems} className="custom-tabs" />)
      
      const container = screen.getByText('Tab 1').closest('.tabs')
      expect(container).toHaveClass('custom-tabs')
    })

    it('applies custom tabListClassName to tab list', () => {
      render(<Tabs items={mockTabItems} tabListClassName="custom-tab-list" />)
      
      const tabList = screen.getByText('Tab 1').closest('.tab-list')
      expect(tabList).toHaveClass('custom-tab-list')
    })

    it('applies custom tabPanelClassName to tab panel', () => {
      render(<Tabs items={mockTabItems} tabPanelClassName="custom-tab-panel" />)
      
      const tabPanel = screen.getByTestId('tab1-content').closest('.tab-panel')
      expect(tabPanel).toHaveClass('custom-tab-panel')
    })
  })

  describe('Focus Management', () => {
    it('sets correct tabIndex for active and inactive tabs', () => {
      render(<Tabs items={mockTabItems} />)
      
      const activeTab = screen.getByText('Tab 1').closest('button')
      const inactiveTab = screen.getByText('Tab 2').closest('button')
      
      expect(activeTab).toHaveAttribute('tabIndex', '0')
      expect(inactiveTab).toHaveAttribute('tabIndex', '-1')
    })

    it('updates tabIndex when tab becomes active', async () => {
      const user = userEvent.setup()
      render(<Tabs items={mockTabItems} />)
      
      const firstTab = screen.getByText('Tab 1').closest('button')
      const secondTab = screen.getByText('Tab 2').closest('button')
      
      // Initially first tab is active
      expect(firstTab).toHaveAttribute('tabIndex', '0')
      expect(secondTab).toHaveAttribute('tabIndex', '-1')
      
      // Click second tab
      await user.click(screen.getByText('Tab 2'))
      
      // Now second tab should be active
      expect(firstTab).toHaveAttribute('tabIndex', '-1')
      expect(secondTab).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('Accessibility', () => {
    it('renders buttons with proper disabled state', () => {
      render(<Tabs items={mockTabItems} />)
      
      const disabledTab = screen.getByText('Disabled Tab').closest('button')
      expect(disabledTab).toBeDisabled()
    })

    it('applies proper styling to disabled tabs', () => {
      render(<Tabs items={mockTabItems} />)
      
      const disabledTab = screen.getByText('Disabled Tab').closest('button')
      expect(disabledTab).toHaveClass('opacity-50', 'cursor-not-allowed')
    })
  })
})
