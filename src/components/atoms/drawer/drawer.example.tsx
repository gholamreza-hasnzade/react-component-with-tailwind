import React, { useState } from 'react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerPosition } from './drawer'

export const DrawerExample: React.FC = () => {
  const [drawerState, setDrawerState] = useState({
    right: false,
    left: false,
    top: false,
    bottom: false,
  });

  const [settings, setSettings] = useState({
    size: '400px',
    mobileSize: '85vw',
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    animate: true,
    animationDuration: 300,
    lockBodyScroll: true,
    mobileOptimized: true,
  });

  const openDrawer = (position: DrawerPosition) => {
    setDrawerState(prev => ({ ...prev, [position]: true }));
  };

  const closeDrawer = (position: DrawerPosition) => {
    setDrawerState(prev => ({ ...prev, [position]: false }));
  };

  const handleSettingChange = (key: keyof typeof settings, value: string | number | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Drawer Component Examples</h1>
        <p className="text-gray-600">Advanced drawer component with multiple positions, sizes, and configurations</p>
      </div>

      {/* Settings Panel */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Configuration Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Desktop Size</label>
            <select
              value={settings.size}
              onChange={(e) => handleSettingChange('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select desktop size"
            >
              <option value="300px">300px</option>
              <option value="400px">400px</option>
              <option value="500px">500px</option>
              <option value="600px">600px</option>
              <option value="80vw">80vw</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Size</label>
            <select
              value={settings.mobileSize}
              onChange={(e) => handleSettingChange('mobileSize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Select mobile size"
            >
              <option value="85vw">85vw</option>
              <option value="90vw">90vw</option>
              <option value="95vw">95vw</option>
              <option value="100vw">100vw</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Animation Duration</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={settings.animationDuration}
              onChange={(e) => handleSettingChange('animationDuration', parseInt(e.target.value))}
              className="w-full"
              aria-label="Animation duration slider"
            />
            <span className="text-sm text-gray-500">{settings.animationDuration}ms</span>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showBackdrop"
              checked={settings.showBackdrop}
              onChange={(e) => handleSettingChange('showBackdrop', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="showBackdrop" className="text-sm font-medium text-gray-700">Show Backdrop</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="closeOnBackdropClick"
              checked={settings.closeOnBackdropClick}
              onChange={(e) => handleSettingChange('closeOnBackdropClick', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="closeOnBackdropClick" className="text-sm font-medium text-gray-700">Close on Backdrop Click</label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="animate"
              checked={settings.animate}
              onChange={(e) => handleSettingChange('animate', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="animate" className="text-sm font-medium text-gray-700">Enable Animations</label>
          </div>
        </div>
      </div>

      {/* Drawer Triggers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => openDrawer('right')}
          className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">→</div>
            <div className="font-semibold">Right Drawer</div>
            <div className="text-sm opacity-90">Slides from right</div>
          </div>
        </button>

        <button
          onClick={() => openDrawer('left')}
          className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">←</div>
            <div className="font-semibold">Left Drawer</div>
            <div className="text-sm opacity-90">Slides from left</div>
          </div>
        </button>

        <button
          onClick={() => openDrawer('top')}
          className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">↑</div>
            <div className="font-semibold">Top Drawer</div>
            <div className="text-sm opacity-90">Slides from top</div>
          </div>
        </button>

        <button
          onClick={() => openDrawer('bottom')}
          className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <div className="text-center">
            <div className="text-2xl mb-2">↓</div>
            <div className="font-semibold">Bottom Drawer</div>
            <div className="text-sm opacity-90">Slides from bottom</div>
          </div>
        </button>
      </div>

      {/* Content Examples */}
      <div className="bg-white border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Content Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Navigation Menu</h3>
            <p className="text-gray-600 text-sm mb-3">Perfect for mobile navigation with collapsible sections</p>
            <button
              onClick={() => openDrawer('left')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Open Navigation
            </button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Settings Panel</h3>
            <p className="text-gray-600 text-sm mb-3">Ideal for configuration options and user preferences</p>
            <button
              onClick={() => openDrawer('right')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Open Settings
            </button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Notifications</h3>
            <p className="text-gray-600 text-sm mb-3">Great for displaying alerts and system messages</p>
            <button
              onClick={() => openDrawer('top')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Show Notifications
            </button>
          </div>

          <div>
            <h3 className="font-medium mb-2">Quick Actions</h3>
            <p className="text-gray-600 text-sm mb-3">Perfect for mobile-first action sheets</p>
            <button
              onClick={() => openDrawer('bottom')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Show Actions
            </button>
          </div>
        </div>
      </div>

      {/* Right Drawer */}
      <Drawer
        open={drawerState.right}
        onClose={() => closeDrawer('right')}
        position="right"
        size={settings.size}
        mobileSize={settings.mobileSize}
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('right')}>
          <h2 className="text-xl font-semibold">Settings Panel</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">User Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Push notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Dark mode</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Theme</h3>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md" aria-label="Select theme">
                <option>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>

            <div>
              <h3 className="font-medium mb-3">Language</h3>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md" aria-label="Select language">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => closeDrawer('right')}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => closeDrawer('right')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Left Drawer */}
      <Drawer
        open={drawerState.left}
        onClose={() => closeDrawer('left')}
        position="left"
        size={settings.size}
        mobileSize={settings.mobileSize}
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('left')}>
          <h2 className="text-xl font-semibold">Navigation Menu</h2>
        </DrawerHeader>
        <DrawerBody>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Dashboard
            </a>
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Projects
            </a>
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Team
            </a>
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Analytics
            </a>
            <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
              Settings
            </a>
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2024 Your Company</p>
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Top Drawer */}
      <Drawer
        open={drawerState.top}
        onClose={() => closeDrawer('top')}
        position="top"
        size="300px"
        mobileSize="50vh"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('top')}>
          <h2 className="text-xl font-semibold">Notifications</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">New message from John Doe</p>
              <p className="text-xs text-blue-600 mt-1">2 minutes ago</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-800">Project updated successfully</p>
              <p className="text-xs text-green-600 mt-1">1 hour ago</p>
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-800">System maintenance scheduled</p>
              <p className="text-xs text-yellow-600 mt-1">3 hours ago</p>
            </div>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        open={drawerState.bottom}
        onClose={() => closeDrawer('bottom')}
        position="bottom"
        size="400px"
        mobileSize="60vh"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('bottom')}>
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
              <div className="text-2xl mb-2">📷</div>
              <div className="text-sm font-medium">Camera</div>
            </button>
            <button className="p-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
              <div className="text-2xl mb-2">📁</div>
              <div className="text-sm font-medium">Files</div>
            </button>
            <button className="p-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
              <div className="text-2xl mb-2">📍</div>
              <div className="text-sm font-medium">Location</div>
            </button>
            <button className="p-4 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">
              <div className="text-2xl mb-2">🎵</div>
              <div className="text-sm font-medium">Music</div>
            </button>
            <button className="p-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
              <div className="text-2xl mb-2">📞</div>
              <div className="text-sm font-medium">Call</div>
            </button>
            <button className="p-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="text-sm font-medium">More</div>
            </button>
          </div>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
