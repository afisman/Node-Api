import express, { NextFunction, Request, Response } from 'express';
import { login } from '../services/login';
import { generateAccessToken } from '../middleware/auth';
import { AppError } from '../class/AppError';

export const loginController = express.Router();

loginController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body;

        const loginAccepted = await login({ username: username, password: password });
        if (loginAccepted === true) {
            const authToken = generateAccessToken(username);
            res.json(authToken);
        } else {
            throw new AppError({ status: 401, message: "The user is unauthorized" });
        }
    } catch (error) {
        next(error);
    }
})

