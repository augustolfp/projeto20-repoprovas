import * as testRepo from "../repositories/testRepository";
import { ITestData } from "../types/testTypes";

export async function uploadNewTest(testData: ITestData) {
    return await testRepo.insertNewTest(testData);
}

export async function getTests() {
    const tests = await testRepo.getAllTests();
    return tests;
}