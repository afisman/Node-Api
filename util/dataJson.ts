import fs from 'fs';
import { Booking } from '../interfaces/Booking';
import { Room } from '../interfaces/Room';
import { Contact } from '../interfaces/Contact';
import { User } from '../interfaces/User';

// export const readJson = (file: string): Booking[] | Room[] | Contact[] | User[] => {
//     const data = fs.readFileSync(file).toString();
//     return JSON.parse(data)
// }

// export const writeJson = (file: string, data: Booking[] | Room[] | Contact[] | User[]): void => {
//     const writeText = JSON.stringify(data);
//     fs.writeFileSync(file, writeText);
// }