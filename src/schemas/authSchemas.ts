import Joi from "joi";
import { IUserData } from "../types/userTypes";

export const signUpSchema = Joi.object<IUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export const signInSchema = Joi.object<IUserData>({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});