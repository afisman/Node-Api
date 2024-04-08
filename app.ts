import express, { Express, Response, Request, NextFunction } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';
import { loginController } from './controllers/login';
import { pageController } from './controllers/page';
import { mongoConnect } from './mongoConfig';


export const app: Express = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoConnect();

app.use("/login", loginController);
app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);

app.use("/", pageController);

app.use((error: Error, _req: Request, _res: Response, _next: NextFunction): any => {
    console.error(error)

})





