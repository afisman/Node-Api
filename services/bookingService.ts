import { readJson, writeJson } from '../helpers/dataJson';
import { bookingFile } from '../helpers/fileNames';
import { BookingInterface } from '../interfaces/Booking';

const bookingData = readJson(bookingFile) as BookingInterface[];

export const fetchAllBookings = (): BookingInterface[] => {
    return bookingData;
}

export const fetchSingleBooking = (id: number): BookingInterface => {
    const booking = bookingData.find(booking => booking.id === id) || {} as BookingInterface;
    return booking;
}

export const createBooking = (data: BookingInterface): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === data.id);
    if (data !== undefined && bookingExists === -1) {
        bookingData.push(data);
        writeJson(bookingFile, bookingData);
        return "Booking created correctly";
    }

    return "Error creating booking";
}

export const editBooking = (id: number, data: BookingInterface): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === id);
    if (data !== undefined && bookingExists === -1) {
        bookingData.splice(bookingExists, 1, data);
        writeJson(bookingFile, bookingData);
        return "Booking edited correctly";
    }

    return "Error editing booking";
}

export const deleteBooking = (id: number): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === id);
    if (bookingExists === -1) {
        bookingData.splice(bookingExists, 1);
        writeJson(bookingFile, bookingData);
        return "Booking deleted correctly";
    }

    return "Error deleted booking";
}