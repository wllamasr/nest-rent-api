import { Controller, Post, Body, Get, Param, Delete, Put } from '@nestjs/common';
import { CreateUserValidator } from './validators/create-user.validator';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {

    constructor(
        private userService: UserService
    ) { }


    /**
     * Create a new user.
     * 
     * @param body | Request body
     * 
     * @returns User | The user created
     */
    @Post()
    create(@Body() body: CreateUserValidator) {
        return this.userService.create(body);
    }

    /**
     * List all users
     * 
     * @return User[] | A list with all the users 
     */
    @Get()
    list() {
        return this.userService.list();
    }

    /**
     * Get an user by id
     * 
     * @param id | User's ID
     * @returns User 
     */
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.userService.get(id);
    }
}
