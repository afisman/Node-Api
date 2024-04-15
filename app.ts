import express, { Express, Response, Request, NextFunction } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';
import { loginController } from './controllers/login';
import { pageController } from './controllers/page';
import { mongoConnect } from './mongoConfig';
import { authenticateToken } from './middleware/auth';
import { AppError } from './class/AppError';
import cors from 'cors';



export const app: Express = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoConnect();

app.use("/login", loginController);
app.use("/", pageController);

app.use(authenticateToken);

app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);


app.use((error: any, _req: Request, _res: Response, _next: NextFunction): any => {
    throw new AppError({ status: error.status || 500, message: error.status ? error.message : "Internal server error" });
})





