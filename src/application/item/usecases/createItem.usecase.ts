import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class CreateItemUseCase {
    constructor(
        @Inject('ItemRepository') private itemService: Repository,
    ) { }

    public handler(body: any) {
        return this.itemService.create(body);
    }
}