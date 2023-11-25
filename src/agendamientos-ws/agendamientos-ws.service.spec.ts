import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientosWsService } from './agendamientos-ws.service';

describe('AgendamientosWsService', () => {
  let service: AgendamientosWsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendamientosWsService],
    }).compile();

    service = module.get<AgendamientosWsService>(AgendamientosWsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
