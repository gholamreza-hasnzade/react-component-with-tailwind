import { useState } from 'react';
import { Tabs } from './tabs';
import type { TabItem } from './tabs';

export const TabsExample = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Sample tab items for different use cases
  const overviewTabs: TabItem[] = [
    {
      id: 'overview',
      label: 'Overview3333333333333',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Project Overview</h3>
          <p className="text-gray-600 mb-4">
            Welcome to our project dashboard. Here you can get a quick overview of all your projects,
            their current status, and key metrics.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-800">Active Projects</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-green-800">Completed</div>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-orange-800">In Progress</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics11111111111111',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Analytics Dashboard</h3>
          <p className="text-gray-600 mb-4">
            Track your project performance with detailed analytics and insights.
          </p>
          <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Analytics Chart Placeholder</span>
          </div>
        </div>
      )
    },
    {
      id: 'settings222222222222222222222222',
      label: 'Settings',
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      ),
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Project Settings</h3>
          <p className="text-gray-600 mb-4">
            Configure your project preferences and notification settings.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Email Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked aria-label="Enable email notifications" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Auto-save</span>
              <input type="checkbox" className="rounded" defaultChecked aria-label="Enable auto-save" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Dark Mode</span>
              <input type="checkbox" className="rounded" aria-label="Enable dark mode" />
            </div>
          </div>
        </div>
      )
    }
  ];

  const profileTabs: TabItem[] = [
    {
      id: 'personal',
      label: 'Personal Info',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="nameInput" type="text" className="w-full px-3 py-2 border rounded-md" defaultValue="John Doe" />
            </div>
            <div>
              <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="emailInput" type="email" className="w-full px-3 py-2 border rounded-md" defaultValue="john@example.com" />
            </div>
            <div>
              <label htmlFor="bioInput" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea id="bioInput" className="w-full px-3 py-2 border rounded-md" rows={3} defaultValue="Software developer with 5+ years of experience..." />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      label: 'Security',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">Security Settings</h3>
          <div className="space-y-3">
            <div>
              <label htmlFor="currentPasswordInput" className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input id="currentPasswordInput" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="newPasswordInput" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input id="newPasswordInput" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
            <div>
              <label htmlFor="confirmPasswordInput" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input id="confirmPasswordInput" type="password" className="w-full px-3 py-2 border rounded-md" />
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'preferences',
      label: 'Preferences',
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-3">User Preferences</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="languageSelect" className="text-sm font-medium">Language</label>
              <select id="languageSelect" className="px-3 py-2 border rounded-md" aria-label="Select language">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="timezoneSelect" className="text-sm font-medium">Time Zone</label>
              <select id="timezoneSelect" className="px-3 py-2 border rounded-md" aria-label="Select time zone">
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC+0 (GMT)</option>
              </select>
            </div>
          </div>
        </div>
      )
    }
  ];

  const disabledTabs: TabItem[] = [
    {
      id: 'active',
      label: 'Active Tab',
      content: <div className="p-4">This tab is active and functional.</div>
    },
    {
      id: 'disabled',
      label: 'Disabled Tab',
      disabled: true,
      content: <div className="p-4">This tab is disabled and cannot be accessed.</div>
    },
    {
      id: 'another',
      label: 'Another Tab',
      content: <div className="p-4">This is another active tab.</div>
    }
  ];

  // Many tabs for scroll demonstration
  const manyTabs: TabItem[] = [
    { id: 'tab1', label: 'Dashboard', content: <div className="p-4">Dashboard content with analytics and metrics</div> },
    { id: 'tab2', label: 'Projects', content: <div className="p-4">Project management and tracking</div> },
    { id: 'tab3', label: 'Tasks', content: <div className="p-4">Task management and assignments</div> },
    { id: 'tab4', label: 'Team', content: <div className="p-4">Team members and collaboration</div> },
    { id: 'tab5', label: 'Calendar', content: <div className="p-4">Calendar and scheduling</div> },
    { id: 'tab6', label: 'Messages', content: <div className="p-4">Messages and communications</div> },
    { id: 'tab7', label: 'Files', content: <div className="p-4">File storage and management</div> },
    { id: 'tab8', label: 'Reports', content: <div className="p-4">Reports and analytics</div> },
    { id: 'tab9', label: 'Settings', content: <div className="p-4">Application settings</div> },
    { id: 'tab10', label: 'Help', content: <div className="p-4">Help and documentation</div> },
    { id: 'tab11', label: 'Support', content: <div className="p-4">Customer support</div> },
    { id: 'tab12', label: 'Billing', content: <div className="p-4">Billing and payments</div> },
    { id: 'tab13', label: 'Integrations', content: <div className="p-4">Third-party integrations</div> },
    { id: 'tab14', label: 'API', content: <div className="p-4">API documentation</div> },
    { id: 'tab15', label: 'Security', content: <div className="p-4">Security settings</div> }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Active tab changed to:', tabId);
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Tabs Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Tabs component with different variants, sizes, positions, and interactive features.
        </p>
      </div>

      {/* Basic Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Tabs</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Tabs
            items={overviewTabs}
            defaultActiveTab="overview"
            onChange={handleTabChange}
            variant="default"
            size="md"
            position="top"
          />
        </div>
        <p className="text-xs text-gray-500">
          Current active tab: {activeTab}
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tab Variants</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Default Variant</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="md"
              position="top"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Pills Variant</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="pills"
              size="md"
              position="top"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Underline Variant</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="underline"
              size="md"
              position="top"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Small Size</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="sm"
              position="top"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medium Size (Default)</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="md"
              position="top"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Large Size</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="lg"
              position="top"
            />
          </div>
        </div>
      </div>

      {/* Positions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Tab Positions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Top Position (Default)</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="md"
              position="top"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Bottom Position</h4>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="md"
              position="bottom"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Left Position</h4>
            <div className="h-64">
              <Tabs
                items={manyTabs}
                defaultActiveTab="overview"
                variant="default"
                size="md"
                position="left"
                showScrollArrows={true}
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Right Position</h4>
            <div className="h-64">
              <Tabs
                items={overviewTabs.slice(0, 2)}
                defaultActiveTab="overview"
                variant="default"
                size="md"
                position="right"
                showScrollArrows={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Width */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Full Width Tabs</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Tabs
            items={overviewTabs}
            defaultActiveTab="overview"
            variant="default"
            size="md"
            position="top"
            fullWidth
          />
        </div>
      </div>

      {/* Disabled Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled Tabs</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Tabs
            items={disabledTabs}
            defaultActiveTab="active"
            variant="default"
            size="md"
            position="top"
          />
        </div>
        <p className="text-xs text-gray-500">
          The "Disabled Tab" cannot be clicked or accessed
        </p>
      </div>

      {/* Scrollable Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Scrollable Tabs with Navigation Arrows</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            When there are many tabs that don't fit in the container, scroll arrows will appear to navigate through them.
          </p>
          <Tabs
            items={manyTabs}
            defaultActiveTab="tab1"
            variant="default"
            size="md"
            position="top"
            showScrollArrows={true}
          />
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 mb-4">
            Pills variant with scroll arrows:
          </p>
          <Tabs
            items={manyTabs}
            defaultActiveTab="tab1"
            variant="pills"
            size="md"
            position="top"
            showScrollArrows={true}
          />
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 mb-4">
            Underline variant with scroll arrows:
          </p>
          <Tabs
            items={manyTabs}
            defaultActiveTab="tab1"
            variant="underline"
            size="md"
            position="top"
            showScrollArrows={true}
          />
        </div>
        <p className="text-xs text-gray-500">
          Use the left and right arrow buttons to scroll through tabs, or scroll with your mouse/trackpad
        </p>
      </div>

      {/* Left/Right Scrollable Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Left/Right Position Scrollable Tabs</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-indigo-600 mb-4">
            Left and right positioned tabs now support vertical scrolling with up/down arrow navigation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-indigo-900 mb-2">Left Position with Many Tabs</h4>
              <div className="h-80">
                <Tabs
                  items={manyTabs}
                  defaultActiveTab="tab1"
                  variant="default"
                  size="md"
                  position="left"
                  showScrollArrows={true}
                />
              </div>
            </div>
            <div>
              <h4 className="font-medium text-indigo-900 mb-2">Right Position with Many Tabs</h4>
              <div className="h-80">
                <Tabs
                  items={manyTabs}
                  defaultActiveTab="tab1"
                  variant="pills"
                  size="md"
                  position="right"
                  showScrollArrows={true}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500">
          • Up/down arrows appear when tabs exceed the container height<br/>
          • Vertical scrolling with smooth animations<br/>
          • Works with all tab variants and sizes
        </p>
      </div>

      {/* Mobile Responsive Tabs */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mobile Responsive Tabs</h3>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 mb-4">
            On mobile devices, scroll arrows appear even with fewer tabs to ensure better navigation. 
            Try resizing your browser window to see the responsive behavior.
          </p>
          <Tabs
            items={overviewTabs}
            defaultActiveTab="overview"
            variant="default"
            size="md"
            position="top"
            showScrollArrows={true}
            mobileScrollArrows={true}
            mobileBreakpoint="md"
          />
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-600 mb-4">
            Mobile-optimized with smaller arrows and better touch targets:
          </p>
          <Tabs
            items={profileTabs}
            defaultActiveTab="personal"
            variant="pills"
            size="sm"
            position="top"
            showScrollArrows={true}
            mobileScrollArrows={true}
            mobileBreakpoint="lg"
          />
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600 mb-4">
            Disabled mobile scroll arrows (arrows only show when content overflows):
          </p>
          <Tabs
            items={overviewTabs}
            defaultActiveTab="overview"
            variant="underline"
            size="md"
            position="top"
            showScrollArrows={true}
            mobileScrollArrows={false}
          />
        </div>
        <p className="text-xs text-gray-500">
          • Mobile scroll arrows appear on screens smaller than the specified breakpoint<br/>
          • Arrows are smaller and more touch-friendly on mobile<br/>
          • Scroll snap behavior improves mobile navigation<br/>
          • Customizable breakpoint: sm (640px), md (768px), lg (1024px), xl (1280px)
        </p>
      </div>

      {/* Profile Form Example */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Profile Form Example</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <Tabs
            items={profileTabs}
            defaultActiveTab="personal"
            variant="pills"
            size="md"
            position="top"
          />
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-indigo-700 mb-2">
              Current active tab: {activeTab}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Go to Overview
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Go to Analytics
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Go to Settings
              </button>
            </div>
          </div>
          
          <Tabs
            items={overviewTabs}
            defaultActiveTab={activeTab}
            onChange={handleTabChange}
            variant="default"
            size="md"
            position="top"
          />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Content Organization</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Organize related content into logical sections with tabs
            </p>
            <Tabs
              items={[
                {
                  id: 'details',
                  label: 'Details',
                  content: <div className="p-3 text-sm">Product details and specifications</div>
                },
                {
                  id: 'reviews',
                  label: 'Reviews',
                  content: <div className="p-3 text-sm">Customer reviews and ratings</div>
                },
                {
                  id: 'shipping',
                  label: 'Shipping',
                  content: <div className="p-3 text-sm">Shipping information and policies</div>
                }
              ]}
              defaultActiveTab="details"
              variant="pills"
              size="sm"
              position="top"
            />
          </div>
          
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium text-teal-900 mb-2">Settings Panel</h4>
            <p className="text-sm text-teal-700 mb-3">
              Organize settings into logical categories
            </p>
            <Tabs
              items={[
                {
                  id: 'general',
                  label: 'General',
                  content: <div className="p-3 text-sm">General application settings</div>
                },
                {
                  id: 'privacy',
                  label: 'Privacy',
                  content: <div className="p-3 text-sm">Privacy and security settings</div>
                },
                {
                  id: 'notifications',
                  label: 'Notifications',
                  content: <div className="p-3 text-sm">Notification preferences</div>
                }
              ]}
              defaultActiveTab="general"
              variant="underline"
              size="sm"
              position="top"
            />
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Keyboard Navigation</h4>
            <p className="text-xs text-pink-700 mb-2">
              Use arrow keys, Home, End, and Tab to navigate between tabs
            </p>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="default"
              size="sm"
              position="top"
            />
          </div>
          
          <div className="p-4 bg-cyan-50 rounded-lg">
            <h4 className="font-medium text-cyan-900 mb-2">Custom Icons</h4>
            <p className="text-xs text-cyan-700 mb-2">
              Each tab can have custom icons for better visual hierarchy
            </p>
            <Tabs
              items={overviewTabs.slice(0, 2)}
              defaultActiveTab="overview"
              variant="pills"
              size="sm"
              position="top"
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Component Features:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• 3 variants: default, pills, underline</li>
            <li>• 3 sizes: small, medium, large</li>
            <li>• 4 positions: top, bottom, left, right</li>
            <li>• Full width support for responsive layouts</li>
            <li>• Custom icons for each tab</li>
            <li>• Disabled tab support</li>
            <li>• Keyboard navigation (arrows, Home, End)</li>
            <li>• Scrollable tabs with navigation arrows</li>
            <li>• Horizontal scrolling for top/bottom positions</li>
            <li>• Vertical scrolling for left/right positions</li>
            <li>• Mobile-responsive scroll arrows</li>
            <li>• Customizable mobile breakpoints</li>
            <li>• Auto-scroll to active tab</li>
            <li>• Smooth scrolling animations</li>
            <li>• Scroll snap behavior for mobile</li>
            <li>• Touch-friendly mobile controls</li>
            <li>• Accessibility features with proper ARIA attributes</li>
            <li>• TypeScript support with comprehensive interfaces</li>
            <li>• Custom styling and className support</li>
            <li>• onChange callback for tab state management</li>
            <li>• Responsive design with Tailwind CSS</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
