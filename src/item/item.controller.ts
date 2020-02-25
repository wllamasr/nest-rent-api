import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemValidator } from './validators/create-item.validator';

@Controller('item')
export class ItemController {
    constructor(
        private itemService: ItemService
    ) { }

    @Get()
    findAll() {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.itemService.findOne(id);
    }

    @Post()
    create(@Body() body: CreateItemValidator) {
        return this.itemService.create(body);
    }
}
