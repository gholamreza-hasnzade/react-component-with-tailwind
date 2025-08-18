import React, { useState, createContext, useContext } from 'react';
import clsx from 'clsx';

// Types
type AccordionVariant = 'default' | 'bordered' | 'separated';
type AccordionSize = 'sm' | 'md' | 'lg';

interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (id: string) => void;
  variant: AccordionVariant;
  size: AccordionSize;
  allowMultiple: boolean;
}

// Context
const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// Main Accordion Component
export interface AccordionProps {
  children: React.ReactNode;
  variant?: AccordionVariant;
  size?: AccordionSize;
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
  onItemToggle?: (openItems: string[]) => void;
}

interface AccordionComponent extends React.FC<AccordionProps> {
  Item: React.FC<AccordionItemProps>;
  Trigger: React.FC<AccordionTriggerProps>;
  Content: React.FC<AccordionContentProps>;
}

export const Accordion: AccordionComponent = ({
  children,
  variant = 'default',
  size = 'md',
  allowMultiple = false,
  defaultOpen = [],
  className,
  onItemToggle,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen));

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        if (!allowMultiple) {
          newSet.clear();
        }
        newSet.add(id);
      }
      
      const openItemsArray = Array.from(newSet);
      onItemToggle?.(openItemsArray);
      return newSet;
    });
  };

  const contextValue: AccordionContextType = {
    openItems,
    toggleItem,
    variant,
    size,
    allowMultiple,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={clsx(
          'w-full',
          {
            'space-y-1': variant === 'separated',
            'divide-y divide-gray-200': variant === 'bordered',
          },
          className
        )}
        role="region"
        aria-label="Accordion"
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Accordion Item Component
export interface AccordionItemProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // Optional controlled props
  controlled?: boolean;
  isOpen?: boolean;
  onToggle?: (id: string, isOpen: boolean) => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className,
  disabled = false,
  controlled = false,
  isOpen: controlledIsOpen,
  onToggle: controlledOnToggle,
}) => {
  const { variant, openItems, toggleItem } = useAccordionContext();
  
  // Use controlled state if provided, otherwise use context state
  const isOpen = controlled ? controlledIsOpen : openItems.has(id);
  
  const handleToggle = () => {
    if (disabled) return;
    
    if (controlled && controlledOnToggle) {
      // Controlled mode - call external handler
      controlledOnToggle(id, !isOpen);
    } else {
      // Uncontrolled mode - use internal state
      toggleItem(id);
    }
  };

  return (
    <div
      className={clsx(
        'group transition-all duration-200',
        {
          'border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm': variant === 'bordered',
          'border-b border-gray-200 last:border-b-0 hover:bg-gray-50': variant === 'default',
          'p-4 hover:bg-gray-50 rounded-lg': variant === 'separated',
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      data-id={id}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === AccordionTrigger) {
            return React.cloneElement(child as React.ReactElement<AccordionTriggerProps>, { 
              isOpen, 
              onToggle: handleToggle 
            });
          }
          if (child.type === AccordionContent) {
            return React.cloneElement(child as React.ReactElement<AccordionContentProps>, { 
              isOpen
            });
          }
        }
        return child;
      })}
    </div>
  );
};

// Accordion Trigger Component
export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  icon,
  disabled = false,
  isOpen = false,
  onToggle,
}) => {
  const { size } = useAccordionContext();

  const handleClick = () => {
    if (disabled || !onToggle) return;
    onToggle();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-3 px-4 text-base',
    lg: 'py-4 px-5 text-lg',
  };

  const defaultIcon = (
    <svg
      className={clsx(
        'transition-all duration-300 ease-in-out',
        isOpen ? 'rotate-180 text-blue-600' : 'rotate-0 text-gray-500',
        'group-hover:text-blue-600 group-hover:scale-110'
      )}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full text-left transition-all duration-200 ease-in-out',
        sizeClasses[size],
        {
          'cursor-pointer rounded-lg hover:bg-gray-100 hover:shadow-sm focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:shadow-md active:bg-gray-200': !disabled,
          'cursor-not-allowed opacity-60': disabled,
        },
        className
      )}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="font-medium text-gray-900 transition-colors duration-200 group-hover:text-gray-700">{children}</span>
      </div>
      <div className={clsx(
        'transition-all duration-200',
        {
          'group-hover:scale-110 group-hover:text-blue-600': !disabled,
        }
      )}>
        {icon || defaultIcon}
      </div>
    </div>
  );
};

// Accordion Content Component
export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  itemId?: string;
  isOpen?: boolean;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  children,
  className,
  animated = true,
  isOpen = false,
}) => {
  const { size } = useAccordionContext();

  const sizeClasses = {
    sm: 'px-3 pb-2',
    md: 'px-4 pb-3',
    lg: 'px-5 pb-4',
  };

  if (animated) {
    return (
      <div
        className={clsx(
          'overflow-hidden transition-all duration-200 ease-in-out',
          sizeClasses[size],
          className
        )}
        style={{
          maxHeight: isOpen ? '1000px' : '0px',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="text-gray-600">{children}</div>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        sizeClasses[size],
        'text-gray-600',
        className
      )}
    >
      {children}
    </div>
  );
};

// Compound component pattern for easier usage
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;



