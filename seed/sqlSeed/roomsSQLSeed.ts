import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { roomCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';


async function roomsSQLSeed() {
    let currentConnection;
    try {
        currentConnection = await sqlConnect();

        // await dropQuery(currentConnection);

        await currentConnection.query(roomCreateQuery);

        for (let i = 0; i < 15; i++) {
            const offer = faker.helpers.arrayElement(["YES", "NO"]);

            const roomInsert = await currentConnection.query(`
            INSERT INTO room 
            (room_type,room_number,description,offer,room_floor,rate,discount,status)
            VALUES (?,?,?,?,?,?,?,?)`
                , [
                    faker.helpers.arrayElement(["Single Room", "Double Room", "Deluxe Superior", "Suite"]),
                    faker.lorem.word() + '-' + faker.number.int({ max: 255 }),
                    faker.lorem.paragraph(2),
                    offer,
                    faker.number.int({ max: 21 }),
                    faker.commerce.price({ min: 5000, max: 35000 }),
                    offer === "Yes" ? faker.number.int({ min: 1, max: 99 }) : 0,
                    faker.helpers.arrayElement(["Available", "Booked"])
                ]
            );

        }
    } catch (error) {
        console.log(error);
    } finally {
        currentConnection?.release();
        exit(1);
    }
};

roomsSQLSeed();