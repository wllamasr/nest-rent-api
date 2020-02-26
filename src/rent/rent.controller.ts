import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentValidator } from './validators/create-rent.validator'
@Controller('rent')
export class RentController {
    constructor(
        private rentService: RentService
    ) { }

    @Get()
    findAll() {
        return this.rentService.findAll();
    }

    @Post()
    newRent(@Body() body: CreateRentValidator) {
        return this.rentService.create(body);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rentService.findOne(id);
    }

}
