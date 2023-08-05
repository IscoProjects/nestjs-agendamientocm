import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { ErrorHandleDBService } from 'src/common/services/errorHandleDBException';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  controllers: [AreaController],
  providers: [AreaService, ErrorHandleDBService],
  imports: [TypeOrmModule.forFeature([Area]), UsuarioModule],
  exports: [TypeOrmModule],
})
export class AreaModule {}
