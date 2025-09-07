import React, { useState, useCallback, useRef, useEffect } from 'react'

// Types
export interface TabItem {
  id: string
  label: string
  content: React.ReactNode
  disabled?: boolean
  icon?: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  defaultActiveTab?: string
  onChange?: (activeTabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  position?: 'top' | 'bottom' | 'left' | 'right'
  fullWidth?: boolean
  className?: string
  tabListClassName?: string
  tabPanelClassName?: string
  showScrollArrows?: boolean
  scrollArrowClassName?: string
  mobileScrollArrows?: boolean
  mobileBreakpoint?: 'sm' | 'md' | 'lg' | 'xl'
}

// Main Tabs Component
export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  onChange,
  variant = 'default',
  size = 'md',
  position = 'top',
  fullWidth = false,
  className = '',
  tabListClassName = '',
  tabPanelClassName = '',
  showScrollArrows = true,
  scrollArrowClassName = '',
  mobileScrollArrows = true,
  mobileBreakpoint = 'md'
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id || '')
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())
  const tabListRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [canScrollUp, setCanScrollUp] = useState(false)
  const [canScrollDown, setCanScrollDown] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Enhanced tab change handler with validation
  const handleTabChange = useCallback((tabId: string) => {
    // Find the target tab
    const targetTab = items.find(item => item.id === tabId)
    
    // Validate tab exists and is not disabled
    if (!targetTab || targetTab.disabled) {
      return
    }
    
    // Update active tab
    setActiveTab(tabId)
    
    // Call onChange callback if provided
    onChange?.(tabId)
    
    // Focus the new tab for accessibility
    setTimeout(() => {
      tabRefs.current.get(tabId)?.focus()
    }, 0)
  }, [items, onChange])



  // Check if screen is mobile size
  const checkMobileSize = useCallback(() => {
    const breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
    const breakpoint = breakpoints[mobileBreakpoint]
    setIsMobile(window.innerWidth < breakpoint)
  }, [mobileBreakpoint])

  // Check scroll state
  const checkScrollState = useCallback(() => {
    if (!tabListRef.current) return
    
    const { scrollLeft, scrollWidth, clientWidth, scrollTop, scrollHeight, clientHeight } = tabListRef.current
    const shouldShowArrows = showScrollArrows || (mobileScrollArrows && isMobile)
    
    if (shouldShowArrows) {
      // Horizontal scrolling (top/bottom positions)
      if (position === 'top' || position === 'bottom') {
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
        setCanScrollUp(false)
        setCanScrollDown(false)
      }
      // Vertical scrolling (left/right positions)
      else if (position === 'left' || position === 'right') {
        setCanScrollUp(scrollTop > 0)
        setCanScrollDown(scrollTop < scrollHeight - clientHeight)
        setCanScrollLeft(false)
        setCanScrollRight(false)
      }
    } else {
      setCanScrollLeft(false)
      setCanScrollRight(false)
      setCanScrollUp(false)
      setCanScrollDown(false)
    }
  }, [showScrollArrows, mobileScrollArrows, isMobile, position])

  // Scroll functions
  const scrollLeft = useCallback(() => {
    if (tabListRef.current) {
      const scrollAmount = tabListRef.current.clientWidth * 0.8
      tabListRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }, [])

  const scrollRight = useCallback(() => {
    if (tabListRef.current) {
      const scrollAmount = tabListRef.current.clientWidth * 0.8
      tabListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }, [])

  const scrollUp = useCallback(() => {
    if (tabListRef.current) {
      const scrollAmount = tabListRef.current.clientHeight * 0.8
      tabListRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' })
    }
  }, [])

  const scrollDown = useCallback(() => {
    if (tabListRef.current) {
      const scrollAmount = tabListRef.current.clientHeight * 0.8
      tabListRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' })
    }
  }, [])

  // Effect to handle items changes and validate active tab
  React.useEffect(() => {
    // If items change and current active tab is no longer valid, reset to first available tab
    if (items.length > 0) {
      const currentTabExists = items.find(item => item.id === activeTab)
      if (!currentTabExists) {
        const firstEnabledTab = items.find(item => !item.disabled)
        if (firstEnabledTab) {
          setActiveTab(firstEnabledTab.id)
        }
      }
    }
  }, [items, activeTab])

  // Effect to check scroll state on mount and resize
  useEffect(() => {
    checkMobileSize()
    checkScrollState()
    
    const handleResize = () => {
      checkMobileSize()
      checkScrollState()
    }
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [checkMobileSize, checkScrollState, items])

  // Effect to scroll active tab into view
  useEffect(() => {
    if (activeTab && tabRefs.current.has(activeTab)) {
      const activeTabElement = tabRefs.current.get(activeTab)
      if (activeTabElement && tabListRef.current) {
        const tabListRect = tabListRef.current.getBoundingClientRect()
        const tabRect = activeTabElement.getBoundingClientRect()
        
        if (tabRect.left < tabListRect.left) {
          activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        } else if (tabRect.right > tabListRect.right) {
          activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'end' })
        }
      }
    }
  }, [activeTab])

  const handleKeyDown = useCallback((event: React.KeyboardEvent, tabId: string) => {
    const tabIds = items.map(item => item.id)
    const currentIndex = tabIds.indexOf(tabId)
    
    let nextTabId: string | undefined

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        nextTabId = tabIds[currentIndex - 1] || tabIds[tabIds.length - 1]
        break
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault()
        nextTabId = tabIds[currentIndex + 1] || tabIds[0]
        break
      case 'Home':
        event.preventDefault()
        nextTabId = tabIds[0]
        break
      case 'End':
        event.preventDefault()
        nextTabId = tabIds[tabIds.length - 1]
        break
      default:
        return
    }

    if (nextTabId) {
      handleTabChange(nextTabId)
      tabRefs.current.get(nextTabId)?.focus()
    }
  }, [items, handleTabChange])

  const getVariantClasses = () => {
    switch (variant) {
      case 'pills':
        return 'bg-gray-100 rounded-lg p-1'
      case 'underline':
        return '' // Remove container border, let individual tabs handle their own borders
      default:
        return ''
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'flex-row'
      case 'right':
        return 'flex-row-reverse'
      case 'bottom':
        return 'flex-col-reverse'
      default: // top
        return 'flex-col'
    }
  }

  const getTabListClasses = () => {
    const baseClasses = `tab-list ${getVariantClasses()} ${tabListClassName}`
    const shouldShowArrows = showScrollArrows || (mobileScrollArrows && isMobile)
    
    let scrollClasses = ''
    if (shouldShowArrows) {
      if (position === 'left' || position === 'right') {
        scrollClasses = 'overflow-y-auto scrollbar-hide h-64'
      } else {
        scrollClasses = 'overflow-x-auto scrollbar-hide'
      }
    }
    
    switch (position) {
      case 'left':
        return `${baseClasses} flex-col w-48 flex-shrink-0 ${scrollClasses}`
      case 'right':
        return `${baseClasses} flex-col w-48 flex-shrink-0 ${scrollClasses}`
      case 'bottom':
        return `${baseClasses} flex ${fullWidth ? 'w-full' : ''} ${scrollClasses}`
      default: // top
        return `${baseClasses} flex ${fullWidth ? 'w-full' : ''} ${scrollClasses}`
    }
  }

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-sm px-3 py-2'
      case 'lg':
        return 'text-lg px-6 py-4'
      default:
        return 'text-base px-4 py-3'
    }
  }

  const activeTabItem = items.find(item => item.id === activeTab)

  if (items.length === 0) {
    return null
  }

  const shouldShowArrows = showScrollArrows || (mobileScrollArrows && isMobile)

  return (
    <div className={`tabs ${className}`}>
      <div className={`tab-container flex ${getPositionClasses()}`}>
        <div className="relative">
          {/* Horizontal scroll arrows for top/bottom positions */}
          {shouldShowArrows && (position === 'top' || position === 'bottom') && canScrollLeft && (
            <button
              onClick={scrollLeft}
              className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors ${isMobile ? 'p-1.5' : 'p-2'} ${scrollArrowClassName}`}
              aria-label="Scroll left"
            >
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {shouldShowArrows && (position === 'top' || position === 'bottom') && canScrollRight && (
            <button
              onClick={scrollRight}
              className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors ${isMobile ? 'p-1.5' : 'p-2'} ${scrollArrowClassName}`}
              aria-label="Scroll right"
            >
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Vertical scroll arrows for left/right positions */}
          {shouldShowArrows && (position === 'left' || position === 'right') && canScrollUp && (
            <button
              onClick={scrollUp}
              className={`absolute top-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors ${isMobile ? 'p-1.5' : 'p-2'} ${scrollArrowClassName}`}
              aria-label="Scroll up"
            >
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          )}
          
          {shouldShowArrows && (position === 'left' || position === 'right') && canScrollDown && (
            <button
              onClick={scrollDown}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 z-10 bg-white shadow-md rounded-full p-2 hover:bg-gray-50 transition-colors ${isMobile ? 'p-1.5' : 'p-2'} ${scrollArrowClassName}`}
              aria-label="Scroll down"
            >
              <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
          
          <div 
            ref={tabListRef}
            className={getTabListClasses()}
            onScroll={checkScrollState}
          >
            {items.map((item) => {
            const isActive = activeTab === item.id
            
            const getTabClasses = () => {
              const baseClasses = `tab-button flex items-center w-[100%] justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                fullWidth && (position === 'top' || position === 'bottom') ? 'flex-1' : ''
              }`

              if (item.disabled) {
                return `${baseClasses} opacity-50 cursor-not-allowed`
              }

              switch (variant) {
                case 'pills':
                  return `${baseClasses} rounded-md ${
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                case 'underline':
                  if (position === 'left') {
                    return `${baseClasses} border-l-2 border-solid  ${
                      isActive
                        ? 'border-blue-500 text-blue-600 bg-blue-50 bg-red-900'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  } else if (position === 'right') {
                    return `${baseClasses} border-r-2 border-solid ${
                      isActive
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  } else {
                    return `${baseClasses} border-b-2 border-solid ${
                      isActive
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  }
                default:
                  if (position === 'left') {
                    return `${baseClasses} border-l-2 border-solid ${
                      isActive
                        ? 'text-blue-600 border-blue-500 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  } else if (position === 'right') {
                    return `${baseClasses} border-r-2 border-solid ${
                      isActive
                        ? 'text-blue-600 border-blue-500 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  } else {
                    return `${baseClasses} border-b-2 border-solid ${
                      isActive
                        ? 'text-blue-600 border-blue-500 bg-blue-50'
                        : 'text-gray-600 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50'
                    }`
                  }
              }
            }

            return (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) {
                    tabRefs.current.set(item.id, el)
                  }
                }}
                className={`${getTabClasses()} ${getSizeClasses()} ${isActive ? 'active' : ''}`}
                data-position={position}
                onClick={() => {
                  if (!item.disabled) {
                    handleTabChange(item.id)
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                disabled={item.disabled}
                tabIndex={isActive ? 0 : -1}
              >
                {item.icon && <span className="tab-icon">{item.icon}</span>}
                <span className="tab-label">{item.label}</span>
              </button>
            )
          })}
          </div>
        </div>
        
        {activeTabItem && (
          <div className={`tab-panel ${
            position === 'left' ? 'ml-6 flex-1' : 
            position === 'right' ? 'mr-6 flex-1' : 
            'mt-4'
          } ${tabPanelClassName}`}>
            {activeTabItem.content}
          </div>
        )}
      </div>
    </div>
  )
}