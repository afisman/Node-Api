import Joi from "joi";
import { BookingInterface } from "../interfaces/Booking";
import { AppError } from "../class/AppError";
import { NextFunction, Request, Response } from "express";



const bookingSchema = Joi.object<BookingInterface>({
    name: Joi.string().required(),
    order_date: Joi.date().iso().required(),
    check_in: Joi.date().iso().required(),
    check_out: Joi.date().iso().required(),
    hour_check_in: Joi.string().required(),
    hour_check_out: Joi.string().required(),
    discount: Joi.number().integer().min(0).max(99),
    special_request: Joi.string().required(),
    status: Joi.string().required(),
    room: Joi.number().integer().required()
})

export const validateBooking = (req: Request, _res: Response, next: NextFunction) => {
    const bookingData = req.body;

    const { error } = bookingSchema.validate(bookingData, { abortEarly: false });

    if (error) {
        return new AppError({ status: 400, message: error.details[0].message });
    };

    next();
}

