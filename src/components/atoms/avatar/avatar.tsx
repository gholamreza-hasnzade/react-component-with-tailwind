import React, { useState } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import clsx from "clsx";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
type AvatarVariant = "circle" | "rounded" | "square";
type AvatarColor =
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default";

type AvatarStatus = "online" | "offline" | "away" | "busy";
type StatusPosition = "top-right" | "bottom-right" | "top-left" | "bottom-left";
type BadgePosition = "top-right" | "bottom-right" | "top-left" | "bottom-left";
type HoverEffect = "scale" | "glow" | "none";

const sizeMap: Record<AvatarSize, string> = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-xl",
};

const colorMap: Record<AvatarColor, string> = {
  primary: "bg-blue-600 text-white",
  secondary: "bg-gray-600 text-white",
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  warning: "bg-yellow-400 text-black",
  info: "bg-sky-500 text-white",
  default: "bg-gray-200 text-gray-700",
};

const variantMap: Record<AvatarVariant, string> = {
  circle: "rounded-full",
  rounded: "rounded-lg",
  square: "rounded-none",
};

const ringColorMap: Record<AvatarColor, string> = {
  primary: "ring-blue-600",
  secondary: "ring-gray-600",
  success: "ring-green-600",
  error: "ring-red-600",
  warning: "ring-yellow-400",
  info: "ring-sky-500",
  default: "ring-gray-300",
};

const statusColorMap: Record<AvatarStatus, string> = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
  busy: "bg-red-500",
};

const statusSizeMap: Record<AvatarSize, string> = {
  xs: "w-1.5 h-1.5",
  sm: "w-2 h-2",
  md: "w-2.5 h-2.5",
  lg: "w-3 h-3",
  xl: "w-4 h-4",
};

const statusPositionMap: Record<StatusPosition, string> = {
  "top-right": "top-0 right-0",
  "bottom-right": "bottom-0 right-0",
  "top-left": "top-0 left-0",
  "bottom-left": "bottom-0 left-0",
};

const badgePositionMap: Record<BadgePosition, string> = {
  "top-right": "top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
  "bottom-right": "bottom-0 right-0 transform translate-x-1/2 translate-y-1/2",
  "top-left": "top-0 left-0 transform -translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2",
};

