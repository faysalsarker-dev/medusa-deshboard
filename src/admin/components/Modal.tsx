import  { useState } from "react";
import {
  Button,
  FocusModal,
  Input,
  Select,
} from "@medusajs/ui";

export default function Modal() {
  // State management
  const [status, setStatus] = useState<string>("published"); // Default to 'Published'
  const [link, setLink] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);

  // Handle file upload
  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  // Remove the uploaded image
  const removeImage = () => {
    setImage(null);
  };

  const currencies = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button className=" rounded-md ">Create</Button>
      </FocusModal.Trigger>
      
      <FocusModal.Content>
        <FocusModal.Header className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Create New Slider</h2>
          <Button >Save</Button>
        </FocusModal.Header>
        
        <FocusModal.Body className="flex flex-col items-center py-6">
          <div className="flex w-full max-w-lg flex-col gap-y-6">
            {/* Status Selector */}
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

            {/* Route Link Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route Link
              </label>
              <Input
                placeholder="Enter the route link"
                id="route-link"
                size="small"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="rounded-md border-gray-300"
              />
            </div>

            {/* Image Upload Section */}
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
                  <div className="border-2 rounded p-4 cursor-pointer hover:bg-gray-50 transition">
                    {image ? (
                      <div className="relative w-40 h-40">
                        <img
                          className="w-full h-full object-cover rounded border border-gray-300"
                          src={image}
                          alt="Upload Preview"
                        />
                        <Button
                          onClick={removeImage}
                          className="absolute top-1 right-1  text-white rounded-full "
                          size="small"
                        >
                          ✕
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full h-40 flex items-center justify-center bg-gray-100 border-2 border-gray-300 border-dotted hover:border-blue-400 rounded hover:bg-gray-200">
                        <span className="text-sm text-gray-500">Upload Image</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
}
