import { Module } from '@nestjs/common';
import { AreaTrabajoService } from './area_trabajo.service';
import { AreaTrabajoController } from './area_trabajo.controller';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaTrabajo } from './entities/area_trabajo.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [AreaTrabajoController],
  providers: [AreaTrabajoService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([AreaTrabajo]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class AreaTrabajoModule {}
