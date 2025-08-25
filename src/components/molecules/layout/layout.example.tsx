import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Layout } from "./layout";
import type { SidebarItem } from "./layout";
import { 
  HiHome, 
  HiUsers, 
  HiChartBar, 
  HiCog, 
  HiPlus, 
  HiChat, 
  HiDocumentReport, 
  HiCalendar, 
  HiShieldCheck, 
  HiBell, 
  HiChevronDown, 
  HiChevronRight,
  HiChevronUp,
  HiChevronLeft
} from "react-icons/hi";

// Main content component that uses routing
const LayoutContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">("left");
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Define sidebar items as objects with proper paths
  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <HiHome className="w-5 h-5" />,
      href: "/dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      id: "users",
      label: "Users",
      icon: <HiUsers className="w-5 h-5" />,
      href: "/users",
      onClick: () => navigate("/users"),
      badge: 12,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <HiChartBar className="w-5 h-5" />,
      children: [
        {
          id: "reports",
          label: "Reports",
          icon: <HiDocumentReport className="w-4 h-4" />,
          children: [
            {
              id: "daily-reports",
              label: "Daily Reports",
              href: "/analytics/reports/daily",
              onClick: () => navigate("/analytics/reports/daily"),
            },
            {
              id: "weekly-reports",
              label: "Weekly Reports",
              icon: <HiCalendar className="w-3 h-3" />,
              href: "/analytics/reports/weekly",
              onClick: () => navigate("/analytics/reports/weekly"),
            },
          ],
        },
        {
          id: "insights",
          label: "Insights",
          href: "/analytics/insights",
          onClick: () => navigate("/analytics/insights"),
        },
        {
          id: "metrics",
          label: "Metrics",
          icon: <HiChartBar className="w-4 h-4" />,
          href: "/analytics/metrics",
          onClick: () => navigate("/analytics/metrics"),
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: <HiCog className="w-5 h-5" />,
      children: [
        {
          id: "general-settings",
          label: "General",
          href: "/settings/general",
          onClick: () => navigate("/settings/general"),
        },
        {
          id: "security-settings",
          label: "Security",
          icon: <HiShieldCheck className="w-4 h-4" />,
          href: "/settings/security",
          onClick: () => navigate("/settings/security"),
        },
        {
          id: "notifications-settings",
          label: "Notifications",
          icon: <HiBell className="w-4 h-4" />,
          href: "/settings/notifications",
          onClick: () => navigate("/settings/notifications"),
        },
      ],
    },
    {
      id: "new-project",
      label: "New Project",
      icon: <HiPlus className="w-5 h-5" />,
      href: "/new-project",
      onClick: () => {
        alert("New Project clicked!");
        navigate("/new-project");
      },
    },
    {
      id: "messages",
      label: "Messages",
      icon: <HiChat className="w-5 h-5" />,
      href: "/messages",
      onClick: () => navigate("/messages"),
      badge: 3,
    },
  ];

  return (
    <div className="h-screen">
      <Layout
        sidebarItems={sidebarItems.map(item => ({
          ...item,
          onClick: item.onClick
        }))}
        sidebarPosition={sidebarPosition}
        sidebarWidth={sidebarWidth}
        collapsedWidth={64}
        isCollapsed={isCollapsed}
        onCollapseToggle={setIsCollapsed}
        showSidebar={true}
        onSidebarToggle={(show) => console.log("Sidebar toggled:", show)}
        currentLocation={location.pathname} // Pass React Router location
      >
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">
              Welcome to Layout Pro! 🎉
            </h2>
            <p className="text-blue-100 text-lg">
              A modern, responsive layout component with collapsible sidebar and
              object-based navigation.
            </p>
            
            {/* Current Route Display */}
            <div className="mt-4 p-4 bg-white/20 rounded-lg">
              <p className="text-sm text-blue-100 mb-2">Current Route:</p>
              <code className="text-lg font-mono bg-white/30 px-3 py-1 rounded">
                {location.pathname}
              </code>
            </div>
          </div>

          {/* Quick Navigation Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🚀 Quick Navigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { path: "/dashboard", label: "Dashboard", icon: "🏠" },
                { path: "/users", label: "Users", icon: "👥" },
                { path: "/analytics/reports/weekly", label: "Weekly Reports", icon: "📊" },
                { path: "/settings/security", label: "Security", icon: "🔒" },
              ].map((route) => (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    location.pathname === route.path
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="text-2xl mb-2">{route.icon}</div>
                  <div className="text-sm font-medium">{route.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Layout Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <HiChevronDown className="w-5 h-5 mr-2 text-blue-500" />
                  Sidebar Position
                </h3>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setSidebarPosition("left")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      sidebarPosition === "left"
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                    }`}
                  >
                    Left Side
                  </button>
                  <button
                    onClick={() => setSidebarPosition("right")}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      sidebarPosition === "right"
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-700 text-white hover:bg-gray-800 hover:shadow-md"
                    }`}
                  >
                    Right Side
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  The sidebar will automatically adjust its position and
                  collapse button.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <HiChevronUp className="w-5 h-5 mr-2 text-green-500" />
                  Sidebar Width
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="200"
                    max="400"
                    step="20"
                    value={sidebarWidth}
                    onChange={(e) => setSidebarWidth(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    aria-label="Sidebar width"
                    title="Adjust sidebar width"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>200px</span>
                    <span className="font-medium text-blue-600">
                      {sidebarWidth}px
                    </span>
                    <span>400px</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Adjust the expanded sidebar width.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <HiChevronLeft className="w-5 h-5 mr-2 text-purple-500" />
                  Collapse Mode
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isCollapsed
                        ? "bg-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                  </button>
                  <p className="text-sm text-gray-500">
                    Collapsed width:{" "}
                    <span className="font-medium text-purple-600">64px</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Toggle between full and icon-only sidebar views.
                </p>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              ✨ New Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiHome className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Object-Based Navigation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Define sidebar items as structured objects with icons,
                    labels, and actions
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiChevronRight className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Collapsible Sidebar
                  </h4>
                  <p className="text-sm text-gray-600">
                    Toggle between full width and icon-only mode for space
                    efficiency
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiBell className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Badge Support</h4>
                  <p className="text-sm text-gray-600">
                    Show notifications, counts, and status indicators on menu
                    items
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <HiChevronDown className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Automatic Expandable Navigation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Click parent items to expand/collapse children automatically
                    - no manual state management needed!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Code Example */}
          <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-700 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              💻 Usage Example
            </h3>
            <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
              <pre className="text-green-400 text-sm">
                {`// Import react-icons
import { HiHome, HiCog, HiShieldCheck } from "react-icons/hi";

// Define sidebar items as objects
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <HiHome className="w-5 h-5" />,
    href: '/dashboard'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <HiCog className="w-5 h-5" />,
    href: '/settings',
    children: [
      {
        id: 'general',
        label: 'General',
        href: '/general'
      },
      {
        id: 'security',
        label: 'Security',
        icon: <HiShieldCheck className="w-4 h-4" />,
        href: '/security'
      }
    ]
  }
];

// Use in Layout component
<Layout
  sidebarItems={sidebarItems}
  isCollapsed={isCollapsed}
  onCollapseToggle={setIsCollapsed}
  collapsedWidth={64}
/>`}
              </pre>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export const LayoutExample: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutContent />} />
        <Route path="/dashboard" element={<LayoutContent />} />
        <Route path="/users" element={<LayoutContent />} />
        <Route path="/analytics/reports/daily" element={<LayoutContent />} />
        <Route path="/analytics/reports/weekly" element={<LayoutContent />} />
        <Route path="/analytics/insights" element={<LayoutContent />} />
        <Route path="/analytics/metrics" element={<LayoutContent />} />
        <Route path="/settings/general" element={<LayoutContent />} />
        <Route path="/settings/security" element={<LayoutContent />} />
        <Route path="/settings/notifications" element={<LayoutContent />} />
        <Route path="/new-project" element={<LayoutContent />} />
        <Route path="/messages" element={<LayoutContent />} />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutExample;
