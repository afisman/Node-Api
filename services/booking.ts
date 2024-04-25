
import { AppError } from '../class/AppError';
import { Booking, BookingInterface } from '../interfaces/Booking';
import { sqlQuery } from '../util/queries';
import { findAllBookingsQuery, findOneBookingQuery } from '../util/queryArgs';


export const fetchAllBookings = async (): Promise<BookingInterface[]> => {
    const bookings = await sqlQuery(findAllBookingsQuery);
    return bookings;
    // const bookings = await Booking.find().populate('room');
    // if (bookings === null) {
    //     throw new AppError({ status: 404, message: "Bookings not found" });
    // }
    // return bookings;
}

export const fetchSingleBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await sqlQuery(findOneBookingQuery, [id]);
    console.log(booking)
    return booking;
    // const booking = await Booking.findById(id).populate('room');
    // if (booking === null) {
    //     throw new AppError({ status: 404, message: "Booking not found" });
    // }
    // return booking;
}

export const createBooking = async (data: BookingInterface): Promise<BookingInterface> => {
    console.log(data)
    const createBooking = await sqlQuery(`
    INSERT INTO booking
        (name, order_date, check_in, check_out, hour_check_in, hour_check_out, discount, special_request, status, room)
        VALUES (?,?,?,?,?,?,?,?,?,?)
    `, [
        data.name,
        new Date(data.order_date).toISOString().slice(0, 19),
        new Date(data.check_in).toISOString().slice(0, 19),
        new Date(data.check_out).toISOString().slice(0, 19),
        data.hour_check_in,
        data.hour_check_out,
        Number(data.discount),
        data.special_request,
        data.status,
        data.room
    ]);
    console.log(createBooking);
    return createBooking;
    // const newBooking = await Booking.create(data);
    // if (newBooking === null) {
    //     throw new AppError({ status: 404, message: "Booking could not be created" });
    // }
    // return newBooking;
}

export const editBooking = async (id: any, data: BookingInterface): Promise<BookingInterface | null> => {

    const keys: string[] = [];
    const values: any[] = [];

    for (let property in data) {
        keys.push(property);
        if (property === 'check_in' || property == 'check_out' || property === 'order_date') {
            values.push(new Date(data[property]).toISOString().slice(0, 19));
        } else if (property === 'discount') {
            values.push(Number(data[property]));
        } else {
            values.push(data[property as keyof BookingInterface]);
        }
    }

    const updateColumn: string = keys
        .map((key: string) => `${key} = ?`)
        .join(", ");

    const updateBooking = await sqlQuery(
        `
    UPDATE booking
    set ${updateColumn}
    WHERE _id=?
    `,
        [...values, id]
    );

    return updateBooking;
    // const booking = await Booking.findByIdAndUpdate(id, data, { new: true }).populate('room');
    // if (booking === null) {
    //     throw new AppError({ status: 404, message: "Booking not found" });
    // }
    // return booking;
}

export const deleteBooking = async (id: any): Promise<BookingInterface | null> => {
    const booking = await sqlQuery(`
     DELETE FROM booking
        WHERE _id=?`,
        [id]);
    return booking;
    // const booking = await Booking.findByIdAndDelete(id);
    // if (booking === null) {
    //     throw new AppError({ status: 404, message: "Booking not found" });
    // }
    // return booking;
}