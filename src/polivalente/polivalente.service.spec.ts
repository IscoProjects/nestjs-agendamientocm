import { Test, TestingModule } from '@nestjs/testing';
import { PolivalenteService } from './polivalente.service';

describe('PolivalenteService', () => {
  let service: PolivalenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolivalenteService],
    }).compile();

    service = module.get<PolivalenteService>(PolivalenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
