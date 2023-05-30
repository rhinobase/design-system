import {
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  Td,
  Th,
  Tr,
} from "@rafty/ui";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  title: "Components / Table",
  args: {
    size: "md",
  },
  argTypes: {
    size: { control: "select" },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: function Render({ size }) {
    const people = [
      {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
      },
      {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
      },
      {
        name: "Lindsay Walton",
        title: "Front-end Developer",
        email: "lindsay.walton@example.com",
        role: "Member",
      },
    ];
    return (
      <>
        <TableContainer className="max-w-2xl">
          <Table size={size}>
            <TableHead>
              <Tr>
                <Th>Name</Th>
                <Th>Title</Th>
                <Th>Email</Th>
                <Th>Role</Th>
              </Tr>
            </TableHead>
            <TableBody>
              {people.map((person) => (
                <Tr key={person.email}>
                  <Td>{person.name}</Td>
                  <Td>{person.title}</Td>
                  <Td>{person.email}</Td>
                  <Td>{person.role}</Td>
                </Tr>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </Table>
        </TableContainer>
      </>
    );
  },
};
