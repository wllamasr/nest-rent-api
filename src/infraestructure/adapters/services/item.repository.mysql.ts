import { Injectable, Inject } from '@nestjs/common';
import { Item } from '../models/item.model';
import { Repository } from 'src/domain/ports/repository';
import { itemSerializer } from '../../serializers/item.serializer';

@Injectable()
export class ItemRepositoryMysql implements Repository {
    constructor(
        @Inject('Item')
        private readonly itemModel: typeof Item
    ) { }

    async list() {
        const items = await this.itemModel.findAll();
        return <Item[]>itemSerializer(items);
    }

    async get(id: number) {
        const item = await this.itemModel.findByPk(id);
        return <Item>itemSerializer(item);
    }

    async create(body: any) {
        const item = this.itemModel.build(body);
        await item.save();
        return <Item>itemSerializer(item);
    }
}
