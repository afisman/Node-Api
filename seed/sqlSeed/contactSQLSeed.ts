import { faker } from "@faker-js/faker";
import { dropQuery } from "../../util/queries";
import { contactCreateQuery } from "../../util/queryArgs";
import { sqlConnect } from "../../databaseConfig";
import { exit } from 'process';



async function contactSQLSeed() {
    let currentConnection;
    try {
        currentConnection = await sqlConnect();

        // await dropQuery(currentConnection);

        await currentConnection.query(contactCreateQuery);

        for (let i = 0; i < 15; i++) {

            await currentConnection.query(`
            INSERT INTO contact 
            (image, full_name, email, phone, date, message, rating, is_read)
            VALUES (?,?,?,?,?,?,?,?)`
                , [
                    faker.image.avatar(),
                    faker.person.fullName(),
                    faker.internet.email(),
                    faker.phone.number(),
                    faker.date.past({ years: 1, refDate: '2024-04-01' }),
                    faker.lorem.paragraphs(2),
                    faker.number.int({ min: 1, max: 5 }),
                    false
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

contactSQLSeed();