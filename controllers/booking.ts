import express, { NextFunction, Request, Response } from 'express';
import { createBooking, deleteBooking, editBooking, fetchAllBookings, fetchSingleBooking } from '../services/booking';

export const bookingController = express.Router();

bookingController.get("/", async (_req: Request, res: Response) => {
    try {
        const bookings = await fetchAllBookings();
        res.json(bookings);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const booking = await fetchSingleBooking(id);
        res.json(booking);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.post("/", async (req: Request, res: Response, _next: NextFunction) => {

    try {
        const newBooking = await createBooking(req.body);
        res.json(newBooking);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

bookingController.put("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const bookingToEdit = await editBooking(id, req.body);
        res.json(bookingToEdit);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }

})

bookingController.delete("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    console.log(req.params.id)
    try {
        const bookingToDelete = await deleteBooking(id);
        res.json(bookingToDelete);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})