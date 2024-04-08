import mongoose from "mongoose";
import { Room } from "../interfaces/Room";
import { faker } from '@faker-js/faker';

import { mongoConnect } from "../mongoConfig";

async function seedDB() {
    try {
        await mongoConnect()

        await Room.collection.drop();

        for (let i = 0; i < 15; i++) {
            const offer = faker.helpers.arrayElement(["YES", "NO"])

            const document = new Room({
                photos: [faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }), faker.image.urlLoremFlickr({ category: 'hotel,bedroom' })],
                room_type: faker.helpers.arrayElement(["Single Room", "Double Room", "Deluxe Superior", "Suite"]),
                room_number: faker.lorem.word() + '-' + faker.number.int({ max: 500 }),
                description: faker.lorem.paragraph(2),
                offer: offer,
                room_floor: faker.lorem.word(),
                rate: faker.commerce.price({ min: 5000, max: 35000 }),
                discount: offer === "YES" ? faker.number.int({ min: 10, max: 50 }).toString() : '0',
                amenities: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
                status: "Available"
            })
            await document.save();
        }




    } catch (err) {
        console.log(err);
    } finally {
        await mongoose.disconnect();
    }
}

seedDB();