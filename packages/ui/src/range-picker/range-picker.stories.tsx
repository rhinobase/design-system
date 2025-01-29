import type { Meta, StoryObj } from "@storybook/react";
import dateFormat from "dateformat";
import { RangePicker } from "./RangePicker.js";

const meta: Meta<typeof RangePicker> = {
  title: "Form / RangePicker",
  args: {
    size: "md",
    isDisabled: false,
    isInvalid: false,
    isLoading: false,
    isReadOnly: false,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RangePicker>;

export const Default: Story = {
  render: (props) => <RangePicker {...props} />,
};

export const DefaultValue: Story = {
  render: (props) => {
    const date = new Date();
    const firstDate = dateFormat(date, "isoDate");
    const tmp = date;
    tmp.setDate(tmp.getDate() + 10);
    const secondDate = dateFormat(tmp, "isoDate");

    return <RangePicker {...props} defaultValue={[firstDate, secondDate]} />;
  },
};
