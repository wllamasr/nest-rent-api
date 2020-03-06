import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';
import { CreateRentValidator } from 'src/domain/rents/validators/create-rent.validator';

@Injectable()
export default class UpdateRentUseCase {
    constructor(
        @Inject('RentRepository') private rentService: Repository,
    ) { }

    public handler(id: number, body: CreateRentValidator) {
        return this.rentService.update(id, body);
    }
}