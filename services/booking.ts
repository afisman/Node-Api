import { readJson, writeJson } from '../util/dataJson';
import { bookingFile } from '../util/fileNames';
import { Booking } from '../interfaces/Booking';
import { deleteOcurrence } from '../util/deleteOcurrence';


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
    console.log(data, id)
    if (data !== undefined && bookingExists !== -1) {
        bookingData[bookingExists] = { ...bookingData[bookingExists], ...data }
        writeJson(bookingFile, bookingData);
        console.log(bookingData)
        return "Booking edited correctly";
    }

    return "Error editing booking";
}

export const deleteBooking = (id: number): string => {
    const bookingExists = bookingData.findIndex(booking => booking.id === id);
    if (bookingExists !== -1) {
        const newBookingData = deleteOcurrence(bookingData, bookingData[bookingExists].id)
        writeJson(bookingFile, newBookingData);
        return "Booking deleted correctly";
    }

    return "Error deleted booking";
}