import { CreateItemValidator } from "src/domain/items/validators/create-item.validator";

export interface ItemService {
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(body: CreateItemValidator): Promise<any>;
}