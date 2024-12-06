import React, { useState } from "react";
import { usePrompt, Button } from "@medusajs/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface DeleteItemModalProps {
  itemId: string;
  itemName: string;
}

const DeleteItemModal: React.FC<DeleteItemModalProps> = ({ itemId, itemName }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dialog = usePrompt();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(`http://localhost:9000/sliders/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError: () => {
      setIsDeleting(false);
    },
  });

  const handleDelete = async () => {
    const confirmed = await dialog({
      title: "Confirm Deletion",
      description: `Are you sure you want to delete "${itemName}"? This action is irreversible.`,
    });

    if (confirmed) {
      setIsDeleting(true);
      deleteMutation.mutate();
    }
  };

  return (
    <div>
      <Button
        variant="danger"
        onClick={handleDelete}
      >
        {isDeleting ? "Deleting..." : `Delete ${itemName}`}
      </Button>
      {deleteMutation.isError && (
        <p className="text-sm text-red-500 mt-2">Failed to delete the item. Please try again.</p>
      )}
    </div>
  );
};

export default DeleteItemModal;
