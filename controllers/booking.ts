import express, { NextFunction, Request, Response } from 'express';
import { createBooking, deleteBooking, editBooking, fetchAllBookings, fetchSingleBooking } from '../services/booking';
import { authenticateToken } from '../middleware/auth';

export const bookingController = express.Router();

bookingController.get("/", async (_req: Request, res: Response) => {
    try {
        const bookings = await fetchAllBookings()
        res.json(bookings);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const booking = await fetchSingleBooking(id)
        res.json(booking);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {

    try {
        const newBooking = await createBooking(req.body)
        res.json(newBooking);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const bookingToEdit = editBooking(id, req.body)
        res.json(bookingToEdit);
    } catch (error) {
        console.error()
    }

})

bookingController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const bookingToDelete = deleteBooking(id)
        res.json(bookingToDelete);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})