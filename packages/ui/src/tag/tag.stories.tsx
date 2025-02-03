import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag.js";

const meta: Meta<typeof Tag> = {
  title: "Components / Tag",
  args: {
    size: "md",
    colorScheme: "secondary",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    colorScheme: {
      control: "select",
      options: ["primary", "secondary", "error", "success", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  render: (props) => <Tag {...props}>Tag text</Tag>,
};
