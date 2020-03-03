import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CreateRentValidator } from '../../domain/rents/validators/create-rent.validator';
import GetAllRentUseCase from '../../application/rent/usecases/getAllRent.usecase';
import GetOneRentUseCase from '../../application/rent/usecases/getOneRent.usecase';
import CreateRentUseCase from '../../application/rent/usecases/createRent.usecase';

@Controller('rent')
export class RentController {
    constructor(
        private readonly getAllRentUseCase: GetAllRentUseCase,
        private readonly getOneRentUseCase: GetOneRentUseCase,
        private readonly createRentUseCase: CreateRentUseCase
    ) { }

    @Get()
    findAll() {
        return this.getAllRentUseCase.handler();
    }

    @Post()
    newRent(@Body() body: CreateRentValidator) {
        return this.createRentUseCase.handler(body);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.getOneRentUseCase.handler(id);
    }

}
