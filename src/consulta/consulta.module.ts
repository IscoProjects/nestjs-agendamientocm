import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { ConsultaController } from './consulta.controller';
import { Consulta } from './entities/consulta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [ConsultaController],
  providers: [ConsultaService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Consulta]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class ConsultaModule {}
