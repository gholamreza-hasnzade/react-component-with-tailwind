import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import QRCodeLib from "qrcode";

const qrCodeVariants = cva(
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

export interface QRCodeProps {
  value: string;
  size?: "sm" | "md" | "lg" | "xl";
  width?: number;
  height?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  className?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = "md",
  width = 200,
  height = 200,
  foregroundColor = "#000000",
  backgroundColor = "#FFFFFF",
  errorCorrectionLevel = "M",
  className,
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const generateQR = async () => {
      try {
        if (!value || value.trim() === "") {
          setQrCodeDataUrl("");
          setError(null);
          return;
        }

        if (value.length > 1000) {
          setError("QR Code value is too long (max 1000 characters)");
          return;
        }

        // Generate real QR code using the qrcode library
        const dataUrl = await QRCodeLib.toDataURL(value, {
          width: width,
          margin: 2,
          color: {
            dark: foregroundColor,
            light: backgroundColor,
          },
          errorCorrectionLevel: errorCorrectionLevel,
        });

        setQrCodeDataUrl(dataUrl);
        setError(null);
      } catch (err) {
        console.error("Failed to generate QR Code:", err);
        setError("Failed to generate QR Code");
      }
    };

    generateQR();
  }, [value, width, height, foregroundColor, backgroundColor, errorCorrectionLevel]);

  if (!value || value.trim() === "") {
    return (
      <div className={cn(
        "flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 text-gray-500 p-4 rounded-md",
        qrCodeVariants({ size }),
        className
      )}>
        <span className="text-sm">Enter a value to generate QR Code</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "flex items-center justify-center border-2 border-dashed border-red-300 bg-red-50 text-red-600 p-4 rounded-md",
        qrCodeVariants({ size }),
        className
      )}>
        <span className="text-sm">Error: {error}</span>
      </div>
    );
  }

  return (
    <div className={cn(qrCodeVariants({ size }), className)}>
      <div className="flex flex-col items-center space-y-4">
        {qrCodeDataUrl && qrCodeDataUrl !== "" ? (
          <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-100">
            <img
              src={qrCodeDataUrl}
              alt={`QR Code for: ${value}`}
              width={width}
              height={height}
              className="rounded-lg"
            />
          </div>
        ) : (
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center"
            style={{ width: width + 32, height: height + 32 }}
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <span className="text-sm text-gray-500">Generating QR Code...</span>
            </div>
          </div>
        )}
        <div className="text-sm text-gray-600 text-center max-w-full break-words bg-gray-50 px-4 py-2 rounded-md">
          {value}
        </div>
      </div>
    </div>
  );
};

export default QRCode;
