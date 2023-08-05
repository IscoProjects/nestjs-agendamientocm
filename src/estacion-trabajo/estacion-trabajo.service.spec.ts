import { Test, TestingModule } from '@nestjs/testing';
import { EstacionTrabajoService } from './estacion-trabajo.service';

describe('EstacionTrabajoService', () => {
  let service: EstacionTrabajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstacionTrabajoService],
    }).compile();

    service = module.get<EstacionTrabajoService>(EstacionTrabajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
