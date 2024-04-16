import express, { NextFunction, Request, Response } from 'express';
import { login } from '../services/login';
import { AppError } from '../class/AppError';
import { generateAccessToken } from '../util/generateAccessToken';


export const loginController = express.Router();

loginController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await login({ email: email, password: password });
        if (user) {
            const authToken = generateAccessToken(email);
            res.json({ token: authToken, email: user.email, full_name: user.full_name });
        } else {
            throw new AppError({ status: 401, message: "The user is unauthorized" });
        }
    } catch (error) {
        next(error);
    }
})

