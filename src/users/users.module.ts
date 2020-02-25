import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserService } from './user.service';
import { userMock } from './mocks/user.mock';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UserService
  ],
  exports: [UserService]
})
export class UsersModule { }
