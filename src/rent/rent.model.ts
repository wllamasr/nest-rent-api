import { Table, Model, Column, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Item } from 'src/item/item.model';
import { User } from 'src/users/user.model';

@Table
export class Rent extends Model<Rent>{

    @Column({ allowNull: false, defaultValue: new Date() })
    from_date: string;

    @Column({ allowNull: false, defaultValue: 0 })
    to_date: number;

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
}