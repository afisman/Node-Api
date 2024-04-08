import mongoose from "mongoose";

const dotenv = require('dotenv');

dotenv.config();

const MONGODB = process.env.MONGODB_URI || 'mongodb://0.0.0.0:2017/'

export async function mongoConnect() {
    console.log('conectando en mongo')
    // try {
    //     return await mongoose.connect(MONGODB);
    // } catch (error) {
    //     console.error(error);
    //     setTimeout(mongoConnect, 5000);

    //     return null;
    // }

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