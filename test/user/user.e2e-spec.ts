import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { StartedTestContainer, GenericContainer, Wait } from 'testcontainers';

describe('Rent (e2e)', () => {
    let app: INestApplication;
    let container: StartedTestContainer;
    const DATABASE_PORT = 3306;
    const DATABASE_NAME = 'test';
    const DATABASE_PASSWORD = 'true';
    jest.setTimeout(60000);
    const base_user = {
        name: "test",
        email: "test@test.com",
        password: "password",
        address: "test",
        dni: "123456789",
        phone: "1234567",
        rol: "usuario"
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

    describe('/user (POST)', () => {
        it('/', async () => {
            let user = { ...base_user };

            const { status, body } = await request(app.getHttpServer())
                .post('/users')
                .send(user);

            user['id'] = body.id;

            expect(status).toEqual(HttpStatus.CREATED);
            expect(user).toMatchObject(body);
        });
    });

    describe('/user (GET)', () => {
        it('/', async () => {
            const { status, body } = await request(app.getHttpServer())
                .get('/users');
            expect(status).toEqual(HttpStatus.OK);
            expect(Array.isArray(body)).toBe(true);
        })
    })

    describe('/user/:id (GET)', () => {
        it('/:id', async () => {
            let user = { ...base_user }
            const { status, body } = await request(app.getHttpServer())
                .get('/users/1');
            expect(status).toEqual(HttpStatus.OK);
            expect(typeof body).toBe('object');
            user['id'] = body.id;
            expect(user).toMatchObject(body);
        })
    })
});
