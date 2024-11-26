import { Input, Select, Table } from "@medusajs/ui";
import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons";
import { DropdownMenu, IconButton, StatusBadge, Button, Drawer } from "@medusajs/ui";
import { useState } from "react";


type Order = {
  id: string;
  image: string;
  link: string;
  status: string;
};

const fakeData: Order[] = [
  {
    id: "order_6782",
    image: "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg",
    link: "32690@gmail.com",
    status: "Published",
  },
  {
    id: "order_46487",
    image: "https://img.freepik.com/free-vector/gradient-black-friday-instagram-posts-collection_23-2149709498.jpg",
    link: "32690@gmail.com",
    status: "Draft",
  },
  // Other items...
];

// Function to determine badge color based on status
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "Published":
      return "green";
    case "Draft":
      return "red";
    default:
      return "grey";
  }
};

export default function TableDemo() {
  const [editData, setEditData] = useState<Order | null>(null);

  const handleEdit = (order: Order) => {
    setEditData(order);
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell className="text-left">Image</Table.HeaderCell>
          <Table.HeaderCell className="text-left">Link</Table.HeaderCell>
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
              <StatusBadge color={`${getStatusBadgeColor(order.status)}`}>
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
                  <DropdownMenu.Item className="gap-x-2 flex" onClick={() => handleEdit(order)}>
                    <PencilSquare className="text-ui-fg-subtle" />
                    <span>Edit</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className="gap-x-2">
                    <Trash className="text-ui-fg-subtle" />
                    <span>Delete</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      {/* Drawer for editing */}
      {editData && (
        <DrawerDemo data={editData} onClose={() => setEditData(null)} />
      )}
    </Table>
  );
}




type DrawerDemoProps = {
  data: {
    link: string;
    image: string;
    status: string;
  };
  onClose: () => void;
};

function DrawerDemo({ data, onClose }: DrawerDemoProps) {
  const [link, setLink] = useState(data.link);
  const [image, setImage] = useState(data.image);
  const [status, setStatus] = useState(data.status);

  const handleSave = () => {
    // Log the current state data
    console.log("Saved Data:", {
      link,
      image,
      status,
    });
    onClose();
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setImage(URL.createObjectURL(file));
    }
  };

  const currencies = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <Drawer open={Boolean(data)} onOpenChange={onClose}>
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>Edit Item</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="space-y-4 p-4">
          {/* Dropdown for status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select
                defaultValue={status}
                onValueChange={(value) => setStatus(value)}
                value={status}
              >
                {/* Assuming Select.Trigger and Select.Content exist */}
                <Select.Trigger>
                  <Select.Value placeholder="Select status" />
                </Select.Trigger>
                <Select.Content>
                  {currencies.map((item) => (
                    <Select.Item key={item.value} value={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select>
          </div>

          {/* Input for route link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Route Link
            </label>
            <Input
              placeholder="Route link"
              id="route-link"
              size="small"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Custom file input for image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="file-input"
              />
              <label htmlFor="file-input">
<div className="border-2 rounded p-4">
                  {image ? (
                    // Show the uploaded image as a preview
                    <img
                      className="w-32  object-cover rounded cursor-pointer border border-gray-300"
                      src={image}
                      alt="Upload Preview"
                    />
                  ) : (
                    // Show a button when no image is uploaded
                    <div className="w-32  flex items-center justify-center bg-gray-100 border border-gray-300 rounded cursor-pointer hover:bg-gray-200">
                      <span className="text-sm text-gray-500">Upload Image</span>
                    </div>
                  )}
</div>
              </label>
            </div>
          </div>

        </Drawer.Body>
        <Drawer.Footer className="flex justify-end space-x-2">
          <Drawer.Close asChild>
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </Drawer.Close>
          <Button onClick={handleSave}>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}





