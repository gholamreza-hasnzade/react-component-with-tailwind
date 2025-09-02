import { useState, useEffect } from 'react';

export type TextDirection = 'ltr' | 'rtl' | 'auto';

export interface UseTextDirectionOptions {
  defaultDirection?: TextDirection;
  detectFromDOM?: boolean;
  detectFromLocale?: boolean;
}

export interface UseTextDirectionReturn {
  direction: TextDirection;
  isRTL: boolean;
  isLTR: boolean;
  setDirection: (direction: TextDirection) => void;
  toggleDirection: () => void;
}

/**
 * Hook to manage text direction (RTL/LTR) with automatic detection
 */
export function useTextDirection(options: UseTextDirectionOptions = {}): UseTextDirectionReturn {
  const {
    defaultDirection = 'auto',
    detectFromDOM = true,
    detectFromLocale = true,
  } = options;

  const [direction, setDirectionState] = useState<TextDirection>(() => {
    // Try to detect from DOM first
    if (detectFromDOM && typeof document !== 'undefined') {
      const htmlDir = document.documentElement.getAttribute('dir');
      if (htmlDir === 'rtl' || htmlDir === 'ltr') {
        return htmlDir as TextDirection;
      }
    }

    // Try to detect from locale
    if (detectFromLocale && typeof navigator !== 'undefined') {
      const locale = navigator.language;
      const rtlLanguages = [
        'ar', 'he', 'fa', 'ur', 'ku', 'dv', 'ps', 'sd', 'ug', 'yi', 'ji', 'iw', 'ji'
      ];
      
      const languageCode = locale.split('-')[0].toLowerCase();
      if (rtlLanguages.includes(languageCode)) {
        return 'rtl';
      }
    }

    return defaultDirection;
  });

  const isRTL = direction === 'rtl';
  const isLTR = direction === 'ltr';

  const setDirection = (newDirection: TextDirection) => {
    setDirectionState(newDirection);
    
    // Update DOM if available
    if (typeof document !== 'undefined') {
      if (newDirection === 'auto') {
        document.documentElement.removeAttribute('dir');
      } else {
        document.documentElement.setAttribute('dir', newDirection);
      }
    }
  };

  const toggleDirection = () => {
    setDirection(isRTL ? 'ltr' : 'rtl');
  };

  // Listen for DOM changes
  useEffect(() => {
    if (!detectFromDOM || typeof document === 'undefined') {
      return;
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          const htmlDir = document.documentElement.getAttribute('dir');
          if (htmlDir === 'rtl' || htmlDir === 'ltr') {
            setDirectionState(htmlDir as TextDirection);
          } else {
            setDirectionState('auto');
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['dir'],
    });

    return () => observer.disconnect();
  }, [detectFromDOM]);

  return {
    direction,
    isRTL,
    isLTR,
    setDirection,
    toggleDirection,
  };
}
