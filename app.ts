import express, { Express, Response, Request, NextFunction } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';
import { loginController } from './controllers/login';
import { pageController } from './controllers/page';
import { mongoConnect } from './databaseConfig';
import { authenticateToken } from './middleware/auth';
import { AppError } from './Class/AppError';
import cors from 'cors';

export const app: Express = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'http://miranda-dashboard-afsmn.s3-website.eu-west-3.amazonaws.com']
}));

mongoConnect();

app.use("/login", loginController);
app.use("/", pageController);

app.use(authenticateToken);

app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);


app.use((error: any, _req: Request, res: Response, _next: NextFunction): any => {
    return res.json({ status: error.status || 500, message: error.status ? error.message : "Internal server error" });
    // throw new AppError({ status: error.status || 500, message: error.status ? error.message : "Internal server error" });
})





