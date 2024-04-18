import { Schema, model } from "mongoose";

export interface BookingInterface {
    name: string;
    order_date: number;
    check_in: number;
    hour_check_in: string;
    check_out: number;
    hour_check_out: string;
    discount: number;
    room: { _id: string };
    special_request: string | undefined;
    status: string;
}

const bookingSchema = new Schema<BookingInterface>({
    name: { type: String, required: true },
    order_date: { type: Number, required: true },
    check_in: { type: Number, required: true },
    hour_check_in: { type: String, required: true },
    check_out: { type: Number, required: true },
    hour_check_out: { type: String, required: true },
    discount: { type: Number, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    special_request: { type: String, required: true },
    status: { type: String, required: true },
},
    {
        timestamps: true,
    })

export const Booking = model<BookingInterface>('booking', bookingSchema);