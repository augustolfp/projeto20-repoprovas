import * as userRepo from "../repositories/userRepository";
import { IUserData } from "../types/userTypes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export async function loginUser(userData: IUserData) {
    const getUser = await userRepo.getUserByEmail(userData.email);

    if(!getUser?.email) {
        throw {type: "error_wrong_credentials", message: "Usuário ou senha inválidos!"};
    }

    if(!bcrypt.compareSync(userData.password, getUser.password)) {
        throw {type: "error_wrong_credentials", message: "Usuário ou senha inválidos!"};
    }

    const token = jwt.sign({
        userId: getUser.id,
        email: getUser.email
    }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
    });

    return token;
}