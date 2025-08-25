export const tooltipStyles = {
  primary: {
    tooltipStyle: {
      backgroundColor: "#2563eb",
      color: "white",
      border: "2px solid #1d4ed8",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #2563eb transparent",
    },
  },

  secondary: {
    tooltipStyle: {
      backgroundColor: "#4b5563",
      color: "white",
      border: "2px solid #374151",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #4b5563 transparent",
    },
  },

  success: {
    tooltipStyle: {
      backgroundColor: "#16a34a",
      color: "white",
      border: "2px solid #15803d",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #16a34a transparent",
    },
  },

  error: {
    tooltipStyle: {
      backgroundColor: "#dc2626",
      border: "2px solid #b91c1c",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #dc2626 transparent",
    },
  },

  warning: {
    tooltipStyle: {
      backgroundColor: "#eab308",
      color: "black",
      border: "2px solid #ca8a04",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #eab308 transparent",
    },
  },

  info: {
    tooltipStyle: {
      backgroundColor: "#0ea5e9",
      color: "white",
      border: "2px solid #0284c7",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "500",
    },
    arrowStyle: {
      borderColor: "transparent transparent #0ea5e9 transparent",
    },
  },

  dark: {
    tooltipStyle: {
      backgroundColor: "#1f2937",
      color: "white",
      border: "1px solid #374151",
      borderRadius: "6px",
      padding: "8px 12px",
      fontSize: "14px",
      fontWeight: "400",
    },
    arrowStyle: {
      borderColor: "transparent transparent #1f2937 transparent",
    },
  },
};

export const createTooltipStyle = (
  backgroundColor: string,
  color: string = "white",
  borderColor?: string,
  customStyles?: React.CSSProperties
) => ({
  tooltipStyle: {
    backgroundColor,
    color,
    border: `2px solid ${borderColor || backgroundColor}`,
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "500",
    ...customStyles,
  },
  arrowStyle: {
    borderColor: `transparent transparent ${backgroundColor} transparent`,
  },
});

export const createGradientTooltip = (
  gradient: string,
  color: string = "white",
  customStyles?: React.CSSProperties
) => ({
  tooltipStyle: {
    background: gradient,
    color,
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    ...customStyles,
  },
  arrowStyle: {
    borderColor: `transparent transparent ${
      gradient.includes("linear-gradient") ? "#6366f1" : gradient
    } transparent`,
  },
});
