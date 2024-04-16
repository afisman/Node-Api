import express, { Request, Response } from "express";
import path from 'path';


export const pageController = express.Router();

pageController.get('/', (_req: Request, res: Response) => {
    try {
        res.sendFile(path.resolve(process.cwd(), 'index.html'));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json(error);
    }
});