import express, { Express, Response, Request } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';
import { loginController } from './controllers/login';



export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);

