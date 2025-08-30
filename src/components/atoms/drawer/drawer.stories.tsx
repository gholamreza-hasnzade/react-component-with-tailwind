import React, { useState } from "react";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof Drawer> = {
  title: "Atoms/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile drawer component that slides in from any direction with customizable animations, sizes, and mobile optimization.",
      },
    },
  },
  argTypes: {
    open: { control: { type: "boolean" } },
    position: {
      control: { type: "select" },
      options: ["top", "right", "bottom", "left"],
    },
    size: { control: { type: "text" } },
    mobileSize: { control: { type: "text" } },
    showBackdrop: { control: { type: "boolean" } },
    closeOnBackdropClick: { control: { type: "boolean" } },
    closeOnEscape: { control: { type: "boolean" } },
    animate: { control: { type: "boolean" } },
    animationDuration: {
      control: { type: "range", min: 100, max: 1000, step: 100 },
    },
    lockBodyScroll: { control: { type: "boolean" } },
    mobileOptimized: { control: { type: "boolean" } },
  },
  args: {
    open: false,
    position: "right",
    size: "400px",
    mobileSize: "85vw",
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    animate: true,
    animationDuration: 300,
    lockBodyScroll: true,
    mobileOptimized: true,
  },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Drawer
        </button>
        
        <Drawer {...args} open={isOpen} onClose={() => setIsOpen(false)}>
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Default Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600">
              This is a default drawer that slides in from the right. It includes a header, body, and footer.
            </p>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export const AllPositions: Story = {
  render: () => {
    const [activeDrawer, setActiveDrawer] = useState<"top" | "right" | "bottom" | "left" | null>(null);
    
    const openDrawer = (position: "top" | "right" | "bottom" | "left") => {
      setActiveDrawer(position);
    };
    
    const closeDrawer = () => setActiveDrawer(null);
    
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Drawer Positions</h3>
          <p className="text-gray-600">Click any button to see the drawer slide in from different directions</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => openDrawer("top")}
            className="p-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↑</div>
              <div className="font-semibold">Top</div>
            </div>
          </button>
          
          <button
            onClick={() => openDrawer("right")}
            className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">→</div>
              <div className="font-semibold">Right</div>
            </div>
          </button>
          
          <button
            onClick={() => openDrawer("bottom")}
            className="p-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">↓</div>
              <div className="font-semibold">Bottom</div>
            </div>
          </button>
          
          <button
            onClick={() => openDrawer("left")}
            className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <div className="text-center">
              <div className="text-2xl mb-2">←</div>
              <div className="font-semibold">Left</div>
            </div>
          </button>
        </div>
        
        {/* Top Drawer */}
        <Drawer
          open={activeDrawer === "top"}
          onClose={closeDrawer}
          position="top"
          size="300px"
          mobileSize="50vh"
        >
          <DrawerHeader onClose={closeDrawer}>
            <h2 className="text-xl font-semibold">Top Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600">This drawer slides down from the top of the screen.</p>
          </DrawerBody>
        </Drawer>
        
        {/* Right Drawer */}
        <Drawer
          open={activeDrawer === "right"}
          onClose={closeDrawer}
          position="right"
          size="400px"
          mobileSize="85vw"
        >
          <DrawerHeader onClose={closeDrawer}>
            <h2 className="text-xl font-semibold">Right Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600">This drawer slides in from the right side of the screen.</p>
          </DrawerBody>
        </Drawer>
        
        {/* Bottom Drawer */}
        <Drawer
          open={activeDrawer === "bottom"}
          onClose={closeDrawer}
          position="bottom"
          size="400px"
          mobileSize="60vh"
        >
          <DrawerHeader onClose={closeDrawer}>
            <h2 className="text-xl font-semibold">Bottom Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600">This drawer slides up from the bottom of the screen.</p>
          </DrawerBody>
        </Drawer>
        
        {/* Left Drawer */}
        <Drawer
          open={activeDrawer === "left"}
          onClose={closeDrawer}
          position="left"
          size="400px"
          mobileSize="85vw"
        >
          <DrawerHeader onClose={closeDrawer}>
            <h2 className="text-xl font-semibold">Left Drawer</h2>
          </DrawerHeader>
          <DrawerBody>
            <p className="text-gray-600">This drawer slides in from the left side of the screen.</p>
          </DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  render: () => {
    const [activeSize, setActiveSize] = useState<string | null>(null);
    
    const sizes = [
      { name: "Small", size: "300px", mobileSize: "70vw" },
      { name: "Medium", size: "500px", mobileSize: "85vw" },
      { name: "Large", size: "700px", mobileSize: "95vw" },
      { name: "Full Width", size: "100vw", mobileSize: "100vw" },
    ];
    
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Drawer Sizes</h3>
          <p className="text-gray-600">Compare different drawer sizes and their mobile responsiveness</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sizes.map((sizeConfig) => (
            <button
              key={sizeConfig.name}
              onClick={() => setActiveSize(sizeConfig.name)}
              className="p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <div className="text-center">
                <div className="font-semibold">{sizeConfig.name}</div>
                <div className="text-sm opacity-90">{sizeConfig.size}</div>
              </div>
            </button>
          ))}
        </div>
        
        {sizes.map((sizeConfig) => (
          <Drawer
            key={sizeConfig.name}
            open={activeSize === sizeConfig.name}
            onClose={() => setActiveSize(null)}
            position="right"
            size={sizeConfig.size}
            mobileSize={sizeConfig.mobileSize}
          >
            <DrawerHeader onClose={() => setActiveSize(null)}>
              <h2 className="text-xl font-semibold">{sizeConfig.name} Drawer</h2>
            </DrawerHeader>
            <DrawerBody>
              <div className="space-y-4">
                <p className="text-gray-600">
                  This is a {sizeConfig.name.toLowerCase()} drawer with size: {sizeConfig.size}
                </p>
                <div className="p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>Desktop:</strong> {sizeConfig.size}<br />
                    <strong>Mobile:</strong> {sizeConfig.mobileSize}
                  </p>
                </div>
              </div>
            </DrawerBody>
          </Drawer>
        ))}
      </div>
    );
  },
};

