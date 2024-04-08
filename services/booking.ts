
import { Booking, BookingInterface } from '../interfaces/Booking';

export const fetchAllBookings = async (): Promise<BookingInterface[]> => {
    return await Booking.find().populate(["room"]);
}

export const fetchSingleBooking = async (id: any): Promise<BookingInterface | null> => {
    return await Booking.findById(id).populate(["room"]);
}

export const createBooking = async (data: BookingInterface): Promise<BookingInterface> => {
    const newBooking = new Booking(data);
    await newBooking.save();
    return newBooking.populate(["room"]);
}

export const editBooking = async (id: any, data: BookingInterface): Promise<BookingInterface | null> => {
    return await Booking.findByIdAndUpdate(id, data, { new: true }).populate(["room"]);
}

export const deleteBooking = async (id: any): Promise<BookingInterface | null> => {
    return await Booking.findByIdAndDelete(id).lean();
}