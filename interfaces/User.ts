import { Schema, model } from "mongoose";

export interface UserInterface {
    id: number
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
    id: { type: Number, required: true },
    full_name: { type: String },
    contact: { type: String },
    email: { type: String },
    photo: { type: String },
    start_date: { type: String },
    description: { type: String },
    status: { type: String },
    position: { type: String },
    password: { type: String },
})