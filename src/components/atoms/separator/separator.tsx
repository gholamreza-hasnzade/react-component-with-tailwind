import * as React from 'react'
import { cn } from '../../../lib/utils'

const Separator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical'
    decorative?: boolean
  }
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => {
  const ariaOrientation = orientation === 'vertical' ? 'vertical' : 'horizontal'
  
  if (decorative) {
    return (
      <div
        ref={ref}
        role="none"
        aria-orientation={ariaOrientation}
        className={cn(
          'shrink-0 bg-border',
          orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
          className
        )}
        {...props}
      />
    )
  }

  return (
    <hr
      role="separator"
      aria-orientation={ariaOrientation}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
})
Separator.displayName = 'Separator'

export { Separator }

