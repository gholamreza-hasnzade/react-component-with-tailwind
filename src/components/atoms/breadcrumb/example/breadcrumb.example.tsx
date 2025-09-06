import React, { useState } from 'react'
import { Breadcrumb } from '../breadcrumb'
import { generateBreadcrumbItems, createBreadcrumbItems } from '../breadcrumb.utils'
import { Folder, File, Settings, User, ShoppingCart, Package, Tag, ChevronDown } from 'lucide-react'

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

  const handleBreadcrumbClick = (item: { label: string; href?: string }, index: number) => {
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

      {/* Condensed Menu Feature */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Condensed Menu Feature</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Condensed with Menu (Default)</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              condensed={true}
              condensedThreshold={3}
              showCondensedMenu={true}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Condensed with Bordered Variant</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              condensed={true}
              condensedThreshold={2}
              showCondensedMenu={true}
              variant="bordered"
              color="success"
              size="lg"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Condensed with Different Colors</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Primary</h4>
                <Breadcrumb 
                  items={longBreadcrumbs}
                  condensed={true}
                  condensedThreshold={3}
                  showCondensedMenu={true}
                  color="primary"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Success</h4>
                <Breadcrumb 
                  items={longBreadcrumbs}
                  condensed={true}
                  condensedThreshold={3}
                  showCondensedMenu={true}
                  color="success"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Error</h4>
                <Breadcrumb 
                  items={longBreadcrumbs}
                  condensed={true}
                  condensedThreshold={3}
                  showCondensedMenu={true}
                  color="error"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">RTL Condensed Menu</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              condensed={true}
              condensedThreshold={3}
              showCondensedMenu={true}
              variant="filled"
              color="warning"
              dir="rtl"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Short Path (No Condensed Menu)</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              condensed={true}
              condensedThreshold={5}
              showCondensedMenu={true}
              variant="minimal"
              color="secondary"
            />
            <p className="text-sm text-gray-500 mt-1">
              When items are fewer than threshold, condensed menu won't appear
            </p>
          </div>
        </div>
      </div>

      {/* Advanced Customization */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold mb-4">Advanced Customization</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Custom Separators and Positioning</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Custom Separator (Star)</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  customSeparator="⭐"
                  separatorPosition="after"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">No Separators</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  separatorPosition="none"
                  variant="bordered"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Custom Icon Separator</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  customSeparator={<Tag className="h-3 w-3 text-purple-500" />}
                  separatorPosition="both"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Home Icon and Label</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Custom Home Icon</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  customHomeIcon={<Settings className="h-4 w-4" />}
                  customHomeLabel="Dashboard"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Custom Home with Different Icon</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  customHomeIcon={<User className="h-4 w-4" />}
                  customHomeLabel="Profile"
                  homeHref="/profile"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Menu Positioning</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Menu on Top</h4>
                <Breadcrumb 
                  items={longBreadcrumbs}
                  condensed={true}
                  condensedThreshold={3}
                  menuPosition="top"
                  menuAlignment="center"
                  variant="bordered"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Menu on Right</h4>
                <Breadcrumb 
                  items={longBreadcrumbs}
                  condensed={true}
                  condensedThreshold={3}
                  menuPosition="right"
                  menuAlignment="start"
                  variant="filled"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Styling with ClassNames</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              customClassName={{
                container: "bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200",
                list: "gap-3",
                item: "bg-white rounded-lg px-3 py-1 shadow-sm",
                link: "hover:bg-blue-100 rounded-md px-2 py-1 transition-all duration-300",
                page: "font-bold text-purple-700",
                separator: "text-blue-400 font-bold"
              }}
              variant="bordered"
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Item Renderer</h3>
            <Breadcrumb 
              items={ecommerceBreadcrumbs}
              customItemRenderer={(item, index, isLast) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className={`font-medium ${isLast ? 'text-green-700' : 'text-gray-600'}`}>
                    {item.label}
                  </span>
                  {!isLast && <span className="text-gray-400">→</span>}
                </div>
              )}
            />
          </div>

          <div>
            <h3 className="font-medium mb-2">Animation Customization</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-600">Fast Animations</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  animationDuration={100}
                  enableAnimations={true}
                  variant="bordered"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">Slow Animations</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  animationDuration={500}
                  enableAnimations={true}
                  variant="filled"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-600">No Animations</h4>
                <Breadcrumb 
                  items={ecommerceBreadcrumbs}
                  enableAnimations={false}
                  variant="minimal"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Custom Menu Trigger and Content</h3>
            <Breadcrumb 
              items={longBreadcrumbs}
              condensed={true}
              condensedThreshold={3}
              customMenuTrigger={
                <button className="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
                  <span className="text-sm font-medium">More</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
              }
              customMenuContent={
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 min-w-[250px]">
                  <div className="text-xs font-semibold text-purple-600 mb-2">Navigation Menu</div>
                  {longBreadcrumbs.slice(1, -1).map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 hover:bg-purple-100 rounded cursor-pointer">
                      <div className="w-1 h-1 bg-purple-400 rounded-full"></div>
                      <span className="text-sm text-purple-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              }
              menuPosition="bottom"
              menuAlignment="center"
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
                  placeholder="Enter custom label for products"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Electronics</label>
                <input
                  type="text"
                  value={customLabels.electronics || ''}
                  onChange={(e) => handleLabelChange('electronics', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter custom label for electronics"
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
              <li>• Condensed menu with dropdown accessibility</li>
              <li>• Click-outside-to-close functionality</li>
              <li>• Escape key support for menu closing</li>
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

            <div>
              <h4 className="font-medium">Condensed Menu:</h4>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`<Breadcrumb 
  items={longBreadcrumbItems}
  condensed={true}
  condensedThreshold={3}
  showCondensedMenu={true}
  variant="bordered"
  color="success"
  size="lg"
/>`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium">Advanced Customization:</h4>
              <pre className="bg-white p-2 rounded border text-xs overflow-x-auto">
{`<Breadcrumb 
  items={breadcrumbItems}
  customSeparator="⭐"
  separatorPosition="after"
  customHomeIcon={<Settings className="h-4 w-4" />}
  customHomeLabel="Dashboard"
  menuPosition="top"
  menuAlignment="center"
  animationDuration={300}
  enableAnimations={true}
  customClassName={{
    container: "bg-gradient-to-r from-blue-50 to-purple-50",
    item: "bg-white rounded-lg px-3 py-1",
    link: "hover:bg-blue-100 transition-all duration-300"
  }}
  customItemRenderer={(item, index, isLast) => (
    <div className="flex items-center gap-2">
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      <span className={isLast ? 'text-green-700' : 'text-gray-600'}>
        {item.label}
      </span>
    </div>
  )}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
