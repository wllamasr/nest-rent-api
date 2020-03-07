import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';
import { RentDto } from '../../../domain/rent.dto';

@Injectable()
export default class UpdateRentUseCase {
    constructor(
        @Inject('RentRepository') private rentService: Repository,
    ) { }

    public handler(id: number, body: RentDto) {
        return this.rentService.update(id, body);
    }
}