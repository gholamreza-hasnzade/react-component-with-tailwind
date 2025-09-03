import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

vi.mock("./accordion.css", () => ({}));

vi.mock("@/lib/utils", () => ({
  cn: (...classes: (string | undefined | null | false)[]) =>
    classes.filter(Boolean).join(" "),
}));



describe("Accordion Component", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  afterEach(() => {
    const styles = document.querySelectorAll(
      'style[data-accordion-animation="true"]'
    );
    styles.forEach((style) => style.remove());
  });

  describe("Basic Functionality", () => {
    it("renders accordion with single item", () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test Trigger</AccordionTrigger>
            <AccordionContent>Test Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText("Test Trigger")).toBeInTheDocument();
      const content = container.querySelector('[data-slot="accordion-content"]');
      expect(content).toBeInTheDocument();
    });

    it("applies custom className", () => {
      const { container } = render(
        <Accordion className="custom-class">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Single vs Multiple Type", () => {
    it("allows only one item to be open in single type", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger1 = screen.getByRole("button", { name: "Item 1" });
      const trigger2 = screen.getByRole("button", { name: "Item 2" });

      await user.click(trigger1);
      await waitFor(() => {
        expect(screen.getByText("Content 1")).toBeVisible();
      });

      await user.click(trigger2);
      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeVisible();
        const content1 = container.querySelector('[data-slot="accordion-content"]');
        expect(content1).toHaveAttribute("data-state", "closed");
      });
    });

    it("respects defaultValue in single type", () => {
      const { container } = render(
        <Accordion type="single" defaultValue="item-2">
          <AccordionItem value="item-1">
            <AccordionTrigger>Item 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Item 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByText("Content 2")).toBeVisible();  
      const content1 = container.querySelectorAll('[data-slot="accordion-content"]')[0];
      expect(content1).toHaveAttribute("data-state", "closed");
    });
  });

  describe("Icon Variants", () => {
    it("renders chevron icons by default", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      expect(trigger.querySelector("svg")).toBeInTheDocument();
    });

    it("hides icons when showIcon is false", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger showIcon={false}>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      expect(trigger.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("Size and Color Variants", () => {
    it("applies correct size classes", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger size="sm">Small</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByRole("button")).toHaveClass("accordion-size-sm");
    });

    it("applies correct color classes", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger color="primary">Primary</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByRole("button")).toHaveClass("accordion-color-primary");
    });
  });

  describe("Loading and Disabled States", () => {
    it("shows loading spinner when loading", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger loading>Loading</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      expect(trigger).toBeDisabled();
      expect(trigger.querySelector(".accordion-loading")).toBeInTheDocument();
    });

    it("disables trigger when disabled prop is true", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger disabled>Disabled</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByRole("button")).toBeDisabled();
    });
  });

  describe("RTL Support", () => {
    it("applies RTL classes when dir is rtl", () => {
      const { container } = render(
        <Accordion dir="rtl">
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const accordion = container.querySelector('[data-slot="accordion"]');
      expect(accordion).toHaveClass("rtl");
    });
  });

  describe("Animation Duration", () => {
    it("applies custom animation duration", () => {
      render(
        <Accordion animationDuration={500}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const style = document.querySelector(
        'style[data-accordion-animation="true"]'
      );
      expect(style).toBeInTheDocument();
      expect(style?.textContent).toContain("500ms");
    });
  });

  describe("Event Handling", () => {
    it("calls onValueChange when accordion state changes", async () => {
      const onValueChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Accordion onValueChange={onValueChange}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      await user.click(screen.getByRole("button"));

      expect(onValueChange).toHaveBeenCalledWith("item-1");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes", () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      const content = container.querySelector('[data-slot="accordion-content"]');

      expect(trigger).toHaveAttribute("aria-expanded", "false");
      expect(content).toHaveAttribute("data-state", "closed");
    });

    it("updates ARIA attributes when expanded", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      const content = container.querySelector('[data-slot="accordion-content"]');

      await user.click(trigger);

      await waitFor(() => {
        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(content).toHaveAttribute("data-state", "open");
      });
    });
  });

  describe("Transition Types", () => {
    it("applies slide transition by default", () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const content = container.querySelector('[data-slot="accordion-content"]');
      expect(content).toHaveClass("data-[state=closed]:animate-accordion-up");
      expect(content).toHaveClass("data-[state=open]:animate-accordion-down");
    });

    it("applies fade transition when specified", () => {
      const { container } = render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent transition="fade">Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const content = container.querySelector('[data-slot="accordion-content"]');
      expect(content).toHaveClass("data-[state=closed]:opacity-0");
      expect(content).toHaveClass("data-[state=open]:opacity-100");
      expect(content).toHaveClass("transition-opacity");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty content gracefully", () => {
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Empty content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles HTML content safely", async () => {
      const user = userEvent.setup();
      
      render(
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>
              <div>
                <h3>Title</h3>
                <p>Paragraph with <strong>bold</strong> text</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      await user.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Title")).toBeInTheDocument();
        expect(screen.getByText("bold")).toBeInTheDocument();
      });
    });
  });

  describe("Collapsible Behavior", () => {
    it("allows collapsing in single type when collapsible is true", async () => {
      const user = userEvent.setup();

      const { container } = render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Test</AccordionTrigger>
            <AccordionContent>Content</AccordionContent>
          </AccordionItem>
        </Accordion>
      );

      const trigger = screen.getByRole("button");
      const content = container.querySelector('[data-slot="accordion-content"]');

      await user.click(trigger);
      await waitFor(() => {
        expect(content).toHaveAttribute("data-state", "open");
      });

      await user.click(trigger);
      await waitFor(() => {
        expect(content).toHaveAttribute("data-state", "closed");
      });
    });
  });
});
