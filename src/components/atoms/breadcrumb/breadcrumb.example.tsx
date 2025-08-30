import React, { useState } from 'react'
import { Breadcrumb } from './breadcrumb'
import { generateBreadcrumbItems, createBreadcrumbItems } from './breadcrumb.utils'
import { Folder, File, Settings, User, ShoppingCart, Package, Tag, CreditCard } from 'lucide-react'

export const BreadcrumbExample: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/products/electronics/smartphones/iphone-15')
  const [customLabels, setCustomLabels] = useState({
    'products': 'Products',
    'electronics': 'Electronics',
    'smartphones': 'Smartphones',
    'iphone-15': 'iPhone 15'
  })

  // Example breadcrumb data
  const simpleBreadcrumbs = createBreadcrumbItems(['Home', 'Products', 'Electronics', 'Smartphones'])
  
  const ecommerceBreadcrumbs = [
    { label: 'Home', href: '/', icon: <ShoppingCart className="h-4 w-4" /> },
    { label: 'Products', href: '/products', icon: <Package className="h-4 w-4" /> },
    { label: 'Electronics', href: '/products/electronics', icon: <Folder className="h-4 w-4" /> },
    { label: 'Smartphones', href: '/products/electronics/smartphones', icon: <Folder className="h-4 w-4" /> },
    { label: 'iPhone 15 Pro', icon: <File className="h-4 w-4" />, isCurrentPage: true }
  ]

  const adminBreadcrumbs = [
    { label: 'Dashboard', href: '/admin', icon: <Settings className="h-4 w-4" /> },
    { label: 'Users', href: '/admin/users', icon: <User className="h-4 w-4" /> },
    { label: 'User Management', href: '/admin/users/management', icon: <User className="h-4 w-4" /> },
    { label: 'Edit User', icon: <User className="h-4 w-4" />, isCurrentPage: true }
  ]

  const longBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Computers', href: '/products/electronics/computers' },
    { label: 'Laptops', href: '/products/electronics/computers/laptops' },
    { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
    { label: 'High Performance', href: '/products/electronics/computers/laptops/gaming/high-performance' },
    { label: 'RTX 4090 Models', icon: <File className="h-4 w-4" />, isCurrentPage: true }
  ]

  const handleBreadcrumbClick = (item: any, index: number) => {
    console.log(`Clicked breadcrumb item: ${item.label} at index ${index}`)
    if (item.href) {
      // In a real app, you would navigate here
      console.log(`Navigating to: ${item.href}`)
    }
  }

  const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPath(event.target.value)
  }

  const handleLabelChange = (key: string, value: string) => {
    setCustomLabels(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Breadcrumb Component</h1>
        <p className="text-gray-600">Professional breadcrumb navigation with advanced features and best practices</p>
      </div>

      {/* Basic Examples */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Basic Examples</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Simple Breadcrumbs</h3>
              <Breadcrumb 
                items={simpleBreadcrumbs}
                onItemClick={handleBreadcrumbClick}
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">With Icons</h3>
              <Breadcrumb 
                items={ecommerceBreadcrumbs}
                onItemClick={handleBreadcrumbClick}
              />
            </div>

            <div>
              <h3 className="font-medium mb-2">Admin Panel Style</h3>
              <Breadcrumb 
                items={adminBreadcrumbs}
                variant="minimal"
                onItemClick={handleBreadcrumbClick}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Variants and Sizes */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Variants and Sizes</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Default Variant (Medium Size)</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              variant="default"
              size="md"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Minimal Variant (Small Size)</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              variant="minimal"
              size="sm"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Bordered Variant (Large Size)</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              variant="bordered"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Custom Separators */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Custom Separators</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Slash Separator</h3>
            <Breadcrumb 
              items={simpleBreadcrumbs}
              separator="/"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Arrow Separator</h3>
            <Breadcrumb 
              items={simpleBreadcrumbs}
              separator="→"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Dot Separator</h3>
            <Breadcrumb 
              items={simpleBreadcrumbs}
              separator="•"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Icon Separator</h3>
            <Breadcrumb 
              items={simpleBreadcrumbs}
              separator={<Tag className="h-3 w-3 text-gray-400" />}
            />
          </div>
        </div>
      </div>

      {/* Truncation and Long Paths */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Long Paths and Truncation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Long Path (Auto-truncated)</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              maxItems={5}
              truncateLabels={true}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Max Items</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              maxItems={3}
              truncateLabels={true}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Path Generation */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Dynamic Path Generation</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Generated from Path</h3>
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Path:
              </label>
              <input
                type="text"
                value={currentPath}
                onChange={handlePathChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a path like /products/electronics/smartphones"
              />
            </div>
            <Breadcrumb 
              items={generateBreadcrumbItems(currentPath, '/', customLabels)}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Labels</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Products</label>
                <input
                  type="text"
                  value={customLabels.products || ''}
                  onChange={(e) => handleLabelChange('products', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Electronics</label>
                <input
                  type="text"
                  value={customLabels.electronics || ''}
                  onChange={(e) => handleLabelChange('electronics', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Features */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Interactive Features</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Clickable with Callbacks</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              onItemClick={handleBreadcrumbClick}
              variant="bordered"
            />
            <p className="text-sm text-gray-500 mt-2">
              Check the console to see click events
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Home Configuration</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              showHomeIcon={true}
              homeHref="/dashboard"
            />
          </div>
        </div>
      </div>

      {/* Responsive Design */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Responsive Design</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Mobile Optimized</h3>
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <p className="text-sm text-gray-600 mb-3">Resize your browser to see responsive behavior</p>
              <Breadcrumb 
                items={longBreadcrumbs}
                maxItems={4}
                truncateLabels={true}
                variant="bordered"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility Features */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Accessibility Features</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-blue-900">Built-in Accessibility</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Proper ARIA labels and roles</li>
              <li>• Keyboard navigation support</li>
              <li>• Screen reader friendly</li>
              <li>• Focus management with visible focus rings</li>
              <li>• Semantic HTML structure</li>
              <li>• Current page indication</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Usage Examples</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium mb-2">Code Examples</h3>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium">Basic Usage:</h4>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`import { Breadcrumb } from './breadcrumb'

const items = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current Page' }
]

<Breadcrumb items={items} />`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium">With Icons and Variants:</h4>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`<Breadcrumb 
  items={items}
  variant="bordered"
  size="lg"
  separator="→"
  maxItems={5}
  truncateLabels={true}
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium">Dynamic Generation:</h4>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`import { generateBreadcrumbItems } from './breadcrumb.utils'

const items = generateBreadcrumbItems('/products/electronics/smartphones')
<Breadcrumb items={items} />`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
