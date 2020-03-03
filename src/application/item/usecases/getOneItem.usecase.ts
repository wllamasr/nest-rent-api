import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetOneItemUseCase {
    constructor(
        @Inject('ItemRepository') private itemService: Repository,
    ) { }

    public handler(id: number) {
        return this.itemService.get(id);
    }
}