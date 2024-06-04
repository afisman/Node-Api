import Joi from "joi";
import { UserInterface } from "../interfaces/User";
import { AppError } from "../Class/AppError";
import { NextFunction, Request, Response } from "express";

const userSchema = Joi.object<UserInterface>({
    full_name: Joi.string().required(),
    contact: Joi.string().required(),
    email: Joi.string().required(),
    photo: Joi.string().required(),
    start_date: Joi.date().iso().required(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    position: Joi.string().required(),
    password: Joi.string().allow("")
})

export const validateUser = (req: Request, _res: Response, next: NextFunction) => {
    const userData = req.body;

    const { error } = userSchema.validate(userData, { abortEarly: false });

    if (error) {
        return new AppError({ status: 400, message: error.details[0].message });
    };

    next();
}