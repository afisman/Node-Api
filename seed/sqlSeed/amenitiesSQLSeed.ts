import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { roomCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { amenities_list } from "../../util/constants";



async function amenitiesSQLSeed() {
    let currentConnection;
    try {
        currentConnection = await sqlConnect();

        await dropQuery(currentConnection);

        await currentConnection.query(roomCreateQuery);


        for (let i = 0; i < amenities_list.length; i++) {
            await currentConnection.query(`INSERT INTO amenity(name) VALUES("${amenities_list[i]}")`)
        }


    } catch (error) {
        console.log(error);
    } finally {
        currentConnection?.release()
    }
};

amenitiesSQLSeed();