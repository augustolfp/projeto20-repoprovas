import { Router } from "express";
import * as testController from "../controllers/testController";
import validateSchemaMW from "../middlewares/validateSchemaMW";
import { newTestSchema } from "../schemas/testSchemas";
import tokenValidationMW from "../middlewares/tokenValidationMW";

const testRouter = Router();

testRouter.post('/upload-test', tokenValidationMW, validateSchemaMW(newTestSchema), testController.uploadTest);

export default testRouter;