import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class CreateUserUseCase {
    constructor(
        @Inject('UserRepository') private userRepository: Repository,
    ) { }

    public handle(body: any) {
        return this.userRepository.create(body);
    }
}