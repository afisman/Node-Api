import express, { Express, Response, Request } from 'express';
import { bookingController } from './controllers/booking';
import { roomController } from './controllers/room';
import { userController } from './controllers/user';
import { contactController } from './controllers/contact';


export const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.json();
})

app.use('/bookings', bookingController);
app.use('/rooms', roomController);
app.use('/users', userController);
app.use('/contact', contactController);

