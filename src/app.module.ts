import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PacienteModule } from './paciente/paciente.module';
import { ConsultaModule } from './consulta/consulta.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { SeccionModule } from './seccion/seccion.module';
import { AreaModule } from './area/area.module';
import { EstacionTrabajoModule } from './estacion-trabajo/estacion-trabajo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    CommonModule,
    UsuarioModule,
    AgendamientoModule,
    PacienteModule,
    ConsultaModule,
    SeccionModule,
    AreaModule,
    EstacionTrabajoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
