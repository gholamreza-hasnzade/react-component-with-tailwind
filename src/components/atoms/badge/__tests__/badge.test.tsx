import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Badge } from "../badge";

// Mock react-icons
vi.mock("react-icons/fa", () => ({
  FaBell: () => (
    <div data-testid="bell-icon" aria-hidden="true">
      Bell
    </div>
  ),
  FaCheck: () => (
    <div data-testid="check-icon" aria-hidden="true">
      Check
    </div>
  ),
  FaTimes: () => (
    <div data-testid="times-icon" aria-hidden="true">
      Times
    </div>
  ),
  FaExclamationTriangle: () => (
    <div data-testid="warning-icon" aria-hidden="true">
      Warning
    </div>
  ),
  FaInfoCircle: () => (
    <div data-testid="info-icon" aria-hidden="true">
      Info
    </div>
  ),
}));

// Helper function to get the Badge container
const getBadgeContainer = (text: string) => {
  return screen.getByText(text).closest('div');
};

describe("Badge Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Badge>Default Badge</Badge>);
      const badge = getBadgeContainer("Default Badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass(
        "inline-flex",
        "items-center",
        "border",
        "font-semibold"
      );
    });

    it("renders with custom children", () => {
      render(<Badge>Custom Content</Badge>);
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Badge className="custom-class">Badge</Badge>);
      const badge = getBadgeContainer("Badge");
      expect(badge).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = getBadgeContainer("Default");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-primary",
        "text-primary-foreground"
      );
    });

    it("renders primary variant", () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = getBadgeContainer("Primary");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-blue-600",
        "text-white"
      );
    });

    it("renders secondary variant", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = getBadgeContainer("Secondary");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-secondary",
        "text-secondary-foreground"
      );
    });

    it("renders destructive variant", () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = getBadgeContainer("Destructive");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-destructive",
        "text-destructive-foreground"
      );
    });

    it("renders outline variant", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = getBadgeContainer("Outline");
      expect(badge).toHaveClass("text-foreground");
    });

    it("renders success variant", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = getBadgeContainer("Success");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-green-100",
        "text-green-800"
      );
    });

    it("renders warning variant", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = getBadgeContainer("Warning");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-yellow-100",
        "text-yellow-800"
      );
    });

    it("renders info variant", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = getBadgeContainer("Info");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-blue-100",
        "text-blue-800"
      );
    });

    it("renders error variant", () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = getBadgeContainer("Error");
      expect(badge).toHaveClass(
        "border-transparent",
        "bg-red-100",
        "text-red-800"
      );
    });

    it("renders color variants", () => {
      const colorVariants = [
        "purple",
        "pink",
        "indigo",
        "orange",
        "teal",
        "gray",
        "green",
        "blue",
        "yellow",
      ];

      colorVariants.forEach((variant) => {
        const { unmount } = render(
          <Badge
            variant={
              variant as
                | "purple"
                | "pink"
                | "indigo"
                | "orange"
                | "teal"
                | "gray"
                | "green"
                | "blue"
                | "yellow"
            }
          >
            {variant}
          </Badge>
        );
        const badge = getBadgeContainer(variant);
        expect(badge).toHaveClass("border-transparent");
        unmount();
      });
    });
  });

  describe("Sizes", () => {
    it("renders extra small size", () => {
      render(<Badge size="xs">XS</Badge>);
      const badge = getBadgeContainer("XS");
      expect(badge).toHaveClass("px-1.5", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders small size", () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = getBadgeContainer("Small");
      expect(badge).toHaveClass("px-2", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders medium size", () => {
      render(<Badge size="md">Medium</Badge>);
      const badge = getBadgeContainer("Medium");
      expect(badge).toHaveClass("px-2.5", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders large size", () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = getBadgeContainer("Large");
      expect(badge).toHaveClass("px-3", "py-1", "text-sm", "rounded-full");
    });
  });

  describe("Rounded Variants", () => {
    it("renders rounded badge by default", () => {
      render(<Badge>Rounded</Badge>);
      const badge = getBadgeContainer("Rounded");
      expect(badge).toHaveClass("rounded-full");
    });

    it("renders rounded badge when rounded is true", () => {
      render(<Badge rounded={true}>Rounded</Badge>);
      const badge = getBadgeContainer("Rounded");
      expect(badge).toHaveClass("rounded-full");
    });

    it("renders not rounded badge when rounded is false", () => {
      render(<Badge rounded={false}>Not Rounded</Badge>);
      const badge = getBadgeContainer("Not Rounded");
      expect(badge).toHaveClass("rounded-md");
    });
  });

  describe("Status Dots", () => {
    it("renders without dot by default", () => {
      render(<Badge>No Dot</Badge>);
      const badge = getBadgeContainer("No Dot");
      expect(
        badge?.querySelector("span[aria-hidden='true']")
      ).not.toBeInTheDocument();
    });

    it("renders with status dot", () => {
      render(<Badge showDot>With Dot</Badge>);
      const badge = getBadgeContainer("With Dot");
      const dot = badge?.querySelector("span[aria-hidden='true']");
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveClass("bg-current", "opacity-60", "rounded-full");
    });

    it("status dot has proper accessibility", () => {
      render(<Badge showDot>With Dot</Badge>);
      const badge = getBadgeContainer("With Dot");
      const dot = badge?.querySelector("span[aria-hidden='true']");
      expect(dot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Icons", () => {
    it("renders without icon by default", () => {
      render(<Badge>No Icon</Badge>);
      const badge = getBadgeContainer("No Icon");
      expect(badge?.querySelector("[data-testid]")).not.toBeInTheDocument();
    });

    it("renders with left icon by default", () => {
      render(<Badge icon={<div data-testid="bell-icon">Bell</div>}>With Icon</Badge>);
      const icon = screen.getByTestId("bell-icon");
      expect(icon).toBeInTheDocument();
    });

    it("renders with right icon when iconPosition is right", () => {
      render(
        <Badge 
          icon={<div data-testid="bell-icon">Bell</div>} 
          iconPosition="right"
        >
          With Icon
        </Badge>
      );
      const icon = screen.getByTestId("bell-icon");
      expect(icon).toBeInTheDocument();
    });

    it("icon has proper accessibility", () => {
      render(<Badge icon={<div data-testid="bell-icon">Bell</div>}>With Icon</Badge>);
      const icon = screen.getByTestId("bell-icon");
      // The icon is wrapped in a span with aria-hidden="true"
      const iconWrapper = icon.parentElement;
      expect(iconWrapper).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Clickable Functionality", () => {
    it("renders as non-clickable by default", () => {
      render(<Badge>Not Clickable</Badge>);
      const badge = getBadgeContainer("Not Clickable");
      expect(badge).not.toHaveAttribute("role", "button");
    });

    it("renders as clickable when clickable is true", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = getBadgeContainer("Clickable");
      expect(badge).toHaveAttribute("role", "button");
    });

    it("applies clickable styles", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = getBadgeContainer("Clickable");
      expect(badge).toHaveClass(
        "cursor-pointer",
        "hover:scale-105",
        "active:scale-95",
        "transform",
        "transition-transform"
      );
    });

    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      
      render(<Badge clickable onClick={mockOnClick}>Clickable</Badge>);
      const badge = getBadgeContainer("Clickable");
      
      await user.click(badge!);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("calls onClick even when not clickable (component behavior)", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      
      render(<Badge onClick={mockOnClick}>Not Clickable</Badge>);
      const badge = getBadgeContainer("Not Clickable");
      
      await user.click(badge!);
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Dismissible Functionality", () => {
    it("renders as non-dismissible by default", () => {
      render(<Badge>Not Dismissible</Badge>);
      const dismissButton = screen.queryByRole("button", { name: "Remove badge" });
      expect(dismissButton).not.toBeInTheDocument();
    });

    it("renders dismiss button when dismissible is true", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      expect(dismissButton).toBeInTheDocument();
    });

    it("dismiss button has proper styling", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      expect(dismissButton).toHaveClass(
        "ml-1.5",
        "p-0.5",
        "rounded-full",
        "hover:bg-black/10"
      );
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();
      
      render(<Badge dismissible onDismiss={mockOnDismiss}>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      
      await user.click(dismissButton);
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard dismissal", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();
      
      render(<Badge dismissible onDismiss={mockOnDismiss}>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      
      dismissButton.focus();
      await user.keyboard("{Enter}");
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it("handles space key dismissal", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();
      
      render(<Badge dismissible onDismiss={mockOnDismiss}>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      
      dismissButton.focus();
      await user.keyboard(" ");
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
    });

    it("prevents event propagation on dismiss", async () => {
      const user = userEvent.setup();
      const mockOnDismiss = vi.fn();
      const mockOnClick = vi.fn();
      
      render(
        <Badge 
          clickable 
          dismissible 
          onClick={mockOnClick} 
          onDismiss={mockOnDismiss}
        >
          Dismissible
        </Badge>
      );
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      
      await user.click(dismissButton);
      expect(mockOnDismiss).toHaveBeenCalledTimes(1);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Combined Features", () => {
    it("renders with dot and icon", () => {
      render(
        <Badge 
          showDot 
          icon={<div data-testid="bell-icon">Bell</div>}
        >
          Combined
        </Badge>
      );
      
      const badge = getBadgeContainer("Combined");
      const dot = badge?.querySelector("span[aria-hidden='true']");
      const icon = screen.getByTestId("bell-icon");
      
      expect(dot).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it("renders clickable with dot", () => {
      render(<Badge clickable showDot>Clickable Dot</Badge>);
      const badge = getBadgeContainer("Clickable Dot");
      expect(badge).toHaveAttribute("role", "button");
    });

    it("renders dismissible with icon", () => {
      render(
        <Badge 
          dismissible 
          icon={<div data-testid="bell-icon">Bell</div>}
        >
          Dismissible Icon
        </Badge>
      );
      
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      const icon = screen.getByTestId("bell-icon");
      
      expect(dismissButton).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });

    it("renders with all features", () => {
      render(
        <Badge 
          clickable 
          dismissible 
          showDot 
          icon={<div data-testid="bell-icon">Bell</div>}
        >
          All Features
        </Badge>
      );
      
      const badge = getBadgeContainer("All Features");
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      const dot = badge?.querySelector("span[aria-hidden='true']");
      const icon = screen.getByTestId("bell-icon");
      
      expect(badge).toHaveAttribute("role", "button");
      expect(dismissButton).toBeInTheDocument();
      expect(dot).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper focus states", () => {
      render(<Badge>Focusable</Badge>);
      const badge = getBadgeContainer("Focusable");
      expect(badge).toHaveClass(
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-ring",
        "focus:ring-offset-2"
      );
    });

    it("dismiss button has proper focus states", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      expect(dismissButton).toHaveClass(
        "focus:outline-none",
        "focus:ring-1"
      );
    });

    it("maintains proper tab order", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = getBadgeContainer("Clickable");
      expect(badge).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Content Handling", () => {
    it("handles whitespace properly", () => {
      render(<Badge data-testid="empty-badge"> Whitespace </Badge>);
      const badge = screen.getByTestId("empty-badge");
      const contentSpan = badge.querySelector("span");
      expect(contentSpan).toBeInTheDocument();
      expect(contentSpan).toHaveClass("whitespace-nowrap");
    });

    it("handles long content", () => {
      const longText = "This is a very long badge text that should be handled properly";
      render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("handles empty content", () => {
      render(<Badge data-testid="empty-badge"></Badge>);
      const badge = screen.getByTestId("empty-badge");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("passes through other props", () => {
      render(<Badge data-testid="badge" title="Test title">Badge</Badge>);
      const badge = screen.getByTestId("badge");
      expect(badge).toHaveAttribute("title", "Test title");
    });

    it("handles multiple event handlers", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      const mockOnMouseOver = vi.fn();
      
      render(
        <Badge 
          clickable 
          onClick={mockOnClick} 
          onMouseOver={mockOnMouseOver}
        >
          Multi Event
        </Badge>
      );
      
      const badge = getBadgeContainer("Multi Event");
      await user.click(badge!);
      await user.hover(badge!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnMouseOver).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onDismiss gracefully", async () => {
      const user = userEvent.setup();
      
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      
      // Should not throw error
      await expect(user.click(dismissButton)).resolves.not.toThrow();
    });

    it("handles undefined onClick gracefully", async () => {
      const user = userEvent.setup();
      
      render(<Badge clickable>Clickable</Badge>);
      const badge = getBadgeContainer("Clickable");
      
      // Should not throw error
      await expect(user.click(badge!)).resolves.not.toThrow();
    });

    it("handles invalid variant gracefully", () => {
      render(<Badge variant={"invalid" as any}>Invalid</Badge>);
      const badge = getBadgeContainer("Invalid");
      expect(badge).toBeInTheDocument();
    });

    it("handles invalid size gracefully", () => {
      render(<Badge size={"invalid" as any}>Invalid</Badge>);
      const badge = getBadgeContainer("Invalid");
      expect(badge).toBeInTheDocument();
    });
  });
});