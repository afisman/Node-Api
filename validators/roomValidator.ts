import Joi from "joi";
import { RoomInterface } from '../interfaces/Room';
import { AppError } from "../Class/AppError";
import { NextFunction, Request, Response } from "express";

const roomSchema = Joi.object<RoomInterface>({
    photos: Joi.array().items(Joi.string()).required(),
    room_type: Joi.string().required(),
    room_number: Joi.string().required(),
    description: Joi.string().required(),
    offer: Joi.string().required(),
    room_floor: Joi.string().required(),
    rate: Joi.number().integer().required(),
    discount: Joi.number().integer().min(0).max(99).required(),
    amenities: Joi.array().items(Joi.string()).required(),
    status: Joi.string().required()
})

export const validateRoom = (req: Request, _res: Response, next: NextFunction) => {
    const roomData = req.body;

    const { error } = roomSchema.validate(roomData, { abortEarly: false });

    if (error) {
        return new AppError({ status: 400, message: error.details[0].message });
    };

    next();
}
