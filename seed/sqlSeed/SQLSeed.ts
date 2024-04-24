import { sqlConnect } from "../../databaseConfig";
import { dropQuery } from "../../util/queries";
import { contactSQLSeed } from "./contactSQLSeed";
import { userSQLSeed } from "./userSQLSeed";
import { roomsSQLSeed } from "./roomsSQLSeed";
import { bookingsSeedDB } from "./bookingsSQLSeed";
import { amenitiesSQLSeed } from "./amenitiesSQLSeed";
import { amenitiesRoomSQLSeed } from "./amenitiesRoomSQLSeed";
import { photosSQLSeed } from "./photosSQLSeed";
import { exit } from 'process';


async function SQLseedDB() {
    let currentConnection
    try {
        currentConnection = await sqlConnect();
        await dropQuery(currentConnection);

        await userSQLSeed(currentConnection);
        await contactSQLSeed(currentConnection);
        await roomsSQLSeed(currentConnection);
        await bookingsSeedDB(currentConnection);
        await amenitiesSQLSeed(currentConnection);
        await amenitiesRoomSQLSeed(currentConnection);
        await photosSQLSeed(currentConnection);
    } catch (error) {
        currentConnection?.rollback();
        console.error(error);
    } finally {
        currentConnection?.release();
        exit(1);
    }
}

SQLseedDB();