import React, { useState } from "react";
import { Layout } from "./layout";
import type { SidebarItem } from "./layout";

export const LayoutExample: React.FC = () => {
  const [sidebarPosition, setSidebarPosition] = useState<"left" | "right">(
    "left"
  );
  const [sidebarWidth, setSidebarWidth] = useState(280);
  const [isCollapsed, setIsCollapsed] = useState(false);
  


  // Define sidebar items as objects
  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
          />
        </svg>
      ),
      href: "#dashboard",
    },
    {
      id: "users",
      label: "Users",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
      ),
      href: "#users",
      badge: 12,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),

      children: [
        {
          id: "reports",
          label: "Reports",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          ),

          children: [
            {
              id: "daily-reports",
              label: "Daily Reports",
              icon: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              href: "#daily-reports",
            },
            {
              id: "weekly-reports",
              label: "Weekly Reports",
              icon: (
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ),
              href: "#weekly-reports",
            },
          ],
        },
        {
          id: "insights",
          label: "Insights",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          href: "#insights",
        },
        {
          id: "metrics",
          label: "Metrics",
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          ),
          href: "#metrics",
        },
      ],
    },
    {
      id: "settings",
      label: "Settings",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),

      children: [
        {
          id: "general-settings",
          label: "General",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
          href: "#general-settings",
        },
        {
          id: "security-settings",
          label: "Security",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          ),
          href: "#security-settings",
        },
        {
          id: "notifications-settings",
          label: "Notifications",
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5z"
              />
            </svg>
          ),
          href: "#notifications-settings",
        },
      ],
    },
    {
      id: "new-project",
      label: "New Project",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      onClick: () => alert("New Project clicked!"),
    },
    {
      id: "messages",
      label: "Messages",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
          />
        </svg>
      ),
      href: "#messages",
      badge: 3,
    },
  ];

  return (
    <div className="h-screen">
      <Layout
        sidebarItems={sidebarItems}
        sidebarPosition={sidebarPosition}
        sidebarWidth={sidebarWidth}
        collapsedWidth={64}
        isCollapsed={isCollapsed}
        onCollapseToggle={setIsCollapsed}
        showSidebar={true}
        onSidebarToggle={(show) => console.log("Sidebar toggled:", show)}
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
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Layout Controls
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                    />
                  </svg>
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
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
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
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
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
                  <svg
                    className="w-5 h-5 mr-2 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
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
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
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
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Automatic Expandable Navigation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Click parent items to expand/collapse children automatically - no manual state management needed!
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
                {`// Define sidebar items as objects
const sidebarItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
    href: '#dashboard'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    href: '#settings',
    children: [
      {
        id: 'general',
        label: 'General',
        icon: <GeneralIcon />,
        href: '#general'
      },
      {
        id: 'security',
        label: 'Security',
        icon: <SecurityIcon />,
        href: '#security'
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

export default LayoutExample;
