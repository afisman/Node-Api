import { Schema, model } from "mongoose";

export interface RoomInterface {
    photos: string[]
    room_type: string
    room_number: string
    description: string
    offer: string
    room_floor: string
    rate: number
    discount: string
    amenities: string[]
    status: string
}

const roomSchema = new Schema<RoomInterface>({
    photos: { type: [String], required: true },
    room_type: { type: String, required: true },
    room_number: { type: String, required: true },
    description: { type: String, required: true },
    offer: { type: String, required: true },
    room_floor: { type: String, required: true },
    rate: { type: Number, required: true },
    discount: { type: String, required: true },
    amenities: { type: [String], required: true },
    status: { type: String, required: true },
},
    {
        timestamps: true,
    })

export const Room = model<RoomInterface>('room', roomSchema)