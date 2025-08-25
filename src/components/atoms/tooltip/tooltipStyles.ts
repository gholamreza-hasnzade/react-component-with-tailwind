// Utility styles for common tooltip themes matching the button color palette
export const tooltipStyles = {
  // Primary style (blue)
  primary: {
    tooltipStyle: {
      backgroundColor: '#2563eb', // blue-600
      color: 'white',
      border: '2px solid #1d4ed8', // blue-700
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #2563eb transparent'
    }
  },
  
  // Secondary style (gray)
  secondary: {
    tooltipStyle: {
      backgroundColor: '#4b5563', // gray-600
      color: 'white',
      border: '2px solid #374151', // gray-700
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #4b5563 transparent'
    }
  },
  
  // Success style (green)
  success: {
    tooltipStyle: {
      backgroundColor: '#16a34a', // green-600
      color: 'white',
      border: '2px solid #15803d', // green-700
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #16a34a transparent'
    }
  },
  
  // Error style (red)
  error: {
    tooltipStyle: {
      backgroundColor: '#dc2626', // red-600
      color: 'white',
      border: '2px solid #b91c1c', // red-700
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #dc2626 transparent'
    }
  },
  
  // Warning style (yellow)
  warning: {
    tooltipStyle: {
      backgroundColor: '#eab308', // yellow-500
      color: 'black',
      border: '2px solid #ca8a04', // yellow-600
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #eab308 transparent'
    }
  },
  
  // Info style (sky)
  info: {
    tooltipStyle: {
      backgroundColor: '#0ea5e9', // sky-500
      color: 'white',
      border: '2px solid #0284c7', // sky-600
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '500',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #0ea5e9 transparent'
    }
  },
  
  // Dark style (consistent with your theme)
  dark: {
    tooltipStyle: {
      backgroundColor: '#1f2937', // gray-800
      color: 'white',
      border: '1px solid #374151', // gray-700
      borderRadius: '6px',
      padding: '8px 12px',
      fontSize: '14px',
      fontWeight: '400',
    },
    arrowStyle: {
      borderColor: 'transparent transparent #1f2937 transparent'
    }
  }
};

// Utility function to create custom tooltip styles
export const createTooltipStyle = (
  backgroundColor: string,
  color: string = 'white',
  borderColor?: string,
  customStyles?: React.CSSProperties
) => ({
  tooltipStyle: {
    backgroundColor,
    color,
    border: `2px solid ${borderColor || backgroundColor}`,
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    ...customStyles,
  },
  arrowStyle: {
    borderColor: `transparent transparent ${backgroundColor} transparent`
  }
});

// Utility function to create gradient tooltips
export const createGradientTooltip = (
  gradient: string,
  color: string = 'white',
  customStyles?: React.CSSProperties
) => ({
  tooltipStyle: {
    background: gradient,
    color,
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    fontSize: '14px',
    fontWeight: '500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    ...customStyles,
  },
  arrowStyle: {
    // For gradient tooltips, we'll use a solid color for the arrow
    borderColor: `transparent transparent ${gradient.includes('linear-gradient') ? '#6366f1' : gradient} transparent`
  }
});
