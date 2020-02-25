import { Controller, Get, Param } from '@nestjs/common';
import { RentService } from './rent.service';

@Controller('rent')
export class RentController {
    constructor(
        private rentService: RentService
    ) { }

    @Get()
    findAll() {
        return this.rentService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rentService.findOne(id);
    }

}
