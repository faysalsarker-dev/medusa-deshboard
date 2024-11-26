// src/api/sliders/route.ts

import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { SLIDER_MODULE } from "../../modules/slider"
import SliderModuleService from "src/modules/slider/service"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
    const sliderService: SliderModuleService = req.scope.resolve(SLIDER_MODULE)
    const slider = await sliderService.createSliders(req.body)
    res.json(slider)
  }

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const sliderService:SliderModuleService = req.scope.resolve(SLIDER_MODULE)
  const sliders = await sliderService.listSliders()
  res.json(sliders)
}

// export async function GET(req: MedusaRequest, res: MedusaResponse) {
//   const sliderService = req.scope.resolve(SLIDER_MODULE)
//   const slider = await sliderService.retrieveSlider(req.params.id)
//   res.json(slider)
// }

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