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

    @BeforeSave
    static async updateTotal(instance: Rent) {
        const item = await instance.$get('item');
        const days = moment(instance.to_date).diff(instance.from_date, 'days')
        instance.total = item.price * days;
    }

    @BeforeFind
    @AfterFind
    static async updateDates(instance: Rent) {
        instance.createdAt = moment(instance.createdAt).format('YYYY-MM-DD')
        instance.updatedAt = moment(instance.updatedAt).format('YYYY-MM-DD')
        instance.from_date = moment(instance.from_date).format('YYYY-MM-DD')
        instance.to_date = moment(instance.to_date).format('YYYY-MM-DD')
    }
}