import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class CreateRentUseCase {
    constructor(
        @Inject('RentRepository') private rentService: Repository,
    ) { }

    public handler(body: any) {
        return this.rentService.create(body);
    }
}