import supertest from "supertest";
import {prisma} from '../src/config/database';
import app from '../src/app';

afterAll(async () => {
    await prisma.$disconnect();
  });


describe('Tests POST /sign-up', () => {

    it('Should return 403, if submitted user format is invalid', async () => {
        const body = {
            email: "augusto@gmail.com"
        };

        const result = await supertest(app).post('/sign-up').send(body);

        expect(result.status).toBe(403);
    });
});