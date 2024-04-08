import express, { Express, Response, Request, NextFunction } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';
import { loginController } from './controllers/login';
import { pageController } from './controllers/page';
import mongoose from "mongoose";

const dotenv = require('dotenv');

dotenv.config();
const MONGODB = process.env.MONGODB_URI || 'mongodb://127.0.0.1/miranda-dashboard-DB'


export const app: Express = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/login", loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);

app.use("/", pageController);

app.use((error: Error, _req: Request, _res: Response, _next: NextFunction): any => {
    console.error(error)

})





