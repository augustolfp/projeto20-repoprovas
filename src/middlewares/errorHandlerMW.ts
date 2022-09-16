import { NextFunction, Request, Response } from "express";

export default function errorHandlerMW(err: Error | any, req: Request, res: Response, next: NextFunction) {
    function errorTypeToStatusCode(errorType: string) {
        if(errorType === "error_email_already_used") return 403;
        if(errorType === "error_wrong_credentials") return 401;

        return 400;
    }

    if(err.type) {
        return res.status(errorTypeToStatusCode(err.type)).send(err.message);
    }

    return res.sendStatus(500);
}