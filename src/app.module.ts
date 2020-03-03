import { Module } from '@nestjs/common';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InfraestructureModule,
    ApplicationModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
