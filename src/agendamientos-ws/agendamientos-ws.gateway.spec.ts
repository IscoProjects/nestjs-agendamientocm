import { Test, TestingModule } from '@nestjs/testing';
import { AgendamientosWsGateway } from './agendamientos-ws.gateway';
import { AgendamientosWsService } from './agendamientos-ws.service';

describe('AgendamientosWsGateway', () => {
  let gateway: AgendamientosWsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgendamientosWsGateway, AgendamientosWsService],
    }).compile();

    gateway = module.get<AgendamientosWsGateway>(AgendamientosWsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
