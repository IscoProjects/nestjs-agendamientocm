import { Test, TestingModule } from '@nestjs/testing';
import { PolivalenteController } from './polivalente.controller';
import { PolivalenteService } from './polivalente.service';

describe('PolivalenteController', () => {
  let controller: PolivalenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolivalenteController],
      providers: [PolivalenteService],
    }).compile();

    controller = module.get<PolivalenteController>(PolivalenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
