import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateItemValidator } from '../../domain/items/validators/create-item.validator';
import GetAllItemUseCase from '../../application/item/usecases/getAllItems.usecase';
import GetOneItemUseCase from '../../application/item/usecases/getOneItem.usecase';
import CreateItemUseCase from '../../application/item/usecases/createItem.usecase';

@Controller('item')
export class ItemController {
    constructor(
        private readonly getAllItemUseCase: GetAllItemUseCase,
        private readonly getOneItemUseCase: GetOneItemUseCase,
        private readonly createItemUseCase: CreateItemUseCase
    ) { }


    @Get()
    findAll() {
        return this.getAllItemUseCase.handler();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.getOneItemUseCase.handler(id);
    }

    @Post()
    create(@Body() body: CreateItemValidator) {
        return this.createItemUseCase.handler(body);
    }
}
