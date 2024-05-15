
import { AppError } from '../class/AppError';
import { Booking, BookingInterface } from '../interfaces/Booking';
import { sqlQuery } from '../util/queries';


export const fetchAllBookings = async (): Promise<BookingInterface[]> => {
    const bookings = await Booking.find().populate('room');
    if (bookings === null) {
        throw new AppError({ status: 404, message: "Bookings not found" });
    }
    return bookings;
}

export const fetchSingleBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await Booking.findById(id).populate('room');
    if (booking === null) {
        throw new AppError({ status: 404, message: "Booking not found" });
    }
    return booking;
}

export const createBooking = async (data: BookingInterface): Promise<BookingInterface> => {
    const newBooking = await Booking.create(data);
    if (newBooking === null) {
        throw new AppError({ status: 404, message: "Booking could not be created" });
    }
    return newBooking;
}

export const editBooking = async (id: any, data: BookingInterface): Promise<BookingInterface | null> => {
    const booking = await Booking.findByIdAndUpdate(id, data, { new: true }).populate('room');
    if (booking === null) {
        throw new AppError({ status: 404, message: "Booking not found" });
    }
    return booking;
}

export const deleteBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await Booking.findByIdAndDelete(id);
    if (booking === null) {
        throw new AppError({ status: 404, message: "Booking not found" });
    }
    return booking;
}