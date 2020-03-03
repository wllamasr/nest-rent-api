import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../infraestructure/adapters/models/user.model';
import { Item } from '../infraestructure/adapters/models/item.model';
import { Rent } from '../infraestructure/adapters/models/rent.model';
import { DomainModule } from '../domain/domain.module';
import { userProviders } from './user/user.providers';
import { rentProviders } from './rent/rent.providers';
import { itemProviders } from './item/item.privoders';

@Module({
    imports: [
        DomainModule,
        SequelizeModule.forFeature([User, Rent, Item]),
    ],
    providers: [
        ...userProviders,
        ...rentProviders,
        ...itemProviders
    ],
    exports: [
        ...userProviders,
        ...rentProviders,
        ...itemProviders
    ]
})
export class ApplicationModule { }
