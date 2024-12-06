// src/modules/slider/models/slider.ts
import { model } from "@medusajs/framework/utils"

export type Slider = {
  id: string
 link:string
  image: string
  status: string
}

export const Slider = model.define("slider", {
  id: model.id().primaryKey(),
  image: model.text(),
  link:model.text(),
  status: model.text(),
})