import { Schema, model } from "mongoose";

export interface BookingInterface {
    id: number;
    name: string;
    order_date: string;
    check_in: string;
    hour_check_in: string;
    check_out: string;
    hour_check_out: string;
    rate: string;
    room: { id: number };
    special_request: string | undefined;
    status: string;
}

const bookingSchema = new Schema<BookingInterface>({
    name: { type: String, required: true },
    order_date: { type: String, required: true },
    check_in: { type: String, required: true },
    hour_check_in: { type: String, required: true },
    check_out: { type: String, required: true },
    hour_check_out: { type: String, required: true },
    rate: { type: String, required: true },
    room: { type: Schema.Types.ObjectId, ref: 'room', required: true },
    special_request: { type: String, required: true },
    status: { type: String, required: true },
},
    {
        timestamps: true,
    })

export const Booking = model<BookingInterface>('booking', bookingSchema);