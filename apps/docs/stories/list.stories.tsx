import { Meta, StoryObj } from "@storybook/react";
import { ListItem, OrderedList } from "@rafty/ui";

const meta: Meta<typeof OrderedList> = {
  title: "Components / OrderedList",
};

export default meta;
type Story = StoryObj<typeof OrderedList>;

export const Default: Story = {
  render: () => (
    <>
      <OrderedList>
        <ListItem>Lorem ipsum dolor sit amet</ListItem>
        <ListItem>Consectetur adipiscing elit</ListItem>
        <ListItem>Integer molestie lorem at massa</ListItem>
        <ListItem>Facilisis in pretium nisl aliquet</ListItem>
      </OrderedList>
    </>
  ),
};
