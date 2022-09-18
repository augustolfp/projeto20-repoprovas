import { Request, Response } from "express";
import * as testServices from "../services/testServices";
import { ITestData } from "../types/testTypes";

export async function uploadTest(req: Request, res: Response) {
    const testData: ITestData = req.body;

    const uploadToDB = await testServices.uploadNewTest(testData);
    return res.status(201).send(uploadToDB);
}

export async function getTests(req: Request, res: Response) {
    const tests = await testServices.getTests();
    return res.status(200).send(tests);
}

export async function getTestById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const test = await testServices.getTestById(id);
    return res.status(200).send(test);
}