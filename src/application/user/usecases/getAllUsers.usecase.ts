import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetAllUsersUseCase {
    constructor(
        @Inject('UserRepository') private userRepository: Repository,
    ) { }

    public handle() {
        return this.userRepository.list();
    }
}