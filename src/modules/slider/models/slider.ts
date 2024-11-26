// src/modules/slider/models/slider.ts
import { model } from "@medusajs/framework/utils"

export type Slider = {
  id: string
  title: string
  image_url: string
  order: number
}

export const Slider = model.define("slider", {
  id: model.id().primaryKey(),
  title: model.text(),
  image_url: model.text(),
  order: model.number(),
})