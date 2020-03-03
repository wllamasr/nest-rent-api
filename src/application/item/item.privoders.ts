import { Item } from "../../infraestructure/adapters/models/item.model";
import { ItemRepositoryMysql } from "../../infraestructure/adapters/services/item.repository.mysql";
import GetAllItemUseCase from "./usecases/getAllItems.usecase";
import GetOneItemUseCase from "./usecases/getOneItem.usecase";
import CreateItemUseCase from "./usecases/createItem.usecase";

export const itemProviders = [
    GetAllItemUseCase,
    GetOneItemUseCase,
    CreateItemUseCase,
    {
        provide: "ItemRepository",
        useClass: ItemRepositoryMysql
    },
    {
        provide: 'Item',
        useValue: Item
    }
]