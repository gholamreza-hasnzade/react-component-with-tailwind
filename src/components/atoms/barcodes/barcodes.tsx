import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import JsBarcode from "jsbarcode";

const barcodeVariants = cva(
  "inline-block bg-white border border-gray-200 rounded-lg shadow-sm transition-all duration-200",
  {
    variants: {
      size: {
        sm: "p-2 sm:p-3",
        md: "p-3 sm:p-4 md:p-6",
        lg: "p-4 sm:p-6 md:p-8",
        xl: "p-6 sm:p-8 md:p-10",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type BarcodeFormat = "CODE128" | "CODE39" | "EAN13" | "EAN8" | "UPC";

export interface BarcodeProps {
  value: string;
  format?: BarcodeFormat;
  size?: "sm" | "md" | "lg" | "xl";
  width?: number;
  height?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  showText?: boolean;
  className?: string;
  ariaLabel?: string;
  onError?: (error: string) => void;
  onSuccess?: () => void;
}

export const Barcode: React.FC<BarcodeProps> = ({
  value,
  format = "CODE128",
  size = "md",
  width = 300,
  height = 100,
  foregroundColor = "#000000",
  backgroundColor = "#FFFFFF",
  showText = true,
  className,
  ariaLabel,
  onError,
  onSuccess,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Responsive width calculation
  const getResponsiveWidth = () => {
    if (typeof window === "undefined") return width;

    const screenWidth = window.innerWidth;
    const maxWidth = Math.min(width, screenWidth - 64); // 32px margin on each side

    // Mobile-first responsive scaling
    if (screenWidth < 640) return Math.min(maxWidth, 280); // sm
    if (screenWidth < 768) return Math.min(maxWidth, 320); // md
    if (screenWidth < 1024) return Math.min(maxWidth, 400); // lg
    return maxWidth; // xl
  };

  const getResponsiveHeight = () => {
    const responsiveWidth = getResponsiveWidth();
    return Math.round((height * responsiveWidth) / width);
  };

  React.useEffect(() => {
    if (!value || !canvasRef.current) return;

    const generateBarcode = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Validate input
        if (!value.trim()) {
          throw new Error("Barcode value cannot be empty");
        }

        // Validate format-specific requirements
        if (format === "EAN13" && value.length !== 12 && value.length !== 13) {
          throw new Error("EAN13 requires 12 or 13 digits");
        }
        if (format === "EAN8" && value.length !== 7 && value.length !== 8) {
          throw new Error("EAN8 requires 7 or 8 digits");
        }
        if (format === "UPC" && value.length !== 11 && value.length !== 12) {
          throw new Error("UPC requires 11 or 12 digits");
        }

        const responsiveWidth = getResponsiveWidth();
        const responsiveHeight = getResponsiveHeight();

        await JsBarcode(canvasRef.current, value, {
          format: format,
          width: Math.max(1, responsiveWidth / 100), // Ensure minimum width
          height: Math.max(20, responsiveHeight), // Ensure minimum height
          displayValue: showText,
          fontSize: Math.max(10, Math.min(16, responsiveWidth / 20)), // Responsive font size
          margin: Math.max(5, responsiveWidth / 30), // Responsive margin
          background: backgroundColor,
          lineColor: foregroundColor,
          textMargin: Math.max(2, responsiveWidth / 50), // Responsive text margin
          valid: (valid) => {
            if (!valid) {
              throw new Error(`Invalid ${format} barcode value: ${value}`);
            }
          },
        });

        onSuccess?.();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate barcode";
        console.error("Barcode generation error:", err);
        setError(errorMessage);
        onError?.(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    generateBarcode();
  }, [
    value,
    format,
    width,
    height,
    foregroundColor,
    backgroundColor,
    showText,
    onError,
    onSuccess,
  ]);

  if (!value || value.trim() === "") {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 p-3 sm:p-4 rounded-md min-h-[120px]",
          barcodeVariants({ size }),
          className
        )}
        role="img"
        aria-label={ariaLabel || "Empty barcode placeholder"}
      >
        <div className="text-center">
          <div className="text-xs sm:text-sm font-medium mb-1">
            No barcode value
          </div>
          <div className="text-xs text-gray-400">
            Enter a value to generate barcode
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center border-2 border-dashed border-red-300 bg-red-50 text-red-600 p-3 sm:p-4 rounded-md min-h-[120px]",
          barcodeVariants({ size }),
          className
        )}
        role="alert"
        aria-label={ariaLabel || "Barcode error"}
      >
        <div className="text-center">
          <div className="text-xs sm:text-sm font-medium mb-1">Error</div>
          <div className="text-xs break-words max-w-full">{error}</div>
        </div>
      </div>
    );
  }

  const responsiveWidth = getResponsiveWidth();
  const responsiveHeight = getResponsiveHeight();

  return (
    <div
      className={cn(barcodeVariants({ size }), className)}
      role="img"
      aria-label={ariaLabel || `Barcode: ${value}`}
    >
      <div className="flex flex-col items-center space-y-2 sm:space-y-3 md:space-y-4">
        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center min-h-[100px] w-full">
            <div className="flex items-center space-x-2 text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
              <span className="text-xs sm:text-sm">Generating barcode...</span>
            </div>
          </div>
        )}

        {/* Barcode container */}
        <div
          className={cn(
            "bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-md border-2 border-gray-100 w-full max-w-full overflow-hidden",
            isLoading && "opacity-50"
          )}
        >
          <div className="flex justify-center">
            <canvas
              ref={canvasRef}
              width={responsiveWidth}
              height={responsiveHeight}
              className="max-w-full h-auto rounded-lg"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
        </div>

        {/* Value display */}
        {showText && (
          <div className="text-xs sm:text-sm text-gray-600 text-center max-w-full break-words bg-gray-50 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-md w-full">
            <span className="font-mono">{value}</span>
          </div>
        )}
      </div>
    </div>
  );
};
