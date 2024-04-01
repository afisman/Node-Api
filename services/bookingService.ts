import { readJson } from '../helpers/dataJson';
import { BookingInterface } from '../interfaces/Booking';

const bookingData: BookingInterface[] = readJson('../data/bookings.json');