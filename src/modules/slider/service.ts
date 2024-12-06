// src/modules/slider/service.ts
import { 
  InjectManager, 
  MedusaContext, 
  MedusaService 
} from "@medusajs/framework/utils"
import { EntityManager } from "@mikro-orm/core"
import { Context } from "@medusajs/types"
import { Slider } from "./models/slider"

class SliderModuleService extends MedusaService({
  Slider,
}) {
  @InjectManager()
  async create(
    data: Partial<Slider>,
    @MedusaContext() context?: Context<EntityManager>
  ): Promise<Slider> {
    return await this.create(data, context)
  }

  @InjectManager()
  async update(
    id: string,
    data: Partial<Slider>,
    @MedusaContext() context?: Context<EntityManager>
  ): Promise<Slider> {
    return await this.update(id, data, context)
  }

  @InjectManager()
  async delete(
    id: string,
    @MedusaContext() context?: Context<EntityManager>
  ): Promise<void> {
    await this.delete(id, context)
  }

  @InjectManager()
  async list(
    filters?: any,
    @MedusaContext() context?: Context<EntityManager>
  ): Promise<Slider[]> {
    return await this.list(filters, context)
  }

  @InjectManager()
  async retrieve(
    id: string,
    @MedusaContext() context?: Context<EntityManager>
  ): Promise<Slider> {
    return await this.retrieve(id, context)
  }
}

export default SliderModuleService