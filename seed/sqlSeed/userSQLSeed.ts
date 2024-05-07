import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { userCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { hashPassword } from "../../util/bcryptUtil";
import { exit } from 'process';
import { PoolConnection } from "mysql2/promise";


export async function userSQLSeed(currentConnection: PoolConnection) {
    try {
        let query = `INSERT INTO employee 
            ( full_name, contact, email, photo, start_date, description, status, position, password)
            VALUES `

        for (let i = 0; i < 15; i++) {

            const rawPassword = faker.internet.password({ length: 10, memorable: true });
            const hashedPassword = hashPassword(rawPassword);
            const email = faker.internet.email()

            query += `(
                "${faker.person.fullName()}",
                "${faker.phone.number().toString()}",
                "${email}",
                "${faker.image.avatar()}",
                "${faker.date.past({ years: 10, refDate: '2024-04-01' }).toISOString().slice(0, 19)}",
                "${faker.lorem.paragraph(2)}",
                "${true}",
                "${faker.helpers.arrayElement(["Manager", "Reception", "Room Service"])}",
                "${hashedPassword}"
            )`;
            if (i !== 14) {
                query += ", \n";
            } else {
                query += "; \n";
            }
            console.log(email, rawPassword);
        }
        await currentConnection.query(query);
    } catch (error) {
        console.error(error);
    }
};
