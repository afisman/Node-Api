import mongoose from "mongoose";
import { faker } from '@faker-js/faker';

import { mongoConnect } from "../mongoConfig";
import { User } from "../interfaces/User";
import { hashPassword } from "../util/bcryptUtil";

export const usersSeedDB = async () => {
    try {
        await User.collection.drop();

        for (let i = 0; i < 15; i++) {

            const rawPassword = faker.internet.password({ length: 10, memorable: true });
            const hashedPassword = hashPassword(rawPassword);

            const document = new User({
                full_name: faker.person.fullName(),
                contact: faker.phone.number().toString(),
                email: faker.internet.email(),
                photo: faker.image.avatar(),
                start_date: faker.date.past({ years: 10, refDate: '2024-04-01' }),
                description: faker.lorem.paragraph(2),
                status: true,
                position: faker.helpers.arrayElement(["Manager", "Reception", "Room Service"]),
                password: hashedPassword
            })
            console.log(rawPassword)
            await document.save();
        }

    } catch (err) {
        console.log(err);
    }
}
