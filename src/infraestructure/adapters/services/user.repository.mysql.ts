import { Injectable, Inject } from '@nestjs/common';
import { User } from '../models/user.model';
import { Repository } from '../../../domain/ports/repository';
import { userSerializer } from '../../serializers/user.serializer';

@Injectable()
export class UserRepositoryMysql implements Repository {

    constructor(
        @Inject('User')
        private readonly userModel: typeof User
    ) { }

    async create(body: any): Promise<User> {
        const user = this.userModel.build(body);
        await user.save();
        return <User>userSerializer(user);
    }

    async list() {
        const users = await this.userModel.findAll();
        return <User[]>userSerializer(users);
    }

    async get(id: number, args?: any) {
        const user = await this.userModel.findOne({ where: { id }, ...args });
        return <User>userSerializer(user);
    }
}
