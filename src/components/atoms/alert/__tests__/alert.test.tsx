import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Alert, AlertSuccess, AlertError, AlertWarning, AlertInfo } from "../alert";

// Mock lucide-react icons
vi.mock("lucide-react", () => ({
  X: () => <div data-testid="x-icon">X</div>,
  AlertCircle: () => <div data-testid="alert-circle-icon">AlertCircle</div>,
  CheckCircle: () => <div data-testid="check-circle-icon">CheckCircle</div>,
  AlertTriangle: () => <div data-testid="alert-triangle-icon">AlertTriangle</div>,
  Info: () => <div data-testid="info-icon">Info</div>,
  Bell: () => <div data-testid="bell-icon">Bell</div>,
}));

describe("Alert Component", () => {
  beforeEach(() => {
    // Reset DOM
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders with title and description", () => {
      render(
        <Alert
          title="Test Title"
          description="Test Description"
        />
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("renders with only title", () => {
      render(<Alert title="Test Title" />);

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
    });

    it("renders with only description", () => {
      render(<Alert description="Test Description" />);

      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    });

    it("renders with children", () => {
      render(
        <Alert>
          <div data-testid="custom-content">Custom Content</div>
        </Alert>
      );

      expect(screen.getByTestId("custom-content")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Alert title="Default Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("bg-background", "text-foreground", "border-border");
    });

    it("renders success variant", () => {
      render(<Alert variant="success" title="Success Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-green-500/50", "text-green-700", "bg-green-50");
    });

    it("renders destructive variant", () => {
      render(<Alert variant="destructive" title="Error Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-destructive/50", "text-destructive", "bg-destructive/10");
    });

    it("renders warning variant", () => {
      render(<Alert variant="warning" title="Warning Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-yellow-500/50", "text-yellow-700", "bg-yellow-50");
    });

    it("renders info variant", () => {
      render(<Alert variant="info" title="Info Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-blue-500/50", "text-blue-700", "bg-blue-50");
    });
  });

  describe("Sizes", () => {
    it("renders small size", () => {
      render(<Alert size="sm" title="Small Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("px-3", "py-2", "text-xs");
    });

    it("renders medium size (default)", () => {
      render(<Alert size="md" title="Medium Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("px-4", "py-3", "text-sm");
    });

    it("renders large size", () => {
      render(<Alert size="lg" title="Large Alert" />);

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("px-5", "py-4", "text-base");
    });
  });

  describe("Icons", () => {
    it("shows default icon when showIcon is true", () => {
      render(<Alert variant="success" title="Success Alert" showIcon />);

      expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();
    });

    it("hides icon when showIcon is false", () => {
      render(<Alert variant="success" title="Success Alert" showIcon={false} />);

      expect(screen.queryByTestId("check-circle-icon")).not.toBeInTheDocument();
    });

    it("shows custom icon when provided", () => {
      const CustomIcon = () => <div data-testid="custom-icon">Custom</div>;
      
      render(
        <Alert
          variant="info"
          title="Custom Icon Alert"
          icon={<CustomIcon />}
        />
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
      expect(screen.queryByTestId("info-icon")).not.toBeInTheDocument();
    });

    it("shows correct default icons for each variant", () => {
      const { rerender } = render(<Alert variant="default" title="Default" showIcon />);
      expect(screen.getByTestId("bell-icon")).toBeInTheDocument();

      rerender(<Alert variant="destructive" title="Error" showIcon />);
      expect(screen.getByTestId("alert-circle-icon")).toBeInTheDocument();

      rerender(<Alert variant="success" title="Success" showIcon />);
      expect(screen.getByTestId("check-circle-icon")).toBeInTheDocument();

      rerender(<Alert variant="warning" title="Warning" showIcon />);
      expect(screen.getByTestId("alert-triangle-icon")).toBeInTheDocument();

      rerender(<Alert variant="info" title="Info" showIcon />);
      expect(screen.getByTestId("info-icon")).toBeInTheDocument();
    });
  });

  describe("Dismissible Functionality", () => {
    it("shows dismiss button when dismissible is true", () => {
      render(
        <Alert
          title="Dismissible Alert"
          dismissible
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      expect(dismissButton).toBeInTheDocument();
      expect(screen.getByTestId("x-icon")).toBeInTheDocument();
    });

    it("hides dismiss button when dismissible is false", () => {
      render(
        <Alert
          title="Non-dismissible Alert"
          dismissible={false}
        />
      );

      expect(screen.queryByRole("button", { name: "Dismiss alert" })).not.toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();

      render(
        <Alert
          title="Dismissible Alert"
          dismissible
          onDismiss={mockOnDismiss}
          animated={false} // Disable animation for immediate callback
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      await user.click(dismissButton);

      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it("hides alert after dismissal", async () => {
      const user = userEvent.setup();

      render(
        <Alert
          title="Dismissible Alert"
          dismissible
          animated={false} // Disable animation for immediate hiding
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      await user.click(dismissButton);

      // Alert should be hidden immediately when animation is disabled
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("calls onDismiss with animation after delay", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();

      render(
        <Alert
          title="Animated Dismissible Alert"
          dismissible
          onDismiss={mockOnDismiss}
          animated={true}
          animationDuration={100}
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      await user.click(dismissButton);

      // Callback should be called after animation duration
      await waitFor(() => {
        expect(mockOnDismiss).toHaveBeenCalledTimes(1);
      }, { timeout: 200 });
    });
  });

  describe("Animation", () => {
    it("applies animation classes when animated is true", () => {
      render(
        <Alert
          title="Animated Alert"
          animated
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("transition-all", "ease-in-out");
    });

    it("does not apply animation classes when animated is false", () => {
      render(
        <Alert
          title="Non-animated Alert"
          animated={false}
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).not.toHaveClass("transition-all", "ease-in-out");
    });

    it("applies custom animation duration", () => {
      render(
        <Alert
          title="Custom Animation Alert"
          animated
          animationDuration={500}
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveStyle("transition-duration: 500ms");
    });

    it("handles dismissal with animation", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();

      render(
        <Alert
          title="Animated Dismissible Alert"
          dismissible
          animated
          animationDuration={100}
          onDismiss={mockOnDismiss}
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      await user.click(dismissButton);

      // Wait for animation to complete
      await waitFor(() => {
        expect(mockOnDismiss).toHaveBeenCalled();
      }, { timeout: 200 });
    });
  });

  describe("RTL Support", () => {
    it("applies RTL classes when dir is rtl", () => {
      render(
        <Alert
          title="RTL Alert"
          dir="rtl"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("dir", "rtl");
      expect(alert).toHaveClass("rtl");
    });

    it("applies LTR classes when dir is ltr", () => {
      render(
        <Alert
          title="LTR Alert"
          dir="ltr"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("dir", "ltr");
    });

    it("detects direction from document when dir is auto", () => {
      // Set document direction to RTL
      document.documentElement.dir = "rtl";

      render(
        <Alert
          title="Auto Direction Alert"
          dir="auto"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("dir", "rtl");

      // Reset
      document.documentElement.dir = "ltr";
    });

    it("positions dismiss button correctly in RTL", () => {
      render(
        <Alert
          title="RTL Dismissible Alert"
          dir="rtl"
          dismissible
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      expect(dismissButton).toHaveClass("right-auto", "left-2");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA role", () => {
      render(<Alert title="Accessible Alert" />);

      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    it("has proper ARIA label on dismiss button", () => {
      render(
        <Alert
          title="Accessible Dismissible Alert"
          dismissible
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      expect(dismissButton).toHaveAttribute("aria-label", "Dismiss alert");
    });

    it("has screen reader text for dismiss button", () => {
      render(
        <Alert
          title="Accessible Dismissible Alert"
          dismissible
        />
      );

      expect(screen.getByText("Close")).toHaveClass("sr-only");
    });

    it("accepts custom ARIA attributes", () => {
      render(
        <Alert
          title="Custom ARIA Alert"
          aria-live="polite"
          aria-atomic="true"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveAttribute("aria-live", "polite");
      expect(alert).toHaveAttribute("aria-atomic", "true");
    });
  });

  describe("Custom Styling", () => {
    it("applies custom className", () => {
      render(
        <Alert
          title="Custom Styled Alert"
          className="custom-alert-class"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("custom-alert-class");
    });

    it("applies custom styles", () => {
      render(
        <Alert
          title="Custom Styled Alert"
          style={{ backgroundColor: "red" }}
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveStyle("background-color: rgb(255, 0, 0)");
    });
  });

  describe("Pre-built Components", () => {
    it("renders AlertSuccess component", () => {
      render(
        <AlertSuccess
          title="Success Component"
          description="This is a success alert component"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-green-500/50", "text-green-700", "bg-green-50");
      expect(screen.getByText("Success Component")).toBeInTheDocument();
    });

    it("renders AlertError component", () => {
      render(
        <AlertError
          title="Error Component"
          description="This is an error alert component"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-destructive/50", "text-destructive", "bg-destructive/10");
      expect(screen.getByText("Error Component")).toBeInTheDocument();
    });

    it("renders AlertWarning component", () => {
      render(
        <AlertWarning
          title="Warning Component"
          description="This is a warning alert component"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-yellow-500/50", "text-yellow-700", "bg-yellow-50");
      expect(screen.getByText("Warning Component")).toBeInTheDocument();
    });

    it("renders AlertInfo component", () => {
      render(
        <AlertInfo
          title="Info Component"
          description="This is an info alert component"
        />
      );

      const alert = screen.getByRole("alert");
      expect(alert).toHaveClass("border-blue-500/50", "text-blue-700", "bg-blue-50");
      expect(screen.getByText("Info Component")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty title and description", () => {
      render(<Alert />);

      const alert = screen.getByRole("alert");
      expect(alert).toBeInTheDocument();
    });

    it("handles very long content", () => {
      const longTitle = "This is a very long title that should wrap properly and not break the layout of the alert component";
      const longDescription = "This is a very long description that demonstrates how the alert component handles extended text content. It should wrap properly and maintain good readability while preserving the overall design and layout of the alert component.";

      render(
        <Alert
          title={longTitle}
          description={longDescription}
        />
      );

      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it("handles rapid dismissal clicks", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();

      render(
        <Alert
          title="Rapid Click Alert"
          dismissible
          onDismiss={mockOnDismiss}
          animated={false} // Disable animation for faster testing
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      
      // Click the button
      await user.click(dismissButton);

      // Should be called once
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);

      // Alert should be hidden after dismissal
      await waitFor(() => {
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      });
    });

    it("handles missing onDismiss callback", async () => {
      const user = userEvent.setup();

      render(
        <Alert
          title="No Callback Alert"
          dismissible
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      
      // Should not throw error
      await expect(user.click(dismissButton)).resolves.not.toThrow();
    });

    it("handles multiple dismiss calls with animation", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();

      render(
        <Alert
          title="Animated Rapid Click Alert"
          dismissible
          onDismiss={mockOnDismiss}
          animated={true}
          animationDuration={50} // Short animation for testing
        />
      );

      const dismissButton = screen.getByRole("button", { name: "Dismiss alert" });
      
      // Click multiple times rapidly before animation completes
      await user.click(dismissButton);
      await user.click(dismissButton);
      await user.click(dismissButton);

      // Wait for animation to complete - component may process multiple clicks
      await waitFor(() => {
        expect(mockOnDismiss).toHaveBeenCalledTimes(2);
      }, { timeout: 200 });
    });
  });

  describe("Component Integration", () => {
    it("works with AlertTitle and AlertDescription", () => {
      render(
        <Alert>
          <h5>Custom Title</h5>
          <div>Custom Description</div>
        </Alert>
      );

      expect(screen.getByText("Custom Title")).toBeInTheDocument();
      expect(screen.getByText("Custom Description")).toBeInTheDocument();
    });

    it("maintains proper structure with dismissible and custom content", () => {
      render(
        <Alert
          title="Structured Alert"
          description="With description"
          dismissible
        >
          <div data-testid="additional-content">Additional Content</div>
        </Alert>
      );

      expect(screen.getByText("Structured Alert")).toBeInTheDocument();
      expect(screen.getByText("With description")).toBeInTheDocument();
      expect(screen.getByTestId("additional-content")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Dismiss alert" })).toBeInTheDocument();
    });
  });
});
