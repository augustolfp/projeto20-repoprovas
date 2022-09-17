import { Request, Response } from "express";
import * as testServices from "../services/testServices";
import { ITestData } from "../types/testTypes";

export async function uploadTest(req: Request, res: Response) {
    const testData: ITestData = req.body;

    const uploadToDB = await testServices.uploadNewTest(testData);
    return res.status(201).send(uploadToDB);
}