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


        let query = `INSERT INTO room_amenity (url, room_id) VALUES `;

        for (let i = 0; i < rooms.length; i++) {

        }

        currentConnection.query(query);
    } catch (error) {
        console.log(error);
    } finally {
        currentConnection?.release();
        exit(1);
    }
};

amenitiesRoomSQLSeed();