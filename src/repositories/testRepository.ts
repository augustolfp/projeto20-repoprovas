import { prisma } from "../config/database";
import { ITestData } from "../types/testTypes";

export async function insertNewTest(testData: ITestData) {
    return await prisma.tests.create({data: testData});
}