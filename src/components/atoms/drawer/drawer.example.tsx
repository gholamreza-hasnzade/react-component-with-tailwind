import React, { useState } from 'react'
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter, type DrawerPosition } from './drawer'

export const DrawerExample: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<DrawerPosition | null>(null)
  const [drawerSize, setDrawerSize] = useState<'small' | 'big'>('small')

  const openDrawerFrom = (position: DrawerPosition) => {
    setOpenDrawer(position)
  }

  const closeDrawer = () => {
    setOpenDrawer(null)
  }

  const toggleDrawerSize = () => {
    setDrawerSize(prev => prev === 'small' ? 'big' : 'small')
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-8">Drawer Component Examples</h1>
      
      {/* Position Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => openDrawerFrom('top')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Open Top Drawer
        </button>
        
        <button
          onClick={() => openDrawerFrom('right')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Open Right Drawer
        </button>
        
        <button
          onClick={() => openDrawerFrom('bottom')}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Open Bottom Drawer
        </button>
        
        <button
          onClick={() => openDrawerFrom('left')}
          className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
        >
          Open Left Drawer
        </button>
      </div>

      {/* Top Drawer */}
      <Drawer
        open={openDrawer === 'top'}
        onClose={closeDrawer}
        position="top"
        size="300px"
        mobileSize="60vh"
        showBackdrop={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        animate={true}
        animationDuration={500}
        lockBodyScroll={true}
        mobileOptimized={true}
      >
        <DrawerHeader onClose={closeDrawer}>
          <h2 className="text-xl font-semibold">Top Drawer</h2>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-gray-600 mb-4">
            This is a top-positioned drawer. It slides down from the top of the screen.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-gray-100 rounded">Feature 1</div>
            <div className="p-3 bg-gray-100 rounded">Feature 2</div>
            <div className="p-3 bg-gray-100 rounded">Feature 3</div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeDrawer}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeDrawer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Right Drawer */}
      <Drawer
        open={openDrawer === 'right'}
        onClose={closeDrawer}
        position="right"
        size="500px"
        mobileSize="85vw"
        showBackdrop={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        animate={true}
        animationDuration={500}
        lockBodyScroll={true}
        mobileOptimized={true}
      >
        <DrawerHeader onClose={closeDrawer}>
          <h2 className="text-xl font-semibold">Right Drawer</h2>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-gray-600 mb-4">
            This is a right-positioned drawer. It slides in from the right side of the screen.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your message"
              />
            </div>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeDrawer}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={closeDrawer}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Bottom Drawer */}
      <Drawer
        open={openDrawer === 'bottom'}
        onClose={closeDrawer}
        position="bottom"
        size="400px"
        mobileSize="70vh"
        showBackdrop={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        animate={true}
        animationDuration={500}
        lockBodyScroll={true}
        mobileOptimized={true}
      >
        <DrawerHeader onClose={closeDrawer}>
          <h2 className="text-xl font-semibold">Bottom Drawer</h2>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-gray-600 mb-4">
            This is a bottom-positioned drawer. It slides up from the bottom of the screen.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-100 rounded text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">Mobile</div>
            </div>
            <div className="p-4 bg-gray-100 rounded text-center">
              <div className="text-2xl mb-2">💻</div>
              <div className="font-medium">Desktop</div>
            </div>
            <div className="p-4 bg-gray-100 rounded text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">Tablet</div>
            </div>
            <div className="p-4 bg-gray-100 rounded text-center">
              <div className="text-2xl mb-2">⌚</div>
              <div className="font-medium">Watch</div>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeDrawer}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Left Drawer */}
      <Drawer
        open={openDrawer === 'left'}
        onClose={closeDrawer}
        position="left"
        size="350px"
        mobileSize="85vw"
        showBackdrop={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        animate={true}
        animationDuration={500}
        lockBodyScroll={true}
        mobileOptimized={true}
      >
        <DrawerHeader onClose={closeDrawer}>
          <h2 className="text-xl font-semibold">Left Drawer</h2>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-gray-600 mb-4">
            This is a left-positioned drawer. It slides in from the left side of the screen.
          </p>
          <nav className="space-y-2">
            <a href="#" className="block p-3 hover:bg-gray-100 rounded transition-colors">
              🏠 Home
            </a>
            <a href="#" className="block p-3 hover:bg-gray-100 rounded transition-colors">
              👤 Profile
            </a>
            <a href="#" className="block p-3 hover:bg-gray-100 rounded transition-colors">
              ⚙️ Settings
            </a>
            <a href="#" className="block p-3 hover:bg-gray-100 rounded transition-colors">
              📧 Messages
            </a>
            <a href="#" className="block p-3 hover:bg-gray-100 rounded transition-colors">
              📊 Analytics
            </a>
          </nav>
        </DrawerBody>
        <DrawerFooter>
          <div className="text-center text-sm text-gray-500">
            Version 1.0.0
          </div>
        </DrawerFooter>
      </Drawer>

      {/* Mobile-Optimized Examples */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">📱 Mobile-Optimized Features</h2>
        <p className="text-gray-600 mb-4">
          The drawer automatically adapts to mobile devices with optimized sizing and behavior.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">🔄 Responsive Sizing</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Desktop: Uses <code>size</code> prop</li>
              <li>• Mobile: Uses <code>mobileSize</code> prop</li>
              <li>• Auto-detects screen size</li>
              <li>• Minimum width: 85vw on mobile</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white rounded-lg border">
            <h3 className="font-semibold text-lg mb-2">📱 Mobile Enhancements</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Stronger backdrop (70% opacity)</li>
              <li>• Touch-scroll prevention</li>
              <li>• iOS Safari optimization</li>
              <li>• Responsive breakpoint: 768px</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dynamic Size Drawer Example */}
      <div className="mt-12 p-6 bg-purple-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">🔄 Dynamic Size Drawer</h2>
        <p className="text-gray-600 mb-4">
          Click multiple times to see the drawer change size dynamically!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              setDrawerSize('small')
              setOpenDrawer('right')
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            🎯 Small Drawer (300px)
          </button>
          
          <button
            onClick={() => {
              setDrawerSize('big')
              setOpenDrawer('right')
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            🚀 Big Drawer (600px)
          </button>
        </div>
        
        <div className="mt-4 p-4 bg-white rounded-lg border">
          <h3 className="font-semibold text-lg mb-2">How it works:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• <strong>Small drawer</strong>: Opens with <code>size="300px"</code></li>
            <li>• <strong>Big drawer</strong>: Opens with <code>size="600px"</code></li>
            <li>• <strong>Mobile</strong>: Automatically uses <code>mobileSize="90vw"</code></li>
            <li>• <strong>Animation</strong>: Smooth transition between sizes</li>
          </ul>
        </div>

        {/* Dynamic Size Drawer Component */}
        <Drawer
          open={openDrawer === 'right' && (drawerSize === 'small' || drawerSize === 'big')}
          onClose={closeDrawer}
          position="right"
          size={drawerSize === 'small' ? '300px' : '600px'}
          mobileSize="90vw"
          showBackdrop={true}
          closeOnBackdropClick={true}
          closeOnEscape={true}
          animate={true}
          animationDuration={500}
          lockBodyScroll={true}
          mobileOptimized={true}
        >
          <DrawerHeader onClose={closeDrawer}>
            <h2 className="text-xl font-semibold">
              {drawerSize === 'small' ? '🎯 Small Drawer' : '🚀 Big Drawer'}
            </h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600 mb-4">
              This is a <strong>{drawerSize}</strong> drawer! 
              {drawerSize === 'small' 
                ? ' Perfect for quick actions and simple forms.' 
                : ' Great for complex forms and detailed content.'
              }
            </p>
            
            {drawerSize === 'small' ? (
              <div className="space-y-3">
                <div className="p-3 bg-purple-100 rounded border-l-4 border-purple-500">
                  <h3 className="font-medium text-purple-800">Quick Actions</h3>
                  <p className="text-sm text-purple-600">Simple, focused interface</p>
                </div>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                  Quick Action
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-indigo-100 rounded border-l-4 border-indigo-500">
                  <h3 className="font-medium text-indigo-800">Detailed Form</h3>
                  <p className="text-sm text-indigo-600">Complex form with multiple fields</p>
                </div>
                <form className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea rows={3} className="w-full px-3 py-2 border border-gray-300 rounded"></textarea>
                  </div>
                  <div className="flex space-x-2">
                    <button type="button" className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">
                      Save Draft
                    </button>
                    <button type="submit" className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Size: {drawerSize === 'small' ? '300px' : '600px'}
              </span>
              <button
                onClick={toggleDrawerSize}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Toggle Size
              </button>
            </div>
          </DrawerFooter>
        </Drawer>
      </div>

      {/* Custom Drawer Example */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Custom Drawer Example</h2>
        <p className="text-gray-600 mb-4">
          You can also create custom drawers with different sizes, animations, and behaviors.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              // Example of a custom drawer without backdrop
              setOpenDrawer('right')
            }}
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
          >
            Custom Size (600px)
          </button>
          
          <button
            onClick={() => {
              // Example of a custom drawer with different animation
              setOpenDrawer('bottom')
            }}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
          >
            Custom Animation (500ms)
          </button>
          
          <button
            onClick={() => {
              // Example of a custom drawer without body scroll lock
              setOpenDrawer('left')
            }}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition-colors"
          >
            No Scroll Lock
          </button>
        </div>
      </div>
    </div>
  )
}
