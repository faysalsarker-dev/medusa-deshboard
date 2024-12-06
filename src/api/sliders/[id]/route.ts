import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { SLIDER_MODULE } from "src/modules/slider"

import SliderModuleService from "src/modules/slider/service"
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const sliderService: SliderModuleService = req.scope.resolve(SLIDER_MODULE)
  const slider = await sliderService.retrieve(req.params.id)
  res.json(slider)
}





// export async function PUT(req: MedusaRequest, res: MedusaResponse) {
//   const sliderService:SliderModuleService = req.scope.resolve(SLIDER_MODULE)
//   const slider = await sliderService.updateSliders({
//     id: req.params.id,
//     ...req.body,
//   })
//   res.json(slider)
// }

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
    const sliderService:SliderModuleService = req.scope.resolve(SLIDER_MODULE)
    await sliderService.deleteSliders(req.params.id)
    res.status(204).send()
  }