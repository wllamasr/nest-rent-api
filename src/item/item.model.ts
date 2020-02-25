import { Table, Model, Column, BeforeSave, BeforeUpdate } from 'sequelize-typescript';

@Table
export class Item extends Model<Item>{

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false, defaultValue: 0 })
    price: number;

    @Column({ allowNull: false, defaultValue: 0 })
    amoutn: number;
}