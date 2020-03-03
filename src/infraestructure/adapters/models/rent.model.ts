import { Table, Model, Column, HasOne, ForeignKey, BelongsTo, DataType, BeforeSave } from 'sequelize-typescript';
import { Item } from './item.model';
import { User } from './user.model';
import moment from 'moment';
@Table
export class Rent extends Model<Rent>{

    static RENT = 'rented';
    static RETURNED = 'returned';

    @Column({ allowNull: false, defaultValue: new Date(), type: DataType.DATE })
    from_date: string;

    @Column({ allowNull: false, defaultValue: moment().format(), type: DataType.DATE })
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

    @BeforeSave
    static async updateTotal(instance: Rent) {
        const item = await instance.$get('item');
        const days = moment(instance.to_date).diff(instance.from_date, 'days')
        instance.total = item.price * days;
    }
}