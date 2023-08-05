import { Module } from '@nestjs/common';
import { EstacionTrabajoService } from './estacion-trabajo.service';
import { EstacionTrabajoController } from './estacion-trabajo.controller';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { EstacionTrabajo } from './entities/estacion-trabajo.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EstacionTrabajoController],
  providers: [EstacionTrabajoService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([EstacionTrabajo]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class EstacionTrabajoModule {}
