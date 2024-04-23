import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

import { mongoConnect } from "../databaseConfig";
import { Contact } from "../interfaces/Contact";

export const contactsSeedDB = async () => {
    try {

        await Contact.collection.drop();

        for (let i = 0; i < 15; i++) {

            const document = new Contact({
                image: faker.image.avatar(),
                full_name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                date: faker.date.past({ years: 1, refDate: '2024-04-01' }),
                message: faker.lorem.paragraphs(2),
                rating: faker.number.int({ min: 1, max: 5 }),
                read: false
            })
            await document.save();
        }
    } catch (err) {
        console.log(err);
    }
}

