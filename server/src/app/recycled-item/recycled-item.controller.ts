import { Controller, Logger } from "@nestjs/common";
import { BaseController } from "../shared/base-controller";
import { RecycledItem } from "../database/entities/recycled-item.entity";
import { RecycledItemService } from "./recycled-item.service";

@Controller("recycled-item")
export class RecycledItemController extends BaseController<RecycledItem> {
    
    logger = new Logger(RecycledItemController.name);
    constructor(
        public service: RecycledItemService
    ) {
      super(service);
    }
}
