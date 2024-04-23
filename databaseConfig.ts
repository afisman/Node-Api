import mongoose from "mongoose";
// import { Connection } from "mysql2";
import mysql from 'mysql2/promise';

const dotenv = require('dotenv');

dotenv.config();



export async function mongoConnect(host = null) {

    const MONGODB = host ? host : process.env.MONGODB_URI!;

    mongoose
        .connect(MONGODB)
        .then((x) => {
            console.log(
                `Connected to Mongo! Database name: "${x.connections[0].name}"`
            );
        })
        .catch((err) => {
            console.error("Error connecting to mongo: ", err);
        });
};

const SQL_USER: string = process.env.SQL_USERNAME as string;
const SQL_PASSWORD: string = process.env.SQL_PASSWORD as string;
const SQL_DATABASE: string = process.env.DB_NAME as string;
const HOST: string = process.env.HOST as string;

const pool = mysql.createPool({
    host: HOST,
    user: SQL_USER,
    database: SQL_DATABASE,
    password: SQL_PASSWORD
});

export async function sqlConnect() {
    return await pool.getConnection();
}

export function sqlDisconnect(connection: mysql.PoolConnection) {
    pool.releaseConnection(connection);
}