const hoverEffectMap: Record<HoverEffect, string> = {
  scale: "hover:scale-105 transition-transform duration-200",
  glow: "hover:shadow-lg hover:shadow-blue-500/25 transition-shadow duration-200",
  none: "",
};

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: AvatarSize;
  variant?: AvatarVariant;
  color?: AvatarColor;
  children?: React.ReactNode; // fallback initials or icon
  className?: string;
  shadow?: boolean;
  border?: boolean;
  // New features
  status?: AvatarStatus;
  statusPosition?: StatusPosition;
  badge?: React.ReactNode;
  badgePosition?: BadgePosition;
  badgeColor?: AvatarColor;
  clickable?: boolean;
  onClick?: () => void;
  hoverEffect?: HoverEffect;
  loading?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackIcon?: React.ReactNode;
  // Group functionality
  group?: boolean;
  groupVariant?: "stack" | "grid" | "list";
  groupSpacing?: "tight" | "normal" | "loose";
  groupIndex?: number;
  groupTotal?: number;
  groupMax?: number;
  showGroupMore?: boolean;
  groupMoreLabel?: string;
  onGroupMoreClick?: () => void;
  // Radix UI props
  fallbackDelayMs?: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = "md",
  variant = "circle",
  color = "default",
  children,
  className,
  shadow = false,
  border = false,
  status,
  statusPosition = "bottom-right",
  badge,
  badgePosition = "top-right",
  badgeColor = "error",
  clickable = false,
  onClick,
  hoverEffect = "none",
  loading = false,
  onLoad,
  onError,
  fallbackIcon,
  // Group functionality
  group = false,
  groupVariant = "stack",
  groupSpacing = "normal",
  groupIndex = 0,
  groupTotal = 1,
  groupMax,
  showGroupMore = true,
  groupMoreLabel,
  onGroupMoreClick,
  // Radix UI props
  fallbackDelayMs,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleImageError = () => {
    setImageError(true);
    onError?.();
  };

  const shouldShowFallback = !src || imageError || loading;
  
  // Group logic
  const isStackMode = group && groupVariant === "stack";
  const isGridMode = group && groupVariant === "grid";
  const isListMode = group && groupVariant === "list";
  
  const shouldShowMore = group && groupMax && groupTotal > groupMax && showGroupMore && groupIndex === groupMax - 1;
  const hiddenCount = group && groupMax ? groupTotal - groupMax : 0;

  // Group spacing classes
  const groupSpacingClass = isStackMode && groupIndex > 0 ? {
    "tight": "-ml-2",
    "normal": "-ml-3", 
    "loose": "-ml-4"
  }[groupSpacing] : "";

  // Z-index for stacking
  const zIndex = isStackMode ? groupTotal - groupIndex : undefined;
  
  // Grid positioning
  const gridPosition = isGridMode ? {
    "col-start-1": groupIndex % 3 === 0,
    "col-start-2": groupIndex % 3 === 1,
    "col-start-3": groupIndex % 3 === 2,
  } : {};

  return (
    <div className={clsx(
      "relative inline-block",
      groupSpacingClass
    )}>
      <AvatarPrimitive.Root
        className={clsx(
          "relative inline-flex items-center justify-center overflow-hidden select-none",
          sizeMap[size],
          colorMap[color],
          variantMap[variant],
          shadow && "shadow",
          src && border && `ring-2 ${ringColorMap[color]}`,
          clickable && "cursor-pointer",
          hoverEffectMap[hoverEffect],
          isStackMode && "ring-2 ring-white",
          isGridMode && "w-full h-full",
          isListMode && "w-full",
          gridPosition,
          className
        )}
        style={{ zIndex }}
        data-slot="avatar"
        onClick={clickable ? onClick : undefined}
        tabIndex={clickable ? 0 : undefined}
        onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
        role={clickable ? "button" : "img"}
        aria-label={alt}
      >
        {src && !imageError && !loading && (
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className={clsx(
              "object-cover w-full h-full transition-opacity duration-200",
              variantMap[variant],
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
            data-slot="avatar-image"
          />
        )}
        
        <AvatarPrimitive.Fallback
          className={clsx(
            "w-full h-full flex items-center justify-center font-medium",
            shouldShowFallback ? "opacity-100" : "opacity-0"
          )}
          delayMs={fallbackDelayMs}
          data-slot="avatar-fallback"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full border-2 border-current border-t-transparent w-1/2 h-1/2"></div>
            </div>
          ) : (
            <span className="font-medium">
              {fallbackIcon || children}
            </span>
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {/* Show More Button for Groups */}
      {shouldShowMore && (
        <button
          className={clsx(
            "absolute inset-0 flex items-center justify-center overflow-hidden select-none cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium transition-all duration-200 rounded-full hover:-translate-y-1 hover:shadow-md",
            sizeMap[size]
          )}
          onClick={onGroupMoreClick}
          aria-label={`Show ${hiddenCount} more avatars`}
          title={`Click to see ${hiddenCount} more avatars`}
        >
          <span className="text-xs font-semibold">
            {groupMoreLabel || `+${hiddenCount}`}
          </span>
        </button>
      )}

      {/* Status Indicator */}
      {status && (
        <span
          className={clsx(
            "absolute border-2 border-white rounded-full",
            statusColorMap[status],
            statusSizeMap[size],
            statusPositionMap[statusPosition]
          )}
        />
      )}

      {/* Badge */}
      {badge && (
        <span
          className={clsx(
            "absolute flex items-center justify-center min-w-max px-1.5 py-0.5 text-xs font-medium text-white rounded-full",
            colorMap[badgeColor],
            badgePositionMap[badgePosition]
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );
};

// Export individual components for advanced usage
export const AvatarImage = AvatarPrimitive.Image;
export const AvatarFallback = AvatarPrimitive.Fallback;
export const AvatarRoot = AvatarPrimitive.Root;
