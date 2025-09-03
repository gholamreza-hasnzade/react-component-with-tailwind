import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ActionsDropdown } from "../actionsDropdown";
import { FaEdit, FaTrash } from "react-icons/fa";

// Mock react-icons
vi.mock("react-icons/fa", () => ({
  FaEdit: () => <div data-testid="edit-icon" aria-hidden="true">Edit</div>,
  FaTrash: () => <div data-testid="trash-icon" aria-hidden="true">Trash</div>,
}));

vi.mock("react-icons/bs", () => ({
  BsThreeDotsVertical: () => <div data-testid="three-dots-icon" aria-hidden="true">ThreeDots</div>,
}));

describe("ActionsDropdown Component", () => {
  beforeEach(() => {
    // Reset DOM
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  });

  afterEach(() => {
    // Clean up any event listeners
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("renders default trigger button", () => {
      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      expect(trigger).toBeInTheDocument();
      expect(screen.getByTestId("three-dots-icon")).toBeInTheDocument();
    });

    it("renders custom trigger when provided", () => {
      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
          trigger={<button>Custom Trigger</button>}
        />
      );

      expect(screen.getByText("Custom Trigger")).toBeInTheDocument();
      expect(screen.queryByRole("button", { name: "Actions" })).not.toBeInTheDocument();
    });

    it("applies custom trigger className", () => {
      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
          trigger={<span>Custom</span>}
          triggerClassName="custom-trigger-class"
        />
      );

      const trigger = screen.getByText("Custom").parentElement;
      expect(trigger).toHaveClass("custom-trigger-class");
    });
  });

  describe("Dropdown Toggle", () => {
    it("opens dropdown when trigger is clicked", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
    });

    it("closes dropdown when trigger is clicked again", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      
      // Open dropdown
      await user.click(trigger);
      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();

      // Close dropdown
      await user.click(trigger);
      expect(screen.queryByRole("menuitem", { name: "Edit" })).not.toBeInTheDocument();
    });

    it("closes dropdown when clicking outside", async () => {
      const user = userEvent.setup();

      render(
        <div>
          <ActionsDropdown
            actions={[
              {
                label: "Edit",
                onClick: vi.fn(),
                icon: <FaEdit />,
              },
            ]}
          />
          <div data-testid="outside">Outside element</div>
        </div>
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      const outside = screen.getByTestId("outside");

      // Open dropdown
      await user.click(trigger);
      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();

      // Click outside
      await user.click(outside);
      expect(screen.queryByRole("menuitem", { name: "Edit" })).not.toBeInTheDocument();
    });

    it("closes dropdown when pressing Escape key", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });

      // Open dropdown
      await user.click(trigger);
      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();

      // Press Escape
      await user.keyboard("{Escape}");
      expect(screen.queryByRole("menuitem", { name: "Edit" })).not.toBeInTheDocument();
    });
  });

  describe("Action Items", () => {
    it("renders action items with labels and icons", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
            {
              label: "Delete",
              onClick: vi.fn(),
              icon: <FaTrash />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      expect(screen.getByRole("menuitem", { name: "Edit" })).toBeInTheDocument();
      expect(screen.getByRole("menuitem", { name: "Delete" })).toBeInTheDocument();
      expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
      expect(screen.getByTestId("trash-icon")).toBeInTheDocument();
    });

    it("calls onClick when action is clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: mockOnClick,
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      await user.click(editButton);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it("passes row data to onClick handler", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();
      const rowData = { id: 1, name: "Test" };

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: mockOnClick,
              icon: <FaEdit />,
            },
          ]}
          row={rowData}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      await user.click(editButton);

      expect(mockOnClick).toHaveBeenCalledWith(rowData);
    });

    it("closes dropdown after action is clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: mockOnClick,
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      await user.click(editButton);

      expect(screen.queryByRole("menuitem", { name: "Edit" })).not.toBeInTheDocument();
    });
  });

  describe("Separators", () => {
    it("renders separators between action groups", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
            { separator: true },
            {
              label: "Delete",
              onClick: vi.fn(),
              icon: <FaTrash />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const separators = screen.getAllByRole("separator");
      expect(separators).toHaveLength(1);
    });
  });

  describe("Action States", () => {
    it("renders disabled actions", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
              disabled: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      expect(editButton).toBeDisabled();
    });

    it("renders loading actions", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Save",
              onClick: vi.fn(),
              icon: <FaEdit />,
              loading: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const saveButton = screen.getByRole("menuitem", { name: "Save" });
      expect(saveButton).toBeDisabled();
      expect(saveButton.querySelector(".animate-spin")).toBeInTheDocument();
    });

    it("renders danger actions with correct styling", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Delete",
              onClick: vi.fn(),
              icon: <FaTrash />,
              danger: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const deleteButton = screen.getByRole("menuitem", { name: "Delete" });
      expect(deleteButton).toHaveClass("text-red-600");
    });

    it("does not call onClick for disabled actions", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: mockOnClick,
              icon: <FaEdit />,
              disabled: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      await user.click(editButton);

      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it("does not call onClick for loading actions", async () => {
      const user = userEvent.setup();
      const mockOnClick = vi.fn();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Save",
              onClick: mockOnClick,
              icon: <FaEdit />,
              loading: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const saveButton = screen.getByRole("menuitem", { name: "Save" });
      await user.click(saveButton);

      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe("Positioning", () => {
    it("applies correct position classes for bottom-right", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
          position="bottom-right"
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const dropdown = screen.getByRole("menu");
      expect(dropdown).toHaveClass("top-full", "left-0", "mt-1");
    });

    it("applies correct position classes for top-left", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
          position="top-left"
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const dropdown = screen.getByRole("menu");
      expect(dropdown).toHaveClass("bottom-full", "right-0", "mb-1");
    });

    it("applies correct position classes for left", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
          position="left"
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const dropdown = screen.getByRole("menu");
      expect(dropdown).toHaveClass("right-full", "top-1/2", "transform", "-translate-y-1/2", "mr-1");
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA attributes on trigger", () => {
      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      expect(trigger).toHaveAttribute("aria-label", "Actions");
    });

    it("has proper ARIA attributes on dropdown", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const dropdown = screen.getByRole("menu");
      expect(dropdown).toHaveAttribute("aria-label", "Actions menu");
    });

    it("has proper ARIA attributes on menu items", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const menuItem = screen.getByRole("menuitem", { name: "Edit" });
      expect(menuItem).toHaveAttribute("type", "button");
    });

    it("shows tooltip for disabled actions", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
              disabled: true,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const editButton = screen.getByRole("menuitem", { name: "Edit" });
      expect(editButton).toHaveAttribute("title", "Action unavailable");
    });
  });

  describe("Edge Cases", () => {
    it("handles empty actions array", () => {
      render(<ActionsDropdown actions={[]} />);

      const trigger = screen.getByRole("button", { name: "Actions" });
      expect(trigger).toBeInTheDocument();
    });

    it("handles actions without icons", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "No Icon Action",
              onClick: vi.fn(),
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      expect(screen.getByRole("menuitem", { name: "No Icon Action" })).toBeInTheDocument();
    });

    it("handles long action labels", async () => {
      const user = userEvent.setup();

      render(
        <ActionsDropdown
          actions={[
            {
              label: "This is a very long action label that should be truncated",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      await user.click(trigger);

      const actionButton = screen.getByRole("menuitem");
      const labelSpan = actionButton.querySelector("span.truncate");
      expect(labelSpan).toBeInTheDocument();
    });
  });

  describe("Event Handling", () => {
    it("cleans up event listeners when dropdown closes", async () => {
      const user = userEvent.setup();
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      
      // Open dropdown (this adds event listeners)
      await user.click(trigger);
      
      // Close dropdown (this should remove event listeners)
      await user.click(trigger);

      // Check that removeEventListener was called when dropdown closed
      expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    });

    it("cleans up event listeners on unmount when dropdown is open", async () => {
      const user = userEvent.setup();
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = render(
        <ActionsDropdown
          actions={[
            {
              label: "Edit",
              onClick: vi.fn(),
              icon: <FaEdit />,
            },
          ]}
        />
      );

      const trigger = screen.getByRole("button", { name: "Actions" });
      
      // Open dropdown (this adds event listeners)
      await user.click(trigger);
      
      // Unmount component while dropdown is open
      unmount();

      // Check that removeEventListener was called on unmount
      expect(removeEventListenerSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith("keydown", expect.any(Function));
    });
  });
});
