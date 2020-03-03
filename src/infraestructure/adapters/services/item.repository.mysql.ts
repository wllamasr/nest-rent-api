import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../models/item.model';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export class ItemRepositoryMysql implements Repository {
    constructor(
        @Inject('Item')
        private readonly itemModel: typeof Item
    ) { }

    list() {
        return this.itemModel.findAll();
    }

    get(id: number) {
        return this.itemModel.findByPk(id);
    }

    async create(body: any) {
        const item = this.itemModel.build(body);
        await item.save();
        return item;
    }
}
