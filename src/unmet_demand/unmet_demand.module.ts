import { Module } from '@nestjs/common';
import { UnmetDemandService } from './unmet_demand.service';
import { UnmetDemandController } from './unmet_demand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnmetDemand } from './entities/unmet_demand.entity';
import { PacienteModule } from '../paciente/paciente.module';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';

@Module({
  controllers: [UnmetDemandController],
  providers: [UnmetDemandService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([UnmetDemand]), PacienteModule],
  exports: [TypeOrmModule],
})
export class UnmetDemandModule {}
