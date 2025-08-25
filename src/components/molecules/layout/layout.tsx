import React, { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
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
  currentLocation?: string; // Add this for React Router integration
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
  currentLocation = "/", // Default to root path
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(showSidebar);
  const [isCollapsedState, setIsCollapsedState] = useState(isCollapsed);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Helper function to check if an item is active (exact match only)
  const isItemActive = useCallback((item: SidebarItem): boolean => {
    if (!currentLocation) return false;
    
    // Check if current item is active by comparing with currentLocation
    // For items with href, use that; for items with onClick, we need to infer the route
    if (item.href && item.href === currentLocation) {
      return true;
    }
    
    // For items with onClick, we can't easily determine the route they navigate to
    // So we'll return false for now - in a real app you might want to store the route
    // that each onClick handler navigates to
    return false;
  }, [currentLocation]);

  // Helper function to check if an item or its children should be expanded
  const shouldExpandItem = useCallback((item: SidebarItem): boolean => {
    if (!currentLocation) return false;
    
    // Check if current item is active
    if (item.href && item.href === currentLocation) {
      return true;
    }
    
    // Check if any children are active
    if (item.children) {
      return item.children.some(child => shouldExpandItem(child));
    }
    
    return false;
  }, [currentLocation]);

  // Auto-expand parent items when their children are active
  useEffect(() => {
    if (currentLocation) {
      const newExpandedItems = new Set<string>();
      
      const expandActiveParents = (items: SidebarItem[]) => {
        items.forEach(item => {
          if (shouldExpandItem(item)) {
            newExpandedItems.add(item.id);
            if (item.children) {
              expandActiveParents(item.children);
            }
          }
        });
      };
      
      expandActiveParents(sidebarItems);
      setExpandedItems(newExpandedItems);
    }
  }, [currentLocation, sidebarItems, shouldExpandItem]);

  // Reset expanded items when sidebar is collapsed
  useEffect(() => {
    if (isCollapsedState) {
      setExpandedItems(new Set());
    }
  }, [isCollapsedState]);

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

    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const sidebarRect = event.currentTarget
      .closest("[data-sidebar]")
      ?.getBoundingClientRect();

    if (sidebarRect) {
      let x: number;
      if (sidebarPosition === "left") {
        x = sidebarRect.right + 8;
      } else {
        x = sidebarRect.left - 8;
      }

      const popoverWidth = 220;
      const viewportWidth = window.innerWidth;

      if (sidebarPosition === "left" && x + popoverWidth > viewportWidth) {
        x = sidebarRect.left - popoverWidth - 8;
      } else if (sidebarPosition === "right" && x - popoverWidth < 0) {
        x = sidebarRect.right + 8;
      }

      setPopoverPosition({
        x,
        y: rect.top,
      });
      setHoveredItem(itemId);
    }
  };

  const handleItemLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
    setHideTimeout(timeout);
  };

  const handlePopoverEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
  };

  const handlePopoverLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredItem(null);
    }, 150);
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
            <div className="relative">
              {item.children && item.children.length > 0 ? (
                <button
                  onClick={() => toggleItem(item.id)}
                  className={cn(
                    "flex items-center rounded-md transition-colors",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-between w-full",
                    isItemActive(item)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                  style={
                    !isCollapsedState && level > 0
                      ? {
                          paddingLeft:
                            sidebarPosition === "left"
                              ? `${16 + level * 20}px`
                              : "auto",
                          paddingRight:
                            sidebarPosition === "right"
                              ? `${16 + level * 20}px`
                              : "auto",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleItemHover(item.id, e)}
                  onMouseLeave={handleItemLeave}
                  title={item.label}
                >
                  <div className="relative flex items-center gap-1">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    {!isCollapsedState && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsedState && (
                    <>
                      {item.children && item.children.length > 0 && (
                        <div className=" p-1">
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
              ) : item.onClick ? (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center rounded-md transition-colors",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-between w-full",
                    isItemActive(item)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                  style={
                    !isCollapsedState && level > 0
                      ? {
                          paddingLeft:
                            sidebarPosition === "left"
                              ? `${16 + level * 20}px`
                              : "auto",
                          paddingRight:
                            sidebarPosition === "right"
                              ? `${16 + level * 20}px`
                              : "auto",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleItemHover(item.id, e)}
                  onMouseLeave={handleItemLeave}
                  title={item.label}
                >
                  <div className="relative flex items-center gap-1">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    {!isCollapsedState && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>
                </button>
              ) : (
                <div
                  className={cn(
                    "flex items-center rounded-md transition-colors",
                    isCollapsedState
                      ? "justify-center p-2 w-10 h-10"
                      : "px-3 py-2 justify-between w-full",
                    isItemActive(item)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                  style={
                    !isCollapsedState && level > 0
                      ? {
                          paddingLeft:
                            sidebarPosition === "left"
                              ? `${16 + level * 20}px`
                              : "auto",
                          paddingRight:
                            sidebarPosition === "right"
                              ? `${16 + level * 20}px`
                              : "auto",
                        }
                      : {}
                  }
                  onMouseEnter={(e) => handleItemHover(item.id, e)}
                  onMouseLeave={handleItemLeave}
                >
                  <div className="relative flex items-center gap-1">
                    {item.icon}
                    {item.badge && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                    {!isCollapsedState && (
                      <span className="ml-3 text-sm font-medium">
                        {item.label}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

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
            <div className="relative">
              {item.href ? (
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center rounded-md transition-colors px-3 py-2 w-full",
                    sidebarPosition === "left" ? "justify-start" : "justify-end",
                    isItemActive(item)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                  style={
                    level > 0
                      ? {
                          paddingLeft:
                            sidebarPosition === "left"
                              ? `${16 + level * 20}px`
                              : "auto",
                          paddingRight:
                            sidebarPosition === "right"
                              ? `${16 + level * 20}px`
                              : "auto",
                        }
                      : {}
                  }
                  onClick={
                    item.children && item.children.length > 0
                      ? (e) => {
                          e.preventDefault();
                          toggleItem(item.id);
                        }
                      : undefined
                  }
                >
                  {sidebarPosition === "right" &&
                    item.children &&
                    item.children.length > 0 && (
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

                  <span
                    className={cn(
                      "text-sm font-medium",
                      sidebarPosition === "left" ? "ml-3" : "mr-3"
                    )}
                  >
                    {item.label}
                  </span>

                  {sidebarPosition === "left" &&
                    item.children &&
                    item.children.length > 0 && (
                      <div className="ml-auto p-1">
                        <HiChevronRight
                          className={cn(
                            "w-4 h-4 text-gray-500 transition-transform duration-200",
                            expandedItems.has(item.id) ? "rotate-90" : ""
                          )}
                        />
                      </div>
                    )}
                </Link>
              ) : (
                <button
                  onClick={item.onClick}
                  className={cn(
                    "flex items-center rounded-md transition-colors px-3 py-2 w-full",
                    sidebarPosition === "left" ? "justify-start" : "justify-end",
                    isItemActive(item)
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                  style={
                    level > 0
                      ? {
                          paddingLeft:
                            sidebarPosition === "left"
                              ? `${16 + level * 20}px`
                              : "auto",
                          paddingRight:
                            sidebarPosition === "right"
                              ? `${16 + level * 20}px`
                              : "auto",
                        }
                      : {}
                  }
                  title={item.label}
                >
                  {sidebarPosition === "right" &&
                    item.children &&
                    item.children.length > 0 && (
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

                  <span
                    className={cn(
                      "text-sm font-medium",
                      sidebarPosition === "left" ? "ml-3" : "mr-3"
                    )}
                  >
                    {item.label}
                  </span>

                  {sidebarPosition === "left" &&
                    item.children &&
                    item.children.length > 0 && (
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

  const renderPopover = () => {
    if (!hoveredItem || !isCollapsedState) return null;

    const item = sidebarItems.find((i) => i.id === hoveredItem);
    if (!item || !item.children || item.children.length === 0) return null;

    const popoverContent = (
      <>
        <div
          className="fixed"
          style={{
            left:
              sidebarPosition === "left"
                ? popoverPosition.x - 20
                : popoverPosition.x + 220,
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
          <div
            className={cn(
              "absolute top-3 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45",
              (sidebarPosition === "left" &&
                popoverPosition.x > window.innerWidth / 2) ||
                (sidebarPosition === "right" &&
                  popoverPosition.x < window.innerWidth / 2)
                ? "-right-1"
                : "-left-1"
            )}
          />

          <div className="px-3 py-2 text-xs font-semibold text-gray-600 border-b border-gray-100 bg-gray-50 rounded-t-lg sticky top-0">
            {item.label}
          </div>
          <div className="py-1">
            {item.children.map((child) => (
              <div
                key={child.id}
                className="flex items-center px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
                onClick={() => {
                  if (child.onClick) {
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
      {(sidebar || sidebarItems.length > 0) && (
        <div
          className={cn(
            "relative bg-white transition-all duration-300 ease-in-out overflow-hidden shadow-lg",
            sidebarPosition === "left"
              ? "order-first border-r border-gray-200"
              : "order-last border-l border-gray-200",
            "hidden lg:block",
            sidebarClassName
          )}
          style={{
            width: `${currentSidebarWidth}px`,
          }}
          data-sidebar
        >
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
                  ? isCollapsedState
                    ? "rotate-180"
                    : ""
                  : isCollapsedState
                  ? ""
                  : "rotate-180"
              )}
            />
          </button>

          <div
            className={cn(
              "h-full overflow-y-auto",
              isCollapsedState ? "p-2 pt-16" : "p-6 pt-16"
            )}
          >
            {!isCollapsedState && (
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    U
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate">
                      User Name
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      user@example.com
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex space-x-2">
                  <button className="flex-1 px-3 py-2 text-xs bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
                    Profile
                  </button>
                  <button className="flex-1 px-3 py-2 text-xs bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                    Settings
                  </button>
                </div>
              </div>
            )}

            {isCollapsedState && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    U
                  </div>
                </div>
              </div>
            )}

            {renderSidebarItems()}
          </div>
        </div>
      )}

      <div
        className={cn("flex-1 flex flex-col overflow-hidden", contentClassName)}
      >
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-4">
              <button
                onClick={handleSidebarToggle}
                className="lg:hidden p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200 transform hover:scale-105"
                aria-label="Toggle sidebar"
              >
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
              <button
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors relative"
                aria-label="Notifications"
              >
                <HiBell className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

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

        <main
          className={cn(
            "flex-1 overflow-auto p-4 md:p-6 bg-gray-50",
            contentClassName
          )}
        >
          {children}
        </main>
      </div>

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
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  U
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    User Name
                  </h3>
                  <p className="text-xs text-gray-500">user@example.com</p>
                </div>
              </div>
              <button
                onClick={handleSidebarToggle}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                aria-label="Close sidebar"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto h-full">
              {sidebarItems.length > 0 ? renderMobileSidebarItems() : sidebar}
            </div>
          </div>
        </div>
      )}

      {renderPopover()}
    </div>
  );
};
