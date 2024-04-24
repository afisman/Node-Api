import { faker } from "@faker-js/faker";
import { dropQuery, sqlQuery } from "../../util/queries";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';
import { PoolConnection } from "mysql2/promise";




export async function photosSQLSeed(currentConnection: PoolConnection) {
    try {
        const roomIds = await sqlQuery("Select _id FROM room");
        const rooms = roomIds.map((row: any) => row._id);

        let query = `INSERT INTO photo (url, room_id) VALUES `;

        for (let i = 0; i < rooms.length; i++) {
            let img1 = faker.image.urlLoremFlickr({ category: 'hotel,bedroom' });
            let img2 = faker.image.urlLoremFlickr({ category: 'hotel,bedroom' });
            let img3 = faker.image.urlLoremFlickr({ category: 'hotel,bedroom' });

            let photoQuery
            if (i !== (rooms.length - 1)) {
                photoQuery = `("${img1}", "${rooms[i]}"), \n ("${img2}", "${rooms[i]}"), \n ("${img3}", "${rooms[i]}"), \n`
            } else {
                photoQuery = `("${img1}", "${rooms[i]}"), \n ("${img2}", "${rooms[i]}"), \n ("${img3}", "${rooms[i]}"); \n`
            }
            query += photoQuery + "\n";
        }

        await currentConnection.query(query);
    } catch (error) {
        console.error(error);
    }
};
