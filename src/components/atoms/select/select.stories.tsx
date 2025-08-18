import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./select";

const options = [
  { id: 1, name: "Option 1" },
  { id: 2, name: "Option 2" },
  { id: 3, name: "Option 3" },
];

const meta: Meta<typeof Select> = {
  title: "Atoms/Select",
  component: Select,
  argTypes: {
    onChange: { action: "changed" },
    onAddNew: { action: "add-new" },
    options: { control: false },
    value: { control: false },
    renderOption: { control: false },
    renderSelectedValue: { control: false },
    getOptionClassName: { control: false },
  },
};
export default meta;

type Option = { [key: string]: string | number };

type Story = StoryObj<typeof Select>;

const Template = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState<Option | Option[] | undefined>(args.multiple ? [] : undefined);
  return (
    <Select
      {...args}
      value={value}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: "Select Label",
    id: "select",
    titleKey: "name",
    valueKey: "id",
    options,
    required: false,
    error: "",
    multiple: false,
    disabled: false,
    loading: false,
    size: "md",
    fullWidth: false,
    helperText: "Helper text for select",
    searchable: true,
  },
};

export const Required: Story = {
  render: Template,
  args: {
    ...Default.args,
    required: true,
    label: "Required Select",
    helperText: "This field is required.",
  },
};

export const Multiple: Story = {
  render: Template,
  args: {
    ...Default.args,
    multiple: true,
    label: "Multi Select",
    helperText: "You can select multiple options.",
  },
};

export const HelperText: Story = {
  render: Template,
  args: {
    ...Default.args,
    helperText: "This is a helper text for the select input.",
  },
}; 

export const WithDropdownHeaderAndAdd: Story = {
  render: Template,
  args: {
    ...Default.args,
    label: "With Header",
    dropdownHeader: (
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Header</span>
        <button type="button" className="text-sm text-blue-600 hover:underline">
          Quick Action
        </button>
      </div>
    ),
    addNewLabel: "Add new",
  },
};

export const WithColorsAndCustomRenderers: Story = {
  render: Template,
  args: {
    ...Default.args,
    titleKey: "title",
    options: [
      { id: 1, title: "Red", color: "#ef4444" },
      { id: 2, title: "Blue", color: "#3b82f6" },
      { id: 3, title: "Green", color: "#22c55e" },
      { id: 4, title: "Yellow", color: "#eab308" },
    ],
    renderOption: (item: any) => (
      <div className="flex items-center gap-2 w-full">
        <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: String(item.color || "#ccc") }} />
        <span className="truncate flex-1">{String(item.title ?? item.id)}</span>
      </div>
    ),
    renderSelectedValue: (itemOrItems: any) => {
      const it = Array.isArray(itemOrItems) ? itemOrItems[0] : itemOrItems;
      return (
        <span className="inline-flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: String(it.color || "#ccc") }} />
          <span>{String(it.title ?? it.id)}</span>
        </span>
      );
    },
  },
};

export const LockedDefaultValuesMultiple: Story = {
  render: Template,
  args: {
    ...WithColorsAndCustomRenderers.args,
    multiple: true,
    defaultValue: [1, 2],
    disableDefaultValues: true,
    label: "Locked defaults",
  },
};

export const ServerSearch: Story = {
  render: Template,
  args: {
    ...Default.args,
    titleKey: "title",
    apiUrl: "https://dummyjson.com/products/search",
    searchParamKey: "q",
    helperText: "Type to search server (DummyJSON)",
    searchable: true,
  },
};

export const WithUrlParams: Story = {
  render: Template,
  args: {
    ...ServerSearch.args,
    urlParams: { limit: 25 },
    helperText: "Server search with urlParams appended",
  },
};

export const NotSearchable: Story = {
  render: Template,
  args: {
    ...Default.args,
    searchable: false,
    helperText: "Search bar hidden",
  },
};

export const AlwaysShowOverflowTooltip: Story = {
  render: Template,
  args: {
    ...WithColorsAndCustomRenderers.args,
    multiple: true,
    defaultValue: [1, 2, 3, 4],
    alwaysShowOverflowTooltip: true,
    label: "Overflow tooltip always visible",
  },
};