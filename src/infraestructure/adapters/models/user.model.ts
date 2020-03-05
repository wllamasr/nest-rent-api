import { Table, Model, Column, HasMany } from 'sequelize-typescript';
import { Rent } from './rent.model';

@Table
export class User extends Model<User>{

    @Column({ allowNull: false })
    name: string;

    @Column({ unique: true, validate: { isEmail: true } })
    email: string;

    @Column({ allowNull: false })
    phone: string;

    @Column({ allowNull: false })
    dni: string;

    @Column({ allowNull: false })
    address: string;

    @HasMany(() => Rent)
    rents: Rent[];
}