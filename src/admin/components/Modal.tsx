import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  FocusModal,
  Input,
  Select,
} from "@medusajs/ui";

interface FormData {
  status: string;
  link: string;
  image: File | null;
}

const Modal = ({refetch}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isImageUploading, setIsImageUploading] = useState(false); // State for image upload loading

  const { control, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {
      status: "published",
      link: "wioefieuiueruiwei",
      image: null,
    },
  });

  const imageFile = watch("image");

  // File Upload Preview Handling
  const handleFileUpload = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setValue("image", null, { shouldValidate: true });
    setPreviewImage(null);
  };

  // Mutation for Slider Submission
  const createSliderMutation = useMutation({
    mutationFn: async (data: { status: string; link: string; image: string }) => {
      return axios.post("http://localhost:9000/sliders", data);
    },
  });

  // const uploadImage = async (image: File): Promise<string> => {
  //   setIsImageUploading(true); // Start loading state
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", image);

  //     const response = await axios.post("/api/upload-image", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     return response.data.imagePath; // Assuming the API returns the image path in `imagePath`
  //   } catch (error) {
  //     console.error("Error uploading image", error);
  //     throw error;
  //   } finally {
  //     setIsImageUploading(false); // End loading state
  //   }
  // };

  const onSubmit = async (data: FormData) => {
    try {
      // Step 1: Upload Image if present
      let imagePath = "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2017/10/4/0/FNK_Classic-Beef-Sliders-H_s4x3.jpg.rend.hgtvcom.826.620.suffix/1507136270637.webp";
      // if (data.image) {
      //   imagePath = await uploadImage(data.image);
      // }

      console.log(data);
      // Step 2: Submit form data with imagePath
      await createSliderMutation.mutateAsync({
        status: data.status,
        link: data.link,
        image: imagePath,
      });

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error in submission", error);
    }
  };

  const currencies = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        <Button className="rounded-md">Create</Button>
      </FocusModal.Trigger>

      <FocusModal.Content>
        <FocusModal.Header className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">Create New Slider</h2>
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isImageUploading }
          >
            {(isImageUploading)
              ? "Saving..."
              : "Save"}
          </Button>
        </FocusModal.Header>

        <FocusModal.Body className="flex flex-col items-center py-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-lg flex-col gap-y-6"
          >
            {/* Status Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
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
                )}
              />
            </div>

            {/* Route Link Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Route Link
              </label>
              <Controller
                name="link"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="Enter the route link"
                    id="route-link"
                    size="small"
                    {...field}
                    className="rounded-md border-gray-300"
                  />
                )}
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
                    {previewImage ? (
                      <div className="relative w-40 h-40">
                        <img
                          className="w-full h-full object-cover rounded border border-gray-300"
                          src={previewImage}
                          alt="Upload Preview"
                        />
                        <Button
                          onClick={removeImage}
                          className="absolute top-1 right-1 text-white rounded-full"
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
          </form>
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default Modal;
