import { UserRepositoryMysql } from "./user.repository.mysql"
import { GenericContainer, Wait, StartedTestContainer } from 'testcontainers';
import { TestingModule, Test } from "@nestjs/testing";
import { InfraestructureModule } from "../../../infraestructure/infraestructure.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Rent } from "../models/rent.model";
import { Item } from "../models/item.model";
import { ItemRepositoryMysql } from "./item.repository.mysql";
import { itemSerializer } from "../../serializers/item.serializer";
import { itemBase } from '../../../../test/baseEntities';
describe('', () => {
    let items: Array<Item> = [];
    let itemRepository: ItemRepositoryMysql;
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
                ItemRepositoryMysql,
                { provide: 'Item', useValue: Item },
            ]
        }).compile();

        itemRepository = module.get<ItemRepositoryMysql>(
            ItemRepositoryMysql
        );
    })

    describe('get one item', () => {
        beforeEach(async () => {
            const item = await Item.create(itemBase)
            items.push(item)
        });

        it('returns an item with a given ID', async () => {
            const item = items[0];
            const response = await itemRepository.get(item.id);
            expect(response).toBeDefined();
            expect(typeof response).toBe('object');
            expect(itemSerializer(response)).toMatchObject(itemSerializer(item));
        })
    })

    describe('get all items', () => {
        it('returns all the items', async () => {
            const response = await itemRepository.list();

            expect(response).toBeDefined();

            expect(response.length).toBe(items.length);

            expect(itemSerializer(items)).toMatchObject(itemSerializer(response));
        })
    })

    describe('create one item', () => {
        it('creates the user', async () => {
            const response = await itemRepository.create(itemBase);
            expect(response).toBeDefined();
            expect(typeof response).toBe('object');
            itemBase['id'] = response.id;
            expect(itemBase).toMatchObject(itemSerializer(response));
        })
    })

    afterAll(async () => {
        await container.stop();
    });

    it('', () => {
        expect(true).toBe(true)
    })
})