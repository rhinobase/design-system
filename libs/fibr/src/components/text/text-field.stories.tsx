import { FibrProvider, Loom } from "@fibr/react";
import { Meta, StoryObj } from "@storybook/react";
import { f, plugin } from "..";
import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "fibr / TextField",
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  render: () => (
    <FibrProvider plugins={plugin}>
      <div className="w-full">
        <Loom
          blueprint={f.form({
            onSubmit: console.log,
            fields: {
              text: f.text({
                value: "👋 Demo",
              }),
            },
          })}
        />
      </div>
    </FibrProvider>
  ),
};