export const NavigationDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Open Navigation
        </button>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
          size="320px"
          mobileSize="85vw"
        >
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Navigation Menu</h2>
          </DrawerHeader>
          <DrawerBody>
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                🏠 Dashboard
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                📁 Projects
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                👥 Team
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                📊 Analytics
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                ⚙️ Settings
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                💬 Messages
              </a>
              <a href="#" className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                🔔 Notifications
              </a>
            </nav>
          </DrawerBody>
          <DrawerFooter>
            <div className="text-center">
              <p className="text-sm text-gray-500">© 2024 Your Company</p>
              <p className="text-xs text-gray-400 mt-1">Version 2.1.0</p>
            </div>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export const SettingsDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Settings
        </button>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          size="450px"
          mobileSize="90vw"
        >
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Settings</h2>
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
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Auto-save</span>
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

              <div>
                <h3 className="font-medium mb-3">Privacy</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Share analytics data</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Allow cookies</span>
                  </label>
                </div>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export const NotificationDrawer: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const notifications = [
      {
        id: 1,
        type: "info",
        title: "New message from John Doe",
        message: "Hey! I wanted to discuss the project timeline...",
        time: "2 minutes ago",
        icon: "💬",
      },
      {
        id: 2,
        type: "success",
        title: "Project updated successfully",
        message: "Your changes have been saved and deployed.",
        time: "1 hour ago",
        icon: "✅",
      },
      {
        id: 3,
        type: "warning",
        title: "System maintenance scheduled",
        message: "Scheduled maintenance will begin in 2 hours.",
        time: "3 hours ago",
        icon: "⚠️",
      },
      {
        id: 4,
        type: "error",
        title: "Payment failed",
        message: "Your last payment attempt was unsuccessful.",
        time: "1 day ago",
        icon: "❌",
      },
    ];
    
    const getTypeStyles = (type: string) => {
      switch (type) {
        case "info":
          return "bg-blue-50 border-blue-200 text-blue-800";
        case "success":
          return "bg-green-50 border-green-200 text-green-800";
        case "warning":
          return "bg-yellow-50 border-yellow-200 text-yellow-800";
        case "error":
          return "bg-red-50 border-red-200 text-red-800";
        default:
          return "bg-gray-50 border-gray-200 text-gray-800";
      }
    };
    
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Show Notifications
        </button>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="top"
          size="400px"
          mobileSize="60vh"
        >
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Notifications</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-md ${getTypeStyles(notification.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-xl">{notification.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs mt-1 opacity-80">{notification.message}</p>
                      <p className="text-xs mt-2 opacity-60">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export const ActionSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const actions = [
      { icon: "📷", label: "Camera", color: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
      { icon: "📁", label: "Files", color: "bg-green-100 text-green-700 hover:bg-green-200" },
      { icon: "📍", label: "Location", color: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
      { icon: "🎵", label: "Music", color: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
      { icon: "📞", label: "Call", color: "bg-red-100 text-red-700 hover:bg-red-200" },
      { icon: "⚙️", label: "More", color: "bg-gray-100 text-gray-700 hover:bg-gray-200" },
    ];
    
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          Show Actions
        </button>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          size="300px"
          mobileSize="50vh"
        >
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Quick Actions</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="grid grid-cols-3 gap-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg transition-colors ${action.color}`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="text-sm font-medium">{action.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </DrawerBody>
        </Drawer>
      </div>
    );
  },
};

export const AnimationControl: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [animationDuration, setAnimationDuration] = useState(300);
    const [animate, setAnimate] = useState(true);
    
    return (
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Animation Control</h3>
          <p className="text-gray-600">Adjust animation settings and see the difference</p>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={animate}
                onChange={(e) => setAnimate(e.target.checked)}
                className="rounded border-gray-300"
              />
              <span>Enable Animations</span>
            </label>
          </div>
          
          <div className="flex flex-col items-center gap-2">
            <label className="text-sm font-medium">Animation Duration: {animationDuration}ms</label>
            <input
              type="range"
              min="100"
              max="1000"
              step="100"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(parseInt(e.target.value))}
              className="w-48"
              disabled={!animate}
              aria-label="Animation duration slider"
            />
          </div>
          
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Open Drawer
          </button>
        </div>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          size="400px"
          animate={animate}
          animationDuration={animationDuration}
        >
          <DrawerHeader onClose={() => setIsOpen(false)}>
            <h2 className="text-xl font-semibold">Animation Demo</h2>
          </DrawerHeader>
          <DrawerBody>
            <div className="space-y-4">
              <p className="text-gray-600">
                This drawer demonstrates different animation settings.
              </p>
              <div className="p-4 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Animations:</strong> {animate ? "Enabled" : "Disabled"}<br />
                  <strong>Duration:</strong> {animationDuration}ms
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Try adjusting the settings above and reopening the drawer to see the difference!
              </p>
            </div>
          </DrawerBody>
        </Drawer>
      </div>
    );
  },
};
