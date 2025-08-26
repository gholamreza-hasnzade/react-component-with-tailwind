import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import JsBarcode from "jsbarcode";

const barcodeVariants = cva(
  "inline-block bg-white border border-gray-200 rounded-lg shadow-sm p-6",
  {
    variants: {
      size: {
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
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
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!value || !canvasRef.current) return;

    try {
      // Clear any previous errors
      setError(null);

      // Generate real barcode using jsbarcode library
      JsBarcode(canvasRef.current, value, {
        format: format,
        width: width / 100, // jsbarcode uses different width units
        height: height,
        displayValue: showText,
        fontSize: 14,
        margin: 10,
        background: backgroundColor,
        lineColor: foregroundColor,
        textMargin: 4,
      });
    } catch (err) {
      console.error("Failed to generate barcode:", err);
      setError("Failed to generate barcode");
    }
  }, [value, format, width, height, foregroundColor, backgroundColor, showText]);

  if (!value || value.trim() === "") {
    return (
      <div className={cn(
        "flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 p-4 rounded-md",
        barcodeVariants({ size }),
        className
      )}>
        <span className="text-sm">Enter a value to generate barcode</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "flex items-center justify-center border-2 border-dashed border-red-300 bg-red-50 text-red-600 p-4 rounded-md",
        barcodeVariants({ size }),
        className
      )}>
        <span className="text-sm">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className={cn(barcodeVariants({ size }), className)}>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-100">
          <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="rounded-lg"
          />
        </div>
        <div className="text-sm text-gray-600 text-center max-w-full break-words bg-gray-50 px-4 py-2 rounded-md">
          {value}
        </div>
      </div>
    </div>
  );
};

export default Barcode;