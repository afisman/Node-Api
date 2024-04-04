import express, { NextFunction, Request, Response } from 'express';
import { createBooking, deleteBooking, editBooking, fetchAllBookings, fetchSingleBooking } from '../services/booking';
import { authenticateToken } from '../middleware/auth';

export const bookingController = express.Router();

bookingController.get("/", async (_req: Request, res: Response) => {
    try {
        res.json(fetchAllBookings());
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(fetchSingleBooking(Number(id)));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.post("/create", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {

    try {
        res.json(createBooking(req.body));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.put("/edit/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(editBooking(Number(id), req.body));
    } catch (error) {
        console.error()
    }

})

bookingController.delete("/delete/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(deleteBooking(Number(id)));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})