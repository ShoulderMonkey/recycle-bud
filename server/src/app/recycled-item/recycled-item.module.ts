import { Module } from "@nestjs/common";
import { RecycledItemController } from "./recycled-item.controller";
import { RecycledItemService } from "./recycled-item.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecycledItem } from "../database/entities/recycled-item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RecycledItem])],
  controllers: [RecycledItemController],
  providers: [RecycledItemService],
})
export class RecycledItemModule {}
