import { UserRepositoryMysql } from "./user.repository.mysql"
import { GenericContainer, Wait, StartedTestContainer } from 'testcontainers';
import { TestingModule, Test } from "@nestjs/testing";
import { InfraestructureModule } from "../../../infraestructure/infraestructure.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Rent } from "../models/rent.model";
import { Item } from "../models/item.model";
import { userSerializer } from "../../serializers/user.serializer";

let user_base = {
    name: "test",
    email: "test@test.com",
    password: "test",
    address: "test",
    dni: "12345",
    phone: "123456789"
};

describe('userRepositoryMysql', () => {
    let userRepository: UserRepositoryMysql;
    let container: StartedTestContainer;
    const DATABASE_PORT = 3306;
    const DATABASE_NAME = 'test';
    jest.setTimeout(60000);

    beforeAll(async () => {
        container = await new GenericContainer('mysql')
            .withEnv('MYSQL_ALLOW_EMPTY_PASSWORD', 'true')
            .withEnv('MYSQL_DATABASE', DATABASE_NAME)
            .withExposedPorts(DATABASE_PORT)
            .withWaitStrategy(Wait.forLogMessage('port: 3306'))
            .start();

        const databaseConnection = {
            port: container.getMappedPort(DATABASE_PORT),
            host: 'localhost',
            username: 'root',
            // password: 'true',
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

    afterEach(() => {
        container.exec([])
    })
    describe('get one user', () => {
        let user: any;
        beforeEach(async () => {
            user = new User(user_base);
            await user.save()
        });

        it('get one existing user', async () => {

            const response = await userRepository.get(user.id);

            expect(
                userSerializer(response)
            ).toMatchObject(
                userSerializer(user)
            );

        })
    })

    describe('get all uses', () => {
        beforeEach(async () => {
            await new User({ email: 'test0@test.com', ...user_base }).save();
            await new User({ email: 'test1@test.com', ...user_base }).save();
            await new User({ email: 'test2@test.com', ...user_base }).save();
            await new User({ email: 'test3@test.com', ...user_base }).save();
        })
        it('returns all items', async () => {
            const response = await userRepository.list();
            console.log(response.length);
            expect(response.length).toBe(4);
        })
    })

    afterAll(async () => {
        // await container.stop();
    });
})