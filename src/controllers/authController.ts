import { Request, Response } from "express";
import * as userServices from "../services/userServices";
import { IUserData } from "../types/userTypes";

export async function signUp(req: Request, res: Response) {
    const user: IUserData = req.body;

    await userServices.createNewUser(user);
    return res.status(201).send("Usuário cadastrado com sucesso!");
}

