import * as testRepo from "../repositories/testRepository";
import { ITestData } from "../types/testTypes";

export async function uploadNewTest(testData: ITestData) {
    return testRepo.insertNewTest(testData);
}