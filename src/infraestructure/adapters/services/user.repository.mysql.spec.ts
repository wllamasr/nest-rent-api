import { UserRepositoryMysql } from "./user.repository.mysql"
import { GenericContainer, Wait, StartedTestContainer } from 'testcontainers';
import { TestingModule, Test } from "@nestjs/testing";
import { InfraestructureModule } from "../../../infraestructure/infraestructure.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { Sequelize } from 'sequelize';
import { User } from "../models/user.model";
import { Rent } from "../models/rent.model";
import { Item } from "../models/item.model";
import { userSerializer } from "../../serializers/user.serializer";

let user_base = {
    name: "test",
    email: "test@test.com",
    rol: 'usuario',
    password: "test",
    address: "test",
    dni: "12345",
    phone: "123456789"
};
let users: Array<any> = [];
describe('userRepositoryMysql', () => {
    let userRepository: UserRepositoryMysql;
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
                UserRepositoryMysql,
                { provide: 'User', useValue: User }
            ]
        }).compile();

        userRepository = module.get<UserRepositoryMysql>(
            UserRepositoryMysql
        );
    });

    describe('get one user', () => {
        beforeEach(async () => {
            users.push(await User.create(user_base))
        });

        it('get one existing user', async () => {
            const user = users[0];

            const response = await userRepository.get(user.id);

            expect(response).toBeDefined();

            expect(
                userSerializer(response)
            ).toMatchObject(
                userSerializer(user)
            );

        })
    })

    describe('get all uses', () => {
        beforeEach(async () => {
            users.push(await User.create({ ...user_base, email: 'test1@test.com' }))
            users.push(await User.create({ ...user_base, email: 'test2@test.com' }))
            users.push(await User.create({ ...user_base, email: 'test3@test.com' }))
        });

        it('returns all items', async () => {
            const response = await userRepository.list();

            expect(response).toBeDefined();

            expect(response.length).toBe(users.length);

            expect(userSerializer(users)).toMatchObject(userSerializer(response));
        });

    })

    describe('create one user', () => {
        it('creates the user', async () => {
            let user = { ...user_base, email: 'test4@test.com' };
            const response = await userRepository.create(user);
            expect(response).toBeDefined();
            expect(typeof response).toBe('object');
            user['id'] = response.id;
            expect(user).toMatchObject(userSerializer(response));
        })
    });

    afterAll(async () => {
        await container.stop();
    });
})