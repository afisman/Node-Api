
import { AppError } from '../class/AppError';
import { Booking, BookingInterface } from '../interfaces/Booking';


export const fetchAllBookings = async (): Promise<BookingInterface[]> => {
    try {
        console.log('En el fetch, async')
        return await Booking.find().populate("room");
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const fetchSingleBooking = async (id: any): Promise<BookingInterface | null> => {
    try {
        return await Booking.findById(id).populate(["room"]);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const createBooking = async (data: BookingInterface): Promise<BookingInterface> => {
    try {
        const newBooking = new Booking(data);
        await newBooking.save();
        return newBooking.populate(["room"]);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const editBooking = async (id: any, data: BookingInterface): Promise<BookingInterface | null> => {
    try {
        return await Booking.findByIdAndUpdate(id, data, { new: true }).populate(["room"]);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const deleteBooking = async (id: any): Promise<BookingInterface | null> => {
    try {
        console.log(id)
        return await Booking.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}