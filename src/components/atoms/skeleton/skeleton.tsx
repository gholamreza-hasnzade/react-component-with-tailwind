import React from "react";

export interface SkeletonProps {
  variant?:
    | "text"
    | "circular"
    | "rectangular"
    | "rounded"
    | "avatar"
    | "button"
    | "card"
    | "list-item"
    | "table-row"
    | "form-field";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
  className?: string;
  visible?: boolean;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string | number;
  count?: number;
  gap?: string | number;
  shimmer?: boolean;
  ariaLabel?: string;
  role?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  size = "md",
  width,
  height,
  animation = "pulse",
  className = "",
  visible = true,
  color,
  backgroundColor,
  borderRadius,
  count = 1,
  gap = "0.5rem",
  shimmer = false,
  ariaLabel,
  role = "presentation",
}) => {
  if (!visible) return null;

  const getSizeDimensions = () => {
    switch (size) {
      case "xs":
        return { width: "1rem", height: "0.75rem" };
      case "sm":
        return { width: "2rem", height: "1rem" };
      case "lg":
        return { width: "4rem", height: "1.5rem" };
      case "xl":
        return { width: "6rem", height: "2rem" };
      default: // md
        return { width: "3rem", height: "1.25rem" };
    }
  };

  const getCircularDimensions = () => {
    // For circular variants, use the larger dimension to ensure perfect circles
    switch (size) {
      case "xs":
        return { width: "1rem", height: "1rem" };
      case "sm":
        return { width: "2rem", height: "2rem" };
      case "lg":
        return { width: "4rem", height: "4rem" };
      case "xl":
        return { width: "6rem", height: "6rem" };
      default: // md
        return { width: "3rem", height: "3rem" };
    }
  };

  const getVariantStyles = () => {
    const baseStyles: React.CSSProperties = {};

    switch (variant) {
      case "circular":
        baseStyles.borderRadius = "50%";
        break;
      case "rounded":
        baseStyles.borderRadius = "0.375rem";
        break;
      case "avatar":
        baseStyles.borderRadius = "50%";
        break;
      case "button":
        baseStyles.borderRadius = "0.375rem";
        baseStyles.padding = "0.5rem 1rem";
        break;
      case "card":
        baseStyles.borderRadius = "0.5rem";
        baseStyles.padding = "1rem";
        break;
      case "list-item":
        baseStyles.borderRadius = "0.25rem";
        baseStyles.marginBottom = gap;
        break;
      case "table-row":
        baseStyles.borderRadius = "0.25rem";
        baseStyles.height = "2.5rem";
        break;
      case "form-field":
        baseStyles.borderRadius = "0.375rem";
        baseStyles.height = "2.5rem";
        break;
      default:
        baseStyles.borderRadius = "0.25rem";
    }

    return baseStyles;
  };

  const getAnimationClasses = () => {
    if (animation === "none") return "";

    let classes = "";

    if (animation === "pulse") {
      classes += "animate-pulse";
    } else if (animation === "wave") {
      classes +=
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[wave_1.5s_ease-in-out_infinite]";
    }

    if (shimmer) {
      classes +=
        " bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]";
    }

    return classes;
  };

  const getDimensions = () => {
    // For circular variants, use circular dimensions to ensure perfect circles
    const sizeDims = (variant === "circular" || variant === "avatar") 
      ? getCircularDimensions() 
      : getSizeDimensions();
    
    const styles: React.CSSProperties = {};

    if (width !== undefined) {
      if (typeof width === "number") {
        styles.width = `${width}px`;
      } else {
        styles.width = width;
      }
    } else {
      styles.width = sizeDims.width;
    }

    if (height !== undefined) {
      if (typeof height === "number") {
        styles.height = `${height}px`;
      } else {
        styles.height = height;
      }
    } else {
      styles.height = sizeDims.height;
    }

    return styles;
  };

  const getContainerStyles = () => {
    const styles: React.CSSProperties = {
      ...getDimensions(),
      ...getVariantStyles(),
    };

    if (borderRadius !== undefined) {
      if (typeof borderRadius === "number") {
        styles.borderRadius = `${borderRadius}px`;
      } else {
        styles.borderRadius = borderRadius;
      }
    }

    if (color) {
      styles.backgroundColor = color;
    }

    if (backgroundColor) {
      styles.backgroundColor = backgroundColor;
    }

    return styles;
  };

  const getBaseClasses = () => {
    const baseClasses = "inline-block bg-gray-200";
    const animationClasses = getAnimationClasses();

    return `${baseClasses} ${animationClasses} ${className}`.trim();
  };

  const renderSkeleton = (key?: number) => (
    <div
      key={key}
      className={getBaseClasses()}
      style={getContainerStyles()}
      role={role}
      aria-label={ariaLabel}
      aria-hidden="true"
    />
  );

  if (count > 1 && ["list-item", "table-row"].includes(variant)) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
      </div>
    );
  }

  return renderSkeleton();
};
