import { Model } from 'sequelize-typescript';

export interface Repository {
    /**
     * Returns a list with the elements of the entity
     */
    list(): Promise<Model[]>;

    /**
     * Creates a new entity
     * @param body 
     */
    create(body: any): Promise<Model | Error>;

    /**
     * Returns an instance of an entity
     * @param id 
     */
    get(id: number, args?: any): Promise<Model>;
}