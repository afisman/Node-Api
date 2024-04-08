import { Schema, model } from "mongoose";

export interface UserInterface {
    full_name: string
    contact: string
    email: string
    photo: string
    start_date: string
    description: string
    status: string
    position: string,
    password: string
}

const userSchema = new Schema<UserInterface>({
    full_name: { type: String },
    contact: { type: String },
    email: { type: String },
    photo: { type: String },
    start_date: { type: String },
    description: { type: String },
    status: { type: String },
    position: { type: String, enum: ['Manager', 'Reception', 'Room Service'] },
    password: { type: String },
})

export const User = model<UserInterface>('user', userSchema)