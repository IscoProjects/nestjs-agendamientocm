import { Module } from '@nestjs/common';
import { PolivalenteService } from './polivalente.service';
import { PolivalenteController } from './polivalente.controller';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from '../usuario/usuario.module';
import { Polivalente } from './entities/polivalente.entity';

@Module({
  controllers: [PolivalenteController],
  providers: [PolivalenteService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Polivalente]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class PolivalenteModule {}
