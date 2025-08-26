import React, { useState } from "react";
import { Badge } from "./badge";
import { FaBell, FaCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

export const BadgeExample: React.FC = () => {
  const [dismissedBadges, setDismissedBadges] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedBadges(prev => new Set([...prev, id]));
  };

  const handleClick = (message: string) => {
    alert(`Badge clicked: ${message}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Badge Component Examples
          </h1>
          <p className="text-gray-600">
            Explore different variants, sizes, and features of the Badge component
          </p>
        </div>

        {/* Basic Variants */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Variants</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="primary">Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sizes</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge size="sm" variant="primary">Small</Badge>
              <Badge size="md" variant="primary">Medium</Badge>
              <Badge size="lg" variant="primary">Large</Badge>
            </div>
          </div>
        </section>

        {/* Rounded Variants */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Rounded Variants</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="primary" rounded>Rounded Primary</Badge>
              <Badge variant="success" rounded>Rounded Success</Badge>
              <Badge variant="outline" rounded>Rounded Outline</Badge>
            </div>
          </div>
        </section>

        {/* With Dots */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">With Status Dots</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="success" showDot>Online</Badge>
              <Badge variant="error" showDot>Offline</Badge>
              <Badge variant="warning" showDot>Away</Badge>
              <Badge variant="info" showDot>Busy</Badge>
            </div>
          </div>
        </section>

        {/* With Icons */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">With Icons</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Left Icons (Default)</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="primary" icon={<FaBell />}>Notifications</Badge>
                  <Badge variant="success" icon={<FaCheck />}>Completed</Badge>
                  <Badge variant="warning" icon={<FaExclamationTriangle />}>Warning</Badge>
                  <Badge variant="info" icon={<FaInfoCircle />}>Info</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Right Icons</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="primary" icon={<FaTimes />} iconPosition="right">Close</Badge>
                  <Badge variant="success" icon={<FaCheck />} iconPosition="right">Done</Badge>
                  <Badge variant="error" icon={<FaTimes />} iconPosition="right">Remove</Badge>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Combined Features</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="primary" icon={<FaBell />} showDot size="sm">New</Badge>
                  <Badge variant="success" icon={<FaCheck />} rounded>Verified</Badge>
                  <Badge variant="warning" icon={<FaExclamationTriangle />} clickable onClick={() => handleClick("Warning badge clicked!")}>Clickable</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Clickable Badges */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Clickable Badges</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge 
                variant="primary" 
                clickable 
                onClick={() => handleClick("Primary badge clicked!")}
              >
                Click Me
              </Badge>
              <Badge 
                variant="success" 
                clickable 
                rounded
                onClick={() => handleClick("Success badge clicked!")}
              >
                Click Me Too
              </Badge>
            </div>
          </div>
        </section>

        {/* Dismissible Badges */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Dismissible Badges</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex flex-wrap gap-3 items-center">
              {!dismissedBadges.has("badge1") && (
                <Badge 
                  variant="primary" 
                  dismissible 
                  onDismiss={() => handleDismiss("badge1")}
                >
                  Dismissible Primary
                </Badge>
              )}
              {!dismissedBadges.has("badge2") && (
                <Badge 
                  variant="warning" 
                  dismissible 
                  rounded
                  onDismiss={() => handleDismiss("badge2")}
                >
                  Dismissible Warning
                </Badge>
              )}
              {!dismissedBadges.has("badge3") && (
                <Badge 
                  variant="error" 
                  dismissible 
                  showDot
                  onDismiss={() => handleDismiss("badge3")}
                >
                  Dismissible Error
                </Badge>
              )}
            </div>
            {dismissedBadges.size > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setDismissedBadges(new Set())}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Reset Dismissed Badges
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Real-world Examples */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Real-world Examples</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            {/* User Status */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">User Status:</span>
              <Badge variant="success" showDot size="sm">Active</Badge>
              <Badge variant="warning" showDot size="sm">Pending</Badge>
              <Badge variant="error" showDot size="sm">Suspended</Badge>
            </div>

            {/* Task Priority */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Task Priority:</span>
              <Badge variant="error" size="sm">High</Badge>
              <Badge variant="warning" size="sm">Medium</Badge>
              <Badge variant="success" size="sm">Low</Badge>
            </div>

            {/* Categories */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Categories:</span>
              <Badge variant="primary" size="sm">Frontend</Badge>
              <Badge variant="info" size="sm">Backend</Badge>
              <Badge variant="secondary" size="sm">DevOps</Badge>
              <Badge variant="outline" size="sm">Design</Badge>
            </div>

            {/* Notification Count */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Notifications:</span>
              <Badge variant="error" size="sm" icon={<FaBell />}>3</Badge>
              <Badge variant="warning" size="sm" icon={<FaBell />}>5</Badge>
              <Badge variant="info" size="sm" icon={<FaBell />}>12</Badge>
            </div>

            {/* Status with Icons */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">System Status:</span>
              <Badge variant="success" size="sm" icon={<FaCheck />}>Connected</Badge>
              <Badge variant="error" size="sm" icon={<FaTimes />}>Disconnected</Badge>
              <Badge variant="warning" size="sm" icon={<FaExclamationTriangle />}>Maintenance</Badge>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Interactive Demo</h2>
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Custom Badge</h3>
                <div className="space-y-3">
                  <Badge 
                    variant="primary" 
                    size="md" 
                    rounded 
                    showDot 
                    clickable
                    onClick={() => handleClick("Custom badge clicked!")}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    Custom Styled
                  </Badge>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Status Indicator</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" showDot size="sm">Connected</Badge>
                    <span className="text-sm text-gray-600">Database connection active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="warning" showDot size="sm">Syncing</Badge>
                    <span className="text-sm text-gray-600">Data synchronization in progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
