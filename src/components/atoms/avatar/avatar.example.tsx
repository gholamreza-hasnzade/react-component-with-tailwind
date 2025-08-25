import React, { useState } from "react";
import { Avatar } from "./avatar";
import { HiUser, HiCamera } from "react-icons/hi";

export const AvatarExample: React.FC = () => {
  const [clickedAvatar, setClickedAvatar] = useState<string>("");

  const handleAvatarClick = (name: string) => {
    setClickedAvatar(name);
    setTimeout(() => setClickedAvatar(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Avatar Component Examples
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive showcase of the Avatar component
          </p>
        </div>

        {/* Basic Sizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Sizes</h2>
          <div className="flex items-center justify-center space-x-8">
            {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
              <div key={size} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">{size.toUpperCase()}</h3>
                <Avatar size={size} alt={`${size} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Variants</h2>
          <div className="flex items-center justify-center space-x-8">
            {(["circle", "rounded", "square"] as const).map((variant) => (
              <div key={variant} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">{variant}</h3>
                <Avatar variant={variant} size="lg" alt={`${variant} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(["primary", "secondary", "success", "error", "warning", "info", "default"] as const).map((color) => (
              <div key={color} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">{color}</h3>
                <Avatar color={color} size="md" alt={`${color} Avatar`} />
              </div>
            ))}
          </div>
        </div>

        {/* Status Indicators */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Status Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {(["online", "offline", "away", "busy"] as const).map((status) => (
              <div key={status} className="text-center">
                <h3 className="text-sm font-medium text-gray-800 mb-2">{status}</h3>
                <Avatar status={status} size="md" alt={`${status} User`} />
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Notification</h3>
              <Avatar badge="3" badgeColor="error" size="md" alt="Notification Badge" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">New</h3>
              <Avatar badge="NEW" badgeColor="success" size="md" alt="New Badge" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">VIP</h3>
              <Avatar badge="VIP" badgeColor="warning" size="md" alt="VIP Badge" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Admin</h3>
              <Avatar badge="ADMIN" badgeColor="primary" size="md" alt="Admin Badge" />
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Interactive Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Clickable</h3>
              <Avatar 
                clickable 
                onClick={() => handleAvatarClick("John")}
                hoverEffect="scale"
                size="lg" 
                alt="Clickable Avatar" 
              />
              {clickedAvatar === "John" && (
                <p className="text-sm text-green-600 mt-2">Clicked!</p>
              )}
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Hover Glow</h3>
              <Avatar hoverEffect="glow" size="lg" alt="Glow Effect Avatar" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">With Border</h3>
              <Avatar border color="primary" size="lg" alt="Bordered Avatar" />
            </div>
          </div>
        </div>

        {/* Fallback Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Fallback Content</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Initials</h3>
              <Avatar size="md" alt="John Doe">JD</Avatar>
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Icon</h3>
              <Avatar size="md" alt="User Icon" fallbackIcon={<HiUser className="w-6 h-6" />} />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Custom Icon</h3>
              <Avatar size="md" alt="Camera Icon" fallbackIcon={<HiCamera className="w-6 h-6" />} />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Emoji</h3>
              <Avatar size="md" alt="Star Emoji">⭐</Avatar>
            </div>
          </div>
        </div>

        {/* Loading State */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Loading State</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">Loading</h3>
              <Avatar loading size="lg" alt="Loading Avatar" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">With Status</h3>
              <Avatar loading status="online" size="lg" alt="Loading with Status" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-800 mb-2">With Badge</h3>
              <Avatar loading badge="5" size="lg" alt="Loading with Badge" />
            </div>
          </div>
        </div>

        {/* Real-world Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Real-world Examples</h2>
          
          {/* User List */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">User List</h3>
            <div className="space-y-3">
              {[
                { name: "John Doe", role: "Admin", status: "online" as const, badge: "3" },
                { name: "Jane Smith", role: "User", status: "away" as const },
                { name: "Bob Johnson", role: "Moderator", status: "offline" as const },
                { name: "Alice Brown", role: "User", status: "busy" as const, badge: "NEW" },
              ].map((user, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <Avatar 
                    status={user.status}
                    badge={user.badge}
                    badgeColor={user.badge === "NEW" ? "success" : "error"}
                    size="md"
                    alt={user.name}
                  >
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'online' ? 'bg-green-100 text-green-800' :
                      user.status === 'away' ? 'bg-yellow-100 text-yellow-800' :
                      user.status === 'busy' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-300 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`// Simple avatar
<Avatar alt="User Avatar" />

// With custom content
<Avatar alt="John Doe">JD</Avatar>

// With image
<Avatar src="/path/to/image.jpg" alt="User Photo" />`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-green-300 mb-2">Advanced Features:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`// With status and badge
<Avatar 
  status="online"
  badge="3"
  badgeColor="error"
  size="lg"
  alt="Online User"
/>

// Interactive avatar
<Avatar 
  clickable
  onClick={() => handleClick()}
  hoverEffect="scale"
  size="md"
  alt="Clickable Avatar"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarExample;
