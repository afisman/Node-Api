import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { roomCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';
import { PoolConnection } from "mysql2/promise";


export async function roomsSQLSeed(currentConnection: PoolConnection) {
    try {
        let query = `INSERT INTO room 
            (room_type,room_number,description,offer,room_floor,rate,discount,status)
            VALUES `

        for (let i = 0; i < 15; i++) {
            const offer = faker.helpers.arrayElement(["YES", "NO"]);
            const discount = offer === "YES" ? faker.number.int({ min: 1, max: 99 }) : 0;

            query += `("${faker.helpers.arrayElement(["Single Room", "Double Room", "Deluxe Superior", "Suite"])}",
                    "${faker.lorem.word() + '-' + faker.number.int({ max: 255 })}",
                    "${faker.lorem.paragraph(2)}",
                    "${offer}",
                    "${faker.number.int({ max: 21 })}",
                    "${faker.commerce.price({ min: 5000, max: 35000 })}",
                    "${discount}",
                    "${faker.helpers.arrayElement(["Available", "Booked"])}")`;

            if (i !== 14) {
                query += ", \n";
            } else {
                query += "; \n";
            }
        }
        await currentConnection.query(query)
    } catch (error) {
        console.error(error);
    }
};

