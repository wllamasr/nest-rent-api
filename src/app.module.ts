import { Module } from '@nestjs/common';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';

@Module({
  imports: [
    InfraestructureModule.forRoot(),
    ApplicationModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
