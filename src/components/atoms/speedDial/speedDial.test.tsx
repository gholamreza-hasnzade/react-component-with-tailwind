import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SpeedDial, type SpeedDialAction } from "./speedDial";

const mockActions: SpeedDialAction[] = [
  {
    id: "edit",
    icon: <span>✏️</span>,
    label: "Edit",
    tooltip: "Edit item",
    onClick: vi.fn(),
  },
  {
    id: "delete",
    icon: <span>🗑️</span>,
    label: "Delete",
    tooltip: "Delete item",
    onClick: vi.fn(),
  },
];

describe("SpeedDial", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<SpeedDial actions={mockActions} />);
    expect(screen.getByLabelText("Open speed dial")).toBeInTheDocument();
  });

  it("renders main button with correct aria attributes", () => {
    render(<SpeedDial actions={mockActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    expect(mainButton).toHaveAttribute("aria-expanded", "false");
    expect(mainButton).toHaveAttribute("aria-haspopup", "true");
  });

  it("shows actions when opened", () => {
    render(<SpeedDial actions={mockActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete")).toBeInTheDocument();
  });

  it("hides actions when closed", () => {
    render(<SpeedDial actions={mockActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    // Open first
    fireEvent.click(mainButton);
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    
    // Close
    fireEvent.click(mainButton);
    expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
  });

  it("calls action onClick when action is clicked", () => {
    render(<SpeedDial actions={mockActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const editAction = screen.getByLabelText("Edit");
    fireEvent.click(editAction);
    
    expect(mockActions[0].onClick).toHaveBeenCalledTimes(1);
  });

  it("closes after action click when closeOnActionClick is true", () => {
    render(<SpeedDial actions={mockActions} closeOnActionClick={true} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const editAction = screen.getByLabelText("Edit");
    fireEvent.click(editAction);
    
    expect(screen.queryByLabelText("Edit")).not.toBeInTheDocument();
  });

  it("stays open after action click when closeOnActionClick is false", () => {
    render(<SpeedDial actions={mockActions} closeOnActionClick={false} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const editAction = screen.getByLabelText("Edit");
    fireEvent.click(editAction);
    
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
  });

  it("shows labels when showLabels is true", () => {
    render(<SpeedDial actions={mockActions} showLabels={true} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    
    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("hides labels when showLabels is false", () => {
    render(<SpeedDial actions={mockActions} showLabels={false} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("shows tooltips when showTooltips is true", () => {
    render(<SpeedDial actions={mockActions} showTooltips={true} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const editAction = screen.getByLabelText("Edit");
    
    expect(editAction).toHaveAttribute("title", "Edit item");
  });

  it("hides tooltips when showTooltips is false", () => {
    render(<SpeedDial actions={mockActions} showTooltips={false} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const editAction = screen.getByLabelText("Edit");
    
    expect(editAction).not.toHaveAttribute("title");
  });

  it("handles disabled actions correctly", () => {
    const disabledActions: SpeedDialAction[] = [
      {
        id: "disabled",
        icon: <span>🚫</span>,
        label: "Disabled",
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    render(<SpeedDial actions={disabledActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const disabledAction = screen.getByLabelText("Disabled");
    
    expect(disabledAction).toBeDisabled();
    expect(disabledAction).toHaveClass("opacity-50");
  });

  it("does not call onClick for disabled actions", () => {
    const disabledActions: SpeedDialAction[] = [
      {
        id: "disabled",
        icon: <span>🚫</span>,
        label: "Disabled",
        onClick: vi.fn(),
        disabled: true,
      },
    ];

    render(<SpeedDial actions={disabledActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    const disabledAction = screen.getByLabelText("Disabled");
    fireEvent.click(disabledAction);
    
    expect(disabledActions[0].onClick).not.toHaveBeenCalled();
  });

  it("applies correct size classes", () => {
    const { container } = render(
      <SpeedDial actions={mockActions} size="lg" />
    );
    
    const mainButton = container.querySelector("button");
    expect(mainButton).toHaveClass("w-16", "h-16");
  });

  it("applies correct color scheme classes", () => {
    const { container } = render(
      <SpeedDial actions={mockActions} colorScheme="success" />
    );
    
    const mainButton = container.querySelector("button");
    expect(mainButton).toHaveClass("bg-green-600");
  });

  it("applies custom className", () => {
    const { container } = render(
      <SpeedDial actions={mockActions} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles controlled mode correctly", () => {
    const onOpenChange = vi.fn();
    render(
      <SpeedDial
        actions={mockActions}
        controlled={true}
        open={true}
        onOpenChange={onOpenChange}
      />
    );
    
    // Actions should be visible when open is true
    expect(screen.getByLabelText("Edit")).toBeInTheDocument();
    
    // Clicking main button should call onOpenChange
    const mainButton = screen.getByLabelText("Close speed dial");
    fireEvent.click(mainButton);
    
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("handles custom main icon", () => {
    const customIcon = <span data-testid="custom-icon">🎯</span>;
    render(<SpeedDial actions={mockActions} mainIcon={customIcon} />);
    
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });

  it("rotates main button icon when open", () => {
    render(<SpeedDial actions={mockActions} />);
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    
    expect(mainButton).toHaveClass("rotate-45");
  });

  it("positions correctly based on position prop", () => {
    const { container } = render(
      <SpeedDial actions={mockActions} position="top-left" />
    );
    
    const speedDial = container.firstChild as HTMLElement;
    expect(speedDial).toHaveClass("top-4", "left-4");
  });

  it("expands actions in correct direction", () => {
    const { container } = render(
      <SpeedDial actions={mockActions} direction="down" />
    );
    const mainButton = screen.getByLabelText("Open speed dial");
    
    fireEvent.click(mainButton);
    
    const actionsContainer = container.querySelector("[class*='top-full']");
    expect(actionsContainer).toBeInTheDocument();
  });

  it("calls onOpenChange when state changes", () => {
    const onOpenChange = vi.fn();
    render(<SpeedDial actions={mockActions} onOpenChange={onOpenChange} />);
    
    const mainButton = screen.getByLabelText("Open speed dial");
    fireEvent.click(mainButton);
    
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders with default props correctly", () => {
    render(<SpeedDial actions={mockActions} />);
    
    const mainButton = screen.getByLabelText("Open speed dial");
    expect(mainButton).toBeInTheDocument();
    expect(mainButton).toHaveClass("w-14", "h-14"); // Default size
    expect(mainButton).toHaveClass("bg-blue-600"); // Default color
  });
});
