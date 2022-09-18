import { object } from "joi";
import { prisma } from "../config/database";
import { ITestData, UniqueTest } from "../types/testTypes";

export async function insertNewTest(testData: ITestData) {
    return await prisma.tests.create({data: testData});
}

export async function getAllTests() {

    const tests = await prisma.$queryRaw`
        SELECT
            ter.number AS "termNumber",
            dis.name AS "disciplineName",
            tea.name AS "teacherName",
            cat.name AS "categoryName",
            tst.id AS "testId",
            tst.name AS "testName"
        FROM tests tst
            JOIN "categories" cat ON cat.id = tst."categoryId"
            JOIN "teachersDisciplines" ON "teachersDisciplines".id = tst."teacherDisciplineId"
            JOIN "teachers" tea ON tea.id = "teachersDisciplines"."teacherId" 
            JOIN "disciplines" dis ON dis.id = "teachersDisciplines"."disciplineId"
            JOIN "terms" ter ON ter.id = dis."termId"
        `
    return tests;
}

export async function getTestById(testId: number) {
    const getTest = await prisma.$queryRaw<UniqueTest[]>`
            SELECT
            ter.number AS "termNumber",
            dis.name AS "disciplineName",
            tea.name AS "teacherName",
            cat.name AS "categoryName",
            tst.id AS "testId",
            tst.name AS "testName",
            tst."pdfUrl" AS "pdfUrl"
        FROM tests tst
            JOIN "categories" cat ON cat.id = tst."categoryId"
            JOIN "teachersDisciplines" ON "teachersDisciplines".id = tst."teacherDisciplineId"
            JOIN "teachers" tea ON tea.id = "teachersDisciplines"."teacherId" 
            JOIN "disciplines" dis ON dis.id = "teachersDisciplines"."disciplineId"
            JOIN "terms" ter ON ter.id = dis."termId"
        WHERE tst.id = ${testId}
    `

    return getTest[0];
}