import { readJson, writeJson } from '../util/dataJson';
import { bookingFile } from '../util/fileNames';
import { Booking } from '../interfaces/Booking';


const bookingData = readJson(bookingFile) as Booking[];

export const fetchAllBookings = (): Booking[] => {
    return bookingData;
}

export const fetchSingleBooking = (id: number): Booking => {
    const booking = bookingData.find(booking => booking.id === id) || {} as Booking;
    return booking;
}

export const createBooking = (data: Booking): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === data.id);
    if (data !== undefined && bookingExists === -1) {
        bookingData.push(data);
        writeJson(bookingFile, bookingData);
        return "Booking created correctly";
    }

    return "Error creating booking";
}

export const editBooking = (id: number, data: Booking): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === id);
    if (data !== undefined && bookingExists !== -1) {
        bookingData[bookingExists] = { ...bookingData[bookingExists], ...data };
        writeJson(bookingFile, bookingData);
        return "Booking edited correctly";
    }

    return "Error editing booking";
}

export const deleteBooking = (id: number): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === id);
    if (bookingExists !== -1) {
        bookingData.splice(bookingExists, 1);
        writeJson(bookingFile, bookingData);
        return "Booking deleted correctly";
    }

    return "Error deleted booking";
}