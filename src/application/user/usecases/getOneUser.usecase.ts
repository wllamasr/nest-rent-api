import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'src/domain/ports/repository';

@Injectable()
export default class GetOneUserUseCase {
    constructor(
        @Inject('UserRepository') private userRepository: Repository,
    ) { }

    public handle(id: number) {
        return this.userRepository.get(id);
    }
}