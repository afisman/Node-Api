import mongoose from "mongoose";

const dotenv = require('dotenv');

dotenv.config();

const MONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/miranda-dashboard-DB'

export async function mongoConnect() {

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