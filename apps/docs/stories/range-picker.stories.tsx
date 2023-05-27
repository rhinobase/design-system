import { Meta, StoryObj } from "@storybook/react";
import { RangePicker } from "@rafty/date-picker";

const meta: Meta<typeof RangePicker> = {
  title: "Form / RangePicker",
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
      options: ["solid", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

export const Default: Story = {
  render: ({ size, variant }) => (
    <div className="w-full max-w-sm">
      <RangePicker
        data-cy="range-picker"
        size={size}
        variant={variant}
        onChange={(value) => console.log(value)}
      />
    </div>
  ),
};
