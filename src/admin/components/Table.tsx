import {
  Input,
  Select,
  Table,
  DropdownMenu,
  IconButton,
  StatusBadge,
  Button,
  Drawer,
} from "@medusajs/ui";
import {
  EllipsisHorizontal,
  PencilSquare,
  Trash,
} from "@medusajs/icons";
import { useState } from "react";
import DeleteItemModal from "./DeleteItem";


type Order = {
  id: string;
  image: string;
  link: string;
  status: string;
};

export default function TableDemo({ data }: { data: Order[] }) {
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
        {data.map((order) => (
          <Table.Row
            key={order.id}
            className="[&_td:last-child]:w-[1%] [&_td:last-child]:whitespace-nowrap"
          >
            <Table.Cell>
              <img className="w-20 rounded" src={order.image} alt="Order" />
            </Table.Cell>
            <Table.Cell>{order.link}</Table.Cell>
            <Table.Cell>
              <StatusBadge
                color={order.status.toLowerCase() === "published" ? "green" : "red"}
              >
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
                  <DropdownMenu.Item
                    className="gap-x-2 flex"
                    onClick={() => handleEdit(order)}
                  >
                    <PencilSquare className="text-ui-fg-subtle" />
                    <span>Edit</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item className="gap-x-2">
                    <Trash className="text-ui-fg-subtle" />
                    <DeleteItemModal itemId={order.id} itemName="Order" />
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>

      {editData && (
        <DrawerDemo data={editData} onClose={() => setEditData(null)} />
      )}
    </Table>
  );
}

type DrawerDemoProps = {
  data: Order;
  onClose: () => void;
};

function DrawerDemo({ data, onClose }: DrawerDemoProps) {
  const [link, setLink] = useState(data.link);
  const [image, setImage] = useState(data.image);
  const [status, setStatus] = useState(data.status);



  
  const handleSave = async () => {
    console.log("Updated Data:", { link, image, status });

    onClose();
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files?.length) {
      setImage(URL.createObjectURL(files[0]));
    }
  };

  const statusOptions = [
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <Select.Trigger>
                <Select.Value placeholder="Select status" />
              </Select.Trigger>
              <Select.Content>
                {statusOptions.map((option) => (
                  <Select.Item key={option.value} value={option.value}>
                    {option.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Route Link
            </label>
            <Input
              placeholder="Route link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
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
                  <img
                    className="w-32 object-cover rounded border"
                    src={image}
                    alt="Preview"
                  />
                ) : (
                  <div className="w-32 bg-gray-100 border border-gray-300 rounded flex justify-center items-center text-sm text-gray-500">
                    Upload Image
                  </div>
                )}
              </div>
            </label>
          </div>
        </Drawer.Body>
        <Drawer.Footer className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
}
