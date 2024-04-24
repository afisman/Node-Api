import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { roomCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { amenities_list } from "../../util/constants";
import { exit } from 'process';
import { PoolConnection } from "mysql2/promise";



export async function amenitiesSQLSeed(currentConnection: PoolConnection) {
    try {
        let query = `
        INSERT INTO amenity(name) VALUES
        `;

        for (let i = 0; i < amenities_list.length; i++) {
            query += `("${amenities_list[i]}")`
            if (i !== (amenities_list.length - 1)) {
                query += ", \n";
            } else {
                query += "; \n"
            }
        }
        await currentConnection.query(query)
    } catch (error) {
        console.error(error);
    }

};

