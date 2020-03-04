import { Module, DynamicModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Item } from './adapters/models/item.model';
import { Rent } from './adapters/models/rent.model';
import { User } from './adapters/models/user.model';
import { ItemController } from './controllers/item.controller';
import { RentController } from './controllers/rent.controller';
import { UsersController } from './controllers/users.controller';
import { ApplicationModule } from '../application/application.module';

@Module({})
export class InfraestructureModule {

    static forRoot(databaseSettings: any = {}): DynamicModule {
        return {
            module: InfraestructureModule,
            imports: [
                ApplicationModule,
                ConfigModule.forRoot(),
                SequelizeModule.forRoot({
                    dialect: 'mysql',
                    host: databaseSettings.host || process.env.DB_HOST,
                    port: databaseSettings.port || 3306,
                    username: databaseSettings.username || process.env.DB_USERNAME,
                    password: databaseSettings.password || process.env.DB_PASSWORD,
                    database: databaseSettings.database || process.env.DB_DATABASE,
                    synchronize: true,
                    autoLoadModels: true,
                    logging: false,
                }),
                SequelizeModule.forFeature([User, Rent, Item])
            ],
            controllers: [
                UsersController,
                RentController,
                ItemController
            ],
            exports: [
                SequelizeModule
            ]

        }
    }

}
