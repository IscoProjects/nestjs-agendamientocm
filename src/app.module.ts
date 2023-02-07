import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { AgendamientoModule } from './agendamiento/agendamiento.module';
import { PacienteModule } from './paciente/paciente.module';
import { ConsultaModule } from './consulta/consulta.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { UnmetDemandModule } from './unmet_demand/unmet_demand.module';
import { AreaTrabajoModule } from './area_trabajo/area_trabajo.module';
import { SeccionModule } from './seccion/seccion.module';
import { PolivalenteModule } from './polivalente/polivalente.module';

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
    UsuarioModule,
    AgendamientoModule,
    PacienteModule,
    ConsultaModule,
    CommonModule,
    AreaTrabajoModule,
    UnmetDemandModule,
    SeccionModule,
    PolivalenteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
