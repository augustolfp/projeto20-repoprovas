import supertest from "supertest";
import {prisma} from '../src/config/database';
import app from '../src/app';
import userFactory from './factories/userFactory';

afterAll(async () => {
    await prisma.$disconnect();
  });


describe('Tests POST /sign-up', () => {

    it('Should return an error if submitted user format is invalid', async () => {

        const user = await userFactory();
        const body: {email: string, password?: string} = {...user};
        delete body.password;

        const result = await supertest(app).post('/sign-up').send(body);

        expect(result.status).toBe(400);
    });

    it('Should return an error if user already exists', async () => {
        const user = await userFactory();
        const firstInsert = await supertest(app).post('/sign-up').send(user);
        const secondInsert = await supertest(app).post('/sign-up').send(user);

        expect(secondInsert.status).toBe(403);
    });

    it('should return a sucess status code if input user format is correct', async () => {
        const user = await userFactory();
        const result = await supertest(app).post('/sign-up').send(user);

        expect(result.status).toBe(201);
    });
});

describe('Tests POST /sign-in', () => {

    it('Should return an error if user format is invalid', async () => {
        const user = await userFactory();
        await supertest(app).post('/sign-up').send(user);

        const bodyNoPassword: {email: string, password?: string} = {...user};
        delete bodyNoPassword.password;

        const bodyNoEmail: {email?: string, password: string} = {...user};
        delete bodyNoEmail.email;

        const noPasswordSignIn = await supertest(app).post('/sign-in').send(bodyNoPassword);
        const noEmailSignIn = await supertest(app).post('/sign-in').send(bodyNoEmail);

        expect(noPasswordSignIn.status).toBe(400);
        expect(noEmailSignIn.status).toBe(400);
    });

    it('Should return an error if user password is incorrect', async () => {
        const user = await userFactory();
        await supertest(app).post('/sign-up').send(user);

        const result = await supertest(app).post('/sign-in').send({...user, password: "1234"});

        expect(result.status).toBe(401);
    });

    it('Should return an error if user doesnt exist on database', async () => {
        const user = await userFactory();

        const result = await supertest(app).post('/sign-in').send(user);

        expect(result.status).toBe(401);
    });

    it('Should return a success status code and return a JWT token if user credentials are correct', async () => {
        const user = await userFactory();
        await supertest(app).post('/sign-up').send(user);

        const result = await supertest(app).post('/sign-in').send(user);

        expect(result.status).toBe(201);
    });
});

describe('Tests POST /upload-test', () => {

    it.todo('Should return an error if Authorization header is missing/incorrect/expired');

    it.todo('Should return an error if the body format is incorrect');

    it. todo('Should return a success status code and properly store new test on database if body format and Authorization are correct');
});

describe('Tests GET /get-tests', () => {

    it.todo('Should return an error if Authorization header is missing/incorrect/expired');

    it.todo('should return a success status code and an array of tests');

});

describe('Tests GET /get-test/:id', () => {

    it.todo('Should return an error if Authorization header is missing/incorrect/expired');

    it.todo('Should return an error if provided id doesnt exists on database');

    it.todo('Should return a success status code and an object if id is found and Authorization is correct');
});