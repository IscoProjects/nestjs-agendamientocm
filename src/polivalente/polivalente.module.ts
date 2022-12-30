import { Module } from '@nestjs/common';
import { PolivalenteService } from './polivalente.service';
import { PolivalenteController } from './polivalente.controller';
import { Polivalente } from './entities/polivalente.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  controllers: [PolivalenteController],
  providers: [PolivalenteService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Polivalente]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class PolivalenteModule {}
