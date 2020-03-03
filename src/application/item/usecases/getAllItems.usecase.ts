import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetAllItemUseCase {
    constructor(
        @Inject('ItemRepository') private itemService: Repository,
    ) { }

    public handler() {
        return this.itemService.list();
    }
}