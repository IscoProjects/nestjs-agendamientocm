import { Test, TestingModule } from '@nestjs/testing';
import { AreaTrabajoController } from './area_trabajo.controller';
import { AreaTrabajoService } from './area_trabajo.service';

describe('AreaTrabajoController', () => {
  let controller: AreaTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AreaTrabajoController],
      providers: [AreaTrabajoService],
    }).compile();

    controller = module.get<AreaTrabajoController>(AreaTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
