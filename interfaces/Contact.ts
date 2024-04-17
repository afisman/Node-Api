import { Schema, model } from "mongoose";


export interface ContactInterface {
    image: string;
    full_name: string;
    email: string;
    phone: string;
    date: number;
    message: string;
    rating: number;
    read: boolean;
}

const contactSchema = new Schema<ContactInterface>({
    image: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Number, required: true },
    message: { type: String, required: true },
    rating: { type: Number, required: true },
    read: { type: Boolean, required: true },
},
    {
        timestamps: true,
    })

export const Contact = model<ContactInterface>('contact', contactSchema);