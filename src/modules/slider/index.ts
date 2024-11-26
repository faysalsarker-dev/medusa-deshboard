import { Module } from "@medusajs/framework/utils"
import SliderModuleService from "./service"

export const SLIDER_MODULE = "sliderModuleService"

export default Module(SLIDER_MODULE, {
  service: SliderModuleService,
})