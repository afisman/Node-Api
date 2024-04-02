import express, { NextFunction, Request, Response } from 'express';
import { createBooking, deleteBooking, editBooking, fetchAllBookings, fetchSingleBooking } from '../services/booking';


export const bookingController = express.Router();

bookingController.get("/", async (_req: Request, res: Response) => {
    res.json(fetchAllBookings());
})

bookingController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(fetchSingleBooking(Number(id)));
})

bookingController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    res.json(createBooking(req.body));
})

bookingController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(editBooking(Number(id), req.body));
})

bookingController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(deleteBooking(Number(id)));
})