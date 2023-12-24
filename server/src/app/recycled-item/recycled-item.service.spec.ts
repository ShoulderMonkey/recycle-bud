import { Test, TestingModule } from "@nestjs/testing";
import { RecycledItemService } from "./recycled-item.service";

describe("RecycledItemService", () => {
  let service: RecycledItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecycledItemService],
    }).compile();

    service = module.get<RecycledItemService>(RecycledItemService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
