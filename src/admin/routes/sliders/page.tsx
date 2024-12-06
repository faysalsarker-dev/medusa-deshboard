import { defineRouteConfig } from "@medusajs/admin-sdk";
import { ChatBubbleLeftRight } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import TableDemo from "../../components/Table";
import Modal from "../../components/Modal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Define the type for slider data
interface Slider {
  id: string;
  title: string;
  status: string;
  imageUrl: string;
}

const CustomPage: React.FC = () => {
  const { data, isLoading, isError, refetch } = useQuery<Slider[]>({
    queryKey: ["sliders"],
    queryFn: async () => {
      const response = await axios.get<Slider[]>("http://localhost:9000/sliders");
      return response.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Failed to fetch sliders. Please try again later.</div>;
  }

  return (
    <Container className="divide-y p-0">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center p-2">
          <Heading level="h1">Sliders</Heading>
          <Modal onRefetch={refetch} />
        </div>
        <div>
          <TableDemo data={data} />
        </div>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Sliders",
  icon: ChatBubbleLeftRight,
});

export default CustomPage;
