import React, { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  sidebarItems?: SidebarItem[];
  sidebarPosition?: "left" | "right";
  sidebarWidth?: number;
  collapsedWidth?: number;
  isCollapsed?: boolean;
  onCollapseToggle?: (collapsed: boolean) => void;
  showSidebar?: boolean;
  onSidebarToggle?: (show: boolean) => void;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  sidebar,
  sidebarItems = [],
  sidebarPosition = "left",
  sidebarWidth = 280,
  collapsedWidth = 64,
  isCollapsed = false,
  onCollapseToggle,
  showSidebar = true,
  onSidebarToggle,
  className,
  sidebarClassName,
  contentClassName,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(showSidebar);
  const [isCollapsedState, setIsCollapsedState] = useState(isCollapsed);
  
  // Internal state for managing expanded items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  
  // Toggle function for expandable items
  const toggleItem = useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);

  const handleSidebarToggle = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onSidebarToggle?.(newState);
  };

  const handleCollapseToggle = () => {
    const newState = !isCollapsedState;
    setIsCollapsedState(newState);
    onCollapseToggle?.(newState);
  };

  const currentSidebarWidth = isCollapsedState ? collapsedWidth : sidebarWidth;

  const renderSidebarItems = (items: SidebarItem[] = sidebarItems, level: number = 0) => {
    if (items.length === 0) {
      return sidebar || null;
    }

    return (
      <div
        className={cn(
          "space-y-2",
          isCollapsedState ? "flex flex-col items-center" : ""
        )}
      >
        {items.map((item) => (
          <div key={item.id} className={isCollapsedState ? "w-full" : ""}>
            {/* Main Item */}
            <div className="relative">
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors group",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-start"
                  )}
                  style={!isCollapsedState && level > 0 ? { paddingLeft: `${16 + (level * 20)}px` } : {}}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!isCollapsedState && (
                    <>
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                      {/* Expand/Collapse Arrow for items with children */}
                      {item.children && item.children.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItem(item.id);
                          }}
                          className="ml-auto p-1 rounded hover:bg-blue-100 transition-colors"
                          aria-label={expandedItems.has(item.id) ? `Collapse ${item.label}` : `Expand ${item.label}`}
                          title={expandedItems.has(item.id) ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        >
                          <svg
                            className={cn(
                              "w-4 h-4 text-gray-500 transition-transform duration-200",
                              expandedItems.has(item.id) ? "rotate-90" : ""
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors group",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-start w-full"
                  )}
                  style={!isCollapsedState && level > 0 ? { paddingLeft: `${16 + (level * 20)}px` } : {}}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!isCollapsedState && (
                    <>
                      <span className="ml-3 text-sm font-medium">{item.label}</span>
                      {/* Expand/Collapse Arrow for items with children */}
                      {item.children && item.children.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleItem(item.id);
                          }}
                          className="ml-auto p-1 rounded hover:bg-blue-100 transition-colors"
                          aria-label={expandedItems.has(item.id) ? `Collapse ${item.label}` : `Expand ${item.label}`}
                          title={expandedItems.has(item.id) ? `Collapse ${item.label}` : `Expand ${item.label}`}
                        >
                          <svg
                            className={cn(
                              "w-4 h-4 text-gray-500 transition-transform duration-200",
                              expandedItems.has(item.id) ? "rotate-90" : ""
                            )}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Render Children - Always show when expanded, regardless of sidebar collapse state */}
            {item.children && item.children.length > 0 && expandedItems.has(item.id) && (
              <div className="mt-1">
                {renderSidebarItems(item.children, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* Desktop Sidebar */}
      {(sidebar || sidebarItems.length > 0) && (
        <div
          className={cn(
            "relative bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
            sidebarPosition === "left"
              ? "order-last border-l border-gray-200"
              : "order-first border-r border-gray-200",
            // Desktop: always show, Mobile: always hidden
            "hidden lg:block",
            sidebarClassName
          )}
          style={{
            width: `${currentSidebarWidth}px`,
          }}
        >
          {/* Collapse Toggle Button */}
          <button
            onClick={handleCollapseToggle}
            className={cn(
              "absolute top-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm transition-all duration-200 transform hover:scale-105",
              sidebarPosition === "left" ? "right-2" : "left-2"
            )}
            aria-label={
              isCollapsedState ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            <svg
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isCollapsedState && "rotate-180"
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  sidebarPosition === "left"
                    ? isCollapsedState
                      ? "M9 5l7 7-7 7"
                      : "M15 19l-7-7 7-7"
                    : isCollapsedState
                    ? "M15 19l-7-7 7-7"
                    : "M9 5l7 7-7 7"
                }
              />
            </svg>
          </button>

          {/* Desktop Sidebar Content */}
          <div
            className={cn(
              "h-full overflow-y-auto",
              isCollapsedState ? "p-2 pt-16" : "p-6 pt-16"
            )}
          >
            {renderSidebarItems()}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={cn("flex-1 flex flex-col overflow-hidden", contentClassName)}
      >
        {/* Header with Mobile Toggle Button */}
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            {/* Mobile Toggle Button - Always Visible on Mobile */}
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={handleSidebarToggle}
                className="lg:hidden p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 transform hover:scale-105"
                aria-label="Toggle sidebar"
              >
                {/* Mobile Hamburger Icon */}
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <span className="block w-5 h-0.5 bg-white mb-1" />
                  <span className="block w-5 h-0.5 bg-white mb-1" />
                  <span className="block w-5 h-0.5 bg-white" />
                </div>
              </button>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Notification Button */}
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                aria-label="Notifications"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
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
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  U
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700">
                  User
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-gray-50">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {(sidebar || sidebarItems.length > 0) && (
        <div
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 lg:hidden",
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
          onClick={handleSidebarToggle}
        >
          <div
            className={cn(
              "absolute top-0 h-full bg-white shadow-xl transition-transform duration-300",
              sidebarPosition === "left" ? "left-0" : "right-0",
              isSidebarOpen
                ? "translate-x-0"
                : sidebarPosition === "left"
                ? "-translate-x-full"
                : "translate-x-full"
            )}
            style={{ width: `${sidebarWidth}px` }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
              <button
                onClick={handleSidebarToggle}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Close sidebar"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Sidebar Content */}
            <div className="p-4 overflow-y-auto h-full">
              {sidebarItems.length > 0 ? renderSidebarItems() : sidebar}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
