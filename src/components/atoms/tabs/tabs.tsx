import React, { useState, useCallback, useRef } from 'react'

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
  tabPanelClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || items[0]?.id || '')
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map())

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
        return position === 'left' || position === 'right' 
          ? 'border-r border-gray-200' 
          : 'border-b border-gray-200'
      default:
        return ''
    }
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'left':
        return 'flex-row-reverse'
      case 'right':
        return 'flex-row'
      case 'bottom':
        return 'flex-col-reverse'
      default: // top
        return 'flex-col'
    }
  }

  const getTabListClasses = () => {
    const baseClasses = `tab-list ${getVariantClasses()} ${tabListClassName}`
    
    switch (position) {
      case 'left':
        return `${baseClasses} flex-col w-48 flex-shrink-0`
      case 'right':
        return `${baseClasses} flex-col w-48 flex-shrink-0`
      case 'bottom':
        return `${baseClasses} flex ${fullWidth ? 'w-full' : ''}`
      default: // top
        return `${baseClasses} flex ${fullWidth ? 'w-full' : ''}`
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

  return (
    <div className={`tabs ${className}`}>
      <div className={`tab-container flex ${getPositionClasses()}`}>
        <div className={getTabListClasses()}>
          {items.map((item) => {
            const isActive = activeTab === item.id
            
            const getTabClasses = () => {
              const baseClasses = `tab-button flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
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
                  if (position === 'left' || position === 'right') {
                    return `${baseClasses} border-r-2 ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`
                  } else {
                    return `${baseClasses} border-b-2 ${
                      isActive
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`
                  }
                default:
                  if (position === 'left' || position === 'right') {
                    return `${baseClasses} ${
                      isActive
                        ? 'text-blue-600 border-r-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:border-r-2 hover:border-gray-300'
                    }`
                  } else {
                    return `${baseClasses} ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-300'
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
                className={`${getTabClasses()} ${getSizeClasses()}`}
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
        
        {activeTabItem && (
          <div className={`tab-panel ${position === 'left' || position === 'right' ? 'ml-6 flex-1' : 'mt-4'} ${tabPanelClassName}`}>
            {activeTabItem.content}
          </div>
        )}
      </div>
    </div>
  )
}