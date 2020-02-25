import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Item } from './item.model';

@Injectable()
export class ItemService {
    constructor(
        @InjectModel(Item)
        private readonly itemModel: typeof Item
    ) { }

    findAll() {
        return this.itemModel.findAll();
    }

    findOne(id: number) {
        return this.itemModel.findByPk(id);
    }

    async create(body: any) {
        const item = this.itemModel.build(body);
        await item.save();
        return item;
    }
}
