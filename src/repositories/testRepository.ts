import { prisma } from "../config/database";
import { ITestData } from "../types/testTypes";

export async function insertNewTest(testData: ITestData) {
    return await prisma.tests.create({data: testData});
}

export async function getTestsByCategory() {
    return await prisma.categories.findMany({
        include: {
            tests: true 
        }
    });
}

export async function getAllTests() {

    const tests = await prisma.$queryRaw`
        SELECT
            ter.number AS "termNumber",
            tst.id AS "testId",
            tst.name AS "testName",
            cat.name AS "categoryName",
            dis.name AS "disciplineName"
        FROM tests tst
            JOIN "categories" cat ON cat.id = tst."categoryId"
            JOIN "teachersDisciplines" ON "teachersDisciplines".id = tst."teacherDisciplineId"
            JOIN "disciplines" dis ON dis.id = "teachersDisciplines"."disciplineId"
            JOIN "terms" ter ON ter.id = dis."termId"
        `
    return tests;
}