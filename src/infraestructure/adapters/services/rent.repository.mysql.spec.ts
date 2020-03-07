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
import { itemBase, userBase, rentBase } from '../../../../test/baseEntities';

moment.defaultFormat = 'YYYY-MM-DD'

describe('', () => {
    let rents: Array<Rent> = [];
    let rentRepository: RentRepositoryMysql;
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
            const item = await Item.create(itemBase);
            const user = await User.create(userBase);
            const rent = await Rent.create(rentBase(item.id, user.id))
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

            expect(response).toMatchObject(rentSerializer(rents));
        })
    })

    describe('create one rent', () => {
        it('creates the rent', async () => {
            let base_rent = rentBase(1, 1);
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