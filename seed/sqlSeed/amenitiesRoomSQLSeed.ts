import { faker } from "@faker-js/faker";
import { dropQuery, sqlQuery } from "../../util/queries";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';

async function amenitiesRoomSQLSeed() {
    let currentConnection;
    try {
        currentConnection = await sqlConnect();

        const roomId = await sqlQuery("Select _id FROM room");
        const rooms = roomId.map((row: any) => row._id);

        const amenitiesId = await sqlQuery("SELECT _id FROM amenity");
        const amenities = amenitiesId.map((row: any) => row._id);


        let query = `INSERT INTO room_amenity (room_id, amenity_id) VALUES `;

        for (let i = 0; i < rooms.length; i++) {
            let arr = faker.helpers.arrayElements(amenities);
            let amQuery = ``;

            for (let j = 0; j < arr.length; j++) {
                amQuery += `("${rooms[i]}", "${arr[j]}"), \n`

            }
            query += amQuery
        }
        query = query.substring(0, query.length - 3) + ";"
        console.log(query)

        currentConnection.query(query);
    } catch (error) {
        console.log(error);
    } finally {
        currentConnection?.release();
        exit(1);
    }
};

amenitiesRoomSQLSeed();