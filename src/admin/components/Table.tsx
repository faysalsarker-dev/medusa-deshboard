import { Table } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton, StatusBadge } from "@medusajs/ui";

type Order = {
  id: string;
  image: string;
  link: string;
  status: string;
};

const fakeData: Order[] = [
  {
    id: "order_6782",
    image:
      "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg?t=st=1732335119~exp=1732338719~hmac=64176ecf05b3f7bfeeebe43daaa916c0f617daa703b455cb6aefa2457064e516&w=1060",
    link: "32690@gmail.com",
    status: "Published",
  },
  {
    id: "order_46487",
    image:
      "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg?t=st=1732335119~exp=1732338719~hmac=64176ecf05b3f7bfeeebe43daaa916c0f617daa703b455cb6aefa2457064e516&w=1060",
    link: "32690@gmail.com",
    status: "Draft",
  },
  {
    id: "order_8169",
    image:
      "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg?t=st=1732335119~exp=1732338719~hmac=64176ecf05b3f7bfeeebe43daaa916c0f617daa703b455cb6aefa2457064e516&w=1060",
    link: "32690@gmail.com",
    status: "Published",
  },
  {
    id: "order_67883",
    image:
      "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg?t=st=1732335119~exp=1732338719~hmac=64176ecf05b3f7bfeeebe43daaa916c0f617daa703b455cb6aefa2457064e516&w=1060",
    link: "32690@gmail.com",
    status: "Draft",
  },
  {
    id: "order_61121",
    image:
      "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg?t=st=1732335119~exp=1732338719~hmac=64176ecf05b3f7bfeeebe43daaa916c0f617daa703b455cb6aefa2457064e516&w=1060",
    link: "32690@gmail.com",
    status: "Published",
  },
];

// Function to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Published":
      return "bg-green-100 text-green-800";
    case "Draft":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TableDemo() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className="text-left">Image</Table.HeaderCell>
          <Table.HeaderCell className="text-left">Email</Table.HeaderCell>
          <Table.HeaderCell className="text-left">Status</Table.HeaderCell>
          <Table.HeaderCell className="text-center">Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {fakeData.map((order) => (
          <Table.Row
            key={order.id}
            className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
          >
            <Table.Cell>
              <img className="w-20 rounded" src={order.image} alt="Order" />
            </Table.Cell>
            <Table.Cell>{order.link}</Table.Cell>
            <Table.Cell>
              <StatusBadge className={`px-2 py-1 rounded ${getStatusBadgeColor(order.status)}`}>
                {order.status}
              </StatusBadge>
            </Table.Cell>
            <Table.Cell className="text-center">
              <DropdownMenu>
                <DropdownMenu.Trigger asChild>
                  <IconButton>
                    <EllipsisHorizontal />
                  </IconButton>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item className="gap-x-2">
                    <PencilSquare className="text-ui-fg-subtle" />
                    Edit
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className="gap-x-2">
                    <Trash className="text-ui-fg-subtle" />
                    Delete
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
