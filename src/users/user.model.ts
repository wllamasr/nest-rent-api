import { Table, Model, Column, BeforeSave, BeforeUpdate, HasMany } from 'sequelize-typescript';
import { hashSync } from 'bcryptjs';
import { Rent } from '../rent/rent.model';

@Table
export class User extends Model<User>{

    @Column({ allowNull: false })
    name: string;

    @Column({ unique: true, validate: { isEmail: true } })
    email: string;

    @Column({ allowNull: true })
    password: string;

    @Column({ allowNull: false })
    phone: string;

    @Column({ allowNull: false })
    dni: string;

    @Column({ allowNull: false })
    address: string;

    @Column({ values: ['administrador', 'usuario'], defaultValue: 'usuario' })
    rol: string;

    @HasMany(() => Rent)
    rents: Rent[];
    /**
     * Hash password if it has changed.
     * 
     * @param instance 
     */
    @BeforeSave
    @BeforeUpdate
    static hashPassword(instance: User) {
        if (instance.changed('password')) {
            instance.password = hashSync(instance.password, 12);
        }
    }
}