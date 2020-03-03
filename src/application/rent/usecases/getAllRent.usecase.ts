import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetAllRentUseCase {
    constructor(
        @Inject('RentRepository') private rentService: Repository,
    ) { }

    public handler() {
        return this.rentService.list();
    }
}