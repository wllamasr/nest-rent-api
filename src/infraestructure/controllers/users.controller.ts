import { Controller, Post, Body, Get, Param, Delete, Put, Inject } from '@nestjs/common';
import { CreateUserValidator } from '../../domain/users/validators/create-user.validator';

import GetAllUsersUseCase from '../../application/user/usecases/getAllUsers.usecase';
import GetOneUserUseCase from '../../application/user/usecases/getOneUser.usecase';
import CreateUserUseCase from '../../application/user/usecases/createUser.usecase';

@Controller('users')
export class UsersController {

    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase,
        private getOneUserUseCase: GetOneUserUseCase,
        private createUserUseCase: CreateUserUseCase
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
        return this.createUserUseCase.handle(body);
    }

    /**
     * List all users
     * 
     * @return User[] | A list with all the users 
     */
    @Get()
    list() {
        return this.getAllUsersUseCase.handle();
    }

    /**
     * Get an user by id
     * 
     * @param id | User's ID
     * @returns User 
     */
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.getOneUserUseCase.handle(id);
    }
}
