import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User
    ) { }

    async create(body: any): Promise<User> {
        const user = this.userModel.build(body);
        await user.save();
        return user;
    }

    list() {
        return this.userModel.findAll();
    }
}
