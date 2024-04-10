import mongoose from "mongoose";

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
}