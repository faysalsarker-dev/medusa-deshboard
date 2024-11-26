import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading } from "@medusajs/ui"
import TableDemo from "../../components/Table"
import Modal from "../../components/Modal"


const CustomPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className=" px-6 py-4  ">
   <div className="flex justify-between items-center p-2">
     
        <Heading level="h1"> Sliders</Heading>
  <Modal/>
   </div>
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