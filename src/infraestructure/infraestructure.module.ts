import { Module, DynamicModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Item } from 'src/infraestructure/adapters/models/item.model';
import { Rent } from 'src/infraestructure/adapters/models/rent.model';
import { User } from 'src/infraestructure/adapters/models/user.model';
import { ItemController } from './controllers/item.controller';
import { RentController } from './controllers/rent.controller';
import { UsersController } from 'src/infraestructure/controllers/users.controller';
import { ApplicationModule } from 'src/application/application.module';

@Module({
    imports: [
        ApplicationModule,
        ConfigModule.forRoot({ isGlobal: true }),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            synchronize: true,
            autoLoadModels: true
        }),
        SequelizeModule.forFeature([User, Rent, Item])
    ],
    controllers: [
        UsersController,
        RentController,
        ItemController
    ],
    exports: [SequelizeModule]

})
export class InfraestructureModule {
}
