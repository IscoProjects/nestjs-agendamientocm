import { Test, TestingModule } from '@nestjs/testing';
import { AreaTrabajoService } from './area_trabajo.service';

describe('AreaTrabajoService', () => {
  let service: AreaTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AreaTrabajoService],
    }).compile();

    service = module.get<AreaTrabajoService>(AreaTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
