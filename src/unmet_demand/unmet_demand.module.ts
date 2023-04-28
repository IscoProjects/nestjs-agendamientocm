import { Module } from '@nestjs/common';
import { UnmetDemandService } from './unmet_demand.service';
import { UnmetDemandController } from './unmet_demand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnmetDemand } from './entities/unmet_demand.entity';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [UnmetDemandController],
  providers: [UnmetDemandService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([UnmetDemand]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class UnmetDemandModule {}
