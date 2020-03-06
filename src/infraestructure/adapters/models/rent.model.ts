import { Table, Model, Column, HasOne, ForeignKey, BelongsTo, DataType, BeforeSave, AfterFind, BeforeFind } from 'sequelize-typescript';
import { Item } from './item.model';
import { User } from './user.model';
import moment from 'moment';
@Table
export class Rent extends Model<Rent>{

    static RENT = 'rented';
    static RETURNED = 'returned';

    @Column({ allowNull: false, defaultValue: new Date(), type: DataType.DATEONLY })
    from_date: string;

    @Column({ allowNull: false, defaultValue: moment().format(), type: DataType.DATEONLY })
    to_date: string;

    @Column({ allowNull: false, defaultValue: 0 })
    total: number;

    @ForeignKey(() => Item)
    @Column
    item_id: number;

    @BelongsTo(() => Item)
    item: Item;

    @ForeignKey(() => User)
    @Column
    user_id: number;

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

        if (this.isRented() && daysToFinish > 0) {
            const itemPrice = this.item.price * 1.1;

            return Math.ceil(
                this.total + (itemPrice * daysToFinish)
            )
        }

        return this.total;
    }

    @BeforeSave
    static async updateTotal(instance: Rent) {
        instance.total = await instance.calculateTotal();
    }

    @BeforeFind
    @AfterFind
    static async updateDates(instance: Rent) {
        instance.createdAt = moment(instance.createdAt).format()
        instance.updatedAt = moment(instance.updatedAt).format()
        instance.from_date = moment(instance.from_date).format()
        instance.to_date = moment(instance.to_date).format()
    }

    daysToFinishRental(): number {
        return moment(this.to_date)
            .diff(
                moment().format(), 'day'
            );
    }

    async calculateTotal() {
        const item = await this.$get('item');

        if (this.isNewRecord || this.daysToFinishRental() > 0) {
            const days = moment(this.to_date).diff(this.from_date, 'days')
            return item.price * days;
        }

        return this.total + (item.price * (this.daysToFinishRental() * -1))
    }

    isRented(): boolean {
        return this.status === Rent.RENT;
    }
}