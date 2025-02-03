import type { Meta, StoryObj } from "@storybook/react";
import { QRCode } from "./QRCode";

const meta: Meta<typeof QRCode> = {
  title: "Corp / QRCode",
  args: {
    value: "https://github.com/rhinobase",
  },
};

export default meta;
type Story = StoryObj<typeof QRCode>;

export const Default: Story = {
  render: (props) => <QRCode {...props} />,
};
