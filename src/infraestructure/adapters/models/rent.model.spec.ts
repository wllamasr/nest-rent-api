import { GenericContainer, Wait, StartedTestContainer } from 'testcontainers';
import { TestingModule, Test } from "@nestjs/testing";
import { InfraestructureModule } from "../../../infraestructure/infraestructure.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Rent } from "../models/rent.model";
import { Item } from "../models/item.model";
import { User } from "../models/user.model";
import moment from 'moment';
import { userBase, itemBase, rentBase } from '../../../../test/baseEntities';

moment.defaultFormat = 'YYYY-MM-DD';

describe('test', () => {

    let container: StartedTestContainer;

    const DATABASE_PORT = 3306;
    const DATABASE_NAME = 'test';
    const DATABASE_PASSWORD = 'true';
    jest.setTimeout(60000);
    beforeAll(async () => {
        container = await new GenericContainer('mysql')
            .withEnv('MYSQL_ROOT_PASSWORD', DATABASE_PASSWORD)
            .withEnv('MYSQL_DATABASE', DATABASE_NAME)
            .withExposedPorts(DATABASE_PORT)
            .withWaitStrategy(Wait.forLogMessage('port: 3306'))
            .start();

        const databaseConnection = {
            port: container.getMappedPort(DATABASE_PORT),
            host: 'localhost',
            username: 'root',
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        };

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                InfraestructureModule.forRoot(databaseConnection),
                SequelizeModule.forFeature([Rent, Item, User])
            ],
            providers: [
                { provide: 'Rent', useValue: Rent },
                { provide: 'Item', useValue: Item },
                { provide: 'User', useValue: User },
            ]
        }).compile();
    })

    afterAll(async () => {
        await container.stop()
    })

    describe('Rent Model', () => {
        let rent;
        let user;
        let item;
        beforeAll(async () => {
            user = await User.create(userBase);

            item = await Item.create(itemBase);

            rent = await Rent.create(rentBase(item.id, user.id));

            rent.item = item;
        })

        describe('isRented function', () => {
            it('should return is rented true', async () => {
                expect(rent.isRented()).toBe(true);
            })
        })



        describe('total calculation', () => {

            it('should return the total of the rent ', () => {
                expect(rent.total).toEqual(500);
            });

            it('return the fine if exceed the time', async () => {
                rent.toDate = moment().subtract(1, 'day');
                await rent.save()
                expect(rent.toPay).toEqual(510);
            })

        });

        describe('daysToFinishRental', () => {
            it('returns 5', async () => {
                rent.toDate = moment().add(7, 'day');
                await rent.save();
                expect(rent.daysToFinishRental()).toEqual(7);
            })
        })

    })
})