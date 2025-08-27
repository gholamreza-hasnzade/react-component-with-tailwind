import React, { useState } from "react";
import { Switch } from "./switch";
import { FaSun, FaMoon, FaBell, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export const SwitchExample: React.FC = () => {
  const [switches, setSwitches] = useState({
    notifications: false,
    darkMode: true,
    sound: false,
    autoSave: true,
    location: false,
    updates: true,
  });

  const [loadingSwitch, setLoadingSwitch] = useState<string | null>(null);

  const handleSwitchChange = (key: string, value: boolean) => {
    setSwitches(prev => ({ ...prev, [key]: value }));
  };

  const handleLoadingSwitch = (key: string) => {
    setLoadingSwitch(key);
    setTimeout(() => setLoadingSwitch(null), 2000);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Switch Component Examples</h1>
        <p className="text-gray-600">A comprehensive showcase of the Switch component features</p>
      </div>

      {/* Basic Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basic Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Switch
              variant="default"
              checked={switches.notifications}
              onChange={(checked) => handleSwitchChange("notifications", checked)}
              label="Default Switch"
              description="Basic switch with default styling"
            />
            
            <Switch
              variant="primary"
              checked={switches.darkMode}
              onChange={(checked) => handleSwitchChange("darkMode", checked)}
              label="Primary Switch"
              description="Primary variant with blue accent"
            />
            
            <Switch
              variant="secondary"
              checked={switches.sound}
              onChange={(checked) => handleSwitchChange("sound", checked)}
              label="Secondary Switch"
              description="Secondary variant with slate accent"
            />
          </div>
          
          <div className="space-y-4">
            <Switch
              variant="success"
              checked={switches.autoSave}
              onChange={(checked) => handleSwitchChange("autoSave", checked)}
              label="Success Switch"
              description="Success variant with green accent"
            />
            
            <Switch
              variant="warning"
              checked={switches.location}
              onChange={(checked) => handleSwitchChange("location", checked)}
              label="Warning Switch"
              description="Warning variant with amber accent"
            />
            
            <Switch
              variant="error"
              checked={switches.updates}
              onChange={(checked) => handleSwitchChange("updates", checked)}
              label="Error Switch"
              description="Error variant with red accent"
            />
          </div>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Sizes</h2>
        <div className="space-y-4">
          <Switch
            size="sm"
            variant="primary"
            checked={switches.notifications}
            onChange={(checked) => handleSwitchChange("notifications", checked)}
            label="Small Switch"
            description="Compact size for tight spaces"
          />
          
          <Switch
            size="md"
            variant="primary"
            checked={switches.darkMode}
            onChange={(checked) => handleSwitchChange("darkMode", checked)}
            label="Medium Switch (Default)"
            description="Standard size for most use cases"
          />
          
          <Switch
            size="lg"
            variant="primary"
            checked={switches.sound}
            onChange={(checked) => handleSwitchChange("sound", checked)}
            label="Large Switch"
            description="Larger size for better touch targets"
          />
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">With Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Switch
              variant="primary"
              showIcons
              checked={switches.darkMode}
              onChange={(checked) => handleSwitchChange("darkMode", checked)}
              label="Dark Mode Toggle"
              description="With checkmark and X icons"
            />
            
            <Switch
              variant="success"
              showIcons
              checked={switches.notifications}
              onChange={(checked) => handleSwitchChange("notifications", checked)}
              label="Notifications"
              description="With default icons"
            />
          </div>
          
          <div className="space-y-4">
            <Switch
              variant="warning"
              showIcons
              checkedIcon={<FaBell />}
              uncheckedIcon={<FaBell />}
              checked={switches.sound}
              onChange={(checked) => handleSwitchChange("sound", checked)}
              label="Sound Alerts"
              description="With custom bell icon"
            />
            
            <Switch
              variant="info"
              showIcons
              checkedIcon={<FaVolumeUp />}
              uncheckedIcon={<FaVolumeMute />}
              checked={switches.autoSave}
              onChange={(checked) => handleSwitchChange("autoSave", checked)}
              label="Volume Control"
              description="With custom volume icons"
            />
          </div>
        </div>
      </section>

      {/* Form Layout */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Form Layout</h2>
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Account Settings</h3>
          <div className="space-y-4">
            <Switch
              variant="primary"
              formLayout
              checked={switches.darkMode}
              onChange={(checked) => handleSwitchChange("darkMode", checked)}
              label="Dark Mode"
              description="Enable dark theme for better viewing in low light"
            />
            
            <Switch
              variant="success"
              formLayout
              checked={switches.autoSave}
              onChange={(checked) => handleSwitchChange("autoSave", checked)}
              label="Auto Save"
              description="Automatically save your work every 5 minutes"
            />
            
            <Switch
              variant="warning"
              formLayout
              checked={switches.location}
              onChange={(checked) => handleSwitchChange("location", checked)}
              label="Location Services"
              description="Allow access to your location for personalized content"
            />
            
            <Switch
              variant="info"
              formLayout
              checked={switches.updates}
              onChange={(checked) => handleSwitchChange("updates", checked)}
              label="Push Notifications"
              description="Receive notifications about important updates"
            />
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Loading States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Switch
              variant="primary"
              loading={loadingSwitch === "notifications"}
              checked={switches.notifications}
              onChange={() => handleLoadingSwitch("notifications")}
              label="Loading Switch"
              description="Click to see loading state"
            />
            
            <Switch
              variant="success"
              loading={loadingSwitch === "darkMode"}
              checked={switches.darkMode}
              onChange={() => handleLoadingSwitch("darkMode")}
              label="Dark Mode Loading"
              description="With loading animation"
            />
          </div>
          
          <div className="space-y-4">
            <Switch
              variant="warning"
              loading={loadingSwitch === "sound"}
              checked={switches.sound}
              onChange={() => handleLoadingSwitch("sound")}
              label="Sound Loading"
              description="Loading with warning variant"
            />
            
            <Switch
              variant="error"
              loading={loadingSwitch === "autoSave"}
              checked={switches.autoSave}
              onChange={() => handleLoadingSwitch("autoSave")}
              label="Auto Save Loading"
              description="Loading with error variant"
            />
          </div>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Disabled States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Switch
              variant="primary"
              disabled
              checked={true}
              label="Disabled (Checked)"
              description="Switch is disabled and cannot be changed"
            />
            
            <Switch
              variant="success"
              disabled
              checked={false}
              label="Disabled (Unchecked)"
              description="Disabled switch in unchecked state"
            />
          </div>
          
          <div className="space-y-4">
            <Switch
              variant="warning"
              disabled
              showIcons
              checked={true}
              label="Disabled with Icons"
              description="Disabled switch with icons"
            />
            
            <Switch
              variant="error"
              disabled
              checked={false}
              label="Disabled Error Switch"
              description="Disabled switch with error variant"
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Demo</h2>
        <div className="p-6 bg-blue-50 rounded-lg">
          <p className="text-blue-800 mb-4">
            Try toggling these switches to see the different states and animations.
            Use Tab + Enter/Space for keyboard navigation.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Switch
                variant="primary"
                showIcons
                checked={switches.darkMode}
                onChange={(checked) => handleSwitchChange("darkMode", checked)}
                label="Theme Toggle"
                description="Switch between light and dark themes"
              />
              
              <Switch
                variant="success"
                checked={switches.autoSave}
                onChange={(checked) => handleSwitchChange("autoSave", checked)}
                label="Auto Save Feature"
                description="Automatically save your work"
              />
            </div>
            
            <div className="space-y-4">
              <Switch
                variant="warning"
                showIcons
                checkedIcon={<FaBell />}
                uncheckedIcon={<FaBell />}
                checked={switches.notifications}
                onChange={(checked) => handleSwitchChange("notifications", checked)}
                label="Notification Bell"
                description="Toggle notification alerts"
              />
              
              <Switch
                variant="info"
                checked={switches.location}
                onChange={(checked) => handleSwitchChange("location", checked)}
                label="Location Access"
                description="Allow location-based features"
              />
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-100 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Current State:</strong> {Object.entries(switches).filter(([_, value]) => value).length} switches are ON
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Accessibility Features</h2>
        <div className="p-4 bg-green-50 rounded-lg">
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Proper ARIA attributes (role="switch", aria-checked)</li>
            <li>• Keyboard navigation support (Tab, Enter, Space)</li>
            <li>• Focus management with visible focus rings</li>
            <li>• Screen reader friendly with proper labeling</li>
            <li>• High contrast color schemes</li>
            <li>• Proper button semantics for interactive elements</li>
            <li>• Accessible labels and descriptions</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
