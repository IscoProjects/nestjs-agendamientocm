import { Test, TestingModule } from '@nestjs/testing';
import { UnmetDemandService } from './unmet_demand.service';

describe('UnmetDemandService', () => {
  let service: UnmetDemandService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnmetDemandService],
    }).compile();

    service = module.get<UnmetDemandService>(UnmetDemandService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
