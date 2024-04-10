import mongoose from "mongoose";
import { Room } from "../interfaces/Room";
import { faker } from '@faker-js/faker';

import { mongoConnect } from "../mongoConfig";

export const roomsSeedDB = async () => {
    try {

        await Room.collection.drop();

        const amenities_list = ['Breakfast', 'Smart Security', 'Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near', 'Terrace', 'Double Bed', 'Room Service'];

        for (let i = 0; i < 15; i++) {
            const offer = faker.helpers.arrayElement(["Yes", "No"])

            const document = new Room({
                photos: [faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' })],
                room_type: faker.helpers.arrayElement(["Single Room", "Double Room", "Deluxe Superior", "Suite"]),
                room_number: faker.lorem.word() + '-' + faker.number.int({ max: 500 }),
                description: faker.lorem.paragraph(2),
                offer: offer,
                room_floor: faker.number.int({ max: 21 }),
                rate: faker.commerce.price({ min: 5000, max: 35000 }),
                discount: offer === "YES" ? faker.number.int({ min: 10, max: 50 }).toString() : '0',
                amenities: faker.helpers.arrayElements(amenities_list, { min: 1, max: amenities_list.length }),
                status: "Available"
            })
            await document.save();
        }

    } catch (err) {
        console.log(err);
    }
}

