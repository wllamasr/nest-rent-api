import { Rent } from "../../infraestructure/adapters/models/rent.model";
import { Item } from "../../infraestructure/adapters/models/item.model";
import { RentRepositoryMysql } from "../../infraestructure/adapters/services/rent.repository.mysql";
import GetAllRentUseCase from "./usecases/getAllRent.usecase";
import GetOneRentUseCase from "./usecases/getOneRent.usecase";
import CreateRentUseCase from "./usecases/createRent.usecase";

export const rentProviders = [
    GetAllRentUseCase,
    GetOneRentUseCase,
    CreateRentUseCase,
    {
        provide: "RentRepository",
        useClass: RentRepositoryMysql
    },
    {
        provide: 'Rent',
        useValue: Rent
    },
    {
        provide: 'Item',
        useValue: Item
    }
]