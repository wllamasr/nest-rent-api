import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetOneRentUseCase {
    constructor(
        @Inject('RentRepository') private rentService: Repository,
    ) { }

    public handler(id: number) {
        return this.rentService.get(id);
    }
}