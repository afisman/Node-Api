import express, { NextFunction, Request, Response } from 'express';
import { login } from '../services/login';
import { AppError } from '../class/AppError';
import { generateAccessToken } from '../util/generateAccessToken';


export const loginController = express.Router();

loginController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const loginAccepted = await login({ email: email, password: password });
        if (loginAccepted === true) {
            const authToken = generateAccessToken(email);
            res.json(authToken);
        } else {
            throw new AppError({ status: 401, message: "The user is unauthorized" });
        }
    } catch (error) {
        next(error);
    }
})

