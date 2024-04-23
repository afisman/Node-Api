import { faker } from "@faker-js/faker";
import { dropQuery, sqlQuery } from "../../util/queries";
import { bookingsCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";

async function bookingsSeedDB() {
    let currentConnection;

    try {

        currentConnection = await sqlConnect();
        await dropQuery(currentConnection);

        await sqlQuery(bookingsCreateQuery);

        const roomIds = await sqlQuery("Select _id FROM room");
        console.log(roomIds);
        const rooms = roomIds.map((row: any) => row._id)

        for (let i = 0; i < 15; i++) {
            const name = faker.person.fullName();
            const checkIn = faker.date.soon({ days: 365, refDate: '2024-04-01' });
            const checkOut = faker.date.soon({ days: 30, refDate: new Date(checkIn) });

            const randomIndex = Math.floor(Math.random() * rooms.length);
            const idRoom = rooms[randomIndex];
            rooms.splice(randomIndex, 1);

            await currentConnection.query(`INSERT INTO booking 
            (name, order_date, check_in, check_out, hour_check_in, hour_check_out, discount, special_request, status, room)
            VALUES(?,?,?,?,?,?,?,?,?,?)`,
                [
                    name,
                    faker.date.past({ years: 1, refDate: checkIn }),
                    checkIn.getTime(),
                    checkOut.getTime(),
                    faker.date.soon().toLocaleTimeString(),
                    faker.date.soon().toLocaleTimeString(),
                    faker.number.int({ min: 1, max: 99 }),
                    faker.lorem.paragraph(3),
                    faker.helpers.arrayElement(["Check In", "Check Out"]),
                    idRoom
                ])

        }
    } catch (error) {
        console.log(error)
    }
}

bookingsSeedDB();