import express, { NextFunction, Request, Response } from 'express';
import { createBooking, deleteBooking, editBooking, fetchAllBookings, fetchSingleBooking } from '../services/booking';
import { validateBooking } from '../validators/bookingValidator';

export const bookingController = express.Router();

bookingController.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const bookings = await fetchAllBookings();
        res.json(bookings);
    } catch (error) {
        next(error);
    }
})

bookingController.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const booking = await fetchSingleBooking(id);
        res.json(booking);
    } catch (error) {
        next(error);
    }
})

bookingController.post("/", validateBooking, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newBooking = await createBooking(req.body);
        res.json(newBooking);
    } catch (error) {
        next(error);
    }
})

bookingController.put("/:id", validateBooking, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const bookingToEdit = await editBooking(id, req.body);
        res.json(bookingToEdit);
    } catch (error) {
        next(error);
    }

})

bookingController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const bookingToDelete = await deleteBooking(id);
        res.json(bookingToDelete);
    } catch (error) {
        next(error);
    }
})