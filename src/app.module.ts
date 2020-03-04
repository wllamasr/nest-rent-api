import { Module, DynamicModule } from '@nestjs/common';
import { InfraestructureModule } from './infraestructure/infraestructure.module';
import { ApplicationModule } from './application/application.module';
import { DomainModule } from './domain/domain.module';

@Module({})
export class AppModule {
  static forRoot(databaseSettings?: any): DynamicModule {
    return {
      module: AppModule,
      imports: [
        InfraestructureModule.forRoot(databaseSettings),
        ApplicationModule,
        DomainModule,
      ],
      controllers: [],
      providers: [],
    }
  }
}
