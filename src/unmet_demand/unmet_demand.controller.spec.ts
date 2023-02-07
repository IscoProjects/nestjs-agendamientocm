import { Test, TestingModule } from '@nestjs/testing';
import { UnmetDemandController } from './unmet_demand.controller';
import { UnmetDemandService } from './unmet_demand.service';

describe('UnmetDemandController', () => {
  let controller: UnmetDemandController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnmetDemandController],
      providers: [UnmetDemandService],
    }).compile();

    controller = module.get<UnmetDemandController>(UnmetDemandController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
