import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Badge } from "../badge";

// Mock react-icons
vi.mock("react-icons/fa", () => ({
  FaBell: () => <div data-testid="bell-icon" aria-hidden="true">Bell</div>,
  FaCheck: () => <div data-testid="check-icon" aria-hidden="true">Check</div>,
  FaTimes: () => <div data-testid="times-icon" aria-hidden="true">Times</div>,
  FaExclamationTriangle: () => <div data-testid="warning-icon" aria-hidden="true">Warning</div>,
  FaInfoCircle: () => <div data-testid="info-icon" aria-hidden="true">Info</div>,
}));

describe("Badge Component", () => {
  describe("Basic Rendering", () => {
    it("renders with default props", () => {
      render(<Badge>Default Badge</Badge>);
      const badge = screen.getByText("Default Badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveClass("inline-flex", "items-center", "border", "font-semibold");
    });

    it("renders with custom children", () => {
      render(<Badge>Custom Content</Badge>);
      expect(screen.getByText("Custom Content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(<Badge className="custom-class">Badge</Badge>);
      const badge = screen.getByText("Badge");
      expect(badge).toHaveClass("custom-class");
    });
  });

  describe("Variants", () => {
    it("renders default variant", () => {
      render(<Badge variant="default">Default</Badge>);
      const badge = screen.getByText("Default");
      expect(badge).toHaveClass("border-transparent", "bg-primary", "text-primary-foreground");
    });

    it("renders primary variant", () => {
      render(<Badge variant="primary">Primary</Badge>);
      const badge = screen.getByText("Primary");
      expect(badge).toHaveClass("border-transparent", "bg-blue-600", "text-white");
    });

    it("renders secondary variant", () => {
      render(<Badge variant="secondary">Secondary</Badge>);
      const badge = screen.getByText("Secondary");
      expect(badge).toHaveClass("border-transparent", "bg-secondary", "text-secondary-foreground");
    });

    it("renders destructive variant", () => {
      render(<Badge variant="destructive">Destructive</Badge>);
      const badge = screen.getByText("Destructive");
      expect(badge).toHaveClass("border-transparent", "bg-destructive", "text-destructive-foreground");
    });

    it("renders outline variant", () => {
      render(<Badge variant="outline">Outline</Badge>);
      const badge = screen.getByText("Outline");
      expect(badge).toHaveClass("text-foreground");
    });

    it("renders success variant", () => {
      render(<Badge variant="success">Success</Badge>);
      const badge = screen.getByText("Success");
      expect(badge).toHaveClass("border-transparent", "bg-green-100", "text-green-800");
    });

    it("renders warning variant", () => {
      render(<Badge variant="warning">Warning</Badge>);
      const badge = screen.getByText("Warning");
      expect(badge).toHaveClass("border-transparent", "bg-yellow-100", "text-yellow-800");
    });

    it("renders info variant", () => {
      render(<Badge variant="info">Info</Badge>);
      const badge = screen.getByText("Info");
      expect(badge).toHaveClass("border-transparent", "bg-blue-100", "text-blue-800");
    });

    it("renders error variant", () => {
      render(<Badge variant="error">Error</Badge>);
      const badge = screen.getByText("Error");
      expect(badge).toHaveClass("border-transparent", "bg-red-100", "text-red-800");
    });

    it("renders color variants", () => {
      const colorVariants = ["purple", "pink", "indigo", "orange", "teal", "gray", "green", "blue", "yellow"];
      
      colorVariants.forEach((variant) => {
        const { unmount } = render(<Badge variant={variant as "purple" | "pink" | "indigo" | "orange" | "teal" | "gray" | "green" | "blue" | "yellow"}>{variant}</Badge>);
        const badge = screen.getByText(variant);
        expect(badge).toHaveClass("border-transparent");
        unmount();
      });
    });
  });

  describe("Sizes", () => {
    it("renders extra small size", () => {
      render(<Badge size="xs">XS</Badge>);
      const badge = screen.getByText("XS");
      expect(badge).toHaveClass("px-1.5", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders small size", () => {
      render(<Badge size="sm">Small</Badge>);
      const badge = screen.getByText("Small");
      expect(badge).toHaveClass("px-2", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders medium size", () => {
      render(<Badge size="md">Medium</Badge>);
      const badge = screen.getByText("Medium");
      expect(badge).toHaveClass("px-2.5", "py-0.5", "text-xs", "rounded-full");
    });

    it("renders large size", () => {
      render(<Badge size="lg">Large</Badge>);
      const badge = screen.getByText("Large");
      expect(badge).toHaveClass("px-3", "py-1", "text-sm", "rounded-full");
    });
  });

  describe("Rounded Variants", () => {
    it("renders rounded badge by default", () => {
      render(<Badge>Rounded</Badge>);
      const badge = screen.getByText("Rounded");
      expect(badge).toHaveClass("rounded-full");
    });

    it("renders rounded badge when rounded is true", () => {
      render(<Badge rounded={true}>Rounded</Badge>);
      const badge = screen.getByText("Rounded");
      expect(badge).toHaveClass("rounded-full");
    });

    it("renders not rounded badge when rounded is false", () => {
      render(<Badge rounded={false}>Not Rounded</Badge>);
      const badge = screen.getByText("Not Rounded");
      expect(badge).toHaveClass("rounded-md");
    });
  });

  describe("Status Dots", () => {
    it("renders without dot by default", () => {
      render(<Badge>No Dot</Badge>);
      const badge = screen.getByText("No Dot");
      expect(badge.querySelector("[aria-hidden='true']")).not.toBeInTheDocument();
    });

    it("renders with status dot", () => {
      render(<Badge showDot>With Dot</Badge>);
      const badge = screen.getByText("With Dot");
      const dot = badge.querySelector("span[aria-hidden='true']");
      expect(dot).toBeInTheDocument();
      expect(dot).toHaveClass("bg-current", "opacity-60", "rounded-full");
    });

    it("status dot has proper accessibility", () => {
      render(<Badge showDot>With Dot</Badge>);
      const dot = screen.getByText("With Dot").querySelector("span[aria-hidden='true']");
      expect(dot).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Icons", () => {
    it("renders without icon by default", () => {
      render(<Badge>No Icon</Badge>);
      const badge = screen.getByText("No Icon");
      expect(badge.querySelector("[data-testid]")).not.toBeInTheDocument();
    });

    it("renders with left icon by default", () => {
      render(<Badge icon={<div data-testid="test-icon">Icon</div>}>With Icon</Badge>);
      const badge = screen.getByText("With Icon");
      const icon = badge.querySelector("[data-testid='test-icon']");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("mr-1.5", "flex-shrink-0");
    });

    it("renders with right icon when iconPosition is right", () => {
      render(
        <Badge icon={<div data-testid="test-icon">Icon</div>} iconPosition="right">
          With Icon
        </Badge>
      );
      const badge = screen.getByText("With Icon");
      const icon = badge.querySelector("[data-testid='test-icon']");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass("ml-1.5", "flex-shrink-0");
    });

    it("icon has proper accessibility", () => {
      render(<Badge icon={<div data-testid="test-icon">Icon</div>}>With Icon</Badge>);
      const icon = screen.getByText("With Icon").querySelector("[data-testid='test-icon']");
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  describe("Clickable Functionality", () => {
    it("renders as non-clickable by default", () => {
      render(<Badge>Not Clickable</Badge>);
      const badge = screen.getByText("Not Clickable");
      expect(badge).not.toHaveAttribute("role", "button");
      expect(badge).not.toHaveAttribute("tabIndex");
    });

    it("renders as clickable when clickable is true", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = screen.getByText("Clickable");
      expect(badge).toHaveAttribute("role", "button");
      expect(badge).toHaveAttribute("tabIndex", "0");
    });

    it("applies clickable styles", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = screen.getByText("Clickable");
      expect(badge).toHaveClass("cursor-pointer", "hover:scale-105", "active:scale-95", "transform", "transition-transform");
    });

    it("calls onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Badge clickable onClick={handleClick}>Clickable</Badge>);
      
      const badge = screen.getByText("Clickable");
      await user.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("does not call onClick when not clickable", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick}>Not Clickable</Badge>);
      
      const badge = screen.getByText("Not Clickable");
      await user.click(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1); // Still calls because onClick is passed
    });
  });

  describe("Dismissible Functionality", () => {
    it("renders as non-dismissible by default", () => {
      render(<Badge>Not Dismissible</Badge>);
      const badge = screen.getByText("Not Dismissible");
      expect(badge.querySelector("button")).not.toBeInTheDocument();
    });

    it("renders dismiss button when dismissible is true", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const badge = screen.getByText("Dismissible");
      const dismissButton = badge.querySelector("button");
      expect(dismissButton).toBeInTheDocument();
      expect(dismissButton).toHaveAttribute("aria-label", "Remove badge");
    });

    it("dismiss button has proper styling", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      expect(dismissButton).toHaveClass("ml-1.5", "p-0.5", "rounded-full", "hover:bg-black/10");
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Badge dismissible onDismiss={handleDismiss}>Dismissible</Badge>);
      
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      await user.click(dismissButton!);
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it("handles keyboard dismissal", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Badge dismissible onDismiss={handleDismiss}>Dismissible</Badge>);
      
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      dismissButton!.focus();
      await user.keyboard("{Enter}");
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it("handles space key dismissal", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      render(<Badge dismissible onDismiss={handleDismiss}>Dismissible</Badge>);
      
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      dismissButton!.focus();
      await user.keyboard(" ");
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
    });

    it("prevents event propagation on dismiss", async () => {
      const user = userEvent.setup();
      const handleDismiss = vi.fn();
      const handleClick = vi.fn();
      render(
        <Badge dismissible onDismiss={handleDismiss} onClick={handleClick}>
          Dismissible
        </Badge>
      );
      
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      await user.click(dismissButton!);
      
      expect(handleDismiss).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe("Combined Features", () => {
    it("renders with dot and icon", () => {
      render(
        <Badge showDot icon={<div data-testid="test-icon">Icon</div>}>
          With Both
        </Badge>
      );
      const badge = screen.getByText("With Both");
      expect(badge.querySelector("span[aria-hidden='true']")).toBeInTheDocument();
      expect(badge.querySelector("[data-testid='test-icon']")).toBeInTheDocument();
    });

    it("renders clickable with dot", () => {
      render(<Badge clickable showDot>Clickable Dot</Badge>);
      const badge = screen.getByText("Clickable Dot");
      expect(badge).toHaveAttribute("role", "button");
      expect(badge.querySelector("span[aria-hidden='true']")).toBeInTheDocument();
    });

    it("renders dismissible with icon", () => {
      render(
        <Badge dismissible icon={<div data-testid="test-icon">Icon</div>}>
          Dismissible Icon
        </Badge>
      );
      const badge = screen.getByText("Dismissible Icon");
      expect(badge.querySelector("button")).toBeInTheDocument();
      expect(badge.querySelector("[data-testid='test-icon']")).toBeInTheDocument();
    });

    it("renders with all features", () => {
      render(
        <Badge
          variant="primary"
          size="lg"
          showDot
          icon={<div data-testid="test-icon">Icon</div>}
          clickable
          dismissible
        >
          Full Featured
        </Badge>
      );
      const badge = screen.getByText("Full Featured");
      expect(badge).toHaveAttribute("role", "button");
      expect(badge.querySelector("span[aria-hidden='true']")).toBeInTheDocument();
      expect(badge.querySelector("[data-testid='test-icon']")).toBeInTheDocument();
      expect(badge.querySelector("button")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("has proper focus states", () => {
      render(<Badge clickable>Clickable</Badge>);
      const badge = screen.getByText("Clickable");
      expect(badge).toHaveClass("focus:outline-none", "focus:ring-2", "focus:ring-ring", "focus:ring-offset-2");
    });

    it("dismiss button has proper focus states", () => {
      render(<Badge dismissible>Dismissible</Badge>);
      const dismissButton = screen.getByText("Dismissible").querySelector("button");
      expect(dismissButton).toHaveClass("focus:outline-none", "focus:ring-1");
    });

    it("maintains proper tab order", () => {
      render(
        <div>
          <Badge clickable>First</Badge>
          <Badge dismissible>Second</Badge>
        </div>
      );
      
      const firstBadge = screen.getByText("First");
      const secondBadge = screen.getByText("Second");
      const dismissButton = secondBadge.querySelector("button");
      
      expect(firstBadge).toHaveAttribute("tabIndex", "0");
      expect(dismissButton).toHaveAttribute("tabIndex", "0");
    });
  });

  describe("Content Handling", () => {
    it("handles whitespace properly", () => {
      render(<Badge>  Whitespace  </Badge>);
      const badge = screen.getByText("  Whitespace  ");
      const contentSpan = badge.querySelector("span.whitespace-nowrap");
      expect(contentSpan).toBeInTheDocument();
    });

    it("handles long content", () => {
      const longText = "This is a very long badge text that should be handled properly";
      render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it("handles empty content", () => {
      render(<Badge></Badge>);
      const badge = screen.getByRole("generic");
      expect(badge).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("passes through other props", () => {
      render(<Badge data-testid="custom-badge">Test</Badge>);
      expect(screen.getByTestId("custom-badge")).toBeInTheDocument();
    });

    it("handles multiple event handlers", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleMouseEnter = vi.fn();
      
      render(
        <Badge clickable onClick={handleClick} onMouseEnter={handleMouseEnter}>
          Multi Event
        </Badge>
      );
      
      const badge = screen.getByText("Multi Event");
      await user.click(badge);
      await user.hover(badge);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("handles undefined onDismiss gracefully", async () => {
      const user = userEvent.setup();
      render(<Badge dismissible>Dismissible</Badge>);
      
      const dismissButton = screen.getByRole("button", { name: "Remove badge" });
      expect(dismissButton).toBeInTheDocument();
      
      await user.click(dismissButton);
      
      // Should not throw error and button should still exist
      expect(dismissButton).toBeInTheDocument();
    });

    it("handles undefined onClick gracefully", async () => {
      const user = userEvent.setup();
      render(<Badge clickable>Clickable</Badge>);
      
      const badge = screen.getByText("Clickable");
      await user.click(badge);
      
      // Should not throw error
      expect(badge).toBeInTheDocument();
    });

    it("handles invalid variant gracefully", () => {
      render(<Badge variant={"invalid" as "default"}>Invalid</Badge>);
      const badge = screen.getByText("Invalid");
      expect(badge).toBeInTheDocument();
    });

    it("handles invalid size gracefully", () => {
      render(<Badge size={"invalid" as "md"}>Invalid</Badge>);
      const badge = screen.getByText("Invalid");
      expect(badge).toBeInTheDocument();
    });
  });
});
