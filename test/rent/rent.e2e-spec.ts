import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { StartedTestContainer, GenericContainer, Wait } from 'testcontainers';
import moment from 'moment';
import { User } from '../../src/infraestructure/adapters/models/user.model';
import { Item } from '../../src/infraestructure/adapters/models/item.model';
import { Rent } from '../../src/infraestructure/adapters/models/rent.model';

describe('Rent (e2e)', () => {
    let app: INestApplication;
    let container: StartedTestContainer;
    const DATABASE_PORT = 3306;
    const DATABASE_NAME = 'test';
    const DATABASE_PASSWORD = 'true';
    jest.setTimeout(60000);

    let base_item = {
        name: "ITEM",
        price: 100,
        amount: 2
    };

    let base_rent = {
        item_id: 1,
        user_id: 1,
        from_date: `${moment().format('YYYY-MM-DD')}`,
        to_date: `${moment().add(2, 'days').format('YYYY-MM-DD')}`
    };

    let base_user = {
        name: "test",
        email: "test@test.com",
        rol: 'usuario',
        password: "test",
        address: "test",
        dni: "12345",
        phone: "123456789"
    };

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

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule.forRoot(databaseConnection)],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await container.stop();
    });

    describe('/item (POST)', () => {
        beforeAll(async () => {
            const user = await User.create(base_user);
            base_user['id'] = user.id;

            const item = await Item.create(base_item);
            base_item['id'] = item.id;
        })
        describe('create a new rental', () => {
            it('create a new rental', async () => {

                const { status, body } = await request(app.getHttpServer())
                    .post('/rent')
                    .send(base_rent);
                expect(status).toEqual(HttpStatus.CREATED);
                expect(typeof body).toBe('object');
                expect(body.total).toBe(200);
            });
        })
        describe('no create a new rental', () => {
            beforeAll(async () => {
                await Rent.create({ ...base_rent })
                await Rent.create({ ...base_rent })
            })

            it('returns an error', async () => {
                let rent = { ...base_rent };
                const { status, body } = await request(app.getHttpServer())
                    .post('/rent')
                    .send(rent);

                expect(status).toBe(HttpStatus.BAD_REQUEST)
                expect(typeof body).toBe('object');
                expect(body.message).toBeDefined();
                expect(Array.isArray(body.message)).toBe(true);
            });
        })
    });

    // describe('/user (GET)', () => {
    //     it('/', async () => {
    //         const { status, body } = await request(app.getHttpServer())
    //             .get('/item');
    //         expect(status).toEqual(HttpStatus.OK);
    //         expect(Array.isArray(body)).toBe(true);
    //     })
    // })

    // describe('/user/:id (GET)', () => {
    //     it('/:id', async () => {
    //         let item = { ...base_item }
    //         const { status, body } = await request(app.getHttpServer())
    //             .get('/item/1');
    //         expect(status).toEqual(HttpStatus.OK);
    //         expect(typeof body).toBe('object');
    //         item['id'] = body.id;
    //         expect(item).toMatchObject(body);
    //     })
    // })
});
