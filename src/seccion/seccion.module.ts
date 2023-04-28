import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seccion } from './entities/seccion.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [SeccionController],
  providers: [SeccionService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Seccion]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class SeccionModule {}
