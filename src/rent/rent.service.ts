import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rent } from './rent.model';

@Injectable()
export class RentService {

    constructor(
        @InjectModel(Rent)
        private rentModel: typeof Rent
    ) {

    }
    findAll(): Promise<Rent[]> {
        return this.rentModel.findAll();
    }

    findOne(id: number): Promise<Rent> {
        return this.rentModel.findByPk(id);
    }
}
