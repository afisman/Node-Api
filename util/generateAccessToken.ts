import jwt, { Secret } from 'jsonwebtoken';

const dotenv = require('dotenv');
dotenv.config();

const privateKey: Secret = process.env.TOKEN_SECRET || "";

export const generateAccessToken = (username: string) => {
    return jwt.sign({ username: username }, privateKey, { expiresIn: 8640000 });
}