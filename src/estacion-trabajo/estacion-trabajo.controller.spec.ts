import { Test, TestingModule } from '@nestjs/testing';
import { EstacionTrabajoController } from './estacion-trabajo.controller';
import { EstacionTrabajoService } from './estacion-trabajo.service';

describe('EstacionTrabajoController', () => {
  let controller: EstacionTrabajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionTrabajoController],
      providers: [EstacionTrabajoService],
    }).compile();

    controller = module.get<EstacionTrabajoController>(EstacionTrabajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
