import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rent } from './rent.model';
import { Item } from '../item/item.model';

@Injectable()
export class RentService {
    constructor(
        @InjectModel(Rent)
        private rentModel: typeof Rent
    ) {

    }
    findAll(): Promise<Rent[]> {
        return this.rentModel.findAll();
    }

    findOne(id: number): Promise<Rent> {
        return this.rentModel.findByPk(id);
    }

    async create(body: any): Promise<Rent | HttpException> {
        console.log(Rent)
        const item = await Item.findByPk(body.item_id)

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
