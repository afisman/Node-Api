import { faker } from '@faker-js/faker';
import { Booking } from "../interfaces/Booking";
import { Room } from "../interfaces/Room";


export const bookingsSeedDB = async () => {
    try {

        const roomArray = await Room.find();

        await Booking.collection.drop();

        const checkIn = faker.date.soon({ days: 365, refDate: '2024-04-01' })
        const checkOut = faker.date.soon({ days: 30, refDate: new Date(checkIn) })
        for (let i = 0; i < 15; i++) {
            const arrayIndex = Math.floor(Math.random() * (roomArray.length - 1));

            const document = new Booking({
                name: faker.person.fullName(),
                order_date: faker.date.past(),
                check_in: checkIn.getTime(),
                hour_check_in: faker.date.soon().toLocaleTimeString(),
                check_out: checkOut.getTime(),
                hour_check_out: faker.date.soon().toLocaleTimeString(),
                room: roomArray[arrayIndex],
                discount: faker.number.int({ min: 1, max: 99 }),
                special_request: faker.lorem.paragraph(3),
                status: faker.helpers.arrayElement(["Check In", "Check Out"])
            });
            await document.save();
        }
    } catch (err) {
        console.log(err);
    }
}


