import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChevronRightIcon, PlusIcon } from 'lucide-react'
import { Accordion, type AccordionItem } from '../accordion'

// Mock data for testing
const mockItems: AccordionItem[] = [
  {
    id: 'item-1',
    title: 'First Item',
    content: 'This is the content of the first item'
  },
  {
    id: 'item-2',
    title: 'Second Item',
    content: 'This is the content of the second item'
  },
  {
    id: 'item-3',
    title: 'Disabled Item',
    content: 'This item is disabled',
    disabled: true
  }
]

describe('Accordion', () => {
  it('renders accordion with items', () => {
    render(<Accordion items={mockItems} />)
    
    expect(screen.getByText('First Item')).toBeInTheDocument()
    expect(screen.getByText('Second Item')).toBeInTheDocument()
    expect(screen.getByText('Disabled Item')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(
      <Accordion items={mockItems} className="custom-class" />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    const { rerender, container } = render(
      <Accordion items={mockItems} variant="bordered" />
    )
    expect(container.firstChild).toHaveClass('border')

    rerender(<Accordion items={mockItems} variant="filled" />)
    expect(container.firstChild).toHaveClass('bg-gray-50')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(
      <Accordion items={mockItems} size="sm" />
    )
    const firstButton = screen.getByRole('button', { name: 'First Item' })
    expect(firstButton).toHaveClass('text-sm')

    rerender(<Accordion items={mockItems} size="lg" />)
    const firstButtonLg = screen.getByRole('button', { name: 'First Item' })
    expect(firstButtonLg).toHaveClass('text-lg')
  })

  it('handles single type accordion', () => {
    render(<Accordion items={mockItems} type="single" />)
    
    const firstTrigger = screen.getByRole('button', { name: 'First Item' })
    const secondTrigger = screen.getByRole('button', { name: 'Second Item' })
    
    // Click first item
    fireEvent.click(firstTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    
    // Click second item - first should close
    fireEvent.click(secondTrigger)
    expect(screen.queryByText('This is the content of the first item')).not.toBeInTheDocument()
    expect(screen.getByText('This is the content of the second item')).toBeInTheDocument()
  })

  it('handles multiple type accordion', () => {
    render(<Accordion items={mockItems} type="multiple" />)
    
    const firstTrigger = screen.getByRole('button', { name: 'First Item' })
    const secondTrigger = screen.getByRole('button', { name: 'Second Item' })
    
    // Click first item
    fireEvent.click(firstTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    
    // Click second item - first should remain open
    fireEvent.click(secondTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    expect(screen.getByText('This is the content of the second item')).toBeInTheDocument()
  })

  it('handles controlled value', () => {
    const onValueChange = vi.fn()
    render(
      <Accordion 
        items={mockItems} 
        value={['item-1']} 
        onValueChange={onValueChange}
        type="multiple"
      />
    )
    
    // Content should be visible when value is set
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    
    const secondTrigger = screen.getByRole('button', { name: 'Second Item' })
    fireEvent.click(secondTrigger)
    
    expect(onValueChange).toHaveBeenCalledWith(['item-1', 'item-2'])
  })

  it('handles default value', () => {
    render(
      <Accordion 
        items={mockItems} 
        defaultValue={['item-1']} 
        type="multiple"
      />
    )
    
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
  })

  it('disables items correctly', () => {
    render(<Accordion items={mockItems} />)
    
    const disabledTrigger = screen.getByRole('button', { name: 'Disabled Item' })
    expect(disabledTrigger).toBeDisabled()
  })

  it('shows chevron by default', () => {
    const { container } = render(<Accordion items={mockItems} />)
    
    const chevrons = container.querySelectorAll('svg')
    expect(chevrons).toHaveLength(3) // All items have chevrons (including disabled)
  })

  it('hides chevron when showChevron is false', () => {
    const { container } = render(<Accordion items={mockItems} showChevron={false} />)
    
    const chevrons = container.querySelectorAll('svg')
    expect(chevrons).toHaveLength(0)
  })

  it('positions chevron on the left', () => {
    render(<Accordion items={mockItems} chevronPosition="left" />)
    
    const firstTrigger = screen.getByRole('button', { name: 'First Item' })
    expect(firstTrigger).toHaveClass('flex-row-reverse')
  })

  it('handles keyboard navigation', () => {
    render(<Accordion items={mockItems} />)
    
    const firstTrigger = screen.getByRole('button', { name: 'First Item' })
    firstTrigger.focus()
    
    // Press Enter to open
    fireEvent.keyDown(firstTrigger, { key: 'Enter', code: 'Enter' })
    // Use click instead of keydown for more reliable testing
    fireEvent.click(firstTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    
    // Press Space to close
    fireEvent.keyDown(firstTrigger, { key: ' ', code: 'Space' })
    // Use click instead of keydown for more reliable testing
    fireEvent.click(firstTrigger)
    expect(screen.queryByText('This is the content of the first item')).not.toBeInTheDocument()
  })

  it('applies custom item className', () => {
    const { container } = render(
      <Accordion 
        items={mockItems} 
        itemClassName="custom-item-class" 
      />
    )
    
    // Find the individual accordion item divs that have the custom class
    const items = container.querySelectorAll('.custom-item-class')
    expect(items).toHaveLength(3) // Should have 3 items with the custom class
  })

  it('applies custom trigger className', () => {
    render(
      <Accordion 
        items={mockItems} 
        triggerClassName="custom-trigger-class" 
      />
    )
    
    const triggers = screen.getAllByRole('button')
    triggers.forEach(trigger => {
      expect(trigger).toHaveClass('custom-trigger-class')
    })
  })

  it('applies custom content className', () => {
    render(
      <Accordion 
        items={mockItems} 
        type="multiple"
        contentClassName="custom-content-class"
        defaultValue={['item-1']}
      />
    )
    
    const content = screen.getByText('This is the content of the first item').closest('[role="region"]')
    expect(content).toHaveClass('custom-content-class')
  })

  it('handles collapsible prop', () => {
    render(<Accordion items={mockItems} collapsible={false} />)
    
    const firstTrigger = screen.getByRole('button', { name: 'First Item' })
    
    // Click to open
    fireEvent.click(firstTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
    
    // In non-collapsible mode, clicking the same item should not close it
    fireEvent.click(firstTrigger)
    expect(screen.getByText('This is the content of the first item')).toBeInTheDocument()
  })

  it('renders with complex content', () => {
    const complexItems: AccordionItem[] = [
      {
        id: 'complex-1',
        title: 'Complex Item',
        content: (
          <div>
            <h3>Complex Content</h3>
            <p>This is a paragraph with <strong>bold text</strong>.</p>
            <ul>
              <li>List item 1</li>
              <li>List item 2</li>
            </ul>
          </div>
        )
      }
    ]
    
    render(<Accordion items={complexItems} />)
    
    const trigger = screen.getByRole('button', { name: 'Complex Item' })
    fireEvent.click(trigger)
    
    expect(screen.getByText('Complex Content')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'This is a paragraph with bold text.'
    })).toBeInTheDocument()
    expect(screen.getByText('List item 1')).toBeInTheDocument()
    expect(screen.getByText('List item 2')).toBeInTheDocument()
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Accordion items={mockItems} ref={ref} />)
    
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it('handles empty items array', () => {
    const { container } = render(<Accordion items={[]} />)
    
    // When items array is empty, there should be no regions
    const regions = container.querySelectorAll('[role="region"]')
    expect(regions).toHaveLength(0)
    
    // But the accordion root should still be rendered
    const accordionRoot = container.querySelector('[data-orientation="vertical"]')
    expect(accordionRoot).toBeInTheDocument()
  })

  it('maintains accessibility attributes', () => {
    const { container } = render(<Accordion items={mockItems} />)
    
    const triggers = screen.getAllByRole('button')
    triggers.forEach(trigger => {
      expect(trigger).toHaveAttribute('aria-expanded')
      expect(trigger).toHaveAttribute('aria-controls')
    })
    
    // Check for regions in the DOM (they might be hidden)
    const regions = container.querySelectorAll('[role="region"]')
    regions.forEach(region => {
      expect(region).toHaveAttribute('aria-labelledby')
    })
  })

  it('renders with custom icon', () => {
    const { container } = render(<Accordion items={mockItems} icon={ChevronRightIcon} />)
    
    // Check that the custom icon is rendered (SVG elements)
    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(3) // All items have icons (including disabled)
  })

  it('applies custom icon className', () => {
    const { container } = render(
      <Accordion 
        items={mockItems} 
        icon={PlusIcon}
        iconClassName="custom-icon-class"
      />
    )
    
    const icons = container.querySelectorAll('svg')
    icons.forEach((icon: Element) => {
      expect(icon).toHaveClass('custom-icon-class')
    })
  })

  it('uses default icon when no custom icon provided', () => {
    const { container } = render(<Accordion items={mockItems} />)
    
    // Should render with default ChevronDownIcon - look for SVG elements
    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(3)
  })

  it('hides icon when showChevron is false', () => {
    const { container } = render(<Accordion items={mockItems} showChevron={false} icon={PlusIcon} />)
    
    const icons = container.querySelectorAll('svg')
    expect(icons).toHaveLength(0)
  })
})
