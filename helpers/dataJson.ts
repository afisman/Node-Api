import fs from 'fs';
import { BookingInterface } from '../interfaces/Booking';
import { RoomInterface } from '../interfaces/Room';
import { ContactInterface } from '../interfaces/Contact';
import { UserInterface } from '../interfaces/User';

export const readJson = (file: string): BookingInterface[] | RoomInterface[] | ContactInterface[] | UserInterface[] => {
    const data = fs.readFileSync(file).toString();
    return JSON.parse(data)
}

export const writeJson = (file: string, data: BookingInterface[] | RoomInterface[] | ContactInterface[] | UserInterface[]): void => {
    const writeText = JSON.stringify(data);
    fs.writeFileSync(file, writeText);
}