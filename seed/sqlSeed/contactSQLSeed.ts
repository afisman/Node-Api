import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { contactCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';
import { PoolConnection } from "mysql2/promise";



export async function contactSQLSeed(currentConnection: PoolConnection) {
    try {
        let query = ` INSERT INTO contact 
            (image, full_name, email, phone, date, message, subject, rating, is_read)
            VALUES `
        for (let i = 0; i < 15; i++) {

            query += `("${faker.image.avatar()}",
                    "${faker.person.fullName()}",
                    "${faker.internet.email()}",
                    "${faker.phone.number()}",
                    "${faker.date.past({ years: 1, refDate: '2024-04-01' }).toISOString().slice(0, 19)}",
                    "${faker.lorem.paragraphs(2)}",
                    "${faker.lorem.words(2)}",
                    "${faker.number.int({ min: 1, max: 5 })}",
                    ${false}
                )`;
            if (i !== 14) {
                query += ", \n";
            } else {
                query += "; \n";
            }
        }
        await currentConnection.query(query);
    } catch (error) {
        console.error(error);
    }
};

