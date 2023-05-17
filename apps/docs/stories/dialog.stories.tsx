import { Meta, StoryObj } from "@storybook/react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  Button,
} from "@rhino/ui";

const meta: Meta<typeof Dialog> = {
  title: "Components / Dialog",
  args: {
    size: "md",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: ({ size }) => (
    <>
      <Dialog size={size}>
        <DialogTrigger>open</DialogTrigger>
        <DialogOverlay data-cy="overlay" />
        <DialogContent>
          <DialogBody>
            <DialogTitle>Dialog Header</DialogTitle>
            <p>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </p>
            <div className="flex items-center justify-end pt-5">
              <Button>Save Change</Button>
            </div>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </>
  ),
};
