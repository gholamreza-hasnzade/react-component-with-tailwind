import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../lib/utils'

export type DrawerPosition = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  /** Whether the drawer is open */
  open: boolean
  /** Callback when drawer should close */
  onClose: () => void
  /** Position of the drawer */
  position?: DrawerPosition
  /** Width/height of the drawer (depending on position) */
  size?: string | number
  /** Mobile-specific size override */
  mobileSize?: string | number
  /** Whether to show backdrop */
  showBackdrop?: boolean
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean
  /** Whether to close on escape key */
  closeOnEscape?: boolean
  /** Custom class names */
  className?: string
  /** Drawer content */
  children: React.ReactNode
  /** Whether to animate the drawer */
  animate?: boolean
  /** Animation duration in milliseconds */
  animationDuration?: number
  /** Whether to lock body scroll when drawer is open */
  lockBodyScroll?: boolean
  /** Whether to use mobile-optimized behavior */
  mobileOptimized?: boolean
}

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  position = 'right',
  size = '400px',
  mobileSize,
  showBackdrop = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
  children,
  animate = true,
  animationDuration = 500,
  lockBodyScroll = true,
  mobileOptimized = true,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !open) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeOnEscape, open, onClose])

  // Handle body scroll lock
  useEffect(() => {
    if (!lockBodyScroll) return

    if (open) {
      document.body.style.overflow = 'hidden'
      // Mobile-specific: prevent touch scrolling on iOS
      if (mobileOptimized && isMobile) {
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
      }
    } else {
      document.body.style.overflow = ''
      if (mobileOptimized && isMobile) {
        document.body.style.position = ''
        document.body.style.width = ''
      }
    }

    return () => {
      document.body.style.overflow = ''
      if (mobileOptimized && isMobile) {
        document.body.style.position = ''
        document.body.style.width = ''
      }
    }
  }, [open, lockBodyScroll, mobileOptimized, isMobile])

  // Handle animations
  useEffect(() => {
    if (open) {
      setIsVisible(true)
    } else {
      if (animate) {
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, animationDuration)
        return () => clearTimeout(timer)
      } else {
        setIsVisible(false)
      }
    }
  }, [open, animate, animationDuration])

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (closeOnBackdropClick && event.target === backdropRef.current) {
      onClose()
    }
  }

  // Handle drawer click (prevent closing when clicking inside drawer)
  const handleDrawerClick = (event: React.MouseEvent) => {
    event.stopPropagation()
  }

  // Get position styles
  const getPositionStyles = (): React.CSSProperties => {
    // Determine actual size based on mobile detection
    const actualSize = isMobile && mobileSize ? mobileSize : size
    
    const baseStyles: React.CSSProperties = {
      position: 'fixed',
      zIndex: 1000,
      transition: animate ? `all ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
      minWidth: position === 'left' || position === 'right' ? (isMobile ? '85vw' : '280px') : 'auto',
      minHeight: position === 'top' || position === 'bottom' ? (isMobile ? '50vh' : '200px') : 'auto',
      maxWidth: position === 'left' || position === 'right' ? (isMobile ? '95vw' : '90vw') : 'auto',
      maxHeight: position === 'top' || position === 'bottom' ? (isMobile ? '90vh' : '90vh') : 'auto',
    }

    switch (position) {
      case 'top':
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          height: typeof actualSize === 'number' ? `${actualSize}px` : actualSize,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(-100%) scale(0.95)',
          opacity: open ? 1 : 0,
        }
      case 'bottom':
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          height: typeof actualSize === 'number' ? `${actualSize}px` : actualSize,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(100%) scale(0.95)',
          opacity: open ? 1 : 0,
        }
      case 'left':
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          bottom: 0,
          width: typeof actualSize === 'number' ? `${actualSize}px` : actualSize,
          transform: open ? 'translateX(0) scale(1)' : 'translateX(-100%) scale(0.95)',
          opacity: open ? 1 : 0,
        }
      case 'right':
        return {
          ...baseStyles,
          top: 0,
          right: 0,
          bottom: 0,
          width: typeof actualSize === 'number' ? `${actualSize}px` : actualSize,
          transform: open ? 'translateX(0) scale(1)' : 'translateX(100%) scale(0.95)',
          opacity: open ? 1 : 0,
        }
      default:
        return baseStyles
    }
  }

  // Get backdrop styles
  const getBackdropStyles = (): React.CSSProperties => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: isMobile ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    opacity: open ? 1 : 0,
    visibility: open ? 'visible' : 'hidden',
    transition: animate ? `opacity ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), visibility ${animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)` : 'none',
    backdropFilter: open ? (isMobile ? 'blur(1px)' : 'blur(2px)') : 'blur(0px)',
  })

  if (!isVisible && !open) return null

  return createPortal(
    <>
      {/* Backdrop */}
      {showBackdrop && (
        <div
          ref={backdropRef}
          style={getBackdropStyles()}
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={getPositionStyles()}
        className={cn(
          'bg-white shadow-lg',
          'focus:outline-none',
          className
        )}
        onClick={handleDrawerClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
      >
        {children}
      </div>
    </>,
    document.body
  )
}

// Drawer Header Component
export interface DrawerHeaderProps {
  children: React.ReactNode
  className?: string
  onClose?: () => void
  showCloseButton?: boolean
}

export const DrawerHeader: React.FC<DrawerHeaderProps> = ({
  children,
  className,
  onClose,
  showCloseButton = true,
}) => (
  <div className={cn('flex items-center justify-between p-4 border-b', className)}>
    <div className="flex-1">{children}</div>
    {showCloseButton && onClose && (
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Close drawer"
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
    )}
  </div>
)

// Drawer Body Component
export interface DrawerBodyProps {
  children: React.ReactNode
  className?: string
}

export const DrawerBody: React.FC<DrawerBodyProps> = ({ children, className }) => (
  <div className={cn('flex-1 p-4 overflow-y-auto', className)}>{children}</div>
)

// Drawer Footer Component
export interface DrawerFooterProps {
  children: React.ReactNode
  className?: string
}

export const DrawerFooter: React.FC<DrawerFooterProps> = ({ children, className }) => (
  <div className={cn('p-4 border-t bg-gray-50', className)}>{children}</div>
)

