import express, { NextFunction, Request, Response } from 'express';
import { login } from '../services/login';
import { generateAccessToken } from '../middleware/auth';

export const loginController = express.Router();

loginController.get("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const loginAccepted = await login({ username: username, password: password });
    if (loginAccepted === true) {
        const authToken = generateAccessToken(username);
        res.json(authToken);
    }
})

