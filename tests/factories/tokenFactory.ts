import userFactory from "./userFactory";
import supertest from "supertest";
import app from "../../src/app";

export default async function tokenFactory() {
    const user = await userFactory();
    await supertest(app).post('/sign-up').send(user);
    const result = await supertest(app).post('/sign-in').send(user);
    const token = 'Bearer ' + result.text;

    return token;
}