import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rent } from '../models/rent.model';
import { Item } from '../models/item.model';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export class RentRepositoryMysql implements Repository {
    constructor(
        @Inject('Rent')
        private rentModel: typeof Rent,
        @Inject('Item')
        private itemModel: typeof Item
    ) {

    }
    list(): Promise<Rent[]> {
        return this.rentModel.findAll();
    }

    get(id: number): Promise<Rent> {
        return this.rentModel.findByPk(id);
    }

    async create(body: any): Promise<Rent | HttpException> {
        const item = await this.itemModel.findByPk(body.item_id);
        if (!await item.isAvailable()) {
            throw new HttpException(
                { message: [{ constraints: { outOfStock: 'Item is not available due to out of stock' } }] },
                HttpStatus.BAD_REQUEST
            );
        }

        const rent = this.rentModel.build(body);
        await rent.save();
        return rent;
    }

    async update(id: number, body: any) {
        const rent = await this.rentModel.findByPk(id);
        await rent.update(body);
        return rent;
    }
}
