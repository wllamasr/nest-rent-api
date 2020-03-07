import { Injectable, Inject } from '@nestjs/common';
import { Rent } from '../models/rent.model';
import { Item } from '../models/item.model';
import { Repository } from 'src/domain/ports/repository';
import { OutOfStockException } from '../../../domain/exceptions/outOfStock.exeption';
import { rentSerializer } from '../../serializers/rent.serializer';
import { RentDto } from 'src/domain/rent.dto';

@Injectable()
export class RentRepositoryMysql implements Repository {
    constructor(
        @Inject('Rent')
        private rentModel: typeof Rent,
        @Inject('Item')
        private itemModel: typeof Item
    ) {

    }
    async list(): Promise<Rent[]> {
        const rents = await this.rentModel.findAll({ include: ['user', 'item'] });
        return <Rent[]>rentSerializer(rents);
    }

    async get(id: number): Promise<Rent> {
        const rent = await this.rentModel.findByPk(id, { include: ['user', 'item'] });
        return <Rent>rentSerializer(rent);
    }

    async create(body: any): Promise<Rent> {
        const item = await this.itemModel.findByPk(body.itemId);

        if (!await item.isAvailable()) {
            throw new OutOfStockException;
        }

        const rent = this.rentModel.build(body);
        await rent.save();
        return <Rent>rentSerializer(rent);
    }

    async update(id: number, body: RentDto) {
        const rent = await this.rentModel.findByPk(id);
        await rent.update(body);
        return <Rent>rentSerializer(rent);
    }
}
