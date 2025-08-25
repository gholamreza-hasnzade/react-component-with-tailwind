import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { HiChevronRight, HiBell, HiX } from "react-icons/hi";

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
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
  sidebarPosition = "right",
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  // Internal state for managing expanded items
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Close all children when sidebar is collapsed
  useEffect(() => {
    if (isCollapsedState) {
      setExpandedItems(new Set());
    }
  }, [isCollapsedState]);

  // Toggle function for expandable items
  const toggleItem = useCallback((itemId: string) => {
    setExpandedItems((prev) => {
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

  const handleItemHover = (itemId: string, event: React.MouseEvent) => {
    if (!isCollapsedState) return;
    
    // Clear any existing hide timeout
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const sidebarRect = event.currentTarget.closest('[data-sidebar]')?.getBoundingClientRect();
    
    if (sidebarRect) {
      let x: number;
      if (sidebarPosition === "left") {
        // For left sidebar: popover appears to the right
        x = sidebarRect.right + 8;
      } else {
        // For right sidebar: popover appears to the left
        x = sidebarRect.left - 8;
      }
      
      // Ensure popover doesn't go off-screen
      const popoverWidth = 220; // min-width from CSS
      const viewportWidth = window.innerWidth;
      
      if (sidebarPosition === "left" && x + popoverWidth > viewportWidth) {
        // If popover would go off right edge, position it to the left of sidebar
        x = sidebarRect.left - popoverWidth - 8;
      } else if (sidebarPosition === "right" && x - popoverWidth < 0) {
        // If popover would go off left edge, position it to the right of sidebar
        x = sidebarRect.right + 8;
      }
      
      setPopoverPosition({
        x,
        y: rect.top
      });
      setHoveredItem(itemId);
    }
  };

  const handleItemLeave = () => {
    // Set a delay before hiding the popover
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms delay
    setHideTimeout(timeout);
  };

  const handlePopoverEnter = () => {
    // Clear hide timeout when mouse enters popover
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

  const handlePopoverLeave = () => {
    // Set a delay before hiding the popover
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150); // 150ms delay
    setHideTimeout(timeout);
  };

  const renderSidebarItems = (
    items: SidebarItem[] = sidebarItems,
    level: number = 0
  ) => {
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
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-start"
                  )}
                  style={
                    !isCollapsedState && level > 0
                      ? { 
                          paddingLeft: sidebarPosition === "left" 
                            ? `${16 + level * 20}px` 
                            : "auto",
                          paddingRight: sidebarPosition === "right" 
                            ? `${16 + level * 20}px` 
                            : "auto"
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleItemHover(item.id, e)}
                  onMouseLeave={handleItemLeave}
                  onClick={item.children && item.children.length > 0 ? (e) => {
                    e.preventDefault();
                    toggleItem(item.id);
                  } : undefined}
                >
                  <div className="relative">
                    {item.icon }
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {!isCollapsedState && (
                    <>
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                      {/* Expand/Collapse Arrow for items with children - always visible */}
                      {item.children && item.children.length > 0 && (
                        <div className="ml-auto p-1">
                          <HiChevronRight
                            className={cn(
                              "w-4 h-4 text-gray-500 transition-transform duration-200",
                              expandedItems.has(item.id) ? "rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                </a>
              ) : (
                <button
                  onClick={item.children && item.children.length > 0 ? () => toggleItem(item.id) : item.onClick}
                  className={cn(
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-start w-full"
                  )}
                  style={
                    !isCollapsedState && level > 0
                      ? { 
                          paddingLeft: sidebarPosition === "left" 
                            ? `${16 + level * 20}px` 
                            : "auto",
                          paddingRight: sidebarPosition === "right" 
                            ? `${16 + level * 20}px` 
                            : "auto"
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleItemHover(item.id, e)}
                  onMouseLeave={handleItemLeave}
                  title={item.label}
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
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                      {/* Expand/Collapse Arrow for items with children - always visible */}
                      {item.children && item.children.length > 0 && (
                        <div className="ml-auto p-1">
                          <HiChevronRight
                            className={cn(
                              "w-4 h-4 text-gray-500 transition-transform duration-200",
                              expandedItems.has(item.id) ? "rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Render Children - Only show when expanded and sidebar is not collapsed */}
            {item.children &&
              item.children.length > 0 &&
              expandedItems.has(item.id) &&
              !isCollapsedState && (
                <div className="mt-1">
                  {renderSidebarItems(item.children, level + 1)}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  };

  // Mobile sidebar rendering - always shows labels and doesn't check collapsed state
  const renderMobileSidebarItems = (
    items: SidebarItem[] = sidebarItems,
    level: number = 0
  ) => {
    if (items.length === 0) {
      return sidebar || null;
    }

    return (
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id}>
            {/* Main Item */}
            <div className="relative">
              {item.href ? (
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors px-3 py-2 w-full",
                    sidebarPosition === "left" ? "justify-start" : "justify-end"
                  )}
                  style={
                    level > 0
                      ? { 
                          paddingLeft: sidebarPosition === "left" 
                            ? `${16 + level * 20}px` 
                            : "auto",
                          paddingRight: sidebarPosition === "right" 
                            ? `${16 + level * 20}px` 
                            : "auto"
                        }
                      : {}
                  }
                  onClick={item.children && item.children.length > 0 ? (e) => {
                    e.preventDefault();
                    toggleItem(item.id);
                  } : undefined}
                >
                  {sidebarPosition === "right" && item.children && item.children.length > 0 && (
                    <div className="mr-2 p-1">
                      <HiChevronRight
                        className={cn(
                          "w-4 h-4 text-gray-500 transition-transform duration-200",
                          expandedItems.has(item.id) ? "rotate-90" : ""
                        )}
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-sm font-medium",
                    sidebarPosition === "left" ? "ml-3" : "mr-3"
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Expand/Collapse Arrow for items with children - left sidebar */}
                  {sidebarPosition === "left" && item.children && item.children.length > 0 && (
                    <div className="ml-auto p-1">
                      <HiChevronRight
                        className={cn(
                          "w-4 h-4 text-gray-500 transition-transform duration-200",
                          expandedItems.has(item.id) ? "rotate-90" : ""
                        )}
                      />
                    </div>
                  )}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors px-3 py-2 w-full",
                    sidebarPosition === "left" ? "justify-start" : "justify-end"
                  )}
                  style={
                    level > 0
                      ? { 
                          paddingLeft: sidebarPosition === "left" 
                            ? `${16 + level * 20}px` 
                            : "auto",
                          paddingRight: sidebarPosition === "right" 
                            ? `${16 + level * 20}px` 
                            : "auto"
                        }
                      : {}
                  }
                  title={item.label}
                >
                  {sidebarPosition === "right" && item.children && item.children.length > 0 && (
                    <div className="mr-2 p-1">
                      <HiChevronRight
                        className={cn(
                          "w-4 h-4 text-gray-500 transition-transform duration-200",
                          expandedItems.has(item.id) ? "rotate-90" : ""
                        )}
                      />
                    </div>
                  )}
                  
                  <div className="relative">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <span className={cn(
                    "text-sm font-medium",
                    sidebarPosition === "left" ? "ml-3" : "mr-3"
                  )}>
                    {item.label}
                  </span>
                  
                  {/* Expand/Collapse Arrow for items with children - left sidebar */}
                  {sidebarPosition === "left" && item.children && item.children.length > 0 && (
                    <div className="ml-auto p-1">
                      <HiChevronRight
                        className={cn(
                          "w-4 h-4 text-gray-500 transition-transform duration-200",
                          expandedItems.has(item.id) ? "rotate-90" : ""
                        )}
                      />
                    </div>
                  )}
                </button>
              )}
            </div>

            {/* Render Children - Always show when expanded on mobile */}
            {item.children &&
              item.children.length > 0 &&
              expandedItems.has(item.id) && (
                <div className="mt-1">
                  {renderMobileSidebarItems(item.children, level + 1)}
                </div>
              )}
          </div>
        ))}
      </div>
    );
  };

  // Render popover portal
  const renderPopover = () => {
    if (!hoveredItem || !isCollapsedState) return null;

    const item = sidebarItems.find(i => i.id === hoveredItem);
    if (!item || !item.children || item.children.length === 0) return null;

    const popoverContent = (
      <>
        {/* Invisible bridge area to prevent popover from hiding when moving mouse */}
        <div
          className="fixed"
          style={{
            left: sidebarPosition === "left" ? popoverPosition.x - 20 : popoverPosition.x + 220,
            top: popoverPosition.y,
            width: "20px",
            height: "40px",
            zIndex: 99998,
          }}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        />
        
        <div
          className="fixed bg-white border border-gray-200 rounded-lg shadow-2xl p-1 min-w-[220px] max-h-[400px] overflow-y-auto"
          style={{
            left: popoverPosition.x,
            top: popoverPosition.y,
            zIndex: 99999,
          }}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
        >
          {/* Arrow indicator */}
          <div 
            className={cn(
              "absolute top-3 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45",
              // Determine arrow position based on actual popover position relative to sidebar
              (sidebarPosition === "left" && popoverPosition.x > window.innerWidth / 2) ||
              (sidebarPosition === "right" && popoverPosition.x < window.innerWidth / 2)
                ? "-right-1" // Arrow on right side of popover
                : "-left-1"  // Arrow on left side of popover
            )}
          />
          
          {/* Menu header */}
          <div className="px-3 py-2 text-xs font-semibold text-gray-600 border-b border-gray-100 bg-gray-50 rounded-t-lg sticky top-0">
            {item.label}
          </div>
          {/* Menu items */}
          <div className="py-1">
            {item.children.map((child) => (
              <div
                key={child.id}
                className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                onClick={() => {
                  if (child.href) {
                    window.location.href = child.href;
                  } else if (child.onClick) {
                    child.onClick();
                  }
                }}
              >
                {child.icon && (
                  <div className="w-4 h-4 mr-3 text-gray-500 group-hover:text-blue-600">
                    {child.icon}
                  </div>
                )}
                <span
                  className={cn(
                    "text-sm font-medium text-gray-700 group-hover:text-blue-700",
                    !child.icon && "ml-0"
                  )}
                >
                  {child.label}
                </span>
                {child.badge && (
                  <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center text-[10px] font-bold">
                    {child.badge}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );

    return createPortal(popoverContent, document.body);
  };

  return (
    <div className={cn("flex h-screen bg-gray-50", className)}>
      {/* Desktop Sidebar */}
      {(sidebar || sidebarItems.length > 0) && (
        <div
          className={cn(
            "relative bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
            sidebarPosition === "left"
              ? "order-first border-r border-gray-200"
              : "order-last border-l border-gray-200",
            // Desktop: always show, Mobile: always hidden
            "hidden lg:block",
            sidebarClassName
          )}
          style={{
            width: `${currentSidebarWidth}px`,
          }}
          data-sidebar
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
            <HiChevronRight
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                sidebarPosition === "left" 
                  ? (isCollapsedState ? "rotate-180" : "")
                  : (isCollapsedState ? "" : "rotate-180")
              )}
            />
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
                <HiBell className="w-5 h-5 md:w-6 md:h-6" />
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
        <main
          className={cn(
            "flex-1 overflow-auto p-4 md:p-6 bg-gray-50",
            contentClassName
          )}
        >
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
                <HiX className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Sidebar Content */}
            <div className="p-4 overflow-y-auto h-full">
              {sidebarItems.length > 0 ? renderMobileSidebarItems() : sidebar}
            </div>
          </div>
        </div>
      )}

      {/* Render popover portal */}
      {renderPopover()}
    </div>
  );
};
