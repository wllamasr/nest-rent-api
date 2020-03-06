import { Table, Model, Column, HasOne, ForeignKey, BelongsTo, DataType, BeforeSave, AfterFind, BeforeFind } from 'sequelize-typescript';
import { Item } from './item.model';
import { User } from './user.model';
import moment from 'moment';
@Table
export class Rent extends Model<Rent>{

    static RENT = 'rented';
    static RETURNED = 'returned';

    @Column({ allowNull: false, defaultValue: new Date(), type: DataType.DATEONLY })
    fromDate: string;

    @Column({ allowNull: false, defaultValue: moment().format(), type: DataType.DATEONLY })
    toDate: string;

    @Column({ allowNull: false, defaultValue: 0 })
    total: number;

    @ForeignKey(() => Item)
    @Column
    itemId: number;

    @BelongsTo(() => Item)
    item: Item;

    @ForeignKey(() => User)
    @Column
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @Column({ values: [Rent.RENT, Rent.RETURNED], defaultValue: Rent.RENT })
    status: string;

    /**
     * Total to pay.
     * In case the user exceeds the limit time, returns the total + day of rent +10%
     */
    @Column(DataType.VIRTUAL(DataType.STRING))
    get toPay(this: Rent) {
        const daysToFinish = this.daysToFinishRental() * -1;
        console.log(daysToFinish);
        if (this.isRented() && daysToFinish > 0) {
            const percent = 1.1;
            const itemPrice = this.item.price * percent;

            return Math.ceil(
                this.total + (itemPrice * daysToFinish)
            );
        }

        return this.total;
    }

    @BeforeSave
    static async updateTotal(instance: Rent) {
        const item = await instance.$get('item');
        instance.total = moment(instance.toDate).diff(instance.fromDate, 'days') * item.price;
    }

    daysToFinishRental(): number {
        return moment(this.toDate)
            .diff(
                moment().format(), 'day'
            );
    }

    isRented(): boolean {
        return this.status === Rent.RENT;
    }
}
