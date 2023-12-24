import { Injectable, Logger } from "@nestjs/common";
import { BaseService } from "../shared/base-service";
import { RecycledItem } from "../database/entities/recycled-item.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RecycledItemService extends BaseService<RecycledItem>{

    logger = new Logger(RecycledItemService.name);
    constructor(
        @InjectRepository(RecycledItem)
        public repository: Repository<RecycledItem>
    ){
        super(repository)
    }
}
