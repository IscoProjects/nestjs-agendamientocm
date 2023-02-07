import { SeccionModule } from './../seccion/seccion.module';
import { Module } from '@nestjs/common';
import { AreaTrabajoService } from './area_trabajo.service';
import { AreaTrabajoController } from './area_trabajo.controller';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaTrabajo } from './entities/area_trabajo.entity';

@Module({
  controllers: [AreaTrabajoController],
  providers: [AreaTrabajoService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([AreaTrabajo]), SeccionModule],
  exports: [TypeOrmModule],
})
export class AreaTrabajoModule {}
