import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

const dotenv = require('dotenv');
dotenv.config();

const privateKey: Secret = process.env.TOKEN_SECRET || "";


export const generateAccessToken = (username: string) => {
    return jwt.sign({ username: username }, privateKey, { expiresIn: 8640000 });
}