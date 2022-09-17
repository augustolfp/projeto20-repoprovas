import Joi from "joi";
import { ITestData } from "../types/testTypes";

export const newTestSchema = Joi.object<ITestData>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().integer().required(),
    teacherDisciplineId: Joi.number().integer().required()
});