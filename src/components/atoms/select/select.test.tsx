import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Select } from "./select";

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

describe("Select", () => {
  it("renders with label", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
      />
    );
    expect(screen.getByText("Select Label")).toBeInTheDocument();
  });

  it("shows helperText when no error", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        helperText="Help!"
      />
    );
    expect(screen.getByText("Help!")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        error="Error!"
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        required
      />
    );
    expect(screen.getByTestId("select-required-asterisk")).toBeInTheDocument();
  });

  it("calls onChange when an option is selected (single)", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    fireEvent.click(screen.getByText("Option 2"));
    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });

  it("calls onChange with array when multiple is true", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        multiple
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    fireEvent.click(screen.getByText("Option 1"));
    fireEvent.click(screen.getByText("Option 2"));
    expect(handleChange).toHaveBeenCalledWith([
      options[0],
      options[1],
    ]);
  });
});

describe("Select - additional coverage", () => {
  it("renders loading state and disables button", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        loading
      />
    );
    const btn = screen.getByTestId("select-toggle");
    expect(btn).toBeDisabled();
  });

  it("renders disabled state and cannot open dropdown", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        disabled
      />
    );
    const btn = screen.getByTestId("select-toggle");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(screen.queryByText("Option 1")).not.toBeInTheDocument();
  });

  it("renders with fullWidth and custom width", () => {
    const { rerender } = render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        fullWidth
      />
    );
    expect(screen.getByTestId("select-toggle").className).toMatch(/w-full/);
    rerender(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        width={300}
      />
    );
    expect(screen.getByTestId("select-toggle").style.width).toBe("300px");
  });

  it("renders with different size, variant, and color", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        size="lg"
        variant="outlined"
        color="success"
      />
    );
    const btn = screen.getByTestId("select-toggle");
    expect(btn.className).toMatch(/px-5/);
    expect(btn.className).toMatch(/border-green-600/);
    expect(btn.className).toMatch(/text-green-600/);
  });

  it("removes selected option in multiple mode", () => {
    const handleChange = vi.fn();
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        multiple
        value={[options[0], options[1]]}
        onChange={handleChange}
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    // Remove first selected
    const removeBtn = screen.getAllByRole("button").find(btn => btn.textContent === "×");
    if (removeBtn) fireEvent.click(removeBtn);
    expect(handleChange).toHaveBeenCalled();
  });

  it("shows overflow indicator when more than two selected in multiple mode", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        multiple
        value={options}
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    expect(screen.getByText(/\+1/)).toBeInTheDocument();
  });

  it("renders with editMode and defaultValue", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        editMode
        defaultValue={"2"}
      />
    );
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("renders with no options", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={[]}
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    expect(screen.getByText("No options")).toBeInTheDocument();
  });

  it("shows 'No more options' when hasMore is false (API mode)", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ([{ id: 1, name: "Option 1" }]), // less than limit (10)
    });
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        apiUrl="https://api.example.com/options"
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    await waitFor(() => expect(screen.getByText("No more options")).toBeInTheDocument());
  });

  it("shows only error when both error and helperText are present", () => {
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        options={options}
        error="Error!"
        helperText="Help!"
      />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.queryByText("Help!")).not.toBeInTheDocument();
  });

  it("fetches options from API and supports search", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ([{ id: 10, name: "Remote Option" }]),
    });
    render(
      <Select
        id="select"
        label="Select Label"
        titleKey="name"
        valueKey="id"
        apiUrl="https://api.example.com/options"
      />
    );
    fireEvent.click(screen.getByTestId("select-toggle"));
    await waitFor(() => expect(screen.getByText("Remote Option")).toBeInTheDocument());
    fireEvent.change(screen.getByPlaceholderText("Search..."), { target: { value: "Rem" } });
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
  });
}); 