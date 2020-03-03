import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';
import { Repository } from '../../../domain/ports/repository';

@Injectable()
export class UserRepositoryMysql implements Repository {

    constructor(
        @Inject('User')
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

    get(id: number) {
        return this.userModel.findOne({ where: { id } });
    }
}
