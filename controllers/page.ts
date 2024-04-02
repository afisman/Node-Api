import express, { Request, Response } from "express";
import path from 'path';


export const pageController = express.Router();

pageController.get('/', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});