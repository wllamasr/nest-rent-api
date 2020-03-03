import { UserRepositoryMysql } from "../../infraestructure/adapters/services/user.repository.mysql";
import { User } from "../../infraestructure/adapters/models/user.model";
import GetAllUsersUseCase from "./usecases/getAllUsers.usecase";
import GetOneUserUseCase from "./usecases/getOneUser.usecase";
import CreateUserUseCase from "./usecases/createUser.usecase";

export const userProviders = [
    GetAllUsersUseCase,
    GetOneUserUseCase,
    CreateUserUseCase,
    {
        provide: "UserRepository",
        useClass: UserRepositoryMysql
    },
    {
        provide: 'User',
        useValue: User
    }
]