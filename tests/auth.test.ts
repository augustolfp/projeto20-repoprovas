import supertest from "supertest";
import {prisma} from '../src/config/database';
import app from '../src/app';

afterAll(async () => {
    await prisma.$disconnect();
  });


describe('Tests POST /sign-up', () => {

    it('Should return an error if submitted user format is invalid', async () => {
        const body = {
            email: "augusto@gmail.com"
        };

        const result = await supertest(app).post('/sign-up').send(body);

        expect(result.status).toBe(400);
    });

    it.todo('Should return an error if user already exists');

    it.todo('should return a sucess status code if input user format is correct');
});

describe('Tests POST /sign-in', () => {

    it.todo('Should return an error if user format is invalid');

    it.todo('Should return an error if user password is incorrect');

    it.todo('Should return an error if user doesnt exist on database');

    it.todo('Should return a success status code and return a JWT token if user credentials are correct');
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