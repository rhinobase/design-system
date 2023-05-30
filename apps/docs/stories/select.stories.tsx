import { Meta, StoryObj } from "@storybook/react";
import { Select, SelectItem } from "@rafty/ui";

const meta: Meta<typeof Select> = {
  title: "Form / Select",
  args: {
    size: "md",
    variant: "outline",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["outline", "ghost", "solid"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: ({ size, variant }) => (
    <div className="w-[500px]">
      <h4 className="dark:text-secondary-200 mb-4 font-bold">Select</h4>
      <Select
        variant={variant}
        size={size}
        onSelectionChange={(key) => console.log(key)}
      >
        <SelectItem key="option1">Option 1</SelectItem>
        <SelectItem key="option2">Option 2</SelectItem>
        <SelectItem key="option3">Option 3</SelectItem>
      </Select>
    </div>
  ),
};
