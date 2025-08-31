import React, { useState } from 'react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerPosition } from './drawer'

export const DrawerExample: React.FC = () => {
  const [drawerState, setDrawerState] = useState({
    right: false,
    left: false,
    top: false,
    bottom: false,
    'top-left': false,
    'top-right': false,
    'bottom-left': false,
    'bottom-right': false,
    'top-center': false,
    center: false,
    'bottom-center': false,
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

      {/* Corner Drawer Triggers */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Corner Drawers</h2>
        <p className="text-gray-600 mb-4">New corner positions with smooth animations from each corner</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => openDrawer('top-left')}
            className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↖</div>
              <div className="font-semibold">Top Left</div>
              <div className="text-sm opacity-90">Corner drawer</div>
            </div>
          </button>

          <button
            onClick={() => openDrawer('top-right')}
            className="p-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↗</div>
              <div className="font-semibold">Top Right</div>
              <div className="text-sm opacity-90">Corner drawer</div>
            </div>
          </button>

          <button
            onClick={() => openDrawer('bottom-left')}
            className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↙</div>
              <div className="font-semibold">Bottom Left</div>
              <div className="text-sm opacity-90">Corner drawer</div>
            </div>
          </button>

          <button
            onClick={() => openDrawer('bottom-right')}
            className="p-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↘</div>
              <div className="font-semibold">Bottom Right</div>
              <div className="text-sm opacity-90">Corner drawer</div>
            </div>
          </button>
        </div>
      </div>

      {/* Center Drawer Triggers */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Center Drawers</h2>
        <p className="text-gray-600 mb-4">Centered positions with smooth scale and slide animations</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => openDrawer('top-center')}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↑</div>
              <div className="font-semibold">Top Center</div>
              <div className="text-sm opacity-90">Centered top</div>
            </div>
          </button>

          <button
            onClick={() => openDrawer('center')}
            className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">●</div>
              <div className="font-semibold">Center</div>
              <div className="text-sm opacity-90">Middle of screen</div>
            </div>
          </button>

          <button
            onClick={() => openDrawer('bottom-center')}
            className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↓</div>
              <div className="font-semibold">Bottom Center</div>
              <div className="text-sm opacity-90">Centered bottom</div>
            </div>
          </button>
        </div>
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

      {/* Top Left Corner Drawer */}
      <Drawer
        open={drawerState['top-left']}
        onClose={() => closeDrawer('top-left')}
        position="top-left"
        size="350px"
        mobileSize="80vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('top-left')}>
          <h2 className="text-xl font-semibold">Quick Menu</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            <button className="w-full p-3 text-left bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">🚨</span>
                <span>Emergency</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">⚠️</span>
                <span>Alerts</span>
              </div>
            </button>
            <button className="w-full p-3 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-xl">📢</span>
                <span>Announcements</span>
              </div>
            </button>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Top Right Corner Drawer */}
      <Drawer
        open={drawerState['top-right']}
        onClose={() => closeDrawer('top-right')}
        position="top-right"
        size="350px"
        mobileSize="80vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('top-right')}>
          <h2 className="text-xl font-semibold">User Profile</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-600">john.doe@example.com</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="text-green-600 font-medium">Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Role:</span>
                <span className="font-medium">Admin</span>
              </div>
            </div>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Bottom Left Corner Drawer */}
      <Drawer
        open={drawerState['bottom-left']}
        onClose={() => closeDrawer('bottom-left')}
        position="bottom-left"
        size="350px"
        mobileSize="80vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('bottom-left')}>
          <h2 className="text-xl font-semibold">Recent Files</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <span className="text-2xl">📄</span>
              <div>
                <div className="font-medium">document.pdf</div>
                <div className="text-sm text-gray-500">Modified 2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <span className="text-2xl">🖼️</span>
              <div>
                <div className="font-medium">image.jpg</div>
                <div className="text-sm text-gray-500">Modified 1 day ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-medium">report.xlsx</div>
                <div className="text-sm text-gray-500">Modified 3 days ago</div>
              </div>
            </div>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Bottom Right Corner Drawer */}
      <Drawer
        open={drawerState['bottom-right']}
        onClose={() => closeDrawer('bottom-right')}
        position="bottom-right"
        size="350px"
        mobileSize="80vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('bottom-right')}>
          <h2 className="text-xl font-semibold">System Status</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>CPU Usage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Memory</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">42%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Disk Space</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">78%</span>
                </div>
              </div>
            </div>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Top Center Drawer */}
      <Drawer
        open={drawerState['top-center']}
        onClose={() => closeDrawer('top-center')}
        position="top-center"
        size="400px"
        mobileSize="90vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('top-center')}>
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📧</div>
                <div className="font-medium">Send Email</div>
              </div>
            </button>
            <button className="p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📅</div>
                <div className="font-medium">Schedule</div>
              </div>
            </button>
            <button className="p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-medium">Analytics</div>
              </div>
            </button>
            <button className="p-4 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-medium">Settings</div>
              </div>
            </button>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Center Drawer */}
      <Drawer
        open={drawerState['center']}
        onClose={() => closeDrawer('center')}
        position="center"
        size="500px"
        mobileSize="95vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('center')}>
          <h2 className="text-xl font-semibold">Welcome!</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto flex items-center justify-center text-white text-3xl">
              👋
            </div>
            <h3 className="text-lg font-semibold">Hello there!</h3>
            <p className="text-gray-600">
              This is a centered drawer that appears in the middle of the screen with a beautiful scale animation.
            </p>
            <div className="pt-4">
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </DrawerBody>
      </Drawer>

      {/* Bottom Center Drawer */}
      <Drawer
        open={drawerState['bottom-center']}
        onClose={() => closeDrawer('bottom-center')}
        position="bottom-center"
        size="400px"
        mobileSize="90vw"
        showBackdrop={settings.showBackdrop}
        closeOnBackdropClick={settings.closeOnBackdropClick}
        closeOnEscape={settings.closeOnEscape}
        animate={settings.animate}
        animationDuration={settings.animationDuration}
        lockBodyScroll={settings.lockBodyScroll}
        mobileOptimized={settings.mobileOptimized}
      >
        <DrawerHeader onClose={() => closeDrawer('bottom-center')}>
          <h2 className="text-xl font-semibold">Share & Export</h2>
        </DrawerHeader>
        <DrawerBody>
          <div className="space-y-4">
            <button className="w-full p-4 text-left bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📤</span>
                <div>
                  <div className="font-medium">Export as PDF</div>
                  <div className="text-sm opacity-75">Download document as PDF</div>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <div>
                  <div className="font-medium">Share via Email</div>
                  <div className="text-sm opacity-75">Send to someone via email</div>
                </div>
              </div>
            </button>
            <button className="w-full p-4 text-left bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🔗</span>
                <div>
                  <div className="font-medium">Copy Link</div>
                  <div className="text-sm opacity-75">Copy shareable link</div>
                </div>
              </div>
            </button>
          </div>
        </DrawerBody>
      </Drawer>
    </div>
  )
}
