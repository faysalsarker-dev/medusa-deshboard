import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Text } from "@medusajs/ui"
import TableDemo from "../../components/Table"


const CustomPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className=" px-6 py-4">
      <Text size="xlarge" weight="regular" family="sans">
      Sliders
      </Text>

        <div>
       <TableDemo/>
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Sliders",
  icon: ChatBubbleLeftRight,
})










export default CustomPage