import express, { NextFunction, Request, Response } from 'express';
import { login } from '../services/login';
import { generateAccessToken } from '../middleware/auth';

export const loginController = express.Router();

loginController.get("/", async (_req: Request, res: Response) => {
    const authToken = generateAccessToken('Aleftau')
    res.json(authToken);
})

