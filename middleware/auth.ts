import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";


const dotenv = require('dotenv');
dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

const privateKey: Secret = process.env.TOKEN_SECRET || "";

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

export const generateAccessToken = (username: string) => {
    return jwt.sign(username, privateKey, { expiresIn: '1800s' });
}