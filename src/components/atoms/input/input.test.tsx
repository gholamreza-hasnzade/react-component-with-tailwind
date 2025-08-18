import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Input } from "./input";
import { FaUser, FaEye } from "react-icons/fa";
import '@testing-library/jest-dom'; 

describe("Input", () => {
  it("renders with label and placeholder", () => {
    render(
      <Input id="test" label="Test Label" value="" onChange={() => {}} placeholder="Type here..." />
    );
    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    const handleChange = vi.fn();
    render(
      <Input id="test" label="Test Label" value="" onChange={handleChange} />
    );
    const input = screen.getByLabelText("Test Label");
    fireEvent.change(input, { target: { value: "abc" } });
    expect(handleChange).toHaveBeenCalled();
  }); 

  it("shows error message", () => {
    render(
      <Input id="test" label="Test Label" value="" onChange={() => {}} error="Error!" />
    );
    expect(screen.getByText("Error!")).toBeInTheDocument();
  });

  it("shows helper text when no error", () => {
    render(
      <Input id="test" label="Test Label" value="" onChange={() => {}} helperText="Help!" />
    );
    expect(screen.getByText("Help!")).toBeInTheDocument();
  });

  it("shows required indicator", () => {
    render(
      <Input id="test" label="Test Label" value="" onChange={() => {}} required />
    );
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("is readOnly when prop is set", () => {
    render(
      <Input id="test" label="Test Label" value="" onChange={() => {}} readOnly />
    );
    const input = screen.getByLabelText("Test Label") as HTMLInputElement;
    expect(input.readOnly).toBe(true);
  });

  it("calls icon click handlers", () => {
    const onIconLeftClick = vi.fn();
    const onIconRightClick = vi.fn();
    render(
      <Input
        id="test"
        label="Test Label"
        value=""
        onChange={() => {}}
        iconLeft={<FaUser data-testid="icon-left" />}
        iconRight={<FaEye data-testid="icon-right" />}
        onIconLeftClick={onIconLeftClick}
        onIconRightClick={onIconRightClick}
      />
    );
    fireEvent.click(screen.getByTestId("icon-left"));
    fireEvent.click(screen.getByTestId("icon-right"));
    expect(onIconLeftClick).toHaveBeenCalled();
    expect(onIconRightClick).toHaveBeenCalled();
  });

  // New tests for regex pattern validation
  describe("Regex Pattern Validation", () => {
    it("shows validation error when pattern doesn't match", () => {
      render(
        <Input
          id="test"
          label="Phone Number"
          type="text"
          value="123"
          onChange={() => {}}
          patternRgx="^[0-9]{10}$"
          patternErrorMessage="Please enter exactly 10 digits"
        />
      );
      expect(screen.getByText("Please enter exactly 10 digits")).toBeInTheDocument();
    });

    it("shows custom error message for regex validation", () => {
      render(
        <Input
          id="test"
          label="Email"
          type="email"
          value="invalid-email"
          onChange={() => {}}
          patternRgx="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          patternErrorMessage="Please enter a valid email address"
        />
      );
      expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
    });

    it("doesn't show validation error when pattern matches", () => {
      render(
        <Input
          id="test"
          label="Phone Number"
          type="text"
          value="1234567890"
          onChange={() => {}}
          patternRgx="^[0-9]{10}$"
          patternErrorMessage="Please enter exactly 10 digits"
        />
      );
      expect(screen.queryByText("Please enter exactly 10 digits")).not.toBeInTheDocument();
    });

    it("handles invalid regex pattern gracefully", () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(
        <Input
          id="test"
          label="Test"
          value="test"
          onChange={() => {}}
          patternRgx="[invalid-regex"
        />
      );
      expect(consoleSpy).toHaveBeenCalledWith("Invalid regex pattern:", "[invalid-regex");
      consoleSpy.mockRestore();
    });
  });

  // New tests for numeric formatting
  describe("Numeric Formatting", () => {
    it("applies bank account formatting", () => {
      render(
        <Input
          id="test"
          label="Bank Account"
          type="number"
          value="1234567890123456"
          onChange={() => {}}
          formatPattern="bank-account"
        />
      );
      const input = screen.getByLabelText("Bank Account") as HTMLInputElement;
      expect(input.value).toBe("1234-5678-9012-3456");
    });

    it("applies credit card formatting", () => {
      render(
        <Input
          id="test"
          label="Credit Card"
          type="number"
          value="1234567890123456"
          onChange={() => {}}
          formatPattern="credit-card"
        />
      );
      const input = screen.getByLabelText("Credit Card") as HTMLInputElement;
      expect(input.value).toBe("1234-5678-9012-3456");
    });

    it("applies custom formatting with dashes", () => {
      render(
        <Input
          id="test"
          label="Custom Format"
          type="number"
          value="12345678"
          onChange={() => {}}
          formatPattern="custom"
          customFormat="##-##-##-##"
        />
      );
      const input = screen.getByLabelText("Custom Format") as HTMLInputElement;
      expect(input.value).toBe("12-34-56-78");
    });

    it("applies custom formatting with spaces", () => {
      render(
        <Input
          id="test"
          label="Custom Format"
          type="number"
          value="12345678"
          onChange={() => {}}
          formatPattern="custom"
          customFormat="#### ####"
        />
      );
      const input = screen.getByLabelText("Custom Format") as HTMLInputElement;
      expect(input.value).toBe("1234 5678");
    });

    it("handles complex custom formatting with variable group sizes", () => {
      render(
        <Input
          id="test"
          label="Complex Format"
          type="number"
          value="123456789012"
          onChange={() => {}}
          formatPattern="custom"
          customFormat="##-###-###-####"
        />
      );
      const input = screen.getByLabelText("Complex Format") as HTMLInputElement;
      expect(input.value).toBe("12-345-678-9012");
    });
  });

  // New tests for number input enhancements
  describe("Number Input Enhancements", () => {
    it("removes up/down arrows from number inputs", () => {
      render(
        <Input
          id="test"
          label="Number Input"
          type="number"
          value=""
          onChange={() => {}}
        />
      );
      const input = screen.getByLabelText("Number Input") as HTMLInputElement;
      expect(input.style.webkitAppearance).toBe("none");
      expect(input.style.appearance).toBe("textfield");
    });

    it("allows typing 'e' in number inputs", () => {
      const handleChange = vi.fn();
      render(
        <Input
          id="test"
          label="Number Input"
          type="number"
          value=""
          onChange={handleChange}
        />
      );
      const input = screen.getByLabelText("Number Input");
      
      // Simulate typing 'e'
      fireEvent.keyDown(input, { key: 'e', ctrlKey: false, metaKey: false });
      fireEvent.change(input, { target: { value: '1e6' } });
      
      expect(handleChange).toHaveBeenCalled();
    });
  });

  // New tests for validation integration
  describe("Validation Integration", () => {
    it("shows validation error instead of helper text when validation fails", () => {
      render(
        <Input
          id="test"
          label="Test"
          value="invalid"
          onChange={() => {}}
          helperText="This is helper text"
          patternRgx="^[0-9]+$"
          patternErrorMessage="Numbers only"
        />
      );
      expect(screen.getByText("Numbers only")).toBeInTheDocument();
      expect(screen.queryByText("This is helper text")).not.toBeInTheDocument();
    });

    it("shows helper text when validation passes", () => {
      render(
        <Input
          id="test"
          label="Test"
          value="123"
          onChange={() => {}}
          helperText="This is helper text"
          patternRgx="^[0-9]+$"
          patternErrorMessage="Numbers only"
        />
      );
      expect(screen.getByText("This is helper text")).toBeInTheDocument();
      expect(screen.queryByText("Numbers only")).not.toBeInTheDocument();
    });
  });

  // New tests for size and variant props
  describe("Size and Variant Props", () => {
    it("applies correct size classes", () => {
      const { rerender } = render(
        <Input
          id="test"
          label="Test"
          value=""
          onChange={() => {}}
          size="sm"
        />
      );
      
      let input = screen.getByLabelText("Test");
      expect(input.className).toContain("px-2 py-1 text-sm");
      
      rerender(
        <Input
          id="test"
          label="Test"
          value=""
          onChange={() => {}}
          size="lg"
        />
      );
      
      input = screen.getByLabelText("Test");
      expect(input.className).toContain("px-4 py-3 text-lg");
    });

    it("applies correct variant classes", () => {
      const { rerender } = render(
        <Input
          id="test"
          label="Test"
          value=""
          onChange={() => {}}
          variant="contained"
        />
      );
      
      let input = screen.getByLabelText("Test");
      expect(input.className).toContain("bg-blue-600 text-white");
      
      rerender(
        <Input
          id="test"
          label="Test"
          value=""
          onChange={() => {}}
          variant="outlined"
        />
      );
      
      input = screen.getByLabelText("Test");
      expect(input.className).toContain("border border-blue-600 text-blue-600");
    });
  });
});

const colorVariants = [
  "primary",
  "secondary",
  "success",
  "error",
  "warning",
  "info",
] as const;
const variants = ["contained", "outlined", "text"] as const;

const colorMap = {
  primary: {
    contained:
      "bg-blue-600 text-white border-blue-600 placeholder:text-blue-100 focus:ring-2 focus:ring-blue-300",
    outlined:
      "border border-blue-600 text-blue-600 placeholder:text-blue-300 focus:ring-2 focus:ring-blue-300",
    text: "text-blue-600 border-none placeholder:text-blue-300 focus:ring-2 focus:ring-blue-300",
  },
  secondary: {
    contained:
      "bg-gray-600 text-white border-gray-600 placeholder:text-gray-100 focus:ring-2 focus:ring-gray-300",
    outlined:
      "border border-gray-600 text-gray-600 placeholder:text-gray-300 focus:ring-2 focus:ring-gray-300",
    text: "text-gray-600 border-none placeholder:text-gray-300 focus:ring-2 focus:ring-gray-300",
  },
  success: {
    contained:
      "bg-green-600 text-white border-green-600 placeholder:text-green-100 focus:ring-2 focus:ring-green-300",
    outlined:
      "border border-green-600 text-green-600 placeholder:text-green-300 focus:ring-2 focus:ring-green-300",
    text: "text-green-600 border-none placeholder:text-green-300 focus:ring-2 focus:ring-green-300",
  },
  error: {
    contained:
      "bg-red-600 text-white border-red-600 placeholder:text-red-100 focus:ring-2 focus:ring-red-300",
    outlined:
      "border border-red-600 text-red-600 placeholder:text-red-300 focus:ring-2 focus:ring-red-300",
    text: "text-red-600 border-none placeholder:text-red-300 focus:ring-2 focus:ring-red-300",
  },
  warning: {
    contained:
      "bg-yellow-500 text-black border-yellow-500 placeholder:text-yellow-100 focus:ring-2 focus:ring-yellow-300",
    outlined:
      "border border-yellow-500 text-yellow-600 placeholder:text-yellow-300 focus:ring-2 focus:ring-yellow-300",
    text: "text-yellow-600 border-none placeholder:text-yellow-300 focus:ring-2 focus:ring-yellow-300",
  },
  info: {
    contained:
      "bg-sky-500 text-white border-sky-500 placeholder:text-sky-100 focus:ring-2 focus:ring-sky-300",
    outlined:
      "border border-sky-500 text-sky-500 placeholder:text-sky-300 focus:ring-2 focus:ring-sky-300",
    text: "text-sky-500 border-none placeholder:text-sky-300 focus:ring-2 focus:ring-sky-300",
  },
};

describe("Input color and variant palette", () => {
  colorVariants.forEach((color) => {
    variants.forEach((variant) => {
      it(`applies correct classes for color='${color}' and variant='${variant}'`, () => {
        render(
          <Input
            id={`test-${color}-${variant}`}
            label="Palette"
            value=""
            onChange={() => {}}
            color={color}
            variant={variant}
            data-testid="palette-input"
          />
        );
        const input = screen.getByTestId("palette-input");
        const expectedClasses = colorMap[color][variant].split(" ");
        for (const cls of expectedClasses) {
          expect(input.className).toContain(cls);
        }
      });
    });
  });
}); 