import { Module } from '@nestjs/common';
import { SeccionService } from './seccion.service';
import { SeccionController } from './seccion.controller';
import { ErrorHandleDBService } from '../common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PolivalenteModule } from '../polivalente/polivalente.module';
import { Seccion } from './entities/seccion.entity';

@Module({
  controllers: [SeccionController],
  providers: [SeccionService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Seccion]), PolivalenteModule],
  exports: [TypeOrmModule],
})
export class SeccionModule {}
