import { GenericContainer, Wait, StartedTestContainer } from 'testcontainers';
import { TestingModule, Test } from "@nestjs/testing";
import { InfraestructureModule } from "../../../infraestructure/infraestructure.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Rent } from "../models/rent.model";
import { Item } from "../models/item.model";
import { rentSerializer } from "../../serializers/rent.serializer";
import { RentRepositoryMysql } from './rent.repository.mysql';
import moment from 'moment';
describe('', () => {
    let rents: Array<Rent> = [];
    let rentRepository: RentRepositoryMysql;
    let container: StartedTestContainer;
    let base_rent = {
        item_id: 0,
        user_id: 0,
        from_date: `${moment().format('YYYY-MM-DD')}`,
        to_date: `${moment().add(5, 'days').format('YYYY-MM-DD')}`
    };
    let base_item = {
        name: "ITEM",
        price: 456789,
        amount: 56
    };
    let user_base = {
        name: "test",
        email: "test@test.com",
        rol: 'usuario',
        password: "test",
        address: "test",
        dni: "12345",
        phone: "123456789"
    };
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
                SequelizeModule.forFeature([User, Rent, Item])
            ],
            providers: [
                RentRepositoryMysql,
                { provide: 'Rent', useValue: Rent },
                { provide: 'User', useValue: User },
                { provide: 'Item', useValue: Item },
            ]
        }).compile();

        rentRepository = module.get<RentRepositoryMysql>(
            RentRepositoryMysql
        );
    })

    describe('get one rent', () => {
        beforeEach(async () => {
            const item = await Item.create(base_item);
            const user = await User.create(user_base);
            base_rent.user_id = user.id;
            base_rent.item_id = item.id;
            const rent = await Rent.create(base_rent)
            rents.push(rent)
        });

        it('returns an rent with a given ID', async () => {
            const item = rents[0];
            const response = await rentRepository.get(item.id);
            expect(response).toBeDefined();
            expect(typeof response).toBe('object');
            expect(rentSerializer(response)).toMatchObject(rentSerializer(item));
        })
    })

    describe('get all rents', () => {
        it('returns all the rents', async () => {
            const response = await rentRepository.list();

            expect(response).toBeDefined();

            expect(response.length).toBe(rents.length);

            expect(rentSerializer(rents)).toMatchObject(rentSerializer(response));
        })
    })

    describe('create one rent', () => {
        it('creates the rent', async () => {
            let response = <Rent>(await rentRepository.create(base_rent));
            expect(response).toBeDefined();
            expect(typeof response).toBe('object');
            base_rent['id'] = response.id;
            expect(rentSerializer(response)).toMatchObject(base_rent);
        })
    })

    afterAll(async () => {
        await container.stop();
    });
})