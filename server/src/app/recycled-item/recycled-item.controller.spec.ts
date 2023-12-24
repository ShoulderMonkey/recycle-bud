import { Test, TestingModule } from "@nestjs/testing";
import { RecycledItemController } from "./recycled-item.controller";

describe("RecycledItemsController", () => {
  let controller: RecycledItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecycledItemController],
    }).compile();

    controller = module.get<RecycledItemController>(RecycledItemController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
