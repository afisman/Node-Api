import Joi from "joi";
import { ContactInterface } from "../interfaces/Contact";
import { AppError } from "../Class/AppError";
import { NextFunction, Request, Response } from "express";

const contactScheme = Joi.object<ContactInterface>({
    image: Joi.string().required(),
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    date: Joi.date().iso().required(),
    message: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    is_read: Joi.boolean().required()
})

export const validateContact = (req: Request, _res: Response, next: NextFunction) => {
    const contactData = req.body;

    const { error } = contactScheme.validate(contactData, { abortEarly: false });

    if (error) {
        return new AppError({ status: 400, message: error.details[0].message });
    };

    next();
}