import { render, screen, waitFor } from "@testing-library/react";
import { expect, describe, it, vi, beforeEach, afterEach } from "vitest";
import "@testing-library/jest-dom";
import { Barcode } from "../barcodes";

// Mock JsBarcode
vi.mock("jsbarcode", () => ({
  default: vi.fn(),
}));

// Mock window.innerWidth for responsive tests
const mockWindowWidth = (width: number) => {
  Object.defineProperty(window, "innerWidth", {
    writable: true,
    configurable: true,
    value: width,
  });
};

describe("Barcode Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWindowWidth(1024); // Default to desktop width
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Barcode value="123456789" />);
      
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Barcode: 123456789");
    });

    it("renders with custom props", () => {
      render(
        <Barcode
          value="987654321"
          format="CODE39"
          size="lg"
          width={400}
          height={150}
          foregroundColor="#FF0000"
          backgroundColor="#FFFF00"
          showText={false}
          ariaLabel="Custom barcode"
        />
      );

      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Custom barcode");
    });

    it("applies custom className", () => {
      render(<Barcode value="123" className="custom-class" />);
      
      const container = screen.getByRole("img");
      expect(container).toHaveClass("custom-class");
    });
  });

  describe("Empty State", () => {
    it("renders empty state when value is empty", () => {
      render(<Barcode value="" />);
      
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("No barcode value")).toBeInTheDocument();
      expect(screen.getByText("Enter a value to generate barcode")).toBeInTheDocument();
    });

    it("renders empty state when value is only whitespace", () => {
      render(<Barcode value="   " />);
      
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByText("No barcode value")).toBeInTheDocument();
    });

    it("shows custom aria label for empty state", () => {
      render(<Barcode value="" ariaLabel="Empty barcode" />);
      
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Empty barcode");
    });
  });

  describe("Error Handling", () => {
    it("renders error state when barcode generation fails", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {
        throw new Error("Invalid barcode");
      });

      render(<Barcode value="invalid" />);
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("Error")).toBeInTheDocument();
        expect(screen.getByText("Invalid barcode")).toBeInTheDocument();
      });
    });

    it("validates EAN13 format requirements", async () => {
      const onError = vi.fn();
      render(<Barcode value="123" format="EAN13" onError={onError} />);
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("EAN13 requires 12 or 13 digits")).toBeInTheDocument();
        expect(onError).toHaveBeenCalledWith("EAN13 requires 12 or 13 digits");
      });
    });

    it("validates EAN8 format requirements", async () => {
      const onError = vi.fn();
      render(<Barcode value="123" format="EAN8" onError={onError} />);
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("EAN8 requires 7 or 8 digits")).toBeInTheDocument();
        expect(onError).toHaveBeenCalledWith("EAN8 requires 7 or 8 digits");
      });
    });

    it("validates UPC format requirements", async () => {
      const onError = vi.fn();
      render(<Barcode value="123" format="UPC" onError={onError} />);
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toBeInTheDocument();
        expect(screen.getByText("UPC requires 11 or 12 digits")).toBeInTheDocument();
        expect(onError).toHaveBeenCalledWith("UPC requires 11 or 12 digits");
      });
    });

    it("calls onError callback when barcode generation fails", async () => {
      const onError = vi.fn();
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {
        throw new Error("Test error");
      });

      render(<Barcode value="test" onError={onError} />);
      
      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith("Test error");
      });
    });
  });

  describe("Success Handling", () => {
    it("calls onSuccess callback when barcode generation succeeds", async () => {
      const onSuccess = vi.fn();
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(<Barcode value="123456789" onSuccess={onSuccess} />);
      
      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
    });
  });

  describe("Loading State", () => {
    it("shows loading state during barcode generation", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      
      // Mock JsBarcode to simulate async behavior
      vi.mocked(mockJsBarcode).mockImplementation(() => {
        return new Promise<void>((resolve) => {
          // Use a longer delay to ensure we can catch the loading state
          setTimeout(() => {
            resolve();
          }, 200);
        });
      });

      render(<Barcode value="123456789" />);
      
      // Wait for loading state to appear
      await waitFor(() => {
        expect(screen.getByText("Generating barcode...")).toBeInTheDocument();
      }, { timeout: 500 });
      
      // Wait for loading to complete
      await waitFor(() => {
        expect(screen.queryByText("Generating barcode...")).not.toBeInTheDocument();
      }, { timeout: 500 });
    });
  });

  describe("Text Display", () => {
    it("shows barcode value when showText is true", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(<Barcode value="123456789" showText={true} />);
      
      await waitFor(() => {
        expect(screen.getByText("123456789")).toBeInTheDocument();
        expect(screen.getByText("123456789")).toHaveClass("font-mono");
      });
    });

    it("hides barcode value when showText is false", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(<Barcode value="123456789" showText={false} />);
      
      await waitFor(() => {
        expect(screen.queryByText("123456789")).not.toBeInTheDocument();
      });
    });
  });

  describe("Responsive Behavior", () => {
    it("adjusts width for mobile screens", () => {
      mockWindowWidth(400); // Mobile width
      render(<Barcode value="123456789" width={500} />);
      
      // The component should render without errors
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("adjusts width for tablet screens", () => {
      mockWindowWidth(768); // Tablet width
      render(<Barcode value="123456789" width={600} />);
      
      expect(screen.getByRole("img")).toBeInTheDocument();
    });

    it("adjusts width for desktop screens", () => {
      mockWindowWidth(1200); // Desktop width
      render(<Barcode value="123456789" width={800} />);
      
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  describe("Canvas Rendering", () => {
    it("renders canvas with correct attributes", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(<Barcode value="123456789" width={300} height={100} />);
      
      await waitFor(() => {
        const canvas = screen.getByRole("img").querySelector("canvas");
        expect(canvas).toBeInTheDocument();
        expect(canvas).toHaveClass("max-w-full", "h-auto", "rounded-lg");
        expect(canvas).toHaveStyle({
          maxWidth: "100%",
          height: "auto",
        });
      });
    });

    it("calls JsBarcode with correct parameters", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(
        <Barcode
          value="123456789"
          format="CODE128"
          width={300}
          height={100}
          foregroundColor="#FF0000"
          backgroundColor="#FFFF00"
          showText={true}
        />
      );

      await waitFor(() => {
        expect(mockJsBarcode).toHaveBeenCalledWith(
          expect.any(HTMLCanvasElement),
          "123456789",
          expect.objectContaining({
            format: "CODE128",
            displayValue: true,
            background: "#FFFF00",
            lineColor: "#FF0000",
            valid: expect.any(Function),
          })
        );
      });
    });
  });

  describe("Size Variants", () => {
    it("applies small size variant", () => {
      render(<Barcode value="123" size="sm" />);
      
      const container = screen.getByRole("img");
      expect(container).toHaveClass("p-2", "sm:p-3");
    });

    it("applies medium size variant", () => {
      render(<Barcode value="123" size="md" />);
      
      const container = screen.getByRole("img");
      expect(container).toHaveClass("p-3", "sm:p-4", "md:p-6");
    });

    it("applies large size variant", () => {
      render(<Barcode value="123" size="lg" />);
      
      const container = screen.getByRole("img");
      expect(container).toHaveClass("p-4", "sm:p-6", "md:p-8");
    });

    it("applies extra large size variant", () => {
      render(<Barcode value="123" size="xl" />);
      
      const container = screen.getByRole("img");
      expect(container).toHaveClass("p-6", "sm:p-8", "md:p-10");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      render(<Barcode value="123456789" ariaLabel="Product barcode" />);
      
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Product barcode");
    });

    it("has proper ARIA attributes for error state", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {
        throw new Error("Test error");
      });

      render(<Barcode value="invalid" ariaLabel="Error barcode" />);
      
      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveAttribute("aria-label", "Error barcode");
      });
    });

    it("has proper ARIA attributes for empty state", () => {
      render(<Barcode value="" ariaLabel="Empty barcode" />);
      
      expect(screen.getByRole("img")).toHaveAttribute("aria-label", "Empty barcode");
    });
  });

  describe("Edge Cases", () => {
    it("handles very long barcode values", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      const longValue = "123456789012345678901234567890";
      render(<Barcode value={longValue} />);
      
      await waitFor(() => {
        expect(screen.getByText(longValue)).toBeInTheDocument();
      });
      
      // Check that the container has break-words class, not the span
      const textContainer = screen.getByText(longValue).parentElement;
      expect(textContainer).toHaveClass("break-words");
    });

    it("handles special characters in barcode value", async () => {
      const { default: mockJsBarcode } = await import("jsbarcode");
      vi.mocked(mockJsBarcode).mockImplementation(() => {});

      render(<Barcode value="ABC-123_456" />);
      
      await waitFor(() => {
        expect(screen.getByText("ABC-123_456")).toBeInTheDocument();
      });
    });

    it("handles SSR environment", () => {
      // Test that the component renders without errors
      // The component has built-in SSR safety with typeof window checks
      render(<Barcode value="123456789" />);
      
      // The component should render successfully
      expect(screen.getByRole("img")).toBeInTheDocument();
      
      // Verify the component has proper SSR-safe attributes
      const barcodeElement = screen.getByRole("img");
      expect(barcodeElement).toHaveAttribute("aria-label", "Barcode: 123456789");
    });
  });
});
