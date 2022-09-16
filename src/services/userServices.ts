import * as userRepo from "../repositories/userRepository";
import { IUserData } from "../types/userTypes";
import bcrypt from "bcrypt";

export async function createNewUser(userData: IUserData) {
    const emailCheck = await userRepo.getUserByEmail(userData.email);

    if(emailCheck?.email) {
        throw {type: "error_email_already_used", message: "Email já cadastrado na plataforma!"};
    }

    const passwordHash = bcrypt.hashSync(userData.password, 10);

    const newUser = {
        email: userData.email,
        password: passwordHash
    }

    await userRepo.insertNewUser(newUser);
    return "Usuário criado com sucesso!";
}