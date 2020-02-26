import { Table, Model, Column, BeforeSave, BeforeUpdate, HasMany } from 'sequelize-typescript';
import { Rent } from '../rent/rent.model';

@Table
export class Item extends Model<Item>{

    @Column({ allowNull: false })
    name: string;

    @Column({ allowNull: false, defaultValue: 0 })
    price: number;

    @Column({ allowNull: false, defaultValue: 0 })
    amount: number;

    @HasMany(() => Rent)
    rents: Rent[];

    /**
     * Checks if the amount of rents open related to this item
     * are greather that the amount of items on stock.
     * 
     * @returns Promise<boolean>
     */
    async isAvailable(): Promise<boolean> {
        const rents = await this.$get('rents');
        const inRent = rents.filter((rent) => rent.status === Rent.RENT).length;
        return this.amount > inRent;
    }
